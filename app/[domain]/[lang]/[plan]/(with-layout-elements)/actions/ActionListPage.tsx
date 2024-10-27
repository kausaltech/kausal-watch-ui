'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ActionList from '@/components/dashboard/ActionList';
import { Filters, FilterValue } from '@/components/actions/ActionListFilters';
import { GetActionListPageQuery } from '@/common/__generated__/graphql';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';

type Props = {
  actionListPage: NonNullable<
    NonNullable<GetActionListPageQuery['plan']>['actionListPage'] & {
      __typename: 'ActionListPage';
    }
  >;
};

export function ActionListPage({ actionListPage }: Props) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setFilters, updateSearchParams]
  );

  const availableFilters = useMemo(() => {
    const { primaryFilters, mainFilters, advancedFilters } =
      actionListPage || {};
    return {
      primaryFilters,
      mainFilters,
      advancedFilters,
    };
  }, [actionListPage]);

  return (
    <ActionList
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
