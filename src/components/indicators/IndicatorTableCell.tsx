import type { IndicatorListIndicator } from './IndicatorList';
import type { IndicatorTableColumn } from './IndicatorListFilteredNew';

const IndicatorTableCell = (props: {
  column: IndicatorTableColumn;
  indicator: IndicatorListIndicator;
}) => {
  const { column, indicator } = props;

  switch (column) {
    case 'name':
      return <td key={column}>{indicator.name}</td>;
    case 'organization':
      return <td key={column}>{indicator.organization.name}</td>;
    case 'latestValue':
      return (
        <td key={column} style={{ textAlign: 'right' }}>
          {indicator.latestValue?.value} {indicator.unit.shortName}
        </td>
      );
    case 'timeResolution':
      return <td key={column}>{indicator.timeResolution}</td>;
    case 'level':
      return <td key={column}>{indicator['level']}</td>;
    case 'dimensions':
      const dimensionsCount = indicator.dimensions?.length || 0;
      return (
        <td key={column} style={{ textAlign: 'right' }}>
          {dimensionsCount}
        </td>
      );
    case 'common':
      return <td key={column}>{indicator.common ? '✅' : '❌'}</td>;
    default:
      return <td key={column}>--</td>;
  }
};

export default IndicatorTableCell;
