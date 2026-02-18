import styled from '@emotion/styled';
import * as Sentry from '@sentry/nextjs';
import type { truncate } from 'fs/promises';
import { type DateTimeFormatOptions, useFormatter, useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Button } from 'reactstrap';


import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
  type IndicatorListPageFragmentFragment,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import { IndicatorLink } from '@/common/links';

import BadgeTooltip from '../common/BadgeTooltip';
import Icon from '../common/Icon';
import { getIndicatorTranslation } from './IndicatorCard';
import type { IndicatorListIndicator } from './IndicatorList';

const DEFAULT_ROUNDING = 2;

const CellContent = styled.div<{ $numeric?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props?.$numeric ? 'right' : 'left')};
  line-height: ${(props) => props.theme.lineHeightSm};

  svg {
    display: inline-block;
  }
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

const TrendIcon = styled(Icon)`
  height: 1.25em;
  width: 1.25em;
  margin-bottom: -0.1em;
  color: ${(props) => props.theme.graphColors.grey040};
`;

const IndicatorLevelBadge = styled.span<{ $level: string }>`
  display: inline-block;
  font-size: 0.75em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
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
  }};
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
  isNormalized: boolean,
  defaultYear: number | null
): { value: number | string | null; year: number | null } => {
  /* 
  If defaultYear is provided we return a value for the year
  so values that are not on column's default year can be highlighted
  */
  switch (valueType) {
    case IndicatorColumnValueType.Earliest:
      const hasValues = indicator.values && indicator.values.length > 0;
      if (!hasValues) {
        return { value: null, year: null };
      }
      return isNormalized
        ? { value: indicator.values[0]?.normalizedValues?.[0]?.value ?? null, year: null }
        : { value: indicator.values[0]?.value ?? null, year: null };
    case IndicatorColumnValueType.Latest:
      if (defaultYear) {
        const latestValue = indicator.values.find((value) =>
          value.date?.startsWith(String(defaultYear))
        );
        if (latestValue) {
          return {
            value: latestValue.value ?? null,
            year: new Date(latestValue.date ?? '').getFullYear(),
          };
        }
      }
      const hasLatestValue = indicator.latestValue;
      if (!hasLatestValue) {
        return { value: null, year: null };
      }
      return isNormalized
        ? {
            value: indicator.latestValue?.normalizedValues?.[0]?.value ?? null,
            year: indicator.latestValue?.date
              ? new Date(indicator.latestValue?.date ?? '').getFullYear()
              : null,
          }
        : {
            value: indicator.latestValue?.value ?? null,
            year: indicator.latestValue?.date
              ? new Date(indicator.latestValue?.date ?? '').getFullYear()
              : null,
          };
    case IndicatorColumnValueType.Goal:
      // Non quantified goal is always shown if selected, 'increase' or 'decrease'
      if (indicator.nonQuantifiedGoal)
        return { value: indicator.nonQuantifiedGoal?.toLowerCase() ?? '', year: null };
      const hasGoals = indicator.goals && indicator.goals.length > 0;
      if (!hasGoals) {
        return { value: null, year: null };
      }
      // If defaultYear is provided we try to return a value for that year
      // TODO: Maybe need to also handle normalized values here
      if (defaultYear) {
        const goal = indicator.goals?.find((goal) => goal?.date?.startsWith(String(defaultYear)));
        if (goal) {
          return { value: goal.value ?? null, year: new Date(goal.date ?? '').getFullYear() };
        }
      }
      // If no value for the default year is found, we return the LAST goal
      // This could also be the NEXT goal, but it's simpler this way
      const lastGoalIndex = indicator.goals!.length - 1;
      return isNormalized
        ? {
            value: indicator.goals![lastGoalIndex]?.normalizedValues?.[0]?.value ?? null,
            year: indicator.goals![lastGoalIndex]?.date
              ? new Date(indicator.goals![lastGoalIndex]?.date ?? '').getFullYear()
              : null,
          }
        : {
            value: indicator.goals![lastGoalIndex]?.value ?? null,
            year: indicator.goals![lastGoalIndex]?.date
              ? new Date(indicator.goals![lastGoalIndex]?.date ?? '').getFullYear()
              : null,
          };
    case IndicatorColumnValueType.Reference:
      if (indicator.referenceValue) {
        return isNormalized
          ? {
              value: indicator.referenceValue?.normalizedValues?.[0]?.value ?? null,
              year: indicator.referenceValue?.date
                ? new Date(indicator.referenceValue?.date ?? '').getFullYear()
                : null,
            }
          : {
              value: indicator.referenceValue?.value ?? null,
              year: indicator.referenceValue?.date
                ? new Date(indicator.referenceValue?.date ?? '').getFullYear()
                : null,
            };
      }
      if (!defaultYear) {
        return { value: null, year: null };
      }
      const referenceValue = indicator.referenceValue
        ? indicator.referenceValue
        : indicator.values.find((value) => value.date?.startsWith(String(defaultYear)));
      return referenceValue
        ? isNormalized
          ? { value: referenceValue.normalizedValues?.[0]?.value ?? null, year: null }
          : { value: referenceValue.value ?? null, year: null }
        : { value: null, year: null };
    default:
      return { value: null, year: null };
  }
};
interface IndicatorValueCellProps {
  indicator: IndicatorListIndicator;
  isNormalized: boolean;
  valueType: IndicatorColumnValueType;
  defaultYear: number | null;
  hideUnit: boolean;
}

const IndicatorValueCell = (props: IndicatorValueCellProps) => {
  const { indicator, isNormalized, valueType, defaultYear, hideUnit } = props;
  const format = useFormatter();
  const t = useTranslations();

  const rounding = indicator.valueRounding ?? DEFAULT_ROUNDING;
  const { value, year } = getValue(indicator, valueType, isNormalized, defaultYear);

  if (value === null) {
    return <CellContent $numeric={true}>--</CellContent>;
  }
  // Non quantified goal, 'increase' or 'decrease'
  if (typeof value === 'string') {
    switch (value) {
      case 'increase':
        return (
          <CellContent $numeric={true}>
            <TrendIcon name="arrow-up" alt={t('indicator-desired-trend-increase')} />
          </CellContent>
        );
      case 'decrease':
        return (
          <CellContent $numeric={true}>
            <TrendIcon name="arrow-down" alt={t('indicator-desired-trend-decrease')} />
          </CellContent>
        );
      default:
        return <CellContent $numeric={true}>{value}</CellContent>;
    }
  }

  let unit = indicator.unit;

  if (isNormalized) {
    if (
      indicator.common == null ||
      indicator.common.normalizations == null ||
      indicator.common.normalizations.length !== 1
    ) {
      Sentry.captureMessage('Unable to find unambigious normalization for indicator.');
    } else {
      unit = indicator.common?.normalizations[0]?.unit;
    }
  }

  const unitName = unit.shortName || unit.name;

  return (
    <CellContent $numeric={true}>
      <Value>{format.number(value, { maximumSignificantDigits: rounding })}</Value>
      {!hideUnit && <Unit>{unitName}</Unit>}
      {defaultYear && year && year !== defaultYear && (
        <>
          <br />
          <Unit>({year.toString()})</Unit>
        </>
      )}
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
  categoryLevel: IndicatorListIndicator['categories'][number]['level'];
}

const IndicatorCategoryCell = (props: IndicatorCategoryCellProps) => {
  const { indicator, categoryId, categoryLevel } = props;
  const categories: IndicatorListIndicator['categories'][number][] = [];
  // In order not to make the query recursive we support only one level of category levels
  // If no category level is provided, show all categories of the given category type
  // If a category level is provided choose between the selected category or its parent category
  // Do not show category if there is no match between category levels
  indicator.categories.forEach((cat) => {
    if (cat.type.id === categoryId) {
      if (!categoryLevel) {
        categories.push(cat);
      } else if (categoryLevel && cat.level?.id === categoryLevel.id) {
        categories.push(cat);
      } else if (categoryLevel && cat.parent?.level?.id === categoryLevel.id) {
        categories.push(cat.parent as IndicatorListIndicator['categories'][number]);
      }
    }
  });

  // Make sure catetgories are unique (same parent category is only shown once)
  const uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);
  return (
    <CellContent>
      <CategoryBadges>
        {uniqueCategories &&
          uniqueCategories.length > 0 &&
          uniqueCategories.map((cat) => (
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
    case IndicatorDashboardFieldName.Unit:
      return (
        <CellContent>
          <Unit>{indicator.unit.shortName || indicator.unit.name}</Unit>
        </CellContent>
      );
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
          defaultYear={column.defaultYear}
          hideUnit={column.hideUnit}
        />
      );
    case 'IndicatorCategoryColumn':
      return (
        <IndicatorCategoryCell
          indicator={indicator}
          categoryId={column.categoryType.id}
          categoryLevel={column?.categoryLevel}
        />
      );
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
