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
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import ContentPageHeaderBlock from 'components/contentblocks/ContentPageHeaderBlock';
import SecondaryNavigation from 'components/common/SecondaryNavigation';
import { GetPlanPageGeneralQuery } from 'common/__generated__/graphql';
import ActionAttribute from 'components/common/ActionAttribute';
import CategoryPageContent from 'components/categories/CategoryPageContent';

const templatedCategoryPageFragment = gql`
  fragment TemplatedCategoryPageFragment on CategoryPage {
    layout {
      __typename
      layoutMainTop {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            identifier
          }
        }
        ... on CategoryPageProgressBlock {
          blocks {
            ... on ChoiceBlock {
              value
            }
          }
        }
      }
      layoutMainBottom {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            identifier
          }
        }
        ... on CategoryPageContactFormBlock {
          heading
          description
        }
      }
      layoutAside {
        __typename
        ... on CategoryPageAttributeTypeBlock {
          attributeType {
            identifier
          }
        }
      }
    }
  }
`;

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
        siblings {
          id
          title
          slug
          live
          urlPath
        }
        parent {
          ... on EmptyPage {
            childrenUseSecondaryNavigation
          }
          ... on StaticPage {
            childrenUseSecondaryNavigation
          }
          id
          title
          slug
          urlPath
          children {
            id
            title
            slug
            live
            urlPath
          }
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
        ...TemplatedCategoryPageFragment
        category {
          id
          identifier
          level {
            name
            namePlural
          }
          type {
            id
            hideCategoryIdentifiers
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
            rendition(size: "400x400", crop: false) {
              src
            }
          }
          children {
            ...CategoryListCategory
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
              rendition(size: "400x400", crop: false) {
                src
              }
            }
            categoryPage {
              title
              urlPath
            }
            type {
              id
              hideCategoryIdentifiers
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
  ${templatedCategoryPageFragment}
  ${StreamField.fragments.streamField}
  ${images.fragments.multiUseImage}
  ${ActionAttribute.fragments.attributeWithNestedType}
  ${CategoryListBlock.fragments.category}
`;

type GeneralPlanPage = NonNullable<GetPlanPageGeneralQuery['planPage']>;

type PageHeaderBlockProps = {
  page: GeneralPlanPage;
  color?: string | null;
};

const PageHeaderBlock = ({ color, page }: PageHeaderBlockProps) => {
  switch (page.__typename) {
    case 'CategoryPage': {
      const category = page.category;

      if (!category) {
        throw new Error('Category page without category configured');
      }

      const parentIdentifier = !category.type.hideCategoryIdentifiers
        ? `${category.parent?.identifier}.`
        : '';
      const parentTitle = category.parent?.categoryPage
        ? `${parentIdentifier} ${category.parent?.categoryPage.title}`
        : null;
      const parentUrl = category.parent?.categoryPage?.urlPath || null;
      const headerImage = category.image || category.parent?.image;
      const iconImage = category.iconImage?.rendition?.src;

      return (
        <CategoryPageHeaderBlock
          page={page}
          title={page.title}
          categoryId={category.id}
          layout={page.layout?.layoutMainTop}
          identifier={
            !category.type.hideCategoryIdentifiers
              ? category.identifier
              : undefined
          }
          lead={category.leadParagraph}
          iconImage={iconImage}
          headerImage={headerImage}
          imageAlign={getBgImageAlignment(headerImage)}
          parentTitle={parentTitle}
          parentUrl={parentUrl}
          color={color}
          attributes={category.attributes}
          typeId={category.type.id}
          level={page.category?.level?.name}
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
          altText={headerImage?.altText}
          imageCredit={headerImage?.imageCredit}
        />
      );
    }
  }
};

const Content = ({ page }: { page: GeneralPlanPage }) => {
  // TODO: Resolve shareImageUrl by pagetype
  const { title, headerImage } = page;
  const imageUrl = headerImage?.large.src;
  const theme = useTheme();
  const isCategoryPage = page.__typename === 'CategoryPage';
  const categoryColor =
    isCategoryPage && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.brandLight;

  const hasSecondaryNav = page.parent?.childrenUseSecondaryNavigation ?? false;
  // Restrict the secondary nav to be shown on StaticPages only currently
  const siblings =
    hasSecondaryNav && page.__typename === 'StaticPage'
      ? page?.parent?.children ?? []
      : [];

  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
      />
      <PageHeaderBlock
        page={page}
        color={isCategoryPage ? pageSectionColor : undefined}
      />

      {isCategoryPage ? (
        <CategoryPageContent page={page} pageSectionColor={pageSectionColor} />
      ) : (
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

          {siblings.length > 1 && (
            <SecondaryNavigation
              links={siblings}
              activeLink={page.id}
              title={page?.parent?.title || ''}
            />
          )}

          {page.body && (
            <StreamField
              page={page}
              blocks={page.body}
              color={pageSectionColor}
              hasSidebar={siblings.length > 1}
            />
          )}
        </div>
      )}
    </article>
  );
};

function StaticPage({ slug }: { slug: string[] }) {
  const { t } = useTranslation();
  const path = `/${slug.join('/')}`;
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery<GetPlanPageGeneralQuery>(
    GET_PLAN_PAGE,
    {
      variables: {
        plan: plan.identifier,
        path,
      },
    }
  );
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data || {};

  // Handle legacy overrides
  if (path === '/accessibility' && !(planPage?.body?.length > 0))
    return <AccessibilityPage />;
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
