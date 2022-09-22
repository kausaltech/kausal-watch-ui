import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { getActionListLinkProps } from 'common/links';
import { usePlan } from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import Layout, { Meta } from 'components/layout';
import ActionList from 'components/dashboard/ActionList';
import type { GetActionListPageQuery } from 'common/__generated__/graphql';


const GET_ACTION_LIST_PAGE = gql`
query GetActionListPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on ActionListPage {
      leadContent
      ...ActionListPageFilters
    }
    lastPublishedAt
  }
}
${ActionList.fragments.listFilters}
`;

function ActionsListPage() {
  const router = useRouter();
  const filters = ActionList.getFiltersFromQuery(router.query);

  const path = '/actions';
  const plan = usePlan();

  const handleFilterChange = useCallback(
    (newFilters) => {
      const query = {};

      Object.entries(newFilters).forEach(([key, val]) => {
        if (!val) return;
        query[key] = val;
      });

      const link = getActionListLinkProps(query);
      router.replace(link.href, undefined, { shallow: true });
    },
    [router],
  );

  const { loading, error, data } = useQuery<GetActionListPageQuery>(GET_ACTION_LIST_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data;
  if (planPage.__typename !== 'ActionListPage') {
    return <ErrorMessage message="Invalid action list page" />;
  }
  const { primaryFilters, mainFilters, advancedFilters } = planPage;
  const availableFilters = {
    primaryFilters,
    mainFilters,
    advancedFilters
  };

  return (
    <Layout>
      <Meta title={planPage.title} />
      {!process.browser ? <ContentLoader /> : (
        <ActionList
          title={planPage.title}
          leadContent={planPage.leadContent}
          filters={filters}
          onFilterChange={handleFilterChange}
          availableFilters={availableFilters}
        />
      )}
    </Layout>
  );
}
export default ActionsListPage;
