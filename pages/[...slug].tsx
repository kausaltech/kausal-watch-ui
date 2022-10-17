import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import { Container, Row, Col } from 'reactstrap';
import PlanContext from 'context/plan';
import { useTheme } from 'common/theme';
import RichText from 'components/common/RichText';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';
import AccessibilityPage from 'pages/accessibility-legacy';
import images, { getBgImageAlignment } from 'common/images';
import CategoryPageHeaderBlock from 'components/contentblocks/CategoryPageHeaderBlock';
import ContentPageHeaderBlock from 'components/contentblocks/ContentPageHeaderBlock';
import AttributesBlock from 'components/common/AttributesBlock';
import { GetPlanPageGeneralQuery } from 'common/__generated__/graphql';


const GET_PLAN_PAGE = gql`
query GetPlanPageGeneral($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on StaticPage {
      headerImage {
        id
        ...MultiUseImageFragment
      }
      leadParagraph
      body {
        ...StreamFieldFragment
      }
    }
    ... on AccessibilityStatementPage {
      body {
        ...StreamFieldFragment
      }
    }
    ... on PrivacyPolicyPage {
      leadContent
    }
    ... on CategoryPage {
      category {
        id
        identifier
        level {
          name
          namePlural
        }
        type {
          id
        }
        image {
          id
          ...MultiUseImageFragment
        }
        indicators {
          id
        }
        leadParagraph
        color
        iconSvgUrl
        iconImage {
          rendition(size:"400x400", crop:false) {
            src
          }
        }
        children {
          id
          identifier
          name
          leadParagraph
          level {
            name
            namePlural
          }
          image {
            id
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
          level {
            name
            namePlural
          }
          image {
            id
            ...MultiUseImageFragment
          }
          color
          iconSvgUrl
          iconImage {
            rendition(size:"400x400", crop:false) {
              src
            }
          }
          categoryPage {
            title
            urlPath
          }
        }
        attributes {
          ...AttributesBlockAttributeWithNestedType
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
${AttributesBlock.fragments.attributeWithNestedType}
`;

type GeneralPlanPage = NonNullable<GetPlanPageGeneralQuery['planPage']>;

type PageHeaderBlockProps = {
  page: GeneralPlanPage,
  color?: string|null,
}
const PageHeaderBlock = (props: PageHeaderBlockProps) => {
  const { color, page } = props;
  const theme = useTheme();

  switch (page.__typename) {
    case 'CategoryPage': {
      const category = page.category;
      if (!category) {
        throw new Error("Category page without category configured");
      }
      const parentIdentifier = theme.settings.categories.showIdentifiers
        ? `${category.parent?.identifier}.` : '';
      const parentTitle = category.parent?.categoryPage
        ? `${parentIdentifier} ${category.parent?.categoryPage.title}`
        : category.level?.namePlural;
      const parentUrl = category.parent?.categoryPage?.urlPath || '/';
      const headerImage = category.image || category.parent?.image;
      const iconImage = category.iconImage?.rendition?.src;
      return (
        <CategoryPageHeaderBlock
          title={page.title}
          categoryId={category.id}
          identifier={theme.settings.categories.showIdentifiers ? category.identifier : undefined}
          lead={category.leadParagraph}
          iconImage={iconImage}
          headerImage={headerImage?.large?.src}
          imageAlign={getBgImageAlignment(headerImage)}
          parentTitle={parentTitle}
          parentUrl={parentUrl}
          color={color}
          attributes={category.attributes}
          typeId={category.type.id}
          level={category.parent?.categoryPage ? page.category?.level?.name : null}
        />
      );
    }
    default: {
      const { headerImage } = page;
      return (
        <ContentPageHeaderBlock
          title={page.title}
          lead={page.leadParagraph}
          headerImage={headerImage?.large.src}
          imageAlign={getBgImageAlignment(headerImage)}
        />
      );
    }
  }
};

const Content = ({ page }:{ page: GeneralPlanPage}) => {
  // TODO: Resolve shareImageUrl by pagetype
  const { title, headerImage } = page;
  const imageUrl = headerImage?.large.src;

  const theme = useTheme();
  const categoryColor = (page.__typename === 'CategoryPage') && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.brandLight;
  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
      />
      <PageHeaderBlock page={page} color={pageSectionColor} />
      <div className="content-area">
        {page.leadContent && (
          <Container className="my-5">
            <Row>
              <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                <RichText html={page.leadContent} />
              </Col>
            </Row>
          </Container>
        )}
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


function StaticPage({ slug }: { slug: string[] }) {
  const { t } = useTranslation();
  const path = `/${slug.join('/')}`;
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery<GetPlanPageGeneralQuery>(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data || {};

  // Handle legacy overrides
  if (path === '/accessibility' && !(planPage?.body?.length > 0)) return <AccessibilityPage />
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
  namespacesRequired: ['common', 'action'],
});

export default StaticPage;
