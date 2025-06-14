import React from 'react';

import type { StreamFieldFragmentFragment } from 'common/__generated__/graphql';
import { getBgImageAlignment } from 'common/images';
import RichText from 'components/common/RichText';
import AccessibilityStatementComplianceStatusBlock from 'components/contentblocks/AccessibilityStatementComplianceStatusBlock';
import AccessibilityStatementContactFormBlock from 'components/contentblocks/AccessibilityStatementContactFormBlock';
import AccessibilityStatementContactInformationBlock from 'components/contentblocks/AccessibilityStatementContactInformationBlock';
import AccessibilityStatementPreparationInformationBlock from 'components/contentblocks/AccessibilityStatementPreparationInformationBlock';
import ActionCategoryFilterCardsBlock from 'components/contentblocks/ActionCategoryFilterCardsBlock';
import ActionHighlightsBlock from 'components/contentblocks/ActionHighlightsBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import ActionStatusGraphsBlock from 'components/contentblocks/ActionStatusGraphsBlock';
import CardListBlock from 'components/contentblocks/CardListBlock';
import CartographyVisualisationBlock from 'components/contentblocks/CartographyVisualisationBlock';
import CategoryListBlock from 'components/contentblocks/CategoryListBlock';
import CategoryTreeBlock from 'components/contentblocks/CategoryTreeBlock';
import FrontPageHeroBlock from 'components/contentblocks/FrontPageHeroBlock';
import IndicatorGroupBlock from 'components/contentblocks/IndicatorGroupBlock';
import IndicatorHighlightsBlock from 'components/contentblocks/IndicatorHighlightsBlock';
import IndicatorShowcaseBlock from 'components/contentblocks/IndicatorShowcaseBlock';
import QuestionAnswerBlock from 'components/contentblocks/QuestionAnswerBlock';
import RelatedIndicatorsBlock from 'components/contentblocks/RelatedIndicatorsBlock';
import RelatedPlanListBlock from 'components/contentblocks/RelatedPlanListBlock';
import { ImageCredit } from 'components/contentblocks/ContentPageHeaderBlock';
import DashboardRowBlock from 'components/contentblocks/DashboardRowBlock';
import { useTranslations } from 'next-intl';
import { usePlan } from 'context/plan';
import { Col, ColProps, Container, Row } from 'reactstrap';
import { ColumnProps } from 'reactstrap/types/lib/Col';
import styled, { useTheme } from 'styled-components';

import PathsOutcomeBlock from '@/components/paths/contentblocks/PathsOutcomeBlock';
import { STREAM_FIELD_FRAGMENT } from '@/fragments/stream-field.fragment';

import { ErrorBoundary } from './ErrorBoundary';
import { ErrorPage } from './ErrorPage';

enum EmbedProvider {
  YOUTUBE = 'YouTube',
  PLOTLY = 'Plotly Chart Studio',
  POWERBI = 'PowerBI',
  ARCGIS = 'ArcGIS',
  DEFAULT = 'default',
}

const ResponsiveStyles = styled.div`
  .responsive-object {
    width: 100%;
    text-align: center;
  }

  .responsive-object iframe,
  .responsive-object object,
  .responsive-object embed {
    width: 100%;
  }

  .responsive-object[data-embed-provider='${EmbedProvider.YOUTUBE}'] {
    &.responsive-object-small {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 300px;
      }
    }
    &.responsive-object-medium {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 480px;
      }
    }
    &.responsive-object-large {
      iframe {
        aspect-ratio: 16 / 9;
        max-width: 960px;
      }
    }
  }

  .responsive-object[data-embed-provider='${EmbedProvider.PLOTLY}'] {
    &.responsive-object-small {
      iframe {
        height: 400px;
      }
    }
    &.responsive-object-medium {
      iframe {
        height: 600px;
      }
    }
    &.responsive-object-large {
      iframe {
        height: 800px;
      }
    }
  }

  .responsive-object[data-embed-provider='${EmbedProvider.POWERBI}'] {
    &.responsive-object-small {
      iframe {
        height: 400px;
      }
    }
    &.responsive-object-medium {
      iframe {
        height: 600px;
      }
    }
    &.responsive-object-large {
      iframe {
        height: 800px;
      }
    }
  }

  .responsive-object[data-embed-provider='${EmbedProvider.ARCGIS}'] {
    &.responsive-object-small {
      iframe {
        height: 400px !important;
      }
    }
    &.responsive-object-medium {
      iframe {
        height: 600px !important;
      }
    }
    &.responsive-object-large {
      iframe {
        height: 800px !important;
      }
    }
  }

  .responsive-object[data-embed-provider='${EmbedProvider.DEFAULT}'] {
    &.responsive-object-small {
      iframe {
        height: 400px;
      }
    }
    &.responsive-object-medium {
      iframe {
        height: 600px;
      }
    }
    &.responsive-object-large {
      iframe {
        height: 800px;
      }
    }
  }
`;

