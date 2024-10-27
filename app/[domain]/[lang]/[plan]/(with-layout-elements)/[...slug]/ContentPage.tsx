'use client';

import React from 'react';

import type { GetContentPageQuery } from '@/common/__generated__/graphql';
import { getBgImageAlignment } from '@/common/images';
import CategoryPageContent from '@/components/categories/CategoryPageContent';
import RichText from '@/components/common/RichText';
import SecondaryNavigation from '@/components/common/SecondaryNavigation';
import StreamField from '@/components/common/StreamField';
import CategoryPageHeaderBlock from '@/components/contentblocks/CategoryPageHeaderBlock';
import ContentPageHeaderBlock from '@/components/contentblocks/ContentPageHeaderBlock';
import { Col, Container, Row } from 'reactstrap';
import { useTheme } from 'styled-components';

export type GeneralPlanPage = NonNullable<GetContentPageQuery['planPage']>;

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

export const Content = ({ page }: { page: GeneralPlanPage }) => {
  // TODO: Resolve shareImageUrl by pagetype
  const { title, headerImage } = page;
  const imageUrl = headerImage?.large.src;
  const theme = useTheme();
  const isCategoryPage = page.__typename === 'CategoryPage';
  const categoryColor =
    isCategoryPage && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.themeColors.light;

  const hasSecondaryNav = page.parent?.childrenUseSecondaryNavigation ?? false;
  // Restrict the secondary nav to be shown on StaticPages only currently
  const siblings =
    hasSecondaryNav && page.__typename === 'StaticPage'
      ? (page?.parent?.children ?? [])
      : [];

  return (
    <article>
      <PageHeaderBlock
        page={page}
        color={isCategoryPage ? categoryColor : undefined}
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
