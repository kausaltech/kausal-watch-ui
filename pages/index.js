import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import { useTranslation } from 'common/i18n';
import Layout from 'components/layout';
import PlanContext from 'context/plan';
import images from 'common/images';
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
    shortDescription
    image {
      ...MultiUseImageFragment
    }
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
${images.fragments.multiUseImage}
`;

const getRootCategories = (allCategories) => {
  const mainCategories = allCategories.filter((cat) => cat.parent === null);
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

  const mockData = [
    {
      id: 'mock',
      blockType: 'CardListBlock',
      content: 'Tarvitsemme mukaan kaikki Tampereen asukkaat, yritykset ja yhteisöt.',
      heading: 'Yhteinen tavoite',
      cardsData: [
        {
          imageUrl: 'https://source.unsplash.com/collection/8586906/600x300',
          header: 'Ilmastosankari',
          content: 'Tamperelaisten oma ilmasto-opas',
          link: 'https://example.com',
        },
        {
          imageUrl: 'https://source.unsplash.com/collection/8586906/600x300',
          header: 'Ilmastokumppani',
          content: 'Yritysten ja yhteisöjen ilmastokumppanuus',
          link: 'https://example.com',
        },
        {
          imageUrl: 'https://source.unsplash.com/collection/8586906/600x300',
          header: 'Korkeakouluyhteistyö',
          content: 'Kestävä kehitys korkeakouluyhteistyössä',
          link: 'https://example.com',
        },
      ],
    },
  ];

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
        {plan.identifier === 'tampere-ilmasto' && (
          <StreamField
            page={page}
            blocks={mockData}
            color="#ffffff"
          />
        )}
      </div>
    </Layout>
  );
}

export default RootPage;
