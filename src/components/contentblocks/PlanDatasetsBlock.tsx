import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Table } from 'reactstrap';
import styled from 'styled-components';

import {
  ActionDateFormat,
  DataPoint,
  type DatasetSchema,
  type DimensionCategory,
} from '@/common/__generated__/graphql';
import { beautifyValue } from '@/common/data/format';
import { SectionHeader } from '@/components/actions/ActionContent';
import PopoverTip from '@/components/common/PopoverTip';
import { getDateFormat } from '@/utils/dates.utils';

const TableContainer = styled.div`
  max-width: ${(props) => props.theme.breakpointSm};
  background-color: ${({ theme }) => theme.themeColors.white};
  margin-bottom: ${(props) => props.theme.spaces.s600};
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-collapse: collapse;
`;

const StyledTable = styled(Table)`
  margin: 0 auto;

  thead th {
    text-align: right;

    &:first-child {
      text-align: left;
    }
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    vertical-align: top;
    border-bottom: none;
    border-color: ${(props) => props.theme.themeColors.light};
  }

  th {
    color: ${(props) => props.theme.headingsColor};
  }
  td {
    text-align: right;
  }
`;

const DataRow = styled.tr`
  th {
    border-bottom: none;
  }
`;

const SubheaderRow = styled.tr`
  th {
    padding-top: ${(props) => props.theme.spaces.s300};
  }
`;

const TotalsRow = styled.tr`
  font-weight: ${(props) => props.theme.fontWeightBold};

  th {
    border-top: solid 1px ${(props) => props.theme.themeColors.dark};
    border-bottom: 0;
    text-transform: capitalize;
  }

  td {
    border-top: solid 1px ${(props) => props.theme.themeColors.dark};
    border-bottom: double 3px ${(props) => props.theme.themeColors.dark};
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
    value: number | null | undefined;
  }[];
};

type TableContent = {
  label: string;
  rows: TableRowContent[];
  totals: number[];
}[];

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
): number | null | undefined => {
  const datum = data.find(
    (item) =>
      item.date === date &&
      item.dimensionCategories.every((dimension) => dimensions.includes(dimension.uuid))
  );
  return datum ? datum.value : undefined;
};

const sumDataPoints = (
  data: DataPoint[],
  date: string,
  dimension1: string,
  dimension2: { label: string; uuid: string }[]
): number => {
  const total = dimension2.reduce((acc, subDimension) => {
    const datum = getDatum(data, date, [dimension1, subDimension.uuid]);
    return acc + Number(datum);
  }, 0);
  return total;
};

const PlanDatasetsBlock: React.FC = (props: PlanDatasetsBlockProps) => {
  const { heading, helpText, data, schema } = props;
  const locale = useLocale();
  const t = useTranslations();

  const unit = schema.metrics[0]?.unit ?? '';

  const categoriesGroupedByDimension: Map<string, DimensionCategory> = schema.dimensions
    .sort((a, b) => a.order - b.order)
    .map((schemaDimension) =>
      schemaDimension.dimension.categories.map(({ label, uuid }) => ({
        label,
        uuid,
      }))
    );

  const dates = getDates(data);

  const tableData: TableContent = categoriesGroupedByDimension[0].map((category) => ({
    label: category.label,
    rows: categoriesGroupedByDimension[1].map((subCategory) => ({
      label: subCategory.label,
      cells: dates.map((date) => ({
        value: getDatum(data, date, [category.uuid, subCategory.uuid]),
      })),
    })),
    totals: dates.map((date) =>
      sumDataPoints(data, date, category.uuid, categoriesGroupedByDimension[1])
    ),
  }));

  // TODO: Use timeResolution to format dates
  const formattedDates = dates.map((date) =>
    new Date(date).toLocaleDateString(locale, getDateFormat('YEAR' as ActionDateFormat))
  );

  const headers = [unit, ...formattedDates];

  return (
    <TableContainer>
      <SectionHeader>
        {heading || schema.name}
        {helpText && <PopoverTip identifier="related-actions-help" content={helpText} />}
      </SectionHeader>
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
              <SubheaderRow key={tableIndex}>
                <th colSpan={headers.length}>
                  <h4>{table.label}</h4>
                </th>
              </SubheaderRow>
              {table.rows.map((row, rowIndex) => (
                <DataRow key={rowIndex}>
                  <th>{row.label}</th>
                  {row.cells?.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell.value ? beautifyValue(cell.value, locale) : '-'}</td>
                  ))}
                </DataRow>
              ))}
              <TotalsRow>
                <th>{t('total')}</th>
                {table.totals.map((total, totalIndex) => (
                  <td key={totalIndex}>{beautifyValue(total, locale)}</td>
                ))}
              </TotalsRow>
            </>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default PlanDatasetsBlock;
