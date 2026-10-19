import { useId, useMemo, useState } from 'react';

import {
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { FiletypeCsv, FiletypeXls } from 'react-bootstrap-icons';

import {
  downloadData,
  flatten,
  getDefaultSliceConfig,
  parseMetric,
  sliceBy,
} from '@common/utils/paths/metric';
import type { MetricSliceData } from '@common/utils/paths/metric';

import type { DimensionalNodeMetricFragment } from '@/common/__generated__/paths/graphql';
import useNumberFormatter from '@/common/numbers';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { useActiveGoal, useActiveScenario } from '@/utils/paths/hooks/usePathsSettings';

const Tools = styled.div`
  padding: 0 1rem 0.5rem;
  text-align: right;
  .download-button {
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
  const formatNumber = useNumberFormatter({ scope: 'paths' });
  const activeGoal = useActiveGoal();
  const activeScenario = useActiveScenario();

  const parsed = useMemo(() => parseMetric(metric), [metric]);
  const menuId = useId();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchor);

  const lastMetricYear = metric.years.slice(-1)[0];
  const usableEndYear = lastMetricYear && endYear > lastMetricYear ? lastMetricYear : endYear;

  // Follows the active goal's default breakdown
  const sliceConfig = useMemo(
    () => getDefaultSliceConfig(parsed, activeGoal),
    [parsed, activeGoal]
  );

  const years = useMemo(
    () =>
      separateYears ??
      Array.from({ length: usableEndYear - startYear + 1 }, (_, i) => startYear + i),
    [separateYears, usableEndYear, startYear]
  );

  const slice: MetricSliceData | null = useMemo(() => {
    const slicedDim = parsed.dimensions.find((dim) => dim.id === sliceConfig.dimensionId);
    return slicedDim
      ? sliceBy(parsed, slicedDim.id, true, sliceConfig.categories, undefined, { years })
      : flatten(parsed, sliceConfig.categories, years);
  }, [parsed, sliceConfig, years]);

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
                  {cat.historicalValues[idx] ? formatNumber(cat.historicalValues[idx]) : ''}
                </TableCell>
              ))}
              <TableCell>
                {slice.totalValues?.historicalValues[idx] != null
                  ? formatNumber(slice.totalValues.historicalValues[idx])
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
                  {cat.forecastValues[idx] != null ? formatNumber(cat.forecastValues[idx]) : ''}
                </TableCell>
              ))}
              <TableCell>
                {slice.totalValues?.forecastValues[idx] != null
                  ? formatNumber(slice.totalValues.forecastValues[idx])
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
        <Button
          id={`${menuId}-button`}
          className="download-button"
          variant="link"
          size="small"
          aria-controls={isMenuOpen ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : undefined}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <Icon name="download" />
          {` ${t('download-data')}`}
        </Button>
        <Menu
          id={menuId}
          anchorEl={menuAnchor}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={() => setMenuAnchor(null)}
          slotProps={{ list: { 'aria-labelledby': `${menuId}-button` } }}
        >
          <ListSubheader>{t('download-data')}</ListSubheader>
          {(['xlsx', 'csv'] as const).map((format) => (
            <MenuItem
              key={format}
              onClick={() => {
                setMenuAnchor(null);
                void downloadData(parsed, sliceConfig, format, {
                  layout: 'years',
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
                });
              }}
            >
              <ListItemIcon>{format === 'xlsx' ? <FiletypeXls /> : <FiletypeCsv />}</ListItemIcon>
              <ListItemText>{format === 'xlsx' ? 'XLS' : 'CSV'}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Tools>
    </TableContainer>
  );
};

export default DataTable;
