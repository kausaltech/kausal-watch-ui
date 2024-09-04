import React from 'react';

import type { StreamFieldFragmentFragment } from 'common/__generated__/graphql';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { ErrorPage } from 'components/common/ErrorPage';
import ActionCategoryFilterCardsBlock from 'components/contentblocks/ActionCategoryFilterCardsBlock';
import ActionListBlock from 'components/contentblocks/ActionListBlock';
import CategoryListBlock from 'components/paths/contentblocks/CategoryListBlock';
import { usePlan } from 'context/plan';
import { ColProps } from 'reactstrap';

import { STREAM_FIELD_FRAGMENT } from '@/fragments/stream-field.fragment';

type StreamFieldBlockProps = {
  id: string;
  page: any;
  block: StreamFieldFragmentFragment;
  columnProps?: ColProps;
};

function StreamFieldBlock(props: StreamFieldBlockProps) {
  const { id, page, block } = props;
  const { __typename } = block;
  const plan = usePlan();

  switch (__typename) {
    case 'ActionListBlock': {
      const { categoryFilter } = block;
      return (
        <ActionListBlock categoryId={categoryFilter?.id || page.category.id} />
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
      console.log('CategoryListBlock', block);
      return (
        <CategoryListBlock
          id={id}
          categories={categories}
          heading={heading ?? undefined}
          lead={lead}
        />
      );
    }

    case 'ActionCategoryFilterCardsBlock': {
      const { cards } = block;
      return <ActionCategoryFilterCardsBlock id={id} cards={cards} />;
    }
    case 'RichTextBlock':
    case 'QuestionAnswerBlock':
    case 'CharBlock':
    case 'IndicatorGroupBlock':
    case 'FrontPageHeroBlock':
    case 'LargeImageBlock':
    case 'IndicatorShowcaseBlock':
    case 'CardListBlock':
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
