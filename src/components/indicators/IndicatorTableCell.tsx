import { type DateTimeFormatOptions, useFormatter, useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Badge, Button } from 'reactstrap';
import styled from 'styled-components';

import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
  type IndicatorListPageFragmentFragment,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import { IndicatorLink } from '@/common/links';

import BadgeTooltip from '../common/BadgeTooltip';
import { getIndicatorTranslation } from './IndicatorCard';
import type { IndicatorListIndicator } from './IndicatorList';

const StyledCell = styled.td<{ $numeric?: boolean }>`
  text-align: ${(props) => (props?.$numeric ? 'right' : 'left')};
  line-height: ${(props) => props.theme.lineHeightSm};
  padding: ${(props) => props.theme.spaces.s200};
  a,
  button {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;
    line-height: ${(props) => props.theme.lineHeightMd};
    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

const CategoryBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spaces.s050};
`;

const IndicatorLevelBadge = styled(Badge)<{ $level: string }>`
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${({ theme }) => `${theme.badgePaddingY} ${theme.badgePaddingX}`};
  font-weight: ${(props) => props.theme.badgeFontWeight};

  color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return readableColor(props.theme.actionColor);
      case 'operational':
        return readableColor(props.theme.graphColors.blue070);
      case 'tactical':
        return readableColor(props.theme.graphColors.blue030);
      case 'strategic':
        return readableColor(props.theme.graphColors.blue010);
      default:
        return props.theme.themeColors.black;
    }
  }};
  background-color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.graphColors.blue070;
      case 'tactical':
        return props.theme.graphColors.blue030;
      case 'strategic':
        return props.theme.graphColors.blue010;
      default:
        return '#cccccc';
    }
  }} !important;
`;

const Value = styled.span``;

const Unit = styled.span`
  margin-left: 0.5rem;
  font-size: 80%;
`;

const IndicatorNameCell = (props: {
  indicator: IndicatorListIndicator;
  indent?: number;
  openIndicatorsInModal?: (id: string) => void | null;
}) => {
  const { indicator, indent = 0, openIndicatorsInModal } = props;
  const IndicatorTrigger: React.ReactNode = openIndicatorsInModal ? (
    <Button
      color="link"
      onClick={() => openIndicatorsInModal(indicator.id)}
      style={{ padding: 0, textAlign: 'left' }}
    >
      {indicator.name}
    </Button>
  ) : (
    <IndicatorLink id={indicator.id}>{indicator.name}</IndicatorLink>
  );
  return (
    <StyledCell key="name" style={{ paddingLeft: `${indent * 16}px` }}>
      {IndicatorTrigger}
    </StyledCell>
  );
};

/**
 * Get the value of the indicator based on the value type and whether it is normalized
 * Can retrieve earliest, latest and goal values
 */

const getValue = (
  indicator: IndicatorListIndicator,
  valueType: IndicatorColumnValueType,
  isNormalized: boolean
): number | null => {
  switch (valueType) {
    case IndicatorColumnValueType.Earliest:
      const hasValues = indicator.values && indicator.values.length > 0;
      if (!hasValues) {
        return null;
      }
      return isNormalized
        ? (indicator.values[0]?.normalizedValues?.[0]?.value ?? null)
        : (indicator.values[0]?.value ?? null);
    case IndicatorColumnValueType.Latest:
      const hasLatestValue = indicator.latestValue;
      if (!hasLatestValue) {
        return null;
      }
      return isNormalized
        ? (indicator.latestValue?.normalizedValues?.[0]?.value ?? null)
        : (indicator.latestValue?.value ?? null);
    case IndicatorColumnValueType.Goal:
      const hasGoals = indicator.goals && indicator.goals.length > 0;
      if (!hasGoals) {
        return null;
      }
      const lastGoalIndex = indicator.goals!.length - 1;
      return isNormalized
        ? (indicator.goals![lastGoalIndex]?.normalizedValues?.[0]?.value ?? null)
        : (indicator.goals![lastGoalIndex]?.value ?? null);
    default:
      return null;
  }
};
interface IndicatorValueCellProps {
  indicator: IndicatorListIndicator;
  isNormalized: boolean;
  valueType: IndicatorColumnValueType;
}

const IndicatorValueCell = (props: IndicatorValueCellProps) => {
  const { indicator, isNormalized, valueType } = props;
  const format = useFormatter();

  const value: number | null = getValue(indicator, valueType, isNormalized);
  if (value === null) {
    return <StyledCell $numeric={true}>--</StyledCell>;
  }
  return (
    <StyledCell $numeric={true}>
      <Value>{format.number(value, { maximumFractionDigits: 2 })}</Value>
      <Unit>{indicator.unit.shortName}</Unit>
    </StyledCell>
  );
};

