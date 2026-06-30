import { type NextRequest, NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';

import { getPdfExportServiceUrl } from '@/utils/pdf-export';
import { getSitemapUrlsForOrigin, getSitemapUrlsForPlan } from '@/utils/sitemap.server';

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

type PdfExportRequestBody = {
  path: string;
  locale?: string;
  plan?: string;
  timezone?: string;
};

function getStringField(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function isValidTimezone(timezone: unknown): timezone is string {
  if (typeof timezone !== 'string' || timezone.length === 0) return false;

  try {
    new Intl.DateTimeFormat('en', { timeZone: timezone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function buildHeaderHtml(locale: string, timezone?: string): string {
  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...(timezone ? { timeZone: timezone } : {}),
  }).format(new Date());

  return `<div class="text left grow" style="font-size: 14px;">${date}</div>
<div class="text right" style="font-size: 14px;"><span class="title"></span></div>`;
}

function getComparableUrl(url: string): string | undefined {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return undefined;
  }
  const path = parsedUrl.pathname.replace(/\/+$/, '');
  return `${parsedUrl.origin}${path}`;
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
    let body: PdfExportRequestBody;
    try {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        body = {
          path: getStringField(formData.get('path')) ?? '',
          locale: getStringField(formData.get('locale')),
          plan: getStringField(formData.get('plan')),
          timezone: getStringField(formData.get('timezone')),
        };
      } else {
        const jsonBody: unknown = await request.json();
        if (!jsonBody || typeof jsonBody !== 'object') {
          return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }
        const requestBody = jsonBody as Record<string, unknown>;
        body = {
          path: getStringField(requestBody.path) ?? '',
          locale: getStringField(requestBody.locale),
          plan: getStringField(requestBody.plan),
          timezone: getStringField(requestBody.timezone),
        };
      }
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { path, locale = 'en' } = body;
    const timezone = isValidTimezone(body.timezone) ? body.timezone : undefined;
    if (
      !path ||
      typeof path !== 'string' ||
      !path.startsWith('/') ||
      path.startsWith('//') ||
      path.includes('\\')
    ) {
      return NextResponse.json({ error: 'Invalid path parameter' }, { status: 400 });
    }

    // Construct the full URL that Gotenberg's Chromium will fetch.
    // Use the Host header so the correct tenant is resolved.
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host');
    if (!host) {
      return NextResponse.json({ error: 'Missing Host header' }, { status: 400 });
    }

    const origin = `${forwardedProto}://${host}`;
    const requestedUrl = new URL(path, origin);
    const sitemapOptions = {
      includeLocaleAndBasePathVariants: true,
    };
    const sitemapUrls = body.plan
      ? await getSitemapUrlsForPlan(origin, body.plan, sitemapOptions)
      : await getSitemapUrlsForOrigin(origin, {
          ...sitemapOptions,
          includeAllPlans: true,
        });
    const allowedUrls = new Set(
      sitemapUrls.map(getComparableUrl).filter((url): url is string => !!url)
    );
    const comparableRequestedUrl = getComparableUrl(requestedUrl.href);

    if (!comparableRequestedUrl || !allowedUrls.has(comparableRequestedUrl)) {
      return NextResponse.json(
        { error: 'PDF export is only supported for public sitemap pages' },
        { status: 403 }
      );
    }

    const printUrl = new URL(requestedUrl.href);
    printUrl.searchParams.set('print', 'true');
    const pageUrl = printUrl.href;

    // Omit ?print=true from displayUrl (otherwise we could just use <span class="url"></span> in the footer)
    const displayUrl = `${origin}${path}`;
    const headerHtml = buildHeaderHtml(locale, timezone);
    const footerHtml = `<div class="text left grow" style="font-size: 14px;">${displayUrl}</div>
<div class="text right" style="font-size: 14px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`;

    const formData = new FormData();
    formData.append('url', pageUrl);

    formData.append('files', new Blob([headerHtml], { type: 'text/html' }), 'header.html');
    formData.append('files', new Blob([footerHtml], { type: 'text/html' }), 'footer.html');

    // Wait for iframes to finish loading (the PrintProvider sets this flag).
    formData.append('waitForExpression', 'window.__iframesReady === true');
    // Wait before printing because some elements may take time to render (e.g., SVGs that render asynchronously).
    formData.append('waitDelay', '2s');

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
