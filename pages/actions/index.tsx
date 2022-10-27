import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
      defaultView
      ...ActionListPageFilters
    }
    lastPublishedAt
  }
}
${ActionList.fragments.listFilters}
`;

function ActionsListPage() {
  const router = useRouter();
  const defaultFilters = ActionList.getFiltersFromQuery(router.query);
  const [filters, setFilters] = useState(defaultFilters);
  const path = '/actions';
  const plan = usePlan();

  const handleFilterChange = useCallback(
    (id: string, val: string|undefined) => {
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
        const link = getActionListLinkProps(query);
        router.replace(link.href, undefined, { shallow: true });
        return newFilters;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFilters],
  );
  const { loading, error, data } = useQuery<GetActionListPageQuery>(GET_ACTION_LIST_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  const planPage = data?.planPage;

  const availableFilters = useMemo(() => {
    // @ts-ignore
    const { primaryFilters, mainFilters, advancedFilters } = planPage || {};
    return {
      primaryFilters,
      mainFilters,
      advancedFilters
    }
  }, [planPage]);

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  if (planPage.__typename !== 'ActionListPage') {
    return <ErrorMessage message="Invalid action list page" />;
  }

  const isServer = typeof window === "undefined";
  return (
    <Layout>
      <Meta title={planPage.title} />
      {isServer ? <ContentLoader /> : (
        <ActionList
          title={planPage.title}
          leadContent={planPage.leadContent}
          defaultView={planPage.defaultView}
          filters={filters}
          onFilterChange={handleFilterChange}
          availableFilters={availableFilters}
        />
      )}
    </Layout>
  );
}
export default ActionsListPage;
