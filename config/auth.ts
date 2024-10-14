import { headers } from 'next/headers';

import type { OIDCConfig } from '@auth/core/providers';
import NextAuth from 'next-auth';

type Profile = {
  name: string;
  given_name: string;
  family_name: string;
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(() => {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const host = headersList.get('host');
  const url = protocol && host ? `${protocol}://${host}/api/auth` : null;

  if (!url || !process.env.AUTH_ISSUER) {
    if (!url) {
      console.error('Invalid request url');
    }
    return { providers: [] };
  }

  return {
    callbacks: {
      jwt({ token, account, profile }) {
        // Persist the OAuth id_token
        if (account?.id_token) {
          token.idToken = account.id_token;
          if (typeof profile?.exp == 'number') {
            token.expires = new Date(profile.exp * 1000).toISOString();
          }
        }
        return token;
      },
      session({ session, ...params }) {
        // Include the OAuth id_token in the session
        if ('token' in params && typeof params.token.idToken === 'string') {
          session.idToken = params.token.idToken;
          if (params.token.expires != null) {
            session.expires = params.token.expires;
          }
        }
        return session;
      },
      redirect() {
        return `${protocol}://${host}/`;
      },
    },
    providers: [
      {
        id: 'watch-oidc-provider',
        name: 'Kausal Watch Provider',
        type: 'oidc',
        issuer: process.env.AUTH_ISSUER,
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        profile(profile) {
          return { name: profile.name };
        },
        wellKnown: `${process.env.AUTH_ISSUER}/.well-known/openid-configuration`,
      } satisfies OIDCConfig<Profile>,
    ],
    secret: process.env.AUTH_SECRET,
    redirectProxyUrl: url,
    trustHost: true,
  };
});
