import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getSearchResultsLinkProps } from 'common/links';
import Layout from 'components/layout';
import ContentLoader from 'components/common/ContentLoader';
import SearchView from 'components/common/SearchView';

function ActionsListPage() {
  const router = useRouter();
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
    [search],
  );

  return (
    <Layout>
      {!process.browser ? <ContentLoader /> : (
        <SearchView
          search={search}
          onSearchChange={handleSearchChange}
        />
      )}
    </Layout>
  );
}
export default ActionsListPage;
