'use client';

import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@apollo/client';

import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
} from '@/common/__generated__/graphql';
import { usePlan } from '@/context/plan';
import { GET_INDICATOR_DETAILS } from '@/queries/get-indicator';
import { GET_PLAN_CATEGORY_TYPES } from '@/queries/get-plan-category-types';

import { IndicatorModalBase } from './IndicatorModalBase';

/**
 * Get the plan identifier for an indicator
 * If the indicator is associated with the site plan, return the site plan identifier
 * Otherwise, return the first other plan identifier we find
 */
function getIndicatorPlanIdentifier(
  indicator: IndicatorDetailsQuery['indicator'] | null | undefined,
  sitePlanIdentifier: string
): string {
  if (!indicator) return sitePlanIdentifier;
  const currentPlan = indicator.plans?.find(
    (plan) => plan?.identifier === sitePlanIdentifier
  )?.identifier;
  if (currentPlan) {
    return currentPlan;
  }
  return indicator.plans?.[0]?.identifier ?? sitePlanIdentifier;
}

const GlobalIndicatorModal = () => {
  const plan = usePlan();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const indicatorId = searchParams.get('indicator');

  // Fetch category types for the modal
  type CategoryTypesQuery = {
    plan?: {
      id: string;
      categoryTypes?: Array<{ id: string; name: string; identifier: string }>;
    } | null;
  };
  const { data: categoryTypesData } = useQuery<CategoryTypesQuery>(GET_PLAN_CATEGORY_TYPES, {
    variables: {
      plan: plan.identifier,
    },
    skip: !indicatorId, // Only fetch when modal is open
  });

  const usableCategoryTypes: Array<{ id: string; name: string; identifier: string }> =
    categoryTypesData?.plan?.categoryTypes ?? [];

  // Determine indicator plan identifier - we'll update this after fetching indicator
  const [indicatorPlanIdentifier, setIndicatorPlanIdentifier] = React.useState<string>(
    plan.identifier
  );

  // Fetch indicator details
  const { loading, error, data, previousData } = useQuery<
    IndicatorDetailsQuery,
    IndicatorDetailsQueryVariables
  >(GET_INDICATOR_DETAILS, {
    variables: {
      plan: indicatorPlanIdentifier,
      sitePlan: plan.identifier,
      id: indicatorId ?? null,
    },
    fetchPolicy: 'no-cache',
    skip: !indicatorId,
  });

  // Update indicator plan identifier once we have indicator data
  React.useEffect(() => {
    const indicator = data?.indicator || previousData?.indicator;
    if (indicator) {
      const planId = getIndicatorPlanIdentifier(indicator, plan.identifier);
      if (planId !== indicatorPlanIdentifier) {
        setIndicatorPlanIdentifier(planId);
      }
    }
  }, [data?.indicator, previousData?.indicator, plan.identifier, indicatorPlanIdentifier]);

  // Parse indicatorsOrder from URL if available (for navigation)
  const indicatorsOrderParam = searchParams.get('indicatorsOrder');
  const indicatorsOrder = indicatorsOrderParam
    ? indicatorsOrderParam.split(',').filter(Boolean)
    : [];

  const currentIndicatorIndex = indicatorId ? indicatorsOrder.indexOf(indicatorId) : -1;
  const prevIndicatorId =
    currentIndicatorIndex > 0 ? indicatorsOrder[currentIndicatorIndex - 1] : undefined;
  const nextIndicatorId =
    currentIndicatorIndex >= 0 && currentIndicatorIndex < indicatorsOrder.length - 1
      ? indicatorsOrder[currentIndicatorIndex + 1]
      : undefined;
  const indicatorCount = indicatorsOrder.length;
  const currentIndicatorNumber = currentIndicatorIndex >= 0 ? currentIndicatorIndex + 1 : 0;
  const showNavigation = indicatorsOrder.length > 0;

  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('indicator');
    newSearchParams.delete('indicatorsOrder');
    const query = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const handleChangeIndicator = (newIndicatorId?: string | null) => {
    if (!newIndicatorId) {
      handleClose();
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('indicator', newIndicatorId);
    // Preserve indicatorsOrder if it exists
    if (indicatorsOrderParam) {
      newSearchParams.set('indicatorsOrder', indicatorsOrderParam);
    }
    const query = `?${newSearchParams.toString()}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  if (!indicatorId) {
    return null;
  }

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
      isOpen={!!indicatorId}
      onClose={handleClose}
      navigation={
        showNavigation
          ? {
              prevIndicatorId,
              nextIndicatorId,
              currentIndicatorNumber,
              indicatorCount,
              onPrevious: () => handleChangeIndicator(prevIndicatorId),
              onNext: () => handleChangeIndicator(nextIndicatorId),
            }
          : undefined
      }
    />
  );
};

export default GlobalIndicatorModal;
