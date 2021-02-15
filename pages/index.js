import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import { useTranslation } from 'common/i18n';
import Layout from 'components/layout';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';
import LegacyHomePage from 'components/home/LegacyHomePage';

const GET_PLAN_PAGE = gql`
query GetPlanPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on PlanRootPage {
      body {
        ...StreamFieldFragment
      }
    }
    lastPublishedAt
  }
  planCategories(plan: $plan) {
    id
    identifier
    name
    imageUrl
    color
    categoryPage {
      title
      urlPath
    }
    type {
      id
      name
    }
    parent {
      id
    }
  }
}
${StreamField.fragments.streamField}
`;

const getRootCategories = (allCategories) => {
  console.log(allCategories);
  const mainCategories = allCategories.filter((cat) => cat.parent === null);
  console.log(mainCategories);
  return mainCategories;
};

function RootPage() {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path: '/',
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data;
  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  const page = _.clone(planPage);
  page.category = {};
  page.category.children = getRootCategories(data.planCategories);

  if (page.body.length < 1) return <LegacyHomePage />;

  return (
    <Layout>
      <div className="content-area">
        {page.body && (
          <StreamField
            page={page}
            blocks={page.body}
            color="#ffffff"
          />
        )}
      </div>
    </Layout>
  );
}

export default RootPage;
