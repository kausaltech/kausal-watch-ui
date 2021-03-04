import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { getActionListLinkProps } from 'common/links';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import Layout, { Meta } from 'components/layout';
import StatusBoard from 'components/dashboard/Statusboard';

const GET_PLAN_PAGE = gql`
query GetPlanPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on ActionListPage {
      leadContent
    }
    lastPublishedAt
  }
}
`;

function ActionsListPage() {
  const router = useRouter();
  const filters = StatusBoard.getFiltersFromQuery(router.query);

  const path = '/actions';
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

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
    [],
  );

  return (
    <Layout>
      <Meta title={data.planPage.title} />
      {!process.browser ? <ContentLoader /> : (
        <StatusBoard
          plan={plan}
          title={data.planPage.title}
          leadContent={data.planPage.leadContent}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
    </Layout>
  );
}
const initialProps = {
  namespacesRequired: ['common', 'actions'],
};
ActionsListPage.getInitialProps = async () => (initialProps);

export default ActionsListPage;
