'use client';

import React from 'react';

import { Col, Container, Row } from 'reactstrap';
import { useTheme } from 'styled-components';

import {
  AccessibilityStatementPage,
  ActionListPage,
  CategoryPage,
  CategoryTypePage,
  EmptyPage,
  ImpactGroupPage,
  IndicatorListPage,
  MultiUseImageFragmentFragment,
  PrivacyPolicyPage,
  StaticPage,
} from '@/common/__generated__/graphql';
import { getBgImageAlignment } from '@/common/images';
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
export type GeneralPlanPage = CategoryPage | StaticPage | EmptyPage | PageWithLeadContent;

type PageHeaderBlockProps = {
  page: GeneralPlanPage;
  color?: string | false | null | undefined;
};

const PageHeaderBlock = ({ color, page }: PageHeaderBlockProps) => {
  switch (page.__typename) {
    case 'CategoryPage': {
      const category = page.category;

      if (!category) {
        throw new Error('Category page without category configured');
      }
      const headerImage =
        (category.image as MultiUseImageFragmentFragment | null) ||
        (category.parent?.image as MultiUseImageFragmentFragment | null);
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
};

export const Content = ({ page }: { page: GeneralPlanPage }) => {
  // TODO: Resolve shareImageUrl by pagetype

  const pathsInstance = usePaths();
  const theme = useTheme();
  const isCategoryPage = page.__typename === 'CategoryPage';

  const isPageWithBody =
    page.__typename === 'AccessibilityStatementPage' ||
    page.__typename === 'StaticPage' ||
    page.__typename === 'CategoryPage';

  const isStaticPage = page.__typename === 'StaticPage';
  const categoryColor = isCategoryPage && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.themeColors.light;

  const isParentWithSecondaryNav = (
    parent: GeneralPlanPage['parent']
  ): parent is StaticPage | EmptyPage =>
    (parent as StaticPage | EmptyPage)?.__typename === 'StaticPage' ||
    (parent as StaticPage | EmptyPage)?.__typename === 'EmptyPage';

  const hasSecondaryNav = isParentWithSecondaryNav(page.parent)
    ? (page.parent.childrenUseSecondaryNavigation ?? false)
    : false;

  const isPageWithLeadContent =
    page.__typename === 'AccessibilityStatementPage' ||
    page.__typename === 'ActionListPage' ||
    page.__typename === 'ImpactGroupPage' ||
    page.__typename === 'IndicatorListPage' ||
    page.__typename === 'PrivacyPolicyPage';

  // Restrict the secondary nav to be shown on StaticPages only currently
  const siblings = hasSecondaryNav && isStaticPage ? (page?.parent?.children ?? []) : [];

  if (pathsInstance)
    return (
      <article>
        <PathsPageContent page={page} />
      </article>
    );
  else
    return (
      <article>
        <PageHeaderBlock page={page} color={isCategoryPage ? categoryColor : undefined} />

        {isCategoryPage ? (
          <CategoryPageContent page={page} pageSectionColor={pageSectionColor} />
        ) : (
          <div className="content-area">
            {isPageWithLeadContent && page.leadContent && (
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

            {isPageWithBody && page.body && (
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
