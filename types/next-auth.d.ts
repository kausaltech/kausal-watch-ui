import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    idToken: string;
    user: {
      name: string;
    } & DefaultSession['user'];
  }
}
