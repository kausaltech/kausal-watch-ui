import React, { useContext, useMemo } from 'react';

import { gql, useQuery } from '@apollo/client';
import { clone } from 'lodash';
import { useTranslation } from 'common/i18n';
import Layout from 'components/layout';
import PlanContext, { usePlan } from 'context/plan';
import images from 'common/images';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';
import LegacyHomePage from 'components/home/LegacyHomePage';

import { GetHomePageQuery } from 'common/__generated__/graphql';
import CategoriesContext from 'context/categories';


const GET_HOME_PAGE = gql`
query GetHomePage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on PlanRootPage {
      heroContent
      actionShortDescription
      indicatorShortDescription
      body {
        ...StreamFieldFragment
      }
    }
    lastPublishedAt
  }
  plan(id: $plan) {
    primaryActionClassification {
      categories(onlyRoot: true) {
        id
        identifier
        name
        leadParagraph
        image {
          ...MultiUseImageFragment
        }
        color
        categoryPage {
          title
          urlPath
        }
        level {
          name
          namePlural
        }
        parent {
          id
        }
      }
    }
  }
}
${StreamField.fragments.streamField}
${images.fragments.multiUseImage}
`;

const getRootCategories = (allCategories) => {
  const mainCategories = allCategories.filter((cat) => cat.parent === null);
  if (mainCategories.length === 1) return allCategories.filter((cat) => cat.parent?.id === mainCategories[0].id);
  return mainCategories;
};

type HomeProps = {
  primaryActionClassification: GetHomePageQuery['plan']['primaryActionClassification'],
  page: GetHomePageQuery['planPage'],
}

function Home({ primaryActionClassification, page }: HomeProps) {
  const { t } = useTranslation(['common']);
  if (page.__typename != 'PlanRootPage') {
    throw new Error("Invalid home page type");
  }
  return (
    <CategoriesContext.Provider value={primaryActionClassification.categories}>
      <div className="content-area">
        {page.body && (
          <StreamField
            page={page}
            blocks={page.body}
            color="#ffffff"
          />
        )}
      </div>
    </CategoriesContext.Provider>
  );
}

function RootPage() {
  const plan = usePlan();
  const { loading, error, data } = useQuery<GetHomePageQuery>(GET_HOME_PAGE, {
    variables: {
      plan: plan.identifier,
      path: '/',
    },
  });

  let component;
  if (error) {
    component = <ErrorMessage message={error.message} />;
  } else if (loading) {
    component = <ContentLoader />;
  } else {
    const { planPage, plan: queriedPlan } = data;
    if (!planPage) {
      return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
    }
    component = <Home page={planPage} primaryActionClassification={queriedPlan.primaryActionClassification} />
  }
  return (
    <Layout>
      {component}
    </Layout>
  );
}

export default RootPage;
