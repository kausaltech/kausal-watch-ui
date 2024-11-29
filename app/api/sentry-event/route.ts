import { type NextRequest, NextResponse } from 'next/server';

import { getLogger } from '@/common/log';

const logger = getLogger('sentry-proxy');
const sentryDsn = process.env.SENTRY_DSN
  ? new URL(process.env.SENTRY_DSN)
  : null;

async function forwardToSentry(req: NextRequest, sentryDsn: URL) {
  const envelopeBytes = await req.arrayBuffer();
  const envelope = new TextDecoder().decode(envelopeBytes);
  const piece = envelope.split('\n')[0];
  const header = JSON.parse(piece) as { dsn: string };
  const dsn = new URL(header['dsn']);
  const projectId = dsn.pathname?.replace('/', '');

  if (dsn.hostname !== sentryDsn.hostname) {
    throw new Error(`Invalid Sentry DSN hostname: ${dsn.hostname}`);
  }
  if (dsn.pathname !== sentryDsn.pathname || !projectId) {
    throw new Error(`Invalid Sentry DSN path: ${dsn.pathname}`);
  }

  const sentryEnvelopeURL = `${sentryDsn.protocol}//${sentryDsn.hostname}/api/${projectId}/envelope/`;
  const resp = await fetch(sentryEnvelopeURL, {
    method: 'POST',
    body: envelopeBytes,
  });
  if (resp.status !== 200) {
    logger.error(`Sentry responded with status ${resp.status}`);
  }
  return NextResponse.json({}, { status: 200 });
}

export const POST = async (req: NextRequest) => {
  if (!sentryDsn)
    return NextResponse.json({ error: 'Sentry disabled' }, { status: 404 });
  try {
    return forwardToSentry(req, sentryDsn);
  } catch (e) {
    console.error('Error tunneling to Sentry', e);
    return NextResponse.json(
      { error: 'Error tunneling to Sentry' },
      { status: 500 }
    );
  }
};

export const dynamic = 'force-dynamic';
