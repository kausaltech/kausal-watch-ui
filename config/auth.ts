import { isLocal } from '@/common/environment';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { headers } from 'next/headers';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(() => {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const host = headersList.get('host');
  const url = protocol && host ? `${protocol}://${host}` : null;

  if (!url) {
    console.error('Invalid request url');
    return { providers: [] };
  }

  return {
    providers: [
      GitHub({ redirectProxyUrl: url }),
      {
        id: 'watch-oidc-provider',
        name: 'Kausal Watch Provider',
        type: 'oidc',
        issuer: 'https://my.oidc-provider.com',
        redirectProxyUrl: url,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: isLocal,
  };
});
