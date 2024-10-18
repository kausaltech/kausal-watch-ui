import type { NextRequest } from 'next/server';

function parseForwardedFor(value: string) {
  const forwardedIps = value.split(',').map((e) => {
    const ip = e.trim();
    if (ip.includes(':')) {
      const splitted = ip.split(':');
      // make sure we only use this if it's ipv4 (ip:port)
      if (splitted.length === 2) {
        return splitted[0];
      }
    }
    return ip;
  });
  return forwardedIps[0];
}

export function getClientIP(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return parseForwardedFor(forwardedFor);
  }
  return req.ip;
}
