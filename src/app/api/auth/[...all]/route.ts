import { createAuthRouteHandlers } from '@common/auth/routes';

import { authForRequest } from '@/config/auth';

export const { GET, POST } = createAuthRouteHandlers(authForRequest);
