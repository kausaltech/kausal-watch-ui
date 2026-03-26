import { type NextRequest, NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';

import { ACTIONS_PATH } from '@/constants/routes';
import { getPdfExportServiceUrl } from '@/utils/pdf-export';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

// Simple in-process concurrency limiter to avoid overwhelming Gotenberg
// (which runs a limited number of Chromium workers). Requests beyond this
// limit are rejected with 429 rather than queuing and risking timeouts.
//
// This is a basic safeguard — it only tracks requests within a single
// Next.js process and resets on restart. If this limit is hit frequently,
// consider:
//   - Scaling Gotenberg's replicaCount up
//   - Switching to Gotenberg's webhook mode for async processing with a
//     polling/SSE-based client flow
//   - Adding a proper job queue (e.g. Redis-backed) for cross-process limiting
const MAX_CONCURRENT_EXPORTS = 4;
let inFlight = 0;

function buildHeaderHtml(locale: string): string {
  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date());

  return `<div class="text left grow" style="font-size: 14px;">${date}</div>
<div class="text right" style="font-size: 14px;"><span class="title"></span></div>`;
}

export async function POST(request: NextRequest) {
  const gotenbergUrl = getPdfExportServiceUrl();
  if (!gotenbergUrl) {
    return NextResponse.json({ error: 'PDF export is not configured' }, { status: 503 });
  }

  // Reserve the concurrency slot immediately — before any async work — so
  // that a burst of concurrent requests cannot all pass the check before any
  // slot is counted.
  if (inFlight >= MAX_CONCURRENT_EXPORTS) {
    return NextResponse.json(
      { error: 'Too many concurrent PDF exports, please try again shortly' },
      { status: 429 }
    );
  }
  inFlight++;

  try {
    let body: { path: string; locale?: string };
    try {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        body = {
          path: formData.get('path') as string,
          locale: (formData.get('locale') as string) || undefined,
        };
      } else {
        body = await request.json();
      }
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { path, locale = 'en' } = body;
    if (!path || typeof path !== 'string' || !path.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid path parameter' }, { status: 400 });
    }

    // Only allow action detail pages to be exported. The path (after optional
    // locale / plan prefix segments) must contain /actions/<id>.  This prevents
    // callers from generating PDFs of arbitrary pages and ensures the export is
    // scoped to the intended feature surface.
    const segments = path.split('/').filter(Boolean);
    const actionsIdx = segments.indexOf(ACTIONS_PATH.replace('/', ''));
    if (actionsIdx === -1 || actionsIdx === segments.length - 1) {
      return NextResponse.json(
        { error: 'PDF export is only supported for action detail pages' },
        { status: 403 }
      );
    }

    // Construct the full URL that Gotenberg's Chromium will fetch.
    // Use the Host header so the correct tenant is resolved.
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host');
    if (!host) {
      return NextResponse.json({ error: 'Missing Host header' }, { status: 400 });
    }

    const separator = path.includes('?') ? '&' : '?';
    const pageUrl = `${forwardedProto}://${host}${path}${separator}print=true`;

    // Omit ?print=true from displayUrl (otherwise we could just use <span class="url"></span> in the footer)
    const displayUrl = `${forwardedProto}://${host}${path}`;
    const headerHtml = buildHeaderHtml(locale);
    const footerHtml = `<div class="text left grow" style="font-size: 14px;">${displayUrl}</div>
<div class="text right" style="font-size: 14px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`;

    const formData = new FormData();
    formData.append('url', pageUrl);

    formData.append('files', new Blob([headerHtml], { type: 'text/html' }), 'header.html');
    formData.append('files', new Blob([footerHtml], { type: 'text/html' }), 'footer.html');

    // Wait for iframes to finish loading (the PrintProvider sets this flag).
    formData.append('waitForExpression', 'window.__iframesReady === true');

    // PDF layout options
    formData.append('marginTop', '1.5');
    formData.append('marginBottom', '1');
    formData.append('marginLeft', '0.7');
    formData.append('marginRight', '0.7');
    formData.append('paperWidth', '8.27'); // A4
    formData.append('paperHeight', '11.69'); // A4
    formData.append('printBackground', 'true');

    const response = await fetch(`${gotenbergUrl}/forms/chromium/convert/url`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(65_000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gotenberg error:', response.status, errorText);
      Sentry.captureMessage(`Gotenberg error: ${response.status} ${errorText}`, 'error');
      return NextResponse.json({ error: 'PDF generation failed' }, { status: 502 });
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="export.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      console.error('PDF export timed out');
      Sentry.captureMessage('PDF export timed out', 'warning');
      return NextResponse.json({ error: 'PDF generation timed out' }, { status: 504 });
    }
    console.error('PDF export error:', err);
    Sentry.captureException(err);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  } finally {
    inFlight--;
  }
}
