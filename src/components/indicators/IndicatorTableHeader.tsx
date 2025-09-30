import type { IndicatorTableColumn } from './IndicatorListFilteredNew';

const numericColumns: IndicatorTableColumn[] = ['latestValue', 'dimensions'];

const IndicatorTableHeader = (props: { column: IndicatorTableColumn }) => {
  const { column } = props;
  return (
    <th key={column} style={{ textAlign: numericColumns.includes(column) ? 'right' : 'left' }}>
      {column}
    </th>
  );
};

export default IndicatorTableHeader;
