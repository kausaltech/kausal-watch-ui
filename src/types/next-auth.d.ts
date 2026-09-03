import type { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    expires?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    idToken: string;
    user: {
      name: string;
    } & DefaultSession['user'];
  }
}
