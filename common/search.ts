import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { PlanContextFragment } from './__generated__/graphql';
import { trackSearch } from '@/components/MatomoAnalytics';

const GET_AUTOCOMPLETE_RESULTS = gql`
  query GetAutocompleteResults($plan: ID!, $term: String!) {
    search(plan: $plan, autocomplete: $term, includeRelatedPlans: true) {
      hits {
        id
        title
        url
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
        }
        object {
          __typename
          ... on Action {
            identifier
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

  async onSearch(opts, queryConfig) {
    const { searchTerm } = opts;
    const res = await this.apolloClient.query({
      query: GET_AUTOCOMPLETE_RESULTS,
      variables: {
        plan: this.plan.identifier,
        term: searchTerm,
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
