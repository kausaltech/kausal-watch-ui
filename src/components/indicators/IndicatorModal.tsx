import { useQuery } from '@apollo/client';

import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
  IndicatorListQuery,
} from '@/common/__generated__/graphql';
import { GET_INDICATOR_DETAILS } from '@/queries/get-indicator';

import { IndicatorModalBase } from './IndicatorModalBase';

interface IndicatorModalProps {
  indicatorId: string;
  onChange: (indicatorId?: string | null) => void;
  indicatorPlanIdentifier: string;
  sitePlanIdentifier: string;
  prevIndicatorId?: string;
  nextIndicatorId?: string;
  indicatorsOrder: string[];
  usableCategoryTypes: NonNullable<IndicatorListQuery['plan']>['categoryTypes'];
}

const IndicatorModal = (props: IndicatorModalProps) => {
  const {
    indicatorId,
    onChange,
    indicatorPlanIdentifier,
    sitePlanIdentifier,
    indicatorsOrder,
    usableCategoryTypes,
  } = props;

  const { loading, error, data, previousData } = useQuery<
    IndicatorDetailsQuery,
    IndicatorDetailsQueryVariables
  >(GET_INDICATOR_DETAILS, {
    variables: {
      plan: indicatorPlanIdentifier,
      sitePlan: sitePlanIdentifier,
      id: indicatorId,
    },
    fetchPolicy: 'no-cache',
  });

  const currentIndicatorIndex = indicatorsOrder.indexOf(indicatorId);
  const prevIndicatorId = indicatorsOrder[currentIndicatorIndex - 1];
  const nextIndicatorId = indicatorsOrder[currentIndicatorIndex + 1];
  const indicatorCount = indicatorsOrder.length;
  const currentIndicatorNumber = currentIndicatorIndex + 1;

  return (
    <IndicatorModalBase
      indicator={data?.indicator || previousData?.indicator}
      loading={loading}
      error={error}
      layout={{
        detailsMainTop: data?.plan?.indicatorListPage?.detailsMainTop ?? [],
        detailsMainBottom: data?.plan?.indicatorListPage?.detailsMainBottom ?? [],
        detailsAside: data?.plan?.indicatorListPage?.detailsAside ?? [],
      }}
      usableCategoryTypes={usableCategoryTypes}
      isOpen={indicatorId !== null}
      onClose={() => onChange(null)}
      navigation={{
        prevIndicatorId,
        nextIndicatorId,
        currentIndicatorNumber,
        indicatorCount,
        onPrevious: () => onChange(prevIndicatorId),
        onNext: () => onChange(nextIndicatorId),
      }}
    />
  );
};

export default IndicatorModal;
