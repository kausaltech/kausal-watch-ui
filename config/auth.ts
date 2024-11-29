import { headers, type UnsafeUnwrappedHeaders } from 'next/headers';

import type { OIDCConfig } from '@auth/core/providers';
import NextAuth from 'next-auth';

import { getAuthIssuer } from '@/common/environment';

type Profile = {
  name: string;
  given_name: string;
  family_name: string;
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(async () => {
  const headersList =
    (await headers()) as unknown as UnsafeUnwrappedHeaders as unknown as UnsafeUnwrappedHeaders;
  const protocol = headersList.get('x-forwarded-proto');
  const host = headersList.get('host');
  const url = protocol && host ? `${protocol}://${host}/api/auth` : null;
  const authIssuer = getAuthIssuer();

  if (!url || !authIssuer) {
    if (!url) {
      console.error('Invalid request url');
    }
    return { providers: [], trustHost: true };
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
        issuer: authIssuer,
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        profile(profile) {
          return { name: profile.name };
        },
        wellKnown: `${authIssuer}/.well-known/openid-configuration`,
      } satisfies OIDCConfig<Profile>,
    ],
    secret: process.env.AUTH_SECRET,
    redirectProxyUrl: url,
    trustHost: true,
  };
});
