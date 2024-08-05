import styled from 'styled-components';
import { Table } from 'reactstrap';
import { getDateFormat } from 'utils/dates.utils';
import { beautifyValue } from 'common/data/format';
import { useLocale } from 'next-intl';
import {
  type DatasetSchema,
  ActionDateFormat,
  DataPoint,
} from 'common/__generated__/graphql';

const TableContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointSm};
  background-color: ${({ theme }) => theme.themeColors.white};
  margin: ${(props) => props.theme.spaces.s100} auto;
  margin-bottom: ${(props) => props.theme.spaces.s600};
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-collapse: collapse;
`;

const StyledTable = styled(Table)`
  margin: 0 auto;

  thead th {
    text-align: right;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    color: ${(props) => props.theme.headingsColor};
  }
  td {
    border-bottom: none;
    text-align: right;
  }
  .bold {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

interface PlanDatasetsBlockProps {
  heading?: string;
  helpText?: string;
  data: DataPoint[];
  schema: DatasetSchema;
}

type TableRowContent = {
  label: string;
  cells?: {
    value: string | null;
  }[];
};

type TableContent = {
  label: string;
  rows: TableRowContent[];
}[];

const getDimensionTypes = (
  schema: DatasetSchema['dimensionCategories']
): string[] => {
  const names = schema.map((item) => item.category.dimension.uuid);
  const uniqueNames = new Set(names);
  return Array.from(uniqueNames);
};

const getDates = (data: DataPoint[]): string[] => {
  const allDates = data.map((item) => item.date);
  const uniqueDates = new Set(allDates);
  const dates = Array.from(uniqueDates);
  return dates.sort((a, b) => a.localeCompare(b));
};

const getDatum = (
  data: DataPoint[],
  date: string,
  dimensions: string[]
): string => {
  const datum = data.find(
    (item) =>
      item.date === date &&
      item.dimensionCategories.every((dimension) =>
        dimensions.includes(dimension.uuid)
      )
  );
  return datum ? datum.value : 0;
};

const PlanDatasetsBlock: React.FC = (props: PlanDatasetsBlockProps) => {
  const { heading, helpText, data, schema } = props;
  const locale = useLocale();
  console.log('PlanDatasetBlock component', props, helpText);

  const { unit, timeResolution } = schema;
  const dimensionTypes = getDimensionTypes(schema.dimensionCategories);
  console.log('dimensions', dimensionTypes, timeResolution);

  const dimensionsByType = dimensionTypes.map((type) => {
    return schema.dimensionCategories
      .filter((item) => item.category.dimension.uuid === type)
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        label: item.category.label,
        uuid: item.category.uuid,
      }));
  });
  const dates = getDates(data);

  const tableData: TableContent = dimensionsByType[0].map((dimension) => ({
    label: dimension.label,
    rows: dimensionsByType[1].map((subDimension) => ({
      label: subDimension.label,
      cells: dates.map((date) => ({
        value: getDatum(data, date, [dimension.uuid, subDimension.uuid]),
      })),
    })),
  }));

  const title = heading;

  // TODO: Use timeResolution to format dates
  const formattedDates = dates.map((date) =>
    new Date(date).toLocaleDateString(
      locale,
      getDateFormat('YEAR' as ActionDateFormat)
    )
  );

  const headers = [unit, ...formattedDates];

  return (
    <TableContainer>
      {title && <h3>{title}</h3>}
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((table, tableIndex) => (
            <>
              <tr key={tableIndex}>
                <th colSpan={headers.length}>{table.label}</th>
              </tr>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th>{row.label}</th>
                  {row.cells?.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      {cell.value
                        ? beautifyValue(parseFloat(cell.value), locale)
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default PlanDatasetsBlock;
