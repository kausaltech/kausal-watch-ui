import { Button } from 'reactstrap';

import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
  type IndicatorListPageFragmentFragment,
} from '@/common/__generated__/graphql';
import { IndicatorLink } from '@/common/links';

import BadgeTooltip from '../common/BadgeTooltip';
import type { IndicatorListIndicator } from './IndicatorList';

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
    <td key="name" style={{ paddingLeft: `${indent * 16}px` }}>
      {IndicatorTrigger}
    </td>
  );
};

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

  /*
    Earliest = 'EARLIEST',
  Goal = 'GOAL',
  Latest = 'LATEST'
  */
  const value: number | null = getValue(indicator, valueType, isNormalized);
  if (value === null) {
    return <td>--</td>;
  }
  return (
    <td>
      {value} {indicator.unit.shortName}
    </td>
  );
};

interface IndicatorCategoryCellProps {
  indicator: IndicatorListIndicator;
  categoryId: string;
}

const IndicatorCategoryCell = (props: IndicatorCategoryCellProps) => {
  const { indicator, categoryId } = props;
  const categories = indicator.categories.filter((cat) => cat.type.id === categoryId);

  return (
    <td>
      {categories &&
        categories.length > 0 &&
        categories.map((cat) => (
          <BadgeTooltip
            key={cat.id}
            id={cat.id}
            tooltip=""
            content={cat.name}
            size="sm"
            color="neutralLight"
            isLink={false}
          />
        ))}
    </td>
  );
};
interface IndicatorListColumnCellProps {
  sourceField: IndicatorDashboardFieldName | null;
  indicator: IndicatorListIndicator;
}
const IndicatorListColumnCell = (props: IndicatorListColumnCellProps) => {
  const { sourceField, indicator } = props;

  switch (sourceField) {
    case IndicatorDashboardFieldName.Name:
      return <td>{indicator.name}</td>;
    case IndicatorDashboardFieldName.Level:
      return <td>{indicator.level}</td>;
    case IndicatorDashboardFieldName.UpdatedAt:
      return <td>{indicator.latestValue?.date}</td>;
    case IndicatorDashboardFieldName.Organization:
      return <td>{indicator.organization.name}</td>;
    default:
      return <td>--</td>;
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
      return <td>--</td>;
  }
  /*
    case IndicatorTableColumnId.TimeResolution:
      return <td key={columnName}>{indicator.timeResolution}</td>;

    case IndicatorTableColumnId.Dimensions:
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <td key={columnName} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </td>
      );
    case IndicatorTableColumnId.Common:
      return <td key={columnName}>{indicator.common ? '✅' : '❌'}</td>;
  } */
};

export default IndicatorTableCell;
