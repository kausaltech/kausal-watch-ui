import React from 'react';

import { Col, ColProps, Container, Row } from 'reactstrap';

import type {
  CategoryPage,
  Page,
  StreamFieldBlock,
  StreamFieldFragmentFragment,
} from '@/common/__generated__/graphql';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ErrorPage } from '@/components/common/ErrorPage';
import RichText from '@/components/common/RichText';
import ActionCategoryFilterCardsBlock from '@/components/contentblocks/ActionCategoryFilterCardsBlock';
import IndicatorGroupBlock from '@/components/contentblocks/IndicatorGroupBlock';
import QuestionAnswerBlock from '@/components/contentblocks/QuestionAnswerBlock';
import ActionListBlock from '@/components/paths/contentblocks/ActionListBlock';
import CategoryListBlock from '@/components/paths/contentblocks/CategoryListBlock';
import CategoryTypeListBlock from '@/components/paths/contentblocks/CategoryTypeListBlock';
import PathsOutcomeBlock from '@/components/paths/contentblocks/PathsOutcomeBlock';
import { STREAM_FIELD_FRAGMENT } from '@/fragments/stream-field.fragment';

type StreamFieldBlockProps = {
  id: string;
  page: Page | CategoryPage;
  block: StreamFieldFragmentFragment;
  columnProps?: ColProps;
};

function StreamFieldBlock(props: StreamFieldBlockProps) {
  const { id, page, block } = props;
  const { __typename } = block;

  switch (__typename) {
    case 'ActionListBlock': {
      const { categoryFilter, groupByCategoryLevel, heading, helpText } = block;
      return (
        <ActionListBlock
          id={id}
          heading={heading}
          lead={helpText}
          groupByLevel={groupByCategoryLevel}
          categoryId={categoryFilter?.id || page?.category.id}
        />
      );
    }
    case 'CategoryListBlock': {
      const { heading, lead, categoryType, category } = block;
      const { category: pageCategory } = page;
      let categories;
      let group: typeof category | undefined = undefined;
      /* If the block specifies a category type, use cats from there.
       * Otherwise, fall back on the containing page's sub-categories.
       * If even that doesn't work, use plan's main categories.
       */
      if (category) {
        categories = category.children;
        group = category.id === pageCategory.id ? pageCategory : undefined;
      } else if (categoryType) {
        categories = categoryType.categories.filter((cat) => cat.parent == null);
      } else if (pageCategory) {
        categories = pageCategory.children;
      }
      return (
        <CategoryListBlock
          id={id}
          categories={categories}
          group={group}
          heading={heading ?? undefined}
          lead={lead}
        />
      );
    }

    case 'CategoryTypeLevelListBlock': {
      const { heading, helpText, categoryLevel, groupByCategoryLevel, categoryBlockType } = block;

      const allPlanCategories = categoryBlockType?.categories;
      const categories = allPlanCategories
        ? allPlanCategories.filter((cat) => cat?.level?.id === categoryLevel?.id)
        : [];
      if (!categories.length) return null;
      return (
        <CategoryTypeListBlock
          id={id}
          groupByLevelId={groupByCategoryLevel?.id}
          categories={categories}
          heading={heading ?? undefined}
          lead={helpText}
        />
      );
    }

    case 'PathsOutcomeBlock': {
      const { heading, helpText, outcomeNodeId } = block;
      return (
        <PathsOutcomeBlock heading={heading} helpText={helpText} outcomenodeId={outcomeNodeId} />
      );
    }
    case 'ActionCategoryFilterCardsBlock': {
      const { cards } = block;
      return <ActionCategoryFilterCardsBlock id={id} cards={cards} />;
    }
    case 'IndicatorGroupBlock': {
      const { indicators, title } = block;

      if (!indicators?.length) {
        return null;
      }

      return (
        <div className="mb-4">
          <IndicatorGroupBlock title={title ?? undefined} indicators={indicators} />
        </div>
      );
    }
    case 'RichTextBlock': {
      const { value } = block;
      // const COLLAPSIBLE_BREAKPOINT = 1200;
      return (
        <Container id={id}>
          <Row>
            <Col
              xl={{ size: 6, offset: 3 }}
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
              className="my-4"
            >
              <RichText html={value} isCollapsible={false} />
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
          heading={heading || ''}
          questions={questions || []}
          hasSidebar={false}
        />
      );
    }
    case 'CharBlock':
    case 'FrontPageHeroBlock':
    case 'LargeImageBlock':
    case 'IndicatorShowcaseBlock':
    case 'ActionHighlightsBlock':
    case 'ActionStatusGraphsBlock':
    case 'IndicatorHighlightsBlock':
    case 'RelatedIndicatorsBlock':
    case 'RelatedPlanListBlock':
    case 'CategoryTreeMapBlock':
    case 'AdaptiveEmbedBlock':
    case 'CartographyVisualisationBlock':
    case 'AccessibilityStatementComplianceStatusBlock':
    case 'AccessibilityStatementContactFormBlock':
    case 'AccessibilityStatementContactInformationBlock':
    case 'AccessibilityStatementPreparationInformationBlock':
    default:
      return (
        <div id={id} hidden>
          sdfdsfsdfsdfsd
        </div>
      );
  }
}

interface StreamFieldProps {
  color: string;
  page: Page | CategoryPage;
  blocks: StreamFieldFragmentFragment[];
  hasSidebar?: boolean;
  columnProps?: ColProps;
}

function StreamField(props: StreamFieldProps) {
  const { page, blocks, columnProps } = props;
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
            columnProps={columnProps}
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
