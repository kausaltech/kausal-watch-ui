import BadgeTooltip from '../common/BadgeTooltip';
import type { IndicatorListIndicator } from './IndicatorList';
import { IndicatorTableColumnId } from './indicatorUtils';

const IndicatorTableCell = (props: {
  columnName: IndicatorTableColumnId;
  columnLabel: string;
  indicator: IndicatorListIndicator;
  categoryTypeId?: string;
}) => {
  const { columnName, indicator, categoryTypeId } = props;

  switch (columnName) {
    case IndicatorTableColumnId.Name:
      return <td key={columnName}>{indicator.name}</td>;
    case IndicatorTableColumnId.Organization:
      return <td key={columnName}>{indicator.organization.name}</td>;
    case IndicatorTableColumnId.LatestValue:
      return (
        <td key={columnName} style={{ textAlign: 'right' }}>
          {indicator.latestValue?.value} {indicator.unit.shortName}
        </td>
      );
    case IndicatorTableColumnId.TimeResolution:
      return <td key={columnName}>{indicator.timeResolution}</td>;
    case IndicatorTableColumnId.Level:
      return <td key={columnName}>{indicator['level']}</td>;
    case IndicatorTableColumnId.Dimensions:
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <td key={columnName} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </td>
      );
    case IndicatorTableColumnId.Common:
      return <td key={columnName}>{indicator.common ? '✅' : '❌'}</td>;
    case IndicatorTableColumnId.Categories:
      const categories = indicator.categories.filter((cat) => cat.type.id === categoryTypeId);
      //const categories = indicator.categories;
      return categories ? (
        <td key={columnName}>
          {categories.length > 0 &&
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
      ) : (
        <td key={columnName}>--</td>
      );
    default:
      return <td key={columnName}>--</td>;
  }
};

export default IndicatorTableCell;
