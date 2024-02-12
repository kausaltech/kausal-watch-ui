import NextAuth from 'next-auth';
import type { OIDCConfig } from '@auth/core/providers';
import { headers } from 'next/headers';

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

  if (!url) {
    console.error('Invalid request url');
    return { providers: [] };
  }

  return {
    providers: [
      {
        id: 'watch-oidc-provider',
        name: 'Kausal Watch Provider',
        type: 'oidc',

        issuer: process.env.AUTH_ISSUER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
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
