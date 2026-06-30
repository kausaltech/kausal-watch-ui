import { ApolloClient, ApolloLink, InMemoryCache, gql } from '@apollo/client';

import { logOperationLink } from '@common/apollo/links';

import type {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
  GetSitemapQuery,
  GetSitemapQueryVariables,
} from '@/common/__generated__/graphql';
import possibleTypes from '@/common/__generated__/possible_types.json';
import { ACTIONS_PATH, INDICATORS_PATH, STATIC_ROUTES } from '@/constants/routes';
import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';
import { tryRequest } from '@/utils/api.utils';
import { getHttpLink } from '@/utils/apollo.utils';
import { stripSlashes } from '@/utils/urls';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: possibleTypes.possibleTypes,
  }),
  link: ApolloLink.from([logOperationLink, getHttpLink()]),
});

const GET_SITEMAP_CONTENTS = gql`
  query GetSitemap($id: ID!) {
    planIndicators(plan: $id) {
      id
    }
    plan(id: $id) {
      primaryLanguage
      otherLanguages
      actions {
        identifier
      }
      pages {
        urlPath
      }
    }
  }
`;

type PossiblePlanForHostname = NonNullable<GetPlansByHostnameQuery['plansForHostname']>[0];

type PlanForHostname = PossiblePlanForHostname & { __typename: 'Plan' };

type Indicator = NonNullable<GetSitemapQuery['planIndicators']>[0] & {
  __typename: 'Indicator';
};

type Page = NonNullable<NonNullable<NonNullable<GetSitemapQuery['plan']>['pages']>[0]> & {
  __typename: string;
};

const isPlan = (plan: PossiblePlanForHostname): plan is PlanForHostname =>
  plan?.__typename === 'Plan';

function getDefaultPlanId(plans: NonNullable<GetPlansByHostnameQuery['plansForHostname']>) {
  if (plans.length === 1 && isPlan(plans[0])) {
    return plans[0].id;
  }

  const defaultPlan = plans.find(
    (plan) => isPlan(plan) && plan.domains?.find((domain) => domain?.basePath === null)
  );

  if (defaultPlan && isPlan(defaultPlan)) {
    return defaultPlan.id;
  }

  return undefined;
}

type SitemapUrlOptions = {
  includeAllPlans?: boolean;
  includeLocaleAndBasePathVariants?: boolean;
};

export function getSitemapUrlVariantsForPlan(
  path: string,
  plan: PlanForHostname,
  origin: string,
  hostname: string
): string[] {
  const pathWithoutLeadingSlash = stripSlashes(path);
  const pathSuffix = pathWithoutLeadingSlash ? `/${pathWithoutLeadingSlash}` : '/';
  const languages = [plan.primaryLanguage, ...(plan.otherLanguages ?? [])];
  const matchingDomains = [plan.domain, ...(plan.domains ?? [])].filter(
    (domain) => domain?.hostname === hostname
  );
  const hasRootDomain = matchingDomains.some((domain) => domain?.basePath === null);
  const basePaths = [
    ...new Set(
      matchingDomains
        .map((domain) => domain?.basePath)
        .filter((basePath): basePath is string => !!basePath)
        .map((basePath) => stripSlashes(basePath))
    ),
  ];
  const urls = new Set<string>();

  if (hasRootDomain) {
    urls.add(`${origin}${path}`);
  }

  languages.forEach((language) => {
    const shouldPrependLocale = language !== plan.primaryLanguage;

    if (hasRootDomain && shouldPrependLocale) {
      urls.add(`${origin}/${language}${pathSuffix}`);
    }

    basePaths.forEach((basePath) => {
      if (shouldPrependLocale) {
        urls.add(`${origin}/${language}/${basePath}${pathSuffix}`);
      } else {
        urls.add(`${origin}/${basePath}${pathSuffix}`);
      }
    });
  });

  return [...urls];
}

function getPlanPaths(data: GetSitemapQuery): string[] {
  return [
    '/',

    ...STATIC_ROUTES,

    ...(data.planIndicators
      ?.filter((indicator): indicator is Indicator => indicator?.__typename === 'Indicator')
      .map((indicator) => `${INDICATORS_PATH}/${indicator.id}`) ?? []),

    ...(data.plan?.pages
      ?.filter((page): page is Page => !!page?.urlPath)
      .map((page) => page.urlPath) ?? []),

    ...(data.plan?.actions?.map((action) => `${ACTIONS_PATH}/${action.identifier}`) ?? []),
  ];
}

async function getPlanUrls(
  plan: PlanForHostname,
  origin: string,
  hostname: string,
  options: SitemapUrlOptions
) {
  const { data, error } = await tryRequest<GetSitemapQuery>(
    apolloClient.query<GetSitemapQuery, GetSitemapQueryVariables>({
      query: GET_SITEMAP_CONTENTS,
      variables: { id: plan.id },
      fetchPolicy: 'no-cache',
    })
  );

  if (error || !data?.plan) {
    return [];
  }

  const paths = getPlanPaths(data);

  if (options.includeLocaleAndBasePathVariants) {
    return paths.flatMap((path) => getSitemapUrlVariantsForPlan(path, plan, origin, hostname));
  }

  return paths.map((path) => (path === '/' ? origin : `${origin}${path}`));
}

export async function getSitemapUrlsForOrigin(
  origin: string,
  options: SitemapUrlOptions = {}
): Promise<string[]> {
  const url = new URL(origin);

  const { data: plansData, error: plansError } = await tryRequest(
    apolloClient.query<GetPlansByHostnameQuery, GetPlansByHostnameQueryVariables>({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname: url.hostname },
      fetchPolicy: 'no-cache',
    })
  );

  const plansForHostname = plansData?.plansForHostname;

  if (plansError || !plansForHostname?.length) {
    return [];
  }

  const plans = plansForHostname.filter((plan): plan is PlanForHostname => isPlan(plan));
  const defaultPlanId = getDefaultPlanId(plans);
  const planIds = options.includeAllPlans ? plans.map((plan) => plan.id) : [defaultPlanId];
  const selectedPlans = plans.filter((plan) => planIds.includes(plan.id));

  if (!selectedPlans.length) {
    return [];
  }

  const planUrls = await Promise.all(
    selectedPlans.map((plan) => getPlanUrls(plan, url.origin, url.hostname, options))
  );

  return [...new Set(planUrls.flat())];
}
