import { useFormatter, useTranslations } from 'next-intl';
import styled from 'styled-components';

import {
  type IndicatorCategoryContentBlockFragmentFragment,
  type IndicatorContentBlockFragmentFragment,
  IndicatorDetailsFieldName,
  type IndicatorDetailsQuery,
  type IndicatorValueSummaryContentBlockFragmentFragment,
} from '@/common/__generated__/graphql';

import BadgeTooltip from '../common/BadgeTooltip';
import RichText from '../common/RichText';
import IndicatorValueSummary, { type ValueSummaryOptions } from './IndicatorValueSummary';
import IndicatorVisualisation from './IndicatorVisualisation';

const CategoryTypeBlock = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${({ theme }) => theme.themeColors.white};
  h3 {
    margin-bottom: ${(props) => props.theme.spaces.s050};
    font-size: ${(props) => props.theme.fontSizeSm};
  }
`;

const ContentBlockWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const CategoryBadges = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const GroupedCategoryContainer = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s150};
  background-color: ${({ theme }) => theme.themeColors.white};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spaces.s150};
`;

const CategoryColumn = styled.div``;

interface IndicatorContentBlockProps {
  block: IndicatorContentBlockFragmentFragment;
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
}

const IndicatorContentBlock = (props: IndicatorContentBlockProps) => {
  const { block, indicator } = props;
  const format = useFormatter();
  const t = useTranslations();
  if (!block.sourceField) return null;
  switch (block.sourceField) {
    case IndicatorDetailsFieldName.Description:
    case IndicatorDetailsFieldName.Name:
      // Using name field to render description for now
      return (
        <ContentBlockWrapper>
          <RichText html={indicator.description || ''} isCollapsible={false} />
        </ContentBlockWrapper>
      );
    case IndicatorDetailsFieldName.Visualization:
      return <IndicatorVisualisation indicatorId={indicator.id} useLegacyGraph={false} />;
    case IndicatorDetailsFieldName.ConnectedActions:
      return (
        <div>
          <hr />
          Connected Actions
          <hr />
        </div>
      );
    case IndicatorDetailsFieldName.CausalityNav:
      return (
        <div>
          <hr />
          Causality Nav
          <hr />
        </div>
      );
    case IndicatorDetailsFieldName.Level:
      return (
        <div>
          <hr />
          Level
          <hr />
        </div>
      );
    case IndicatorDetailsFieldName.Organization:
      return (
        <div>
          <hr />
          Organization
          <hr />
        </div>
      );
    case IndicatorDetailsFieldName.Reference:
      return (
        <div>
          <hr />
          Reference {indicator.reference}
          <hr />
        </div>
      );
    case IndicatorDetailsFieldName.UpdatedAt:
      const updatedAt = new Date(indicator.updatedAt);
      const formattedUpdatedAt = format.dateTime(updatedAt, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        <div>
          <hr />
          {t('updated')} {formattedUpdatedAt}
          <hr />
        </div>
      );
    default:
      console.log('📦 block not supported', block);
      return null;
  }
};

interface IndicatorCategoryBlockProps {
  block: IndicatorCategoryContentBlockFragmentFragment;
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
}

const IndicatorCategoryBlock = (props: IndicatorCategoryBlockProps) => {
  const { block, indicator } = props;
  const categories: NonNullable<IndicatorDetailsQuery['indicator']>['categories'][number][] = [];

  indicator.categories.forEach((cat) => {
    if (cat.type.id === block.categoryType?.id) {
      categories.push(cat);
    }
  });

  return (
    categories &&
    categories.length > 0 && (
      <CategoryTypeBlock>
        <h3>{block.fieldLabel || block.categoryType?.name}</h3>
        <CategoryBadges>
          {categories.map((cat) => (
            <BadgeTooltip
              key={cat.id}
              id={cat.id}
              tooltip=""
              content={cat.name}
              size="sm"
              themeColor="neutralLight"
              color={cat.color || cat.parent?.color || undefined}
              isLink={false}
            />
          ))}
        </CategoryBadges>
      </CategoryTypeBlock>
    )
  );
};

