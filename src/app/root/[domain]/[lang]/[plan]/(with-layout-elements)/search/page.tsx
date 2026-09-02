'use client';

import { notFound, useSearchParams } from 'next/navigation';

import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import SearchView, { type SearchState, getSearchFromQuery } from '@/components/common/SearchView';
import { usePlan } from '@/context/plan';

function SearchPage() {
  const plan = usePlan();
  const searchParams = useSearchParams();
  const handleUpdateSearchParams = useUpdateSearchParams();
  const search = getSearchFromQuery(searchParams ? Object.fromEntries(searchParams) : {});

  const handleSearchChange = (newFilters: SearchState) => {
    const query: Record<string, string> = {};

    Object.entries(newFilters).forEach(([key, val]) => {
      if (!val) return;
      query[key] = String(val);
    });

    handleUpdateSearchParams(query);
  };

  if (!plan.features.enableSearch) {
    return notFound();
  }

  return <SearchView search={search} onSearchChange={handleSearchChange} testId="search-page" />;
}
export default SearchPage;
