import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';
import CategoryPageHeaderBlock from 'components/contentblocks/CategoryPageHeaderBlock';
import ContentPageHeaderBlock from 'components/contentblocks/ContentPageHeaderBlock';

const GET_PLAN_PAGE = gql`
query GetPlanPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on StaticPage {
      headerImage {
        rendition(size: "1200x800") {
          src
        }
      }
      leadParagraph
      body {
        ...StreamFieldFragment
      }
    }
    ... on CategoryPage {
      category {
        id
        children {
          id
          identifier
          name
          categoryPage {
            title
            urlPath
          }
        }
      }
      body {
        ...StreamFieldFragment
      }
    }
    lastPublishedAt
  }
}
${StreamField.fragments.streamField}
`;

function StaticPage({ slug }) {
  const { t } = useTranslation();
  const path = '/' + slug.join('/');
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data;
  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  return (
    <Layout>
      <Content page={planPage} />
    </Layout>
  );
}
StaticPage.getInitialProps = async ({ query }) => ({
  slug: query.slug,
  namespacesRequired: ['common'],
});

const PageHeaderBlock = (page) => {
  const { title, headerImage } = page;
  const imageUrl = headerImage?.rendition.src;

  switch (page.__typename) {
    case 'CategoryPage':
      return (
        <CategoryPageHeaderBlock
          title={title}
          lead={page.leadParagraph}
          headerImage={imageUrl}
        />
      );
    default:
      return (
        <ContentPageHeaderBlock
          title={title}
          lead={page.leadParagraph}
          headerImage={imageUrl}
        />
      );
  }
};

const Content = ({ page }) => {
  const { title, headerImage } = page;
  const imageUrl = headerImage?.rendition.src;

  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
      />
      <PageHeaderBlock {...page} />
      <div className="content-area">
        {page.body && <StreamField page={page} blocks={page.body} />}
      </div>
    </article>
  );
};

export default StaticPage;
