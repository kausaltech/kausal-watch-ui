import { type NextRequest, NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';

import { getWatchBackendUrl } from '@common/env';

import { auth } from '@/config/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

const EXPORT_FORMATS = ['csv', 'xlsx'] as const;

type ExportFormat = (typeof EXPORT_FORMATS)[number];

type ActionExportRequest = {
  plan: string;
  actions: string[];
  format: ExportFormat;
  allFields: boolean;
};

function parseExportRequest(body: unknown): ActionExportRequest | null {
  if (!body || typeof body !== 'object') return null;
  const { plan, actions, format, allFields } = body as Record<string, unknown>;

  if (typeof plan !== 'string' || !/^[-a-z0-9]+$/.test(plan)) return null;
  if (
    !Array.isArray(actions) ||
    !actions.every((id) => typeof id === 'string' && /^\d+$/.test(id))
  ) {
    return null;
  }
  if (!EXPORT_FORMATS.includes(format as ExportFormat)) return null;

  return {
    plan,
    actions: actions as string[],
    format: format as ExportFormat,
    allFields: allFields === true,
  };
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

/**
 * Download the action export from the backend on behalf of the signed-in user.
 *
 * The backend's session cookie belongs to its admin host and cannot be relied on for a link
 * to its API host, so the export is fetched here with the ID token the user's session holds.
 */
export async function POST(request: NextRequest) {
  const exportRequest = parseExportRequest(await request.json().catch(() => null));
  if (!exportRequest) {
    return errorResponse('Invalid export request', 400);
  }
  const { plan, actions, format, allFields } = exportRequest;

  const session = await auth();
  const idToken = session?.idToken;
  if (allFields && !idToken) {
    return errorResponse('Sign in to export all columns', 401);
  }

  const url = new URL(`/report_export/${plan}/`, getWatchBackendUrl());
  url.searchParams.set('actions', actions.join(','));
  url.searchParams.set('format', format);
  if (allFields) {
    url.searchParams.set('fields', 'all');
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(url.toString(), {
      headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
      cache: 'no-store',
    });
  } catch (error) {
    Sentry.captureException(error);
    return errorResponse('Export service is unavailable', 502);
  }

  if (!backendResponse.ok) {
    return errorResponse(`Export failed (${backendResponse.status})`, backendResponse.status);
  }

  const headers = new Headers();
  for (const name of ['Content-Type', 'Content-Disposition']) {
    const value = backendResponse.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new NextResponse(backendResponse.body, { status: 200, headers });
}
