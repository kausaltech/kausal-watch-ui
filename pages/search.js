import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getSearchResultsLinkProps } from 'common/links';
import Layout from 'components/layout';
import ErrorMessage from 'components/common/ErrorMessage';
import SearchView from 'components/common/SearchView';
import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';

function SearchPage() {
  const plan = usePlan();
  const router = useRouter();
  const { t } = useTranslation();
  const search = SearchView.getSearchFromQuery(router.query);

  const handleSearchChange = useCallback(
    (newFilters) => {
      const query = {};

      Object.entries(newFilters).forEach(([key, val]) => {
        if (!val) return;
        query[key] = val;
      });

      const link = getSearchResultsLinkProps(query);
      router.replace(link.href, undefined, { shallow: true });
    },
    [search]
  );

  if (!plan.features.enableSearch) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return (
    <Layout>
      <SearchView search={search} onSearchChange={handleSearchChange} />
    </Layout>
  );
}
export default SearchPage;
