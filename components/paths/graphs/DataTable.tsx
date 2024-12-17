import { useFormatter, useTranslations } from 'next-intl';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Table,
} from 'reactstrap';
import Icon from '@/components/common/Icon';
import styled from 'styled-components';

import type {
  DimensionalNodeMetricFragment,
  OutcomeNodeFieldsFragment,
} from '@/common/__generated__/paths/graphql';
import {
  DimensionalMetric,
  MetricSlice,
  SliceConfig,
} from '@/utils/paths/metric';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { isEqual } from 'lodash';
import { activeGoalVar, activeScenarioVar } from '@/context/paths/cache';

//  import { useFeatures } from '@/common/instance';

const Tools = styled.div`
  padding: 0 1rem 0.5rem;
  text-align: right;
  .btn-link {
    text-decoration: none;
  }
  .icon {
    width: 1.25rem !important;
    height: 1.25rem !important;
    vertical-align: -0.2rem;
  }
`;

const TableWrapper = styled.div`
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

interface DataTableProps {
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  startYear: number;
  endYear: number;
  separateYears?: number[] | null;
  goalName?: string;
  disclaimer?: string;
}

const DataTable = (props: DataTableProps) => {
  const { metric, startYear, endYear, separateYears, goalName, disclaimer } =
    props;

  const t = useTranslations();
  const format = useFormatter();
  const activeGoal = useReactiveVar(activeGoalVar);
  const activeScenario = useReactiveVar(activeScenarioVar);

  const cube = useMemo(() => new DimensionalMetric(metric), [metric]);

  const lastMetricYear = metric.years.slice(-1)[0];
  const usableEndYear =
    lastMetricYear && endYear > lastMetricYear ? lastMetricYear : endYear;

  const defaultConfig = cube.getDefaultSliceConfig(activeGoal);
  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  useEffect(() => {
    /**
     * If the active goal changes, we will reset the grouping + filtering
     * to be compatible with the new choices (if the new goal has common
     * dimensions with our metric).
     */
    if (!activeGoal) return;
    const newDefault = cube.getDefaultSliceConfig(activeGoal);
    if (!newDefault || isEqual(sliceConfig, newDefault)) return;
    setSliceConfig(newDefault);
  }, [activeGoal, cube, sliceConfig]);

  const sliceableDims = cube.dimensions.filter(
    (dim) => !sliceConfig.categories[dim.id]
  );
  const slicedDim = cube.dimensions.find(
    (dim) => dim.id === sliceConfig.dimensionId
  );

  const years =
    separateYears ??
    Array.from(
      { length: usableEndYear - startYear + 1 },
      (_, i) => startYear + i
    );

  let slice: MetricSlice;
  if (slicedDim) {
    slice = cube.sliceBy(
      slicedDim.id,
      true,
      sliceConfig.categories,
      undefined,
      years
    );
  } else {
    slice = cube.flatten(sliceConfig.categories, years);
  }

  const forecastLabel =
    activeScenario && !separateYears
      ? `${t('table-scenario-forecast')} (${activeScenario.name})`
      : t('table-scenario-forecast');

  const tableTitle = `${metric.name}, ${goalName}`;

  return (
    <TableWrapper>
      <h5 className="my-4">{tableTitle}</h5>
      <Table bordered size="sm" responsive>
        {disclaimer && <caption>{disclaimer}</caption>}
        <thead>
          <tr>
            <th>{t('table-year')}</th>
            <th>{t('table-measure-type')}</th>
            {slice.categoryValues.map((cat) => (
              <th key={cat.category.id}>{cat.category.label}</th>
            ))}
            <th>{t('plot-total')}</th>
            <th>{t('table-unit')}</th>
          </tr>
        </thead>
        <tbody>
          {slice.historicalYears.map((year, idx) => (
            <tr key={`h-${year}`}>
              <td>{year}</td>
              <td>{t('table-historical')}</td>
              {slice.categoryValues.map((cat) => (
                <td key={`${cat.category.id}-h-${year}`}>
                  {cat.historicalValues[idx]
                    ? format.number(cat.historicalValues[idx], {
                        maximumSignificantDigits: 2,
                      })
                    : ''}
                </td>
              ))}
              <td>
                {slice.totalValues?.historicalValues[idx]
                  ? format.number(slice.totalValues?.historicalValues[idx], {
                      maximumSignificantDigits: 2,
                    })
                  : ''}
              </td>
              <td
                dangerouslySetInnerHTML={{
                  __html: slice.unit,
                }}
              />
            </tr>
          ))}
          {slice.forecastYears.map((year, idx) => (
            <tr key={`h-${year}`}>
              <td>{year}</td>
              <td>{forecastLabel}</td>
              {slice.categoryValues.map((cat) => (
                <td key={`${cat.category.id}-f-${year}`}>
                  {cat.forecastValues[idx]
                    ? format.number(cat.forecastValues[idx], {
                        maximumSignificantDigits: 2,
                      })
                    : ''}
                </td>
              ))}
              <td>
                {slice.totalValues?.forecastValues[idx]
                  ? format.number(slice.totalValues?.forecastValues[idx], {
                      maximumSignificantDigits: 2,
                    })
                  : ''}
              </td>
              <td
                dangerouslySetInnerHTML={{
                  __html: slice.unit,
                }}
              />
            </tr>
          ))}
        </tbody>
      </Table>
      <Tools>
        <UncontrolledDropdown size="sm">
          <DropdownToggle caret color="link">
            <Icon name="download" />
            {` ${t('download-data')}`}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={async (ev) =>
                await cube.downloadData(
                  sliceConfig,
                  'xlsx',
                  years,
                  tableTitle,
                  t('plot-total'),
                  t('table-measure-type'),
                  t('table-year'),
                  t('table-unit'),
                  t('table-historical'),
                  forecastLabel
                )
              }
            >
              <Icon name="file" /> XLS
            </DropdownItem>
            <DropdownItem
              onClick={async (ev) =>
                await cube.downloadData(
                  sliceConfig,
                  'csv',
                  years,
                  tableTitle,
                  t('plot-total'),
                  t('table-measure-type'),
                  t('table-year'),
                  t('table-unit'),
                  t('table-historical'),
                  forecastLabel
                )
              }
            >
              <Icon name="file" /> CSV
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Tools>
    </TableWrapper>
  );
};

export default DataTable;
