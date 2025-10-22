import { IndicatorTableColumnId } from './indicatorUtils';

const numericColumns: IndicatorTableColumnId[] = [
  IndicatorTableColumnId.LatestValue,
  IndicatorTableColumnId.Dimensions,
];

const IndicatorTableHeader = (props: { columnId: IndicatorTableColumnId; columnLabel: string }) => {
  const { columnId, columnLabel } = props;
  return (
    <th key={columnId} style={{ textAlign: numericColumns.includes(columnId) ? 'right' : 'left' }}>
      {columnLabel}
    </th>
  );
};

export default IndicatorTableHeader;
