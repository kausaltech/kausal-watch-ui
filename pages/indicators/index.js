import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import IndicatorList from 'components/indicators/IndicatorList';

const GET_PLAN_PAGE = gql`
  query GetPlanPageIndicatorList($plan: ID!, $path: String!) {
    planPage(plan: $plan, path: $path) {
      __typename
      id
      slug
      title
      ... on IndicatorListPage {
        leadContent
      }
      lastPublishedAt
    }
  }
`;

function IndicatorsPage() {
  const path = '/indicators';
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Layout>
      <Meta title={data.planPage.title} />
      <IndicatorList
        title={data.planPage.title}
        leadContent={data.planPage.leadContent}
      />
    </Layout>
  );
}

export default IndicatorsPage;
