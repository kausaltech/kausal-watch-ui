import type { IndicatorGraphDataQuery } from '@/common/__generated__/graphql';

type IndicatorDimension = NonNullable<IndicatorGraphDataQuery['indicator']>['dimensions'][number];

const IndicatorTable = ({ indicator }: { indicator: IndicatorGraphDataQuery['indicator'] }) => {
  if (!indicator) return null;

  const dimensions = indicator.dimensions;

  const categoryCounts = dimensions.map((dimension) => {
    return dimension.dimension.categories.length;
  });
  const columnCount = categoryCounts.reduce((res, currItem) => res * currItem, 1);
  const columns = Array.from({ length: columnCount }, (_, index) => index);

  return (
    <div>
      {' '}
      <h4>Indicator Table</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default IndicatorTable;
