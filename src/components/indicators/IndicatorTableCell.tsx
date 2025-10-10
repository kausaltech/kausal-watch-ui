import type { IndicatorListIndicator } from './IndicatorList';
import type { IndicatorTableColumn } from './IndicatorListFilteredNew';

const IndicatorTableCell = (props: {
  columnName: IndicatorTableColumn;
  indicator: IndicatorListIndicator;
}) => {
  const { columnName, indicator } = props;

  switch (columnName) {
    case 'name':
      return <td key={columnName}>{indicator.name}</td>;
    case 'organization':
      return <td key={columnName}>{indicator.organization.name}</td>;
    case 'latestValue':
      return (
        <td key={columnName} style={{ textAlign: 'right' }}>
          {indicator.latestValue?.value} {indicator.unit.shortName}
        </td>
      );
    case 'timeResolution':
      return <td key={columnName}>{indicator.timeResolution}</td>;
    case 'level':
      return <td key={columnName}>{indicator['level']}</td>;
    case 'dimensions':
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <td key={columnName} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </td>
      );
    case 'common':
      return <td key={columnName}>{indicator.common ? '✅' : '❌'}</td>;
    default:
      return <td key={columnName}>--</td>;
  }
};

export default IndicatorTableCell;
