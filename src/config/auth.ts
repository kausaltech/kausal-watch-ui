/* istanbul ignore file */
import { NextRequest } from 'next/server';

import NextAuth, { type NextAuthConfig, type User } from 'next-auth';
import type { OIDCConfig } from 'next-auth/providers';

import { getAuthIssuer } from '@common/env';
import { getLogger } from '@common/logging';
import { userLogContext } from '@common/logging/logger';

type Profile = {
  name: string;
  given_name: string;
  family_name: string;
};

function getAuthLogger(opts?: { user?: User }) {
  return getLogger('auth', userLogContext(opts?.user ?? null));
}

const nextAuth = NextAuth({
  callbacks: {
    jwt({ token, account, profile }) {
      // Persist the OAuth id_token
      if (account?.id_token) {
        token.idToken = account.id_token;
        if (typeof profile?.exp == 'number') {
          token.expires = new Date(profile.exp * 1000).toISOString();
        }
      }
      // If token has expired, clear it — forces unauthenticated access
      if (token.expires && new Date(token.expires as string) <= new Date()) {
        delete token.idToken;
        delete token.expires;
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
  },
  providers: [
    {
      id: 'watch-oidc-provider',
      name: 'Kausal Watch Provider',
      type: 'oidc',
      issuer: getAuthIssuer(),
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      profile(profile) {
        return { name: profile.name };
      },
      wellKnown: `${process.env.AUTH_ISSUER}/.well-known/openid-configuration`,
    } satisfies OIDCConfig<Profile>,
  ],
  logger: {
    error(error: Error) {
      const authLogger = getAuthLogger();
      authLogger.error(error);
    },
    debug(_message, _metadata) {
      const authLogger = getAuthLogger();
      authLogger.debug(_metadata, _message);
      return;
    },
    warn(code) {
      const authLogger = getAuthLogger();
      authLogger.warn({ code }, 'Auth.js warning');
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig);

function fixNextUrl(req: NextRequest) {
  const { href, origin } = req.nextUrl;
  const realOrigin = `${req.headers.get('x-forwarded-proto')}://${req.headers.get('host')}`;
  return new NextRequest(href.replace(origin, realOrigin), req);
}

export const { signIn, signOut, auth, unstable_update } = nextAuth;
export const handlers = {
  GET: async (req: NextRequest) => {
    return nextAuth.handlers.GET(fixNextUrl(req));
  },
  POST: async (req: NextRequest) => {
    return nextAuth.handlers.POST(fixNextUrl(req));
  },
};
