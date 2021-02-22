import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import { ThemeContext } from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';
import images, { getBgImageAlignment } from 'common/images';
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
        ...MultiUseImageFragment
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
        type {
          name
        }
        image {
          ...MultiUseImageFragment
        }
        shortDescription
        color
        type {
          name
        }
        children {
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
        }
        parent {
          id
          identifier
          name
          image {
            ...MultiUseImageFragment
          }
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
${images.fragments.multiUseImage}
`;

function StaticPage({ slug }) {
  const { t } = useTranslation();
  const path = `/${slug.join('/')}`;
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
      const parentTitle = page.category.parent?.categoryPage
        ? `${page.category.parent?.identifier}. ${page.category.parent?.categoryPage.title}`
        : page.category.type.name;
      const parentUrl = page.category.parent?.categoryPage.urlPath || '/';
      const headerImage = page.category.image || page.category.parent?.image;

      // Mock category metadata to Tampere second level categories
      const metadata = page.category.parent ? [
        {
          __typename: 'CategoryMetadataChoice',
          id: '2',
          key: 'Päästövähennys',
          keyIdentifier: 'emission_reduction',
          value: 'Small',
          valueIdentifier: 's',
        },
        {
          __typename: 'CategoryMetadataChoice',
          id: '2',
          key: 'Kustannusarvio',
          keyIdentifier: 'cost_estimate',
          value: 'Small',
          valueIdentifier: 's',
        },
        {
          __typename: 'CategoryMetadataRichText',
          key: 'Other benefits',
          keyIdentifier: 'other_benefits',
          value: '<ul><li>Monimuotoisen kaupunkiympäristön edistäminen</li><li>Täydennysrakentamisen mahdollistaminen</li><li>Palvelujen ja joukkoliikenteen kannattavuuden vahvistaminen</li></ul>',
          id: '1',
          text: 'foo',
        },
      ] : undefined;
      return (
        <CategoryPageHeaderBlock
          title={page.title}
          identifier={page.category.identifier}
          lead={page.category.shortDescription}
          headerImage={headerImage.large.src}
          imageAlign={getBgImageAlignment(headerImage)}
          parentTitle={parentTitle}
          parentUrl={parentUrl}
          color={color}
          metadata={metadata}
        />
      );
    }
    default: {
      const { headerImage } = page;
      return (
        <ContentPageHeaderBlock
          title={page.title}
          lead={page.leadParagraph}
          headerImage={headerImage && headerImage.large.src}
          imageAlign={getBgImageAlignment(headerImage)}
        />
      );
    }
  }
};

const Content = ({ page }) => {
  // TODO: Resolve shareImageUrl by pagetype
  const { title, headerImage } = page;
  const imageUrl = headerImage?.large.src;

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
        {page.body && (
          <StreamField
            page={page}
            blocks={page.body}
            color={pageSectionColor}
          />
        )}
      </div>
    </article>
  );
};

export default StaticPage;
