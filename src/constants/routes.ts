/* istanbul ignore file */
export const INDICATORS_PATH = '/indicators';

export const ACTIONS_PATH = '/actions';

export const UNPUBLISHED_PATH = '/unpublished';

export const SIGN_IN_REQUIRED_PATH = '/sign-in-required';

/** Where the backend sends a public user after they set their password */
export const ACCESS_APPROVED_PATH = '/access-approved';

export const PLEDGE_PATH = '/pledges';

export const STATIC_ROUTES = [
  '/accessibility',
  ACTIONS_PATH,
  '/feedback',
  INDICATORS_PATH,
  '/insight',
  '/organizations',
  PLEDGE_PATH,
  '/search',
];

export const API_PROXY_PATH = '/api/graphql';
