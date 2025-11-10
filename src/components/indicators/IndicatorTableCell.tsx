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

const CellContent = styled.div<{ $numeric?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props?.$numeric ? 'right' : 'left')};
  line-height: ${(props) => props.theme.lineHeightSm};

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

const Value = styled.span`
  white-space: nowrap;
`;

const Unit = styled.span`
  margin-left: ${({ theme }) => theme.spaces.s025};
  white-space: nowrap;
  font-size: 80%;
`;

const IndicatorNameCell = (props: {
  indicator: IndicatorListIndicator;
  openIndicatorsInModal?: (id: string) => void | null;
}) => {
  const { indicator, openIndicatorsInModal } = props;
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
  return <CellContent key="name">{IndicatorTrigger}</CellContent>;
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
    return <CellContent $numeric={true}>--</CellContent>;
  }
  return (
    <CellContent $numeric={true}>
      <Value>{format.number(value, { maximumFractionDigits: 2 })}</Value>
      <Unit>{indicator.unit.shortName}</Unit>
    </CellContent>
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
    <CellContent>
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
    </CellContent>
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
      return <CellContent>{indicator.name}</CellContent>;
    case IndicatorDashboardFieldName.Level:
      // TODO: Use action name context
      const indicatorLevelName =
        indicator.level === 'action' ? t('action') : getIndicatorTranslation(indicator.level, t);
      return (
        <CellContent>
          <IndicatorLevelBadge $level={indicator.level}>{indicatorLevelName}</IndicatorLevelBadge>
        </CellContent>
      );
    case IndicatorDashboardFieldName.UpdatedAt:
      const timeResolution = indicator.timeResolution;
      const lastUpdated = new Date(indicator.latestValue?.date ?? '');
      const displayDate = indicator.latestValue?.date
        ? format.dateTime(lastUpdated, dateFormatFromResolution(timeResolution))
        : '--';
      return <CellContent $numeric>{displayDate}</CellContent>;
    case IndicatorDashboardFieldName.Organization:
      return <CellContent>{indicator.organization.name}</CellContent>;
    default:
      return <CellContent>--</CellContent>;
  }
};

interface IndicatorTableCellProps {
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number];
  indicator: IndicatorListIndicator;
  openIndicatorsInModal?: (id: string) => void | null;
}
const IndicatorTableCell = (props: IndicatorTableCellProps) => {
  const { column, indicator, openIndicatorsInModal } = props;

  switch (column.__typename) {
    case 'IndicatorListColumn':
      if (column.sourceField === IndicatorDashboardFieldName.Name) {
        return (
          <IndicatorNameCell indicator={indicator} openIndicatorsInModal={openIndicatorsInModal} />
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
      return <CellContent>--</CellContent>;
  }
  /*
    case IndicatorTableColumnId.TimeResolution:
      return <CellContent key={columnName}>{indicator.timeResolution}</CellContent>;

    case IndicatorTableColumnId.Dimensions:
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <CellContent key={columnName} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </CellContent>
      );
    case IndicatorTableColumnId.Common:
      return <CellContent key={columnName}>{indicator.common ? '✅' : '❌'}</CellContent>;
  } */
};

export default IndicatorTableCell;
