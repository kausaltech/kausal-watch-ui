import {
  GetPlansByHostnameQuery,
  PublicationStatus,
} from '@/common/__generated__/graphql';
import { NextRequest, NextResponse } from 'next/server';
import { stripSlashes } from './urls';

const BASIC_AUTH_ENV_VARIABLE = 'BASIC_AUTH_FOR_HOSTNAMES';

type PlanForHostname = NonNullable<
  GetPlansByHostnameQuery['plansForHostname']
>[0];

export type PlanFromPlansQuery = PlanForHostname & { __typename: 'Plan' };

export function getSearchParamsString(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();

  return searchParams.length > 0 ? `?${searchParams}` : '';
}

export const isRestrictedPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'RestrictedPlanNode';

const isPlan = (plan: PlanForHostname) =>
  plan?.__typename === 'Plan' || isRestrictedPlan(plan);

export const isPlanPublished = (plan: PlanFromPlansQuery) =>
  !plan.domain?.status || // No status indicates the plan is published
  plan.domain.status === PublicationStatus.Published;

export function getParsedPlan(
  possiblePlans: string[],
  plans: PlanFromPlansQuery[]
): PlanFromPlansQuery | undefined {
  // If only one plan exists return that
  if (plans.length === 1 && isPlan(plans[0])) {
    return plans[0];
  }

  // Find and return the plan associated with the plan in the pathname
  const plan = plans.find(
    (plan) =>
      isPlan(plan) &&
      plan.domains?.find(
        (domain) =>
          domain?.basePath &&
          possiblePlans.includes(stripSlashes(domain.basePath))
      )
  );

  if (plan) {
    return plan;
  }

  // If no plan is found by path, return the default plan
  return (
    plans.find(
      (plan) =>
        isPlan(plan) &&
        plan.domains?.find((domain) => domain?.basePath === null)
    ) ?? undefined
  );
}

export function getParsedLocale(
  localePossibilities: string[],
  plan: PlanFromPlansQuery
) {
  const locale = [plan.primaryLanguage, ...(plan.otherLanguages ?? [])].find(
    (locale) =>
      localePossibilities
        .map((possibleLocale) => possibleLocale.toLowerCase())
        .includes(locale.toLowerCase())
  );

  const isCaseInvalid =
    !!locale &&
    !localePossibilities.includes(locale) &&
    localePossibilities
      .map((locale) => locale.toLowerCase())
      .includes(locale.toLowerCase());

  return { parsedLocale: locale || plan.primaryLanguage, isCaseInvalid };
}

function getAuthenticationForPlan(hostname: string):
  | {
      username: string;
      password: string;
    }
  | undefined {
  const authConfig = process.env[BASIC_AUTH_ENV_VARIABLE];

  if (!authConfig || authConfig.trim().length === 0) {
    return undefined;
  }

  const planAuthConfig = authConfig
    .split(',')
    .find((authForPlan) => authForPlan.startsWith(`${hostname}:`));

  if (!planAuthConfig) {
    return undefined;
  }

  const [authHostname, username, password] = planAuthConfig.split(':');

  return { username, password };
}

export function isAuthenticated(request: NextRequest, hostname: string) {
  const authConfig = getAuthenticationForPlan(hostname);

  if (!authConfig) {
    return true;
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(authValue, 'base64')
      .toString('utf-8')
      .split(':');

    if (username === authConfig.username && password === authConfig.password) {
      return true;
    }
  }

  return false;
}

/**
 * We can't be sure of the order of locale and plan ID segments in the path because:
 * - The default locale is optional
 * - Legacy paths followed the pattern /<plan-id>/<locale>/ but now locale is always the root segment
 *
 * So we test the first two path segments against plan data to get the exact locale and plan ID
 */
export function getLocaleAndPlan(pathname: string, plans: PlanForHostname[]) {
  // Slice the first two segments of the pathname, e.g. '/en/plan-id/foo' --> ['en', 'plan-id']
  const possibleLocaleAndPlan = stripSlashes(pathname).split('/').slice(0, 2);

  const parsedPlan = getParsedPlan(
    possibleLocaleAndPlan,
    plans.filter((plan): plan is PlanFromPlansQuery => isPlan(plan))
  );

  if (!parsedPlan) {
    return { parsedPlan: undefined, parsedLocale: undefined };
  }

  const { parsedLocale, isCaseInvalid } = getParsedLocale(
    possibleLocaleAndPlan,
    parsedPlan
  );

  return { parsedPlan, parsedLocale, isLocaleCaseInvalid: isCaseInvalid };
}

/**
 * Legacy paths followed the pattern "/<plan-id>/<locale>/", new paths always
 * contain the locale at the root i.e. "/<locale>/<plan-id>/". Test for legacy
 * paths so that we can support old links.
 */
export function isLegacyPathStructure(
  pathname: string,
  locale: string,
  plan: NonNullable<PlanForHostname>
) {
  if (!plan.domain?.basePath) {
    return false;
  }

  return new RegExp(
    `/${stripSlashes(plan.domain.basePath)}/${locale}(/|$)`,
    'i'
  ).test(pathname);
}

export function convertPathnameFromLegacy(
  pathname: string,
  parsedLocale: string,
  parsedPlan: NonNullable<PlanForHostname>
) {
  // Get everything after the plan and locale parts of the pathname
  const slug = stripSlashes(pathname).split('/').slice(2).join('/');

  if (!parsedPlan.domain?.basePath) {
    return `/${parsedLocale}/${slug}`;
  }

  return `/${parsedLocale}/${parsedPlan.domain?.basePath}/${slug}`;
}

export function convertPathnameFromInvalidLocaleCasing(
  pathname: string,
  locale: string
) {
  return (
    pathname
      .split('/')
      // Replace incorrect locale casing with the correctly cased locale
      .map((path, i) =>
        (i === 0 || i === 1) && path.toLowerCase() === locale.toLowerCase()
          ? locale
          : path
      )
      .join('/')
  );
}

export function rewriteUrl(
  request: NextRequest,
  response: NextResponse,
  hostUrl: URL,
  rewrittenUrl: URL,
  plan: string
) {
  // The user facing URL, provided via the x-url header to be used in metadata
  const url = new URL(request.nextUrl.pathname, hostUrl).toString();

  response.headers.set('x-url', url);
  response.headers.set('x-middleware-rewrite', rewrittenUrl.toString());

  /**
   * Support reading plan details from headers while creating the RSC Apollo client. This
   * allows us to add cache headers to GraphQL requests from RSC queries.
   */
  response.headers.set('x-plan-domain', hostUrl.hostname);
  response.headers.set('x-plan-identifier', plan);

  return response;
}

export const HOSTNAMES_TO_IGNORE = /^(api|_next|static)$/;

/**
 * Checks if the domain parameter matches hostnames that should be ignored
 *
 * Can be used in page and layout components to avoid processing invalid requests
 * (Due to the internal nextjs implementation, 404 results for
 *  missing files served at _next/static and similar end up in application
 *  pages and layouts.)
 *
 * @param params Route parameters from Next.js
 * @returns boolean indicating if the request should be ignored
 *
 * TODO: remove all uses of this function
 * after having moved to serve the static files outside nextjs
 * and after ensuring old asset files are kept for robustness
 */
export function shouldIgnoreRequest(params: { domain?: string }): boolean {
  return !!params.domain?.match(HOSTNAMES_TO_IGNORE);
}
