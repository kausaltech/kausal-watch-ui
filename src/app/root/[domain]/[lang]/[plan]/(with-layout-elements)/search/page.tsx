'use client';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import ErrorMessage from '@/components/common/ErrorMessage';
import SearchView from '@/components/common/SearchView';
import { usePlan } from '@/context/plan';

function SearchPage() {
  const plan = usePlan();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const handleUpdateSearchParams = useUpdateSearchParams();
  const search = SearchView.getSearchFromQuery(
    searchParams ? Object.fromEntries(searchParams) : {}
  );

  const handleSearchChange = (newFilters) => {
    const query = {};

    Object.entries(newFilters).forEach(([key, val]) => {
      if (!val) return;
      query[key] = val;
    });

    handleUpdateSearchParams(query);
  };

  if (!plan.features.enableSearch) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return <SearchView search={search} onSearchChange={handleSearchChange} />;
}
export default SearchPage;