const getCategoryColor = (
  category: IndicatorListIndicator['categories'][number]
): string | undefined => {
  return category.color || category.parent?.color || undefined;
};
interface IndicatorCategoryCellProps {
  indicator: IndicatorListIndicator;
  categoryId: string;
}

const IndicatorCategoryCell = (props: IndicatorCategoryCellProps) => {
  const { indicator, categoryId } = props;
  const categories = indicator.categories.filter((cat) => cat.type.id === categoryId);
  return (
    <StyledCell>
      <CategoryBadges>
        {categories &&
          categories.length > 0 &&
          categories.map((cat) => (
            <BadgeTooltip
              key={cat.id}
              id={cat.id}
              tooltip=""
              content={cat.name}
              size="sm"
              themeColor="neutralLight"
              color={getCategoryColor(cat)}
              isLink={false}
            />
          ))}
      </CategoryBadges>
    </StyledCell>
  );
};

const dateFormatFromResolution = (resolution: IndicatorTimeResolution): DateTimeFormatOptions => {
  switch (resolution) {
    case IndicatorTimeResolution.Day:
      return { day: 'numeric', month: 'numeric', year: 'numeric' };
    case IndicatorTimeResolution.Month:
      return { month: 'numeric', year: 'numeric' };
    case IndicatorTimeResolution.Year:
      return { year: 'numeric' };
    default:
      return { day: 'numeric', month: 'numeric', year: 'numeric' };
  }
};
interface IndicatorListColumnCellProps {
  sourceField: IndicatorDashboardFieldName | null;
  indicator: IndicatorListIndicator;
}
const IndicatorListColumnCell = (props: IndicatorListColumnCellProps) => {
  const { sourceField, indicator } = props;
  const format = useFormatter();
  const t = useTranslations();

  switch (sourceField) {
    case IndicatorDashboardFieldName.Name:
      return <StyledCell>{indicator.name}</StyledCell>;
    case IndicatorDashboardFieldName.Level:
      // TODO: Use action name context
      const indicatorLevelName =
        indicator.level === 'action' ? t('action') : getIndicatorTranslation(indicator.level, t);
      return (
        <StyledCell>
          <IndicatorLevelBadge $level={indicator.level}>{indicatorLevelName}</IndicatorLevelBadge>
        </StyledCell>
      );
    case IndicatorDashboardFieldName.UpdatedAt:
      const timeResolution = indicator.timeResolution;
      const lastUpdated = new Date(indicator.latestValue?.date ?? '');
      const displayDate = indicator.latestValue?.date
        ? format.dateTime(lastUpdated, dateFormatFromResolution(timeResolution))
        : '--';
      return <StyledCell $numeric>{displayDate}</StyledCell>;
    case IndicatorDashboardFieldName.Organization:
      return <StyledCell>{indicator.organization.name}</StyledCell>;
    default:
      return <StyledCell>--</StyledCell>;
  }
};

interface IndicatorTableCellProps {
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number];
  indicator: IndicatorListIndicator;
  openIndicatorsInModal?: (id: string) => void | null;
  indent?: number;
}
const IndicatorTableCell = (props: IndicatorTableCellProps) => {
  const { column, indicator, openIndicatorsInModal, indent } = props;

  switch (column.__typename) {
    case 'IndicatorListColumn':
      if (column.sourceField === IndicatorDashboardFieldName.Name) {
        return (
          <IndicatorNameCell
            indicator={indicator}
            indent={indent}
            openIndicatorsInModal={openIndicatorsInModal}
          />
        );
      }
      return <IndicatorListColumnCell sourceField={column.sourceField} indicator={indicator} />;
    case 'IndicatorValueColumn':
      return (
        <IndicatorValueCell
          indicator={indicator}
          isNormalized={column.isNormalized}
          valueType={column.valueType}
        />
      );
    case 'IndicatorCategoryColumn':
      return <IndicatorCategoryCell indicator={indicator} categoryId={column.categoryType.id} />;
    default:
      return <StyledCell>--</StyledCell>;
  }
  /*
    case IndicatorTableColumnId.TimeResolution:
      return <StyledCell key={columnName}>{indicator.timeResolution}</StyledCell>;

    case IndicatorTableColumnId.Dimensions:
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <StyledCell key={columnName} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </StyledCell>
      );
    case IndicatorTableColumnId.Common:
      return <StyledCell key={columnName}>{indicator.common ? '✅' : '❌'}</StyledCell>;
  } */
};

export default IndicatorTableCell;
