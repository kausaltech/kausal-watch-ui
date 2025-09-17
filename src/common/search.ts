import type { ApolloClient } from '@apollo/client';
import { gql } from '@apollo/client';
import type {
  APIConnector,
  AutocompleteQueryConfig,
  AutocompleteResponseState,
  QueryConfig,
  RequestState,
  ResponseState,
} from '@elastic/search-ui';

import { trackSearch } from '@/components/MatomoAnalytics';

import type {
  PlanContextFragment,
  SearchQueryQuery,
  SearchQueryQueryVariables,
} from './__generated__/graphql';

export const SEARCH_QUERY = gql`
  query SearchQuery($plan: ID!, $query: String!, $onlyOtherPlans: Boolean, $clientUrl: String) {
    search(plan: $plan, query: $query, includeRelatedPlans: true, onlyOtherPlans: $onlyOtherPlans) {
      hits {
        id
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

export type SearchHit = SearchQueryQuery['search']['hits'][number];

class WatchSearchAPIConnector implements APIConnector {
  apolloClient: ApolloClient<unknown>;
  plan: PlanContextFragment;

  constructor({
    apolloClient,
    plan,
  }: {
    apolloClient: ApolloClient<unknown>;
    plan: PlanContextFragment;
  }) {
    this.apolloClient = apolloClient;
    this.plan = plan;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async onAutocomplete(
    _opts: RequestState,
    _queryConfig: AutocompleteQueryConfig
  ): Promise<AutocompleteResponseState> {
    return {
      autocompletedResults: [],
      autocompletedResultsRequestId: '',
      autocompletedSuggestions: {},
      autocompletedSuggestionsRequestId: '',
    };
  }

  onResultClick(_params): void {}
  onAutocompleteResultClick(_params): void {}

  async onSearch(opts: RequestState, _queryConfig: QueryConfig): Promise<ResponseState> {
    const { searchTerm } = opts;
    const responseBase: ResponseState = {
      requestId: '',
      facets: {},
      resultSearchTerm: '',
      totalPages: 0,
      totalResults: 0,
      pagingStart: 0,
      pagingEnd: 0,
      wasSearched: false,
      results: [],
      rawResponse: null,
    };
    if (!searchTerm) {
      return responseBase;
    }
    const res = await this.apolloClient.query<SearchQueryQuery, SearchQueryQueryVariables>({
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

    if (!hits) return responseBase;
    const results = hits.map((hit) => {
      return {
        ...hit,
      };
    });
    return { ...responseBase, results, totalResults: hits.length };
  }
}

export default WatchSearchAPIConnector;
