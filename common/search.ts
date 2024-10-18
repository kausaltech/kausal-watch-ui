import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

import { trackSearch } from '@/components/MatomoAnalytics';
import { PlanContextFragment } from './__generated__/graphql';

export const SEARCH_QUERY = gql`
  query SearchQuery(
    $plan: ID!
    $query: String!
    $onlyOtherPlans: Boolean
    $clientUrl: String
  ) {
    search(
      plan: $plan
      query: $query
      includeRelatedPlans: true
      onlyOtherPlans: $onlyOtherPlans
    ) {
      hits {
        title
        url(clientUrl: $clientUrl)
        highlight
        plan {
          identifier
          image {
            rendition(size: "128x128", crop: true) {
              src
            }
          }
          name
          shortName
          organization {
            name
          }
        }
        object {
          __typename
          ... on Action {
            identifier
            primaryOrg {
              name
              logo {
                rendition(size: "128x128", crop: true) {
                  src
                }
              }
            }
          }
          ... on Indicator {
            id
          }
        }
        page {
          title
          ... on CategoryPage {
            category {
              level {
                name
              }
            }
          }
        }
      }
    }
  }
`;

class WatchSearchAPIConnector {
  apolloClient: ApolloClient<InMemoryCache>;
  plan: PlanContextFragment;

  constructor({ apolloClient, plan }) {
    this.apolloClient = apolloClient;
    this.plan = plan;
  }

  async onSearch(opts) {
    const { searchTerm } = opts;
    const res = await this.apolloClient.query({
      query: SEARCH_QUERY,
      variables: {
        plan: this.plan.identifier,
        query: searchTerm,
        onlyOtherPlans: false,
        clientUrl: this.plan.viewUrl,
      },
    });
    const hits = res?.data?.search?.hits;

    trackSearch(searchTerm, false, hits?.length ?? 0);

    if (!hits) return [];
    const results = hits.map((hit) => {
      return {
        ...hit,
      };
    });
    return { results };
  }
}

export default WatchSearchAPIConnector;
