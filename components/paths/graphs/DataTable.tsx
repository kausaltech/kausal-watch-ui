import { useTranslations } from 'next-intl';
import { Table } from 'reactstrap';
import Styled from 'styled-components';

import type { OutcomeNodeFieldsFragment } from '@/common/__generated__/paths/graphql';
import { formatNumber } from '@/common/paths/preprocess';

//  import { useFeatures } from '@/common/instance';
interface DataTableProps {
  node: OutcomeNodeFieldsFragment;
  subNodes?: Node[];
  startYear: number;
  endYear: number;
  separateYears?: number[];
  goalName?: string;
  disclaimer?: string;
}

const TableWrapper = Styled.div`
  margin: 0 auto;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  width: calc(100% - 1rem);
  bottom: -1rem;
  max-height: 100%;
  z-index: 1;
  scroll-behavior: smooth;
  font-size: 70%;
`;

const DataTable = (props: DataTableProps) => {
  const {
    node,
    subNodes,
    startYear,
    endYear,
    separateYears,
    goalName,
    disclaimer,
  } = props;
  const t = useTranslations();
  const totalHistoricalValues = node.metric.historicalValues.filter((value) =>
    separateYears
      ? separateYears.includes(value.year)
      : value.year >= startYear && value.year <= endYear
  );
  const totalForecastValues = node.metric.forecastValues.filter((value) =>
    separateYears
      ? separateYears.includes(value.year)
      : value.year >= startYear && value.year <= endYear
  );
  //const maximumFractionDigits = useFeatures().maximumFractionDigits ?? undefined;
  const maximumFractionDigits = 3;

  const hasTotalValues =
    totalHistoricalValues.some((val) => val.value !== null) ||
    totalForecastValues.some((val) => val.value !== null);

  // Add this function to check if a subNode has any data
  const hasData = (subNode) => {
    const hasHistoricalData = subNode.metric.historicalValues
      .filter((value) =>
        separateYears
          ? separateYears.includes(value.year)
          : value.year >= startYear && value.year <= endYear
      )
      .some((value) => value.value !== null);

    const hasForecastData = subNode.metric.forecastValues
      .filter((value) =>
        separateYears
          ? separateYears.includes(value.year)
          : value.year >= startYear && value.year <= endYear
      )
      .some((value) => value.value !== null);

    return hasHistoricalData || hasForecastData;
  };

  // Filter subNodes to only include those with data
  const validSubNodes = subNodes?.filter(hasData);

  return (
    <TableWrapper>
      <h5>
        {node.name}, {goalName}
        {separateYears ? '' : ` (${startYear} - ${endYear})`}
      </h5>
      <Table bordered size="sm" responsive>
        {disclaimer && <caption>{disclaimer}</caption>}
        <thead>
          <tr>
            <th>{t('table-year')}</th>
            <th>{t('table-measure-type')}</th>
            {validSubNodes?.map((subNode) => (
              <th key={subNode.id}>{subNode.name}</th>
            ))}
            {hasTotalValues && <th>{node.metric.name}</th>}
            <th>{t('table-unit')}</th>
          </tr>
        </thead>
        <tbody>
          {totalHistoricalValues.map((metric) => (
            <tr key={`h-${metric.year}`}>
              <td>{metric.year}</td>
              <td>{t('table-historical')}</td>
              {validSubNodes?.map((subNode) => (
                <td key={`${subNode.id}-${metric.year}`}>
                  {subNode.metric.historicalValues.find(
                    (value) => value.year === metric.year
                  )
                    ? formatNumber(
                        subNode.metric.historicalValues.find(
                          (value) => value.year === metric.year
                        ).value,
                        t.language,
                        maximumFractionDigits
                      )
                    : '-'}
                </td>
              ))}
              {hasTotalValues && (
                <td>
                  {formatNumber(
                    metric.value,
                    t.language,
                    maximumFractionDigits
                  )}
                </td>
              )}
              <td
                dangerouslySetInnerHTML={{
                  __html: node.metric?.unit?.htmlShort,
                }}
              />
            </tr>
          ))}
          {totalForecastValues.map((metric) => (
            <tr key={`f-${metric.year}`}>
              <td>{metric.year}</td>
              <td>{t('table-scenario-forecast')}</td>
              {validSubNodes?.map((subNode) => (
                <td key={`${subNode.id}-${metric.year}`}>
                  {subNode.metric.forecastValues.find(
                    (value) => value.year === metric.year
                  )
                    ? formatNumber(
                        subNode.metric.forecastValues.find(
                          (value) => value.year === metric.year
                        ).value,
                        t.language,
                        maximumFractionDigits
                      )
                    : '-'}
                </td>
              ))}
              {hasTotalValues && (
                <td>
                  {formatNumber(
                    metric.value,
                    t.language,
                    maximumFractionDigits
                  )}
                </td>
              )}
              <td
                dangerouslySetInnerHTML={{
                  __html: node.metric?.unit?.htmlShort,
                }}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default DataTable;
