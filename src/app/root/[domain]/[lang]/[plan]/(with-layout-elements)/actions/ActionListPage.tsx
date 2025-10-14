'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import type { GetActionListPageQuery } from '@/common/__generated__/graphql';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import type { FilterValue, Filters } from '@/components/actions/ActionListFilters';
import ActionList from '@/components/dashboard/ActionList';

type Props = {
  actionListPage: NonNullable<
    NonNullable<GetActionListPageQuery['plan']>['actionListPage'] & {
      __typename: 'ActionListPage';
    }
  >;
  testId?: string;
};

export function ActionListPage({ actionListPage, testId }: Props) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters<FilterValue>>(
    searchParams ? Object.fromEntries(searchParams) : {}
  );
  const updateSearchParams = useUpdateSearchParams();

  const handleFilterChange = useCallback(
    (id: string, val: FilterValue) => {
      setFilters((state) => {
        const newFilters = {
          ...state,
          [id]: val,
        };

        const query = {};
        Object.entries(newFilters).forEach(([key, val]) => {
          if (!val) return;
          query[key] = val;
        });

        updateSearchParams(newFilters);

        return newFilters;
      });
    },
    [setFilters, updateSearchParams]
  );

  const availableFilters = useMemo(() => {
    const { primaryFilters, mainFilters, advancedFilters } = actionListPage || {};
    return {
      primaryFilters,
      mainFilters,
      advancedFilters,
    };
  }, [actionListPage]);

  return (
    <ActionList
      data-testid={testId}
      title={actionListPage.title}
      leadContent={actionListPage.leadContent ?? ''}
      defaultView={actionListPage.defaultView}
      includeRelatedPlans={!!actionListPage.includeRelatedPlans}
      headingHierarchyDepth={actionListPage.headingHierarchyDepth}
      filters={filters}
      onFilterChange={handleFilterChange}
      availableFilters={availableFilters}
    />
  );
}
