import { type NextRequest, NextResponse } from 'next/server';

import { FORWARDED_FOR_HEADER } from '@common/constants/headers.mjs';
import { getSentryDsn } from '@common/env/runtime';
import { getLogger } from '@common/logging';
import { forwardToSentry } from '@common/sentry/tunnel';

const sentryDsn = getSentryDsn();
const sentryDsnUrl = sentryDsn ? new URL(sentryDsn) : null;

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

export async function POST(req: NextRequest) {
  const logger = getLogger('sentry-proxy');
  if (!sentryDsnUrl) {
    return NextResponse.json({ error: 'Sentry disabled' }, { status: 500 });
  }
  if (!req.body) {
    return NextResponse.json({ error: 'No request body' }, { status: 500 });
  }
  const clientIp = req.headers.get(FORWARDED_FOR_HEADER)!;
  const contentType = req.headers.get('content-type');
  const referer = req.headers.get('referer');

  try {
    const resp = await forwardToSentry(await req.bytes(), sentryDsnUrl, {
      clientIp,
      contentType,
      referer,
    });
    if (resp.status !== 200) {
      let responseData = {};
      if (resp.headers.get('content-type')?.startsWith('application/json')) {
        const data = (await resp.json()) as Record<string, unknown>;
        logger.error(`Sentry responded with status ${resp.status}: ${JSON.stringify(data)}`);
        responseData = data;
      }
      return NextResponse.json(responseData, { status: resp.status });
    }
    try {
      const data = (await resp.json()) as Record<string, unknown>;
      return NextResponse.json(data, { status: resp.status });
    } catch (err) {
      logger.error(err);
      return NextResponse.json({ error: 'Unable to parse Sentry response' }, { status: 500 });
    }
  } catch (err) {
    logger.error(err);
    return NextResponse.json({ error: 'Failed to forward to Sentry' }, { status: 500 });
  }
}
