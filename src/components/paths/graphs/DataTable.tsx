import { useEffect, useMemo, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { isEqual } from 'lodash-es';
import { useFormatter, useTranslations } from 'next-intl';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { activeGoalVar, activeScenarioVar } from '@common/apollo/paths-cache';
import {
  downloadData,
  flatten,
  getDefaultSliceConfig,
  parseMetric,
  sliceBy,
} from '@common/utils/paths/metric';
import type { MetricSliceData, SliceConfig } from '@common/utils/paths/metric';

import type { DimensionalNodeMetricFragment } from '@/common/__generated__/paths/graphql';
import Icon from '@/components/common/Icon';

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

interface DataTableProps {
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  startYear: number;
  endYear: number;
  separateYears?: number[] | null;
  goalName?: string;
  disclaimer?: string;
}

const DataTable = (props: DataTableProps) => {
  const { metric, startYear, endYear, separateYears, goalName, disclaimer } = props;

  const t = useTranslations();
  const theme = useTheme();
  const format = useFormatter();
  const activeGoal = useReactiveVar(activeGoalVar);
  const activeScenario = useReactiveVar(activeScenarioVar);

  const parsed = useMemo(() => parseMetric(metric), [metric]);

  const lastMetricYear = metric.years.slice(-1)[0];
  const usableEndYear = lastMetricYear && endYear > lastMetricYear ? lastMetricYear : endYear;

  const defaultConfig = getDefaultSliceConfig(parsed, activeGoal);
  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  useEffect(() => {
    /**
     * If the active goal changes, we will reset the grouping + filtering
     * to be compatible with the new choices (if the new goal has common
     * dimensions with our metric).
     */
    if (!activeGoal) return;
    const newDefault = getDefaultSliceConfig(parsed, activeGoal);
    if (!newDefault || isEqual(sliceConfig, newDefault)) return;
    setSliceConfig(newDefault);
  }, [activeGoal, parsed, sliceConfig]);

  const slicedDim = parsed.dimensions.find((dim) => dim.id === sliceConfig.dimensionId);

  const years =
    separateYears ?? Array.from({ length: usableEndYear - startYear + 1 }, (_, i) => startYear + i);

  let slice: MetricSliceData | null = null;
  if (slicedDim) {
    slice = sliceBy(parsed, slicedDim.id, true, sliceConfig.categories, undefined, years);
  } else {
    slice = flatten(parsed, sliceConfig.categories, years);
  }

  if (!slice) return null;

  const forecastLabel =
    activeScenario && !separateYears
      ? `${t('table-scenario-forecast')} (${activeScenario.name})`
      : t('table-scenario-forecast');

  const tableTitle = `${metric.name}, ${goalName}`;

  const headerCellStyle = {
    fontWeight: 'bold',
    lineHeight: 1,
    bgcolor: theme.cardBackground.secondary,
  };
  return (
    <TableContainer
      component={Paper}
      role="region"
      aria-label={tableTitle}
      tabIndex={0}
      sx={{ maxHeight: 400, overflow: 'auto', backgroundColor: 'white' }}
    >
      <Typography variant="h5" component="h3" sx={{ py: 2 }}>
        {tableTitle}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        {disclaimer && <caption>{disclaimer}</caption>}
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>{t('table-year')}</TableCell>
            <TableCell sx={headerCellStyle}>{t('table-measure-type')}</TableCell>
            {slice.categoryValues.map((cat) => (
              <TableCell sx={headerCellStyle} key={cat.category.id}>
                {cat.category.label}
              </TableCell>
            ))}
            <TableCell sx={headerCellStyle}>{t('plot-total')}</TableCell>
            <TableCell sx={headerCellStyle}>{t('table-unit')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slice.historicalYears.map((year, idx) => (
            <TableRow key={`h-${year}`}>
              <TableCell>{year}</TableCell>
              <TableCell>{t('table-historical')}</TableCell>
              {slice.categoryValues.map((cat) => (
                <TableCell key={`${cat.category.id}-h-${year}`}>
                  {cat.historicalValues[idx]
                    ? format.number(cat.historicalValues[idx], {
                        maximumSignificantDigits: 2,
                      })
                    : ''}
                </TableCell>
              ))}
              <TableCell>
                {slice.totalValues?.historicalValues[idx]
                  ? format.number(slice.totalValues?.historicalValues[idx], {
                      maximumSignificantDigits: 2,
                    })
                  : ''}
              </TableCell>
              <TableCell
                dangerouslySetInnerHTML={{
                  __html: slice.unit,
                }}
              />
            </TableRow>
          ))}
          {slice.forecastYears.map((year, idx) => (
            <TableRow key={`f-${year}`}>
              <TableCell>{year}</TableCell>
              <TableCell>{forecastLabel}</TableCell>
              {slice.categoryValues.map((cat) => (
                <TableCell key={`${cat.category.id}-f-${year}`}>
                  {cat.forecastValues[idx]
                    ? format.number(cat.forecastValues[idx], {
                        maximumSignificantDigits: 2,
                      })
                    : ''}
                </TableCell>
              ))}
              <TableCell>
                {slice.totalValues?.forecastValues[idx]
                  ? format.number(slice.totalValues?.forecastValues[idx], {
                      maximumSignificantDigits: 2,
                    })
                  : ''}
              </TableCell>
              <TableCell
                dangerouslySetInnerHTML={{
                  __html: slice.unit,
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Tools>
        <UncontrolledDropdown size="sm">
          <DropdownToggle caret color="link">
            <Icon name="download" />
            {` ${t('download-data')}`}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={async () =>
                await downloadData(parsed, sliceConfig, 'xlsx', {
                  years,
                  tableTitle,
                  labels: {
                    total: t('plot-total'),
                    type: t('table-measure-type'),
                    year: t('table-year'),
                    unit: t('table-unit'),
                    historical: t('table-historical'),
                    forecast: forecastLabel,
                  },
                })
              }
            >
              <Icon name="file" /> XLS
            </DropdownItem>
            <DropdownItem
              onClick={async () =>
                await downloadData(parsed, sliceConfig, 'csv', {
                  years,
                  tableTitle,
                  labels: {
                    total: t('plot-total'),
                    type: t('table-measure-type'),
                    year: t('table-year'),
                    unit: t('table-unit'),
                    historical: t('table-historical'),
                    forecast: forecastLabel,
                  },
                })
              }
            >
              <Icon name="file" /> CSV
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Tools>
    </TableContainer>
  );
};

export default DataTable;
