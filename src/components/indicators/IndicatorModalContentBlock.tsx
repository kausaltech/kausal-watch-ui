import { upperFirst } from 'lodash';
import { useFormatter, useTranslations } from 'next-intl';
import styled from 'styled-components';

import {
  type IndicatorCategoryContentBlockFragmentFragment,
  type IndicatorContentBlockFragmentFragment,
  IndicatorDetailsFieldName,
  type IndicatorDetailsQuery,
  type IndicatorValueSummaryContentBlockFragmentFragment,
} from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';

import ActionsTable from '../actions/ActionsTable';
import BadgeTooltip from '../common/BadgeTooltip';
import OrganizationChip from '../common/OrganizationChip';
import RichText from '../common/RichText';
import CausalNavigation from './CausalNavigation';
import IndicatorLevelChip from './IndicatorLevelChip';
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

export const BlockLabel = styled.h2`
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const CategoryBadges = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spaces.s050};
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
  hideLegacyLastUpdated?: boolean;
}

const IndicatorContentBlock = (props: IndicatorContentBlockProps) => {
  const { block, indicator, hideLegacyLastUpdated } = props;
  const plan = usePlan();
  const format = useFormatter();
  const t = useTranslations();
  if (!block.sourceField) return null;
  switch (block.sourceField) {
    case IndicatorDetailsFieldName.Description:
    case IndicatorDetailsFieldName.Name:
      // Using name field to render description for now
      return (
        <ContentBlockWrapper>
          {block.fieldLabel && <BlockLabel>{block.fieldLabel}</BlockLabel>}
          <RichText html={indicator.description || ''} isCollapsible={false} />
        </ContentBlockWrapper>
      );
    case IndicatorDetailsFieldName.GoalDescription:
      return (
        indicator.goalDescription && (
          <ContentBlockWrapper>
            {block.fieldLabel && <BlockLabel>{block.fieldLabel}</BlockLabel>}
            <div>{indicator.goalDescription}</div>
          </ContentBlockWrapper>
        )
      );
    case IndicatorDetailsFieldName.Visualization:
      return (
        <ContentBlockWrapper>
          {block.fieldLabel && <BlockLabel>{block.fieldLabel}</BlockLabel>}
          <IndicatorVisualisation indicatorId={indicator.id} useLegacyGraph={false} />
        </ContentBlockWrapper>
      );
    case IndicatorDetailsFieldName.ConnectedActions:
      return (
        indicator.actions &&
        indicator.actions.length > 0 && (
          <ContentBlockWrapper>
            <BlockLabel>
              {block.fieldLabel || t('indicator-related-actions', getActionTermContext(plan))}
            </BlockLabel>
            <ActionsTable actions={indicator.actions} />
          </ContentBlockWrapper>
        )
      );
    case IndicatorDetailsFieldName.CausalityNav:
      const hasImpacts = indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;
      return (
        hasImpacts && (
          <ContentBlockWrapper>
            <CausalNavigation causes={indicator.relatedCauses} effects={indicator.relatedEffects} />
          </ContentBlockWrapper>
        )
      );
    case IndicatorDetailsFieldName.Level:
      return (
        <ContentBlockWrapper>
          <BlockLabel>{block.fieldLabel || upperFirst(t('level'))}</BlockLabel>
          {indicator.level && <IndicatorLevelChip level={indicator.level} />}
        </ContentBlockWrapper>
      );
    case IndicatorDetailsFieldName.Organization:
      return (
        <ContentBlockWrapper>
          <BlockLabel>{block.fieldLabel || t('organization')}</BlockLabel>
          <OrganizationChip organization={indicator.organization} />
        </ContentBlockWrapper>
      );
    case IndicatorDetailsFieldName.Reference:
      return (
        indicator.reference && (
          <ContentBlockWrapper>
            {block.fieldLabel && <BlockLabel>{block.fieldLabel}</BlockLabel>}
            <RichText html={indicator.reference} />
          </ContentBlockWrapper>
        )
      );
    case IndicatorDetailsFieldName.UpdatedAt:
      if (hideLegacyLastUpdated) return null;
      const updatedAt = new Date(indicator.updatedAt);
      const formattedUpdatedAt = format.dateTime(updatedAt, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        <ContentBlockWrapper>
          {block.fieldLabel || t('updated')} {formattedUpdatedAt}
        </ContentBlockWrapper>
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
  console.log('indicator value summary block', block, indicator);
  const options: ValueSummaryOptions = {
    referenceValue: {
      show: block.showReferenceValue,
      year: block.referenceYear,
      defaultReferenceValue: indicator.referenceValue,
    },
    currentValue: {
      show: block.showCurrentValue,
    },
    goalValue: {
      show: block.showGoalValue,
      defaultGoalYear: block.defaultGoalYear,
    },
    goalGap: {
      show: block.showGoalGap,
    },
    nonQuantifiedGoal: {
      trend: indicator.nonQuantifiedGoal,
      date: indicator.nonQuantifiedGoalDate,
    },
    valueRounding: indicator.valueRounding,
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
  hideLegacyLastUpdated?: boolean;
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
  hideLegacyLastUpdated?: boolean;
}

const IndicatorModalContentBlock = ({
  block,
  indicator,
  hideLegacyLastUpdated,
}: IndicatorModalContentBlockProps) => {
  if (!block || !indicator) return null;

  // console.log('📦 block', block);
  switch (block.__typename) {
    case 'IndicatorContentBlock':
      return (
        <IndicatorContentBlock
          block={block}
          indicator={indicator}
          hideLegacyLastUpdated={hideLegacyLastUpdated}
        />
      );
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
