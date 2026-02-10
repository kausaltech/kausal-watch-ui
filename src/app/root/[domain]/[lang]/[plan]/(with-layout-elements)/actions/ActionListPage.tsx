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

// Phase is multi-select. URL rehydration may return a string, so force array.
function parseFilters(sp: URLSearchParams | null): Filters<FilterValue> {
  if (!sp) return {};
  const out: Filters<FilterValue> = {};
  const keys = Array.from(new Set(sp.keys()));
  for (const key of keys) {
    const values = sp.getAll(key).filter((v) => v !== '');
    if (values.length === 0) continue;
    if (key === 'phase') {
      out[key] = values;
      continue;
    }
    out[key] = values.length === 1 ? values[0] : values;
  }
  return out;
}

export function ActionListPage({ actionListPage, testId }: Props) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters<FilterValue>>(() => parseFilters(searchParams));
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
