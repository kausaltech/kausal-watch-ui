import { headers } from 'next/headers';

import { ApolloClient, from, gql, InMemoryCache } from '@apollo/client';
import { MetadataRoute } from 'next';

import {
  GetPlansByHostnameQuery,
  GetPlansByHostnameQueryVariables,
  GetSitemapQuery,
  GetSitemapQueryVariables,
} from '@/common/__generated__/graphql';
import possibleTypes from '@/common/__generated__/possible_types.json';
import {
  ACTIONS_PATH,
  INDICATORS_PATH,
  STATIC_ROUTES,
} from '@/constants/routes.mjs';
import { GET_PLANS_BY_HOSTNAME } from '@/queries/get-plans';
import { tryRequest } from '@/utils/api.utils';
import {
  getHttpLink,
  operationEnd,
  operationStart,
} from '@/utils/apollo.utils';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: possibleTypes.possibleTypes,
  }),
  link: from([operationStart, operationEnd, getHttpLink()]),
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

type PossiblePlanForHostname = NonNullable<
  GetPlansByHostnameQuery['plansForHostname']
>[0];

type PlanForHostname = PossiblePlanForHostname & { __typename: 'Plan' };

type Indicator = NonNullable<GetSitemapQuery['planIndicators']>[0] & {
  __typename: 'Indicator';
};

type Page = NonNullable<
  NonNullable<NonNullable<GetSitemapQuery['plan']>['pages']>[0]
> & {
  __typename: string;
};

const isPlan = (plan: PossiblePlanForHostname): plan is PlanForHostname =>
  plan?.__typename === 'Plan';

function getDefaultPlanId(
  plans: NonNullable<GetPlansByHostnameQuery['plansForHostname']>
) {
  if (plans.length === 1 && isPlan(plans[0])) {
    return plans[0].id;
  }

  const defaultPlan = plans.find(
    (plan) =>
      isPlan(plan) && plan.domains?.find((domain) => domain?.basePath === null)
  );

  if (defaultPlan && isPlan(defaultPlan)) {
    return defaultPlan.id;
  }

  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto');
  const url = new URL(`${protocol}://${host}`);

  const { data: plansData, error: plansError } = await tryRequest(
    apolloClient.query<
      GetPlansByHostnameQuery,
      GetPlansByHostnameQueryVariables
    >({
      query: GET_PLANS_BY_HOSTNAME,
      variables: { hostname: url.hostname },
    })
  );

  if (plansError || !plansData?.plansForHostname?.length) {
    return [];
  }

  const planId = getDefaultPlanId(plansData.plansForHostname);

  if (!planId) {
    return [];
  }

  const { data, error } = await tryRequest(
    apolloClient.query<GetSitemapQuery, GetSitemapQueryVariables>({
      query: GET_SITEMAP_CONTENTS,
      variables: { id: planId },
    })
  );

  if (error || !data?.plan) {
    return [];
  }

  const baseUrl = url.origin;

  return [
    { url: baseUrl },

    ...STATIC_ROUTES.map((route) => ({ url: `${baseUrl}${route}` })),

    ...(data.planIndicators
      ?.filter(
        (indicator): indicator is Indicator =>
          indicator?.__typename === 'Indicator'
      )
      .map((indicator) => ({
        url: `${baseUrl}${INDICATORS_PATH}/${indicator.id}`,
      })) ?? []),

    ...(data.plan.pages
      ?.filter((page): page is Page => !!page?.urlPath)
      .map((page) => ({
        url: `${baseUrl}${page.urlPath}`,
      })) ?? []),

    ...(data.plan.actions?.map((action) => ({
      url: `${baseUrl}${ACTIONS_PATH}/${action.identifier}`,
    })) ?? []),
  ];
}