interface IndicatorValueSummaryBlockProps {
  block: IndicatorValueSummaryContentBlockFragmentFragment;
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
}

const IndicatorValueSummaryBlock = (props: IndicatorValueSummaryBlockProps) => {
  const { block, indicator } = props;
  const options: ValueSummaryOptions = {
    referenceValue: {
      show: block.showReferenceValue,
      year: block.referenceYear,
    },
    currentValue: {
      show: block.showCurrentValue,
    },
    goalValue: {
      show: block.showGoalValue,
    },
    goalGap: {
      show: block.showGoalGap,
    },
    nonQuantifiedGoal: {
      trend: indicator.nonQuantifiedGoal,
      date: indicator.nonQuantifiedGoalDate,
    },
  };
  return (
    <ContentBlockWrapper>
      <IndicatorValueSummary
        timeResolution={indicator.timeResolution || ''}
        values={indicator.values || []}
        goals={indicator.goals || []}
        unit={indicator.unit || {}}
        desiredTrend={indicator.desiredTrend || undefined}
        options={options}
      />
    </ContentBlockWrapper>
  );
};

type IndicatorListPage = NonNullable<
  NonNullable<IndicatorDetailsQuery['plan']>['indicatorListPage']
>;

type IndicatorModalContentBlock =
  | NonNullable<IndicatorListPage['detailsAside']>[number]
  | NonNullable<IndicatorListPage['detailsMainTop']>[number]
  | NonNullable<IndicatorListPage['detailsMainBottom']>[number];

interface IndicatorGroupedCategoryBlockProps {
  blocks: IndicatorCategoryContentBlockFragmentFragment[];
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
}

const IndicatorGroupedCategoryBlock = (props: IndicatorGroupedCategoryBlockProps) => {
  const { blocks, indicator } = props;

  return (
    <GroupedCategoryContainer>
      {blocks.map((block) => {
        return (
          <CategoryColumn key={block.id}>
            <IndicatorCategoryBlock key={block.id} block={block} indicator={indicator} />
          </CategoryColumn>
        );
      })}
    </GroupedCategoryContainer>
  );
};

interface IndicatorModalContentBlockProps {
  block: IndicatorModalContentBlock | null;
  indicator: IndicatorDetailsQuery['indicator'] | null;
}

const IndicatorModalContentBlock = ({ block, indicator }: IndicatorModalContentBlockProps) => {
  if (!block || !indicator) return null;

  console.log('📦 block', block);
  switch (block.__typename) {
    case 'IndicatorContentBlock':
      return <IndicatorContentBlock block={block} indicator={indicator} />;
    case 'IndicatorCategoryContentBlock':
      return <IndicatorCategoryBlock block={block} indicator={indicator} />;
    case 'IndicatorValueSummaryContentBlock':
      return <IndicatorValueSummaryBlock block={block} indicator={indicator} />;
  }
};

// Group consecutive IndicatorCategoryContentBlock blocks together
export type GroupedBlock =
  | { type: 'single'; block: IndicatorModalContentBlock }
  | { type: 'grouped'; blocks: IndicatorCategoryContentBlockFragmentFragment[] };

export function groupConsecutiveCategoryBlocks(
  blocks: (IndicatorModalContentBlock | null)[]
): GroupedBlock[] {
  const result: GroupedBlock[] = [];
  let currentGroup: IndicatorCategoryContentBlockFragmentFragment[] | null = null;

  for (const block of blocks) {
    if (!block) continue;

    if (block.__typename === 'IndicatorCategoryContentBlock') {
      if (currentGroup === null) {
        currentGroup = [block];
      } else {
        currentGroup.push(block);
      }
    } else {
      // If we have a group, add it first
      if (currentGroup !== null) {
        result.push({ type: 'grouped', blocks: currentGroup });
        currentGroup = null;
      }
      // Add the non-category block
      result.push({ type: 'single', block });
    }
  }

  // Don't forget to add any remaining group
  if (currentGroup !== null) {
    result.push({ type: 'grouped', blocks: currentGroup });
  }

  return result;
}

export { IndicatorGroupedCategoryBlock };
export default IndicatorModalContentBlock;
