/* istanbul ignore file */
import getNextAuthConfig from '@common/auth/next-auth-config';

const authConfig = getNextAuthConfig('watch-oidc-provider', 'Kausal Watch Provider');

export const { signIn, signOut, auth, unstable_update, handlers } = authConfig;
