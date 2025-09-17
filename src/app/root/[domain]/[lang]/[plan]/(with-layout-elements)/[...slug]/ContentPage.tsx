'use client';

import React from 'react';

import { Col, Container, Row } from 'reactstrap';
import { useTheme } from 'styled-components';

import type {
  GetContentPageQuery,
  MultiUseImageFragmentFragment,
} from '@/common/__generated__/graphql';
import { getBgImageAlignment } from '@/common/images';
import { typenameMatches } from '@/common/utils';
import CategoryPageContent from '@/components/categories/CategoryPageContent';
import RichText from '@/components/common/RichText';
import SecondaryNavigation from '@/components/common/SecondaryNavigation';
import StreamField from '@/components/common/StreamField';
import CategoryPageHeaderBlock from '@/components/contentblocks/CategoryPageHeaderBlock';
import ContentPageHeaderBlock from '@/components/contentblocks/ContentPageHeaderBlock';
import PathsPageContent from '@/components/paths/PathsPageContent';
import { usePaths } from '@/context/paths/paths';

export type PageWithLeadContent =
  | AccessibilityStatementPage
  | ActionListPage
  | ImpactGroupPage
  | IndicatorListPage
  | PrivacyPolicyPage;
export type PageWithBody =
  | AccessibilityStatementPage
  | StaticPage
  | CategoryPage
  | CategoryTypePage;

export type GeneralPlanPage = NonNullable<GetContentPageQuery['planPage']>;

export type StaticPage = GeneralPlanPage & {
  __typename: 'StaticPage';
};

export type EmptyPage = GeneralPlanPage & {
  __typename: 'EmptyPage';
};

export type CategoryPage = GeneralPlanPage & {
  __typename: 'CategoryPage';
};

export type AccessibilityStatementPage = GeneralPlanPage & {
  __typename: 'AccessibilityStatementPage';
};

export type ActionListPage = GeneralPlanPage & {
  __typename: 'ActionListPage';
};

export type ImpactGroupPage = GeneralPlanPage & {
  __typename: 'ImpactGroupPage';
};

export type PrivacyPolicyPage = GeneralPlanPage & {
  __typename: 'PrivacyPolicyPage';
};

export type CategoryTypePage = GeneralPlanPage & {
  __typename: 'CategoryTypePage';
};

export type IndicatorListPage = GeneralPlanPage & {
  __typename: 'IndicatorListPage';
};

type PageHeaderBlockProps = {
  page:
    | AccessibilityStatementPage
    | CategoryPage
    | ActionListPage
    | ImpactGroupPage
    | IndicatorListPage
    | StaticPage;
  color?: string | false | null | undefined;
};

function PageHeaderBlock({ color, page }: PageHeaderBlockProps) {
  switch (page.__typename) {
    case 'CategoryPage': {
      const category = page.category;

      if (!category) {
        throw new Error('Category page without category configured');
      }
      const headerImage =
        (category.image satisfies MultiUseImageFragmentFragment | null) ||
        ((category.parent?.image ?? null) satisfies MultiUseImageFragmentFragment | null);
      const iconImage = category.iconImage?.rendition?.src;

      return (
        <CategoryPageHeaderBlock
          page={page}
          title={page.title}
          categoryId={category.id}
          layout={page.layout?.layoutMainTop}
          identifier={!category.type.hideCategoryIdentifiers ? category.identifier : undefined}
          lead={category.leadParagraph}
          iconImage={iconImage}
          headerImage={headerImage}
          imageAlign={getBgImageAlignment(headerImage)}
          color={color}
          attributes={category.attributes}
          typeId={category.type.id}
          level={page.category?.level?.name}
        />
      );
    }
    case 'StaticPage': {
      const { headerImage } = page as {
        headerImage: MultiUseImageFragmentFragment | null;
      };

      return (
        <ContentPageHeaderBlock
          title={page.title}
          lead={page.leadParagraph}
          headerImage={headerImage?.large?.src}
          imageAlign={getBgImageAlignment(headerImage)}
          altText={headerImage?.altText}
          imageCredit={headerImage?.imageCredit}
        />
      );
    }
  }
}

export default function ContentPage({ page }: { page: GeneralPlanPage }) {
  // TODO: Resolve shareImageUrl by pagetype

  const pathsInstance = usePaths();
  const theme = useTheme();
  const isCategoryPage = page.__typename === 'CategoryPage';

  const isPageWithBody = typenameMatches(
    page,
    'AccessibilityStatementPage',
    'StaticPage',
    'CategoryPage'
  );

  const categoryColor = isCategoryPage && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.themeColors.light;

  const secondaryNavParent =
    typenameMatches(page, 'StaticPage') &&
    page.parent &&
    (typenameMatches(page.parent, 'StaticPage') || typenameMatches(page.parent, 'EmptyPage')) &&
    page.parent.childrenUseSecondaryNavigation
      ? page.parent
      : null;
  const isPageWithLeadContent = typenameMatches(
    page,
    'AccessibilityStatementPage',
    'ActionListPage',
    'ImpactGroupPage',
    'IndicatorListPage',
    'PrivacyPolicyPage'
  );

  // Restrict the secondary nav to be shown on StaticPages only currently
  const siblings = secondaryNavParent
    ? typenameMatches(secondaryNavParent, 'StaticPage')
      ? (secondaryNavParent.children ?? [])
      : []
    : [];

  if (pathsInstance)
    return (
      <article>
        <PathsPageContent page={page} />
      </article>
    );

  return (
    <article>
      {typenameMatches(page, 'CategoryPage', 'StaticPage') ? (
        <PageHeaderBlock page={page} color={isCategoryPage ? categoryColor : undefined} />
      ) : null}

      {isCategoryPage ? (
        <CategoryPageContent page={page} pageSectionColor={pageSectionColor} />
      ) : (
        <div className="content-area">
          {isPageWithLeadContent && 'leadContent' in page && page.leadContent && (
            <Container className="my-5">
              <Row>
                <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <RichText html={page.leadContent} />
                </Col>
              </Row>
            </Container>
          )}

          {siblings.length > 1 && secondaryNavParent ? (
            <SecondaryNavigation
              links={siblings}
              activeLink={page.id}
              title={secondaryNavParent.title || ''}
            />
          ) : null}

          {isPageWithBody && page.body && (
            <StreamField page={page} blocks={page.body} hasSidebar={siblings.length > 1} />
          )}
        </div>
      )}
    </article>
  );
}
