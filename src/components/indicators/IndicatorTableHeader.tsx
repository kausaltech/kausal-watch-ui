import type { IndicatorListPageFragmentFragment } from '@/common/__generated__/graphql';

interface IndicatorTableHeaderProps {
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number];
}

const IndicatorTableHeader = (props: IndicatorTableHeaderProps) => {
  const { column } = props;

  // TODO: Implement this
  const isNumericColumn = (
    column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number]
  ) => {
    switch (column.__typename) {
      case 'IndicatorListColumn':
        return false;
      default:
        return false;
    }
  };

  return (
    <th key={column.id} style={{ textAlign: isNumericColumn(column) ? 'right' : 'left' }}>
      {column.columnLabel}
    </th>
  );
};

export default IndicatorTableHeader;
