import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
} from '@/common/__generated__/graphql';

import { getClient } from '../utils/apollo-rsc-client';
import { GET_INDICATOR_DETAILS } from './get-indicator';

export const getIndicatorPage = async (plan: string, indicatorId: string) =>
  await (
    await getClient()
  ).query<IndicatorDetailsQuery, IndicatorDetailsQueryVariables>({
    query: GET_INDICATOR_DETAILS,
    variables: {
      plan,
      sitePlan: plan,
      id: indicatorId,
    },
    fetchPolicy: 'no-cache',
  });
