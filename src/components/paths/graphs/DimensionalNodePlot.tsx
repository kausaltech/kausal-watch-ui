import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useReactiveVar } from '@apollo/client';
import chroma from 'chroma-js';
import type {
  DimensionalNodeMetricFragment,
  InstanceGoalEntry,
} from 'common/__generated__/paths/graphql';
import SelectDropdown from 'components/common/SelectDropdown';
import { isEqual } from 'lodash';
import { useTranslations } from 'next-intl';
import type { LayoutAxis } from 'plotly.js';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { genColorsFromTheme, setUniqueColors } from '@/common/paths/colors';
//import {
//  type InstanceGoal,
//  useFeatures,
//  useInstance,
//} from 'common/instance';
import { getRange } from '@/common/paths/preprocess';
import Icon from '@/components/common/Icon';
import { activeGoalVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import {
  DimensionalMetric,
  type MetricCategoryValues,
  MetricSlice,
  type SliceConfig,
} from '@/utils/paths/metric';

const Plot = dynamic(() => import('components/graphs/Plot'), { ssr: false });

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

const Disclaimer = styled.p`
  margin-right: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.secondary};
  text-align: right;
`;

function formatHover(
  name: string,
  color: string,
  unit: string,
  predLabel: string | null,
  fontFamily?: string,
  maximumFractionDigits?: number
) {
  const valueFormatter =
    // Round to maximumFractionDigits if provided, otherwise 2 significant digits
    typeof maximumFractionDigits === 'number' ? `.${maximumFractionDigits}r` : '.2r';
  //const predText = predLabel ? ` <i>(${predLabel})</i>` : '';
  const out: Partial<Plotly.PlotData> = {
    /*
    hovertemplate: `${name}<br />` +
                   `%{x|%Y}: <b>%{y:,.3r}</b> ` +
                   `${unit}` +
                   `${predText}` + 
                   `<extra></extra>`,
    */
    hovertemplate:
      `${name}: ` +
      `<b>%{y:,${valueFormatter}}</b> ` +
      `${unit}` +
      //`${predText}` +
      `<extra></extra>`,
    hoverlabel: {
      bgcolor: color,
      font: {
        family: fontFamily,
      },
    },
  };
  return out;
}

type BaselineForecast = { year: number; value: number };

type PlotData = { x: number[]; y: number[] };

function getDefaultSliceConfig(cube: DimensionalMetric, activeGoal: InstanceGoalEntry | null) {
  /**
   * By default, we group by the first dimension `metric` has, whatever it is.
   * @todo Is there a better way to select the default?
   *
   * If the currently selected goal has category selections for this metric,
   * we might choose another dimension.
   *
   * NOTE: This is just the default -- the actually active filtering and
   * grouping is controlled by the `sliceConfig` state below.
   */
  const defaultConfig: SliceConfig = {
    dimensionId: cube.dimensions[0]?.id,
    categories: {},
  };

  if (!activeGoal) return defaultConfig;

  const cubeDefault = cube.getChoicesForGoal(activeGoal);
  if (!cubeDefault) return defaultConfig;
  defaultConfig.categories = cubeDefault;
  /**
   * Check if our default dimension to slice by is affected by the
   * goal-based default filters. If so, we should choose another
   * dimension.
   */
  if (
    defaultConfig.dimensionId &&
    Object.prototype.hasOwnProperty.call(cubeDefault, defaultConfig.dimensionId)
  ) {
    const firstPossible = cube.dimensions.find(
      (dim) => !Object.prototype.hasOwnProperty.call(cubeDefault, dim.id)
    );
    defaultConfig.dimensionId = firstPossible?.id;
  }
  return defaultConfig;
}

const getRangeFromSlice = (slice: MetricSlice) =>
  getRange(
    [
      ...(slice.totalValues?.historicalValues ?? []),
      ...(slice.totalValues?.forecastValues ?? []),
      ...(slice.categoryValues ?? []).flatMap((value) => [
        ...value.forecastValues,
        ...value.historicalValues,
      ]),
    ].filter((value): value is number => typeof value === 'number')
  );

type DimensionalNodePlotProps = {
  withReferenceYear?: boolean;
  node: { id: string };
  baselineForecast?: BaselineForecast[];
  metric: NonNullable<DimensionalNodeMetricFragment['metricDim']>;
  startYear: number;
  endYear: number;
  color?: string | null;
  withControls?: boolean;
  withTools?: boolean;
  disclaimer?: string;
  separateYears?: number[] | null;
};

export default function DimensionalNodePlot({
  withReferenceYear = false,
  metric,
  startYear,
  color,
  withControls = true,
  withTools = true,
  endYear,
  baselineForecast,
  disclaimer,
  separateYears,
}: DimensionalNodePlotProps) {
  const t = useTranslations();
  const activeGoal = useReactiveVar(activeGoalVar);

  const cube = useMemo(() => new DimensionalMetric(metric), [metric]);

  const lastMetricYear = metric.years.slice(-1)[0];
  const usableEndYear = lastMetricYear && endYear > lastMetricYear ? lastMetricYear : endYear;

  const defaultConfig = getDefaultSliceConfig(cube, activeGoal);
  const [sliceConfig, setSliceConfig] = useState<SliceConfig>(defaultConfig);

  //const maximumFractionDigits = useFeatures().maximumFractionDigits ?? undefined;
  const maximumFractionDigits = 2;
  useEffect(() => {
    /**
     * If the active goal changes, we will reset the grouping + filtering
     * to be compatible with the new choices (if the new goal has common
     * dimensions with our metric).
     */
    if (!activeGoal) return;
    const newDefault = getDefaultSliceConfig(cube, activeGoal);
    if (!newDefault || isEqual(sliceConfig, newDefault)) return;
    setSliceConfig(newDefault);
  }, [activeGoal, cube, sliceConfig]);

  const sliceableDims = cube.dimensions.filter((dim) => !sliceConfig.categories[dim.id]);
  const slicedDim = cube.dimensions.find((dim) => dim.id === sliceConfig.dimensionId);

  let slice: MetricSlice;
  if (slicedDim) {
    slice = cube.sliceBy(slicedDim.id, true, sliceConfig.categories);
  } else {
    slice = cube.flatten(sliceConfig.categories);
  }
  const theme = useTheme();
  const paths = usePaths();
  const instance = paths?.instance;
  const referenceYear = instance?.referenceYear || undefined;
  const minimumHistoricalYear = instance?.minimumHistoricalYear || undefined;
  const baselineName = ''; //TODO: get from instance
  const baselineVisibleInGraphs = instance?.features?.baselineVisibleInGraphs ?? false;

  const defaultColor = color || theme.graphColors.blue070;
  const shapes: Plotly.Layout['shapes'] = [];
  const plotData: Plotly.Data[] = [];
  //const rangeMode = metric.stackable ? 'tozero' : 'normal'; TODO: Do we need this?
  const filled = metric.stackable;

  const filledStyles = (stackGroup: string) => {
    if (!filled) return {};

    if (separateYears) {
      return {
        type: 'bar',
      };
    }

    return {
      stackgroup: stackGroup,
      line: {
        color: 'white',
        width: 1,
        dash: 'solid',
        shape: 'spline',
        smoothing: 0.8,
      },
    };
  };

  let colors: string[];
  const nrCats = slice.categoryValues.length;

  if (nrCats > 1) {
    // If we were asked to use a specific color, we generate the color scheme around it.
    if (color) {
      setUniqueColors(
        slice.categoryValues,
        (cv) => cv.color,
        (cv, color) => {
          cv.color = color;
        },
        defaultColor
      );
    } else {
      colors = genColorsFromTheme(theme, slice.categoryValues.length);
    }
  } else {
    colors = [defaultColor];
  }

  const showReferenceYear = withReferenceYear && !!referenceYear;
  const hasHistorical = slice.historicalYears.length > 0;
  const hasForecast = slice.forecastYears.length > 0;
  const predLabel = t('pred');

  let longUnit = metric.unit.htmlShort;
  // FIXME: Nasty hack to show 'CO2e' where it might be applicable until
  // the backend gets proper support for unit specifiers.
  if (cube.hasDimension('emission_scope') && !cube.hasDimension('greenhouse_gases')) {
    if (metric.unit.short === 't/Einw./a') {
      longUnit = t.raw('tco2-e-inhabitant');
    } else if (metric.unit.short === 'kt/a') {
      longUnit = t.raw('ktco2-e');
    }
  }

  const unit = metric.unit.htmlShort;

  const genTraces = (cv: MetricCategoryValues, idx: number) => {
    const stackGroup = cv.isNegative ? 'neg' : 'pos';
    const forecastColorChange = 1;
    const separateYearsColorChange = separateYears ? 1.75 : 0;
    //const color = lighten(colorTint, cv.color || colors[idx]);
    const color = chroma(cv.color || colors[idx])
      .brighten(separateYearsColorChange)
      .hex();
    //const color = chroma(baseColor).brighten(0.5).hex();

    const separateYearsTrace = separateYears
      ? {
          marker: { color },
        }
      : {
          fillcolor: color,
          line: {
            color,
            shape: 'spline',
            width: 3,
          },
        };
    const traceConfig: Partial<Plotly.PlotData> = {
      name: cv.category.label,
      type: separateYears ? 'bar' : 'scatter',
      xaxis: 'x2',
      ...separateYearsTrace,
    };

    if (hasHistorical) {
      const separateYearsIndices: number[] = [];
      const separateYearsValues: (number | null)[] = [];
      if (separateYears) {
        separateYearsIndices.push(
          ...separateYears.map((year) => slice.historicalYears.findIndex((y) => y === year))
        );
        separateYearsValues.push(...separateYearsIndices.map((i) => cv.historicalValues[i]));
      }
      plotData.push({
        ...traceConfig,
        x: separateYears || slice.historicalYears,
        y: separateYears ? separateYearsValues : cv.historicalValues,
        ...filledStyles(`${stackGroup}-hist`),
        ...formatHover(
          cv.category.label,
          color,
          unit,
          null,
          theme.fontFamily,
          maximumFractionDigits
        ),
      });
    }
    if (hasHistorical && hasForecast && !separateYears) {
      const lastHist = slice.historicalYears.length - 1;
      // Short trace to join historical and forecast series together
      plotData.push({
        ...traceConfig,
        ...filledStyles(`${stackGroup}-join`),
        x: [slice.historicalYears[lastHist], slice.forecastYears[0]],
        y: [cv.historicalValues[lastHist], cv.forecastValues[0]],
        hoverinfo: 'skip',
        showlegend: false,
        fillcolor: chroma(color).brighten(forecastColorChange).hex(),
      });
    }
    if (hasForecast) {
      const separateYearsIndices: number[] = [];
      const separateYearsValues: (number | null)[] = [];
      const separateYearsConfig = separateYears
        ? {}
        : {
            fillcolor: chroma(color).brighten(forecastColorChange).hex(),
          };
      if (separateYears) {
        separateYearsIndices.push(
          ...separateYears.map((year) => slice.forecastYears.findIndex((y) => y === year))
        );
        separateYearsValues.push(...separateYearsIndices.map((i) => cv.forecastValues[i]));
      }
      plotData.push({
        ...traceConfig,
        ...filledStyles(`${stackGroup}-forecast`),
        ...formatHover(
          cv.category.label,
          color,
          unit,
          predLabel,
          theme.fontFamily,
          maximumFractionDigits
        ),
        x: separateYears || slice.forecastYears,
        y: separateYears ? separateYearsValues : cv.forecastValues,
        showlegend: false,
        ...separateYearsConfig,
      });
    }

    if (showReferenceYear) {
      const referenceYearIndex = slice.historicalYears.findIndex((year) => year === referenceYear);
      const referenceYearData = cv.historicalValues[referenceYearIndex];

      if (typeof referenceYearData === 'undefined') {
        return;
      }

      plotData.push({
        x: [referenceYear - 1, referenceYear],
        y: [referenceYearData, referenceYearData],
        ...traceConfig,
        ...filledStyles(`${stackGroup}-hist`),
        ...formatHover(
          cv.category.label,
          color,
          unit,
          null,
          theme.fontFamily,
          maximumFractionDigits
        ),
        xaxis: 'x',
        showlegend: false,
      });
    }
  };

  slice.categoryValues.forEach((cv, idx) => genTraces(cv, idx));

  const goals = cube.getGoalsForChoice(sliceConfig.categories);

  if (goals) {
    const lineConfig: Partial<Plotly.ShapeLine> = {
      color: theme.graphColors.red090,
      width: 2,
      dash: 'dot',
    };

    if (goals.length === 1) {
      const goal = goals[goals.length - 1];
      const x1 = startYear === referenceYear ? minimumHistoricalYear : startYear;
      const x2 = goal.year > usableEndYear ? usableEndYear : goal.year;
      plotData.push({
        xaxis: 'x2',
        showlegend: false,
        hoverinfo: 'skip',
        x: [x1 || 0, x2 || 0],
        y: [goal.value, goal.value],
        mode: 'lines',
        line: lineConfig,
      });

      if (usableEndYear === goal.year) {
        plotData.push({
          xaxis: 'x2',
          x: [goal.year],
          y: [goal.value],
          type: 'scatter',
          name: `${t('target')} ${goal.year}`,
          line: lineConfig,
        });
      }
    } else if (goals?.length) {
      const name = t('target');

      plotData.push({
        xaxis: 'x2',
        type: 'scatter',
        name,
        marker: {
          size: 6,
        },
        cliponaxis: false,
        x: goals.map((v) => v.year),
        y: goals.map((v) => v.value),
        hovertemplate: `<b>${name} %{x}: %{y:,.3r} ${unit}</b><extra></extra>`,
        line: lineConfig,
      });
    }
  }

  if (baselineForecast && baselineName && baselineVisibleInGraphs) {
    const reduceForecastToPlot = (forecasts: PlotData, forecast) =>
      forecast.year >= startYear && forecast.year <= usableEndYear
        ? {
            x: [...forecasts.x, forecast.year],
            y: [...forecasts.y, forecast.value],
          }
        : forecasts;

    const baselinePlot = baselineForecast.reduce(reduceForecastToPlot, {
      x: [],
      y: [],
    });

    plotData.push({
      x: baselinePlot.x,
      y: baselinePlot.y,
      // customdata: baselineForecast.y.map(() => ''),
      xaxis: 'x2',
      // yaxis: 'y',
      mode: 'lines',
      name: baselineName,
      type: 'scatter',
      line: {
        color: theme.graphColors.grey060,
        shape: 'spline',
        smoothing: 0.8,
        width: 2,
        dash: 'dash',
      },
      ...formatHover(
        baselineName,
        theme.graphColors.grey030,
        unit,
        predLabel,
        theme.fontFamily,
        maximumFractionDigits
      ),
    });
  }

  if (metric.stackable && slice.totalValues) {
    const allYears = [...slice.historicalYears, ...slice.forecastYears];
    const allValues = [...slice.totalValues.historicalValues, ...slice.totalValues.forecastValues];
    const separateYearsIndices: number[] = [];
    const separateYearsValues: (number | null)[] = [];
    if (separateYears) {
      separateYearsIndices.push(
        ...separateYears.map((year) => allYears.findIndex((y) => y === year))
      );
      separateYearsValues.push(...separateYearsIndices.map((i) => allValues[i]));
    }

    const label = t('plot-total')!;
    plotData.push({
      xaxis: 'x2',
      type: 'scatter',
      name: label,
      mode: 'lines',
      line: {
        color: theme.graphColors.grey080,
        width: 0,
      },
      x: separateYears || allYears,
      y: separateYears ? separateYearsValues : allValues,
      ...formatHover(
        label,
        theme.graphColors.grey080,
        unit,
        null,
        theme.fontFamily,
        maximumFractionDigits
      ),
      showlegend: false,
    });
  }

  const nrYears = usableEndYear - startYear;

  const separateYearsConfig: Partial<LayoutAxis> = separateYears
    ? {
        type: 'category' as const,
        data: separateYears,
        axisTick: {
          alignWithLabel: true,
        },
      }
    : { range: [`${startYear - 1}-12-31`, `${usableEndYear}-02-01`] };

  const commonXAxisConfig: Partial<LayoutAxis> = {
    domain: [0, 1],
    ticklen: 10,
    type: 'date',
    gridcolor: theme.graphColors.grey005,
    tickcolor: theme.graphColors.grey030,
    hoverformat: '%Y',
    automargin: true,
    dtick: nrYears > 30 ? 'M60' : nrYears > 15 ? 'M24' : 'M12',
    fixedrange: true,
  };

  const mainXAxisConfig: Partial<LayoutAxis> = {
    ...commonXAxisConfig,
    ...separateYearsConfig,
  };

  const referenceXAxisConfig: Partial<LayoutAxis> = {
    ...commonXAxisConfig,
    visible: false,
  };

  // Take baseline data into account when deciding the custom y-range for the graph
  const baselineRange = baselineForecast
    ? getRange(baselineForecast?.map((item) => item.value))
    : [undefined, undefined];
  const dataRange =
    metric.stackable && slice.totalValues ? getRangeFromSlice(slice) : [undefined, undefined];

  const rangeMin =
    dataRange[0] && baselineRange[0] ? Math.min(dataRange[0], baselineRange[0]) : dataRange[0];
  const rangeMax =
    dataRange[1] && baselineRange[1] ? Math.max(dataRange[1], baselineRange[1]) : dataRange[1];

  const customRange = [rangeMin, rangeMax];

  const separateYearsLayout = separateYears
    ? {
        barmode: 'stack',
        bargap: 0.15,
        bargroupgap: 0.1,
      }
    : {};

  const referenceYearConfig = showReferenceYear
    ? {
        xaxis: {
          ...referenceXAxisConfig,
          visible: true,
          domain: [0, 0.03],
          range: [`${referenceYear - 1}-01-01`, `${referenceYear}-01-01`],
        },
        xaxis2: {
          ...mainXAxisConfig,
          domain: [0.066, 1],
        },
      }
    : { xaxis2: mainXAxisConfig };

  const layout: Partial<Plotly.Layout> = {
    height: 300,
    margin: {
      t: 32,
      r: 24,
      b: 48,
      l: 48,
    },
    hovermode: 'x unified',
    annotations: [
      // Custom horizontal y axis label
      {
        ...(longUnit
          ? {
              xref: 'paper',
              yref: 'paper',
              yshift: 10,
              x: 0,
              xanchor: 'left',
              y: 1,
              yanchor: 'bottom',
              text: longUnit || undefined,
              font: {
                size: 14,
              },
              showarrow: false,
            }
          : undefined),
      },
    ],
    yaxis: {
      domain: [0, 1],
      anchor: showReferenceYear ? 'x' : 'x2',
      ticklen: 10,
      gridcolor: theme.graphColors.grey005,
      tickcolor: theme.graphColors.grey030,
      fixedrange: true,
      range: customRange,
    },
    ...referenceYearConfig,
    autosize: true,
    dragmode: false,
    font: {
      family: theme.fontFamily,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'top',
      y: -0.2,
      xanchor: 'right',
      x: 1,
      itemclick: false,
      itemdoubleclick: false,
    },
    grid: { rows: 1, columns: 2, pattern: 'independent' },
    shapes,
    modebar: {
      add: ['toImage'],
      remove: [
        'zoom2d',
        'zoomIn2d',
        'zoomOut2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'autoScale2d',
        'resetScale2d',
      ],
      color: theme.graphColors.grey090,
      bgcolor: theme.graphColors.grey010,
      activecolor: theme.brandDark,
    },
    ...separateYearsLayout,
  };

  const hasGroups = cube.dimensions.some((dim) => dim.groups.length);

  const controls =
    withControls && (metric.dimensions.length > 1 || hasGroups) ? (
      <>
        <Row>
          {metric.dimensions.length > 1 && (
            <Col md={3} className="d-flex" key="dimension">
              <SelectDropdown
                id="dimension"
                className="flex-grow-1"
                label={t('plot-choose-dimension')!}
                onChange={(val) =>
                  setSliceConfig((old) => ({
                    ...old,
                    dimensionId: val?.id || undefined,
                  }))
                }
                options={sliceableDims}
                value={sliceableDims.find((dim) => sliceConfig.dimensionId === dim.id) || null}
                isMulti={false}
                isClearable={false}
              />
            </Col>
          )}
          {cube.dimensions.map((dim) => {
            const options = cube.getOptionsForDimension(dim.id, sliceConfig.categories);
            return (
              <Col md={4} className="d-flex" key={dim.id}>
                <SelectDropdown
                  id={`dim-${dim.id.replaceAll(':', '-')}`}
                  className="flex-grow-1"
                  helpText={dim.helpText ?? undefined}
                  label={dim.label}
                  options={options}
                  value={options.filter((opt) => opt.selected)}
                  isMulti={true}
                  isClearable={true}
                  onChange={(newValues) => {
                    setSliceConfig((old) => {
                      return cube.updateChoice(dim, old, newValues);
                    });
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </>
    ) : null;

  const plotConfig = {
    displaylogo: false,
    responsive: true,
  };

  return (
    <>
      {controls}

      <div className="mt-3">
        <Plot
          data={plotData}
          layout={layout}
          useResizeHandler
          style={{ width: '100%' }}
          config={plotConfig}
          debug={true}
        />
        {disclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
      </div>

      {withTools && (
        <Tools>
          <UncontrolledDropdown size="sm">
            <DropdownToggle caret color="link">
              <Icon name="download" />
              {` ${t('download-data')}`}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={async (ev) => await cube.downloadData(sliceConfig, 'xlsx')}>
                <Icon name="file" /> XLS
              </DropdownItem>
              <DropdownItem onClick={async (ev) => await cube.downloadData(sliceConfig, 'csv')}>
                <Icon name="file" /> CSV
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Tools>
      )}
    </>
  );
}
