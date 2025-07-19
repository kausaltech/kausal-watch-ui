import { Session } from 'next-auth';

export const hasSessionExpired = (session: Session): boolean =>
  session?.expires != null && new Date(session.expires) <= new Date();
