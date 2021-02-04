import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import { ThemeContext } from 'styled-components';
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
        identifier
        imageUrl
        shortDescription
        color
        type {
          name
        }
        children {
          id
          identifier
          name
          imageUrl
          color
          categoryPage {
            title
            urlPath
          }
        }
        parent {
          id
          identifier
          imageUrl
          color
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

const PageHeaderBlock = (props) => {
  const { color, page } = props;

  switch (page.__typename) {
    case 'CategoryPage': {
      const parentTitle = page.category.parent?.categoryPage.title || page.category.type.name;
      const parentUrl = page.category.parent?.categoryPage.urlPath || '/';
      return (
        <CategoryPageHeaderBlock
          title={page.title}
          identifier={page.category.identifier}
          lead={page.category.shortDescription}
          headerImage={page.category.imageUrl || page.category?.parent.imageUrl }
          parentTitle={parentTitle}
          parentUrl={parentUrl}
          color={color}
        />
      );
    }
    default: {
      const { headerImage } = page;
      return (
        <ContentPageHeaderBlock
          title={page.title}
          lead={page.leadParagraph}
          headerImage={headerImage?.rendition.src}
        />
      );
    }
  }
};

const Content = ({ page }) => {
  // TODO: Resolve shareImageUrl by pagetype
  const { title, headerImage } = page;
  const imageUrl = headerImage?.rendition.src;

  const theme = useContext(ThemeContext);
  const pageSectionColor = page.category?.color || page.category?.parent?.color || theme.neutralDark;

  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
      />
      <PageHeaderBlock page={page} color={pageSectionColor} />
      <div className="content-area">
        {page.body && <StreamField page={page} blocks={page.body} color={pageSectionColor} />}
      </div>
    </article>
  );
};

export default StaticPage;