type StreamFieldBlockProps = {
  id: string;
  page: any;
  block: StreamFieldFragmentFragment;
  color: string;
  hasSidebar: boolean;
  columnProps?: ColProps;
  previousBlockType?: string;
  nextBlockType?: string;
};

function StreamFieldBlock(props: StreamFieldBlockProps) {
  const {
    id,
    page,
    block,
    color,
    hasSidebar,
    columnProps,
    previousBlockType,
    nextBlockType,
  } = props;
  const { __typename } = block;
  const plan = usePlan();
  const theme = useTheme();
  const t = useTranslations();

  switch (__typename) {
    case 'RichTextBlock': {
      const { value } = block;
      const COLLAPSIBLE_BREAKPOINT = 1200;
      const isCollapsible =
        page.__typename === 'CategoryPage' &&
        value.length > COLLAPSIBLE_BREAKPOINT;
      return (
        <Container id={id}>
          <Row>
            <Col
              xl={{ size: hasSidebar ? 7 : 6, offset: hasSidebar ? 4 : 3 }}
              lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
              md={{ size: 10, offset: 1 }}
              className="my-4"
              {...columnProps}
            >
              <RichText html={value} isCollapsible={isCollapsible} />
            </Col>
          </Row>
        </Container>
      );
    }
    case 'QuestionAnswerBlock': {
      const { heading, questions } = block;

      return (
        <QuestionAnswerBlock
          id={id}
          alignWithContent={
            page.__typename === 'CategoryPage' &&
            theme.settings.leftAlignCategoryPages
          }
          heading={heading}
          questions={questions}
          hasSidebar={hasSidebar}
          columnProps={columnProps}
        />
      );
    }
    case 'CharBlock': {
      const { value } = block;
      return (
        <Container id={id}>
          <Row>
            <Col {...columnProps}>
              <div>{value}</div>
            </Col>
          </Row>
        </Container>
      );
    }
    case 'IndicatorGroupBlock': {
      const { indicators, title } = block;

      if (!indicators?.length) {
        return null;
      }

      return (
        <IndicatorGroupBlock
          title={title ?? undefined}
          indicators={indicators}
        />
      );
    }
    case 'ActionListBlock': {
      const { categoryFilter } = block;
      return (
        <ActionListBlock
          categoryId={categoryFilter?.id || page.category.id}
          color={color}
          heading={block.heading}
          lead={block.helpText}
        />
      );
    }
    case 'CategoryListBlock': {
      const { heading, lead, categoryType, category } = block;
      const { category: pageCategory } = page;
      let categories;

      /* If the block specifies a category type, use cats from there.
       * Otherwise, fall back on the containing page's sub-categories.
       * If even that doesn't work, use plan's main categories.
       */
      if (category) {
        categories = category.children;
      } else if (categoryType) {
        categories = categoryType.categories.filter(
          (cat) => cat.parent == null
        );
      } else if (pageCategory) {
        categories = pageCategory.children;
      }
      const fallbackImage = pageCategory?.image || plan.image;
      return (
        <CategoryListBlock
          id={id}
          categories={categories}
          color={color}
          fallbackImage={fallbackImage}
          heading={heading ?? undefined}
          lead={lead}
        />
      );
    }
    case 'FrontPageHeroBlock': {
      const { layout, image, heading, lead } = block;
      // TODO: Typecheck layout to be either 'small_image' or 'big_image'
      return (
        <FrontPageHeroBlock
          id={id}
          layout={layout}
          image={image}
          imageAlign={getBgImageAlignment(image)}
          heading={heading}
          lead={lead}
          altText={image?.altText}
          imageCredit={image?.imageCredit}
        />
      );
    }
    case 'LargeImageBlock': {
      /*
       * LargeImageBlock can have two widths:
       * maximum: image is full container size
       * fit_to_column: image is limited to text block width
       * Image keeps it original ratio and doesn't crop
       */

      const getColSize = (breakpoint) => {
        if (block.width === 'maximum') return {};
        switch (breakpoint) {
          case 'xl':
            return { size: hasSidebar ? 7 : 6, offset: hasSidebar ? 4 : 3 };
          case 'lg':
            return { size: 8, offset: hasSidebar ? 4 : 2 };
          case 'md':
          default:
            return { size: 10, offset: 1 };
        }
      };

      return (
        <Container id={id}>
          <Row>
            <Col
              xl={getColSize('xl')}
              lg={getColSize('lg')}
              md={getColSize('md')}
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                <img
                  src={block.image?.renditionUncropped?.src}
                  alt={block.image?.altText}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginBottom: theme.spaces.s600,
                  }}
                />
                {block.image?.imageCredit && (
                  <ImageCredit>
                    {`${t('image-credit')}: ${block.image.imageCredit}`}
                  </ImageCredit>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
    case 'IndicatorShowcaseBlock': {
      const { indicator, title, body } = block;
      return (
        <IndicatorShowcaseBlock
          id={id}
          indicator={indicator}
          title={title}
          body={body}
        />
      );
    }
    case 'CardListBlock': {
      const { cards, lead, heading } = block;
      return (
        <CardListBlock id={id} cards={cards} lead={lead} heading={heading} />
      );
    }
    case 'ActionHighlightsBlock': {
      return <ActionHighlightsBlock id={id} />;
    }
    case 'ActionStatusGraphsBlock': {
      return <ActionStatusGraphsBlock id={id} />;
    }
    case 'IndicatorHighlightsBlock': {
      return <IndicatorHighlightsBlock id={id} />;
    }
    case 'RelatedIndicatorsBlock': {
      return (
        <RelatedIndicatorsBlock
          id={id}
          indicators={page?.category?.indicators}
        />
      );
    }
    case 'RelatedPlanListBlock': {
      return <RelatedPlanListBlock id={id} />;
    }
    case 'ActionCategoryFilterCardsBlock': {
      const { cards } = block;
      return <ActionCategoryFilterCardsBlock id={id} cards={cards} />;
    }
    case 'CategoryTreeMapBlock': {
      return <CategoryTreeBlock {...block} id={id} hasSidebar={hasSidebar} />;
    }
    case 'AdaptiveEmbedBlock': {
      const fullWidth = block.fullWidth || false;
      const html = block.embed?.html;

      function getColSize(defaultSize: ColumnProps): ColumnProps {
        if (fullWidth) {
          return hasSidebar ? { size: 11, offset: 1 } : { size: 12, offset: 0 };
        }

        return defaultSize;
      }

      return (
        <Container id={id}>
          <Row>
            <Col
              xl={getColSize({
                size: hasSidebar ? 7 : 6,
                offset: hasSidebar ? 4 : 3,
              })}
              lg={getColSize({ size: 8, offset: hasSidebar ? 4 : 2 })}
              md={getColSize({ size: 10, offset: 1 })}
              className="my-4"
              {...columnProps}
            >
              {!!html && (
                <ResponsiveStyles dangerouslySetInnerHTML={{ __html: html }} />
              )}
            </Col>
          </Row>
        </Container>
      );
    }
    case 'CartographyVisualisationBlock': {
      const { account, style, styleOverrides } = block;
      const accessToken = account?.publicAccessToken;
      return (
        <CartographyVisualisationBlock
          id={id}
          styleUrl={style}
          accessToken={accessToken}
          styleOverrides={styleOverrides}
          hasSidebar={hasSidebar}
        />
      );
    }
    case 'AccessibilityStatementComplianceStatusBlock': {
      return <AccessibilityStatementComplianceStatusBlock {...block} id={id} />;
    }
    case 'AccessibilityStatementContactFormBlock': {
      return <AccessibilityStatementContactFormBlock {...block} id={id} />;
    }
    case 'AccessibilityStatementContactInformationBlock': {
      const { blocks } = block;
      return (
        <AccessibilityStatementContactInformationBlock
          id={id}
          content={blocks}
        />
      );
    }
    case 'AccessibilityStatementPreparationInformationBlock': {
      return (
        <AccessibilityStatementPreparationInformationBlock {...block} id={id} />
      );
    }
    case 'PathsOutcomeBlock': {
      const { heading, helpText, outcomeNodeId } = block;
      return (
        <PathsOutcomeBlock
          heading={heading}
          helpText={helpText}
          outcomenodeId={outcomeNodeId}
        />
      );
    }
    case 'DashboardRowBlock': {
      return (
        <DashboardRowBlock
          {...block}
          id={id}
          topMargin={previousBlockType !== 'DashboardRowBlock'}
          bottomMargin={nextBlockType !== 'DashboardRowBlock'}
        />
      );
    }
    default:
      return <div id={id}>{`Component for ${__typename} does not exist`}</div>;
  }
}

interface StreamFieldProps {
  color: string;
  page: any;
  blocks: any;
  hasSidebar?: boolean;
  columnProps?: ColProps;
}

function StreamField(props: StreamFieldProps) {
  const { page, blocks, color, hasSidebar = false, columnProps } = props;

  return (
    <div className={`custom-${page.slug}`}>
      {blocks.map((block, index) => (
        <ErrorBoundary
          key={block.id}
          fallback={<ErrorPage type="block" />}
          errorExtras={{
            type: 'StreamFieldBlock',
            block: JSON.stringify(block),
          }}
        >
          <StreamFieldBlock
            id={`section-${index + 1}`}
            block={block}
            page={page}
            color={color}
            hasSidebar={hasSidebar}
            columnProps={columnProps}
            previousBlockType={blocks[index - 1]?.__typename}
            nextBlockType={blocks[index + 1]?.__typename}
          />
        </ErrorBoundary>
      ))}
    </div>
  );
}

StreamField.fragments = {
  streamField: STREAM_FIELD_FRAGMENT,
};

export default StreamField;
