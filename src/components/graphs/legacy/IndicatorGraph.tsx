'use client';

import dynamic from 'next/dynamic';

import { useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { merge } from 'lodash-es';
import type { Annotations, Datum, Layout, MarkerSymbol, PlotData } from 'plotly.js';
import { transparentize } from 'polished';

import { IndicatorTimeResolution } from '@/common/__generated__/graphql';
import { splitLines } from '@/common/utils';

const PlotContainer = styled.div<{ $vizHeight: number }>`
  height: ${(props) => props.$vizHeight}px;
`;

const CATEGORY_XAXIS_LABEL_EXTRA_MARGIN = 200;

type YRange = {
  unit: string;
  minDigits: number;
  maxDigits: number;
  ticksCount: number | undefined;
  ticksRounding: number | undefined;
  valueRounding: number | undefined;
  includeZero: boolean;
  range: number[];
};

type PlotColors = {
  trace: string;
  trend: string;
  goalScale: string[];
  mainScale: string[];
  fillMarkers: boolean;
  symbols: MarkerSymbol[];
  goalSymbol: MarkerSymbol;
  goalLine: boolean;
};

type LegacyTrace = {
  name: string;
  x: Array<string | number>;
  y: Array<number | null>;
  xType?: 'time' | 'category';
  dataType?: 'total' | null;
  _parentName?: string | null;
};

type GoalTrace = Pick<LegacyTrace, 'name' | 'x' | 'y'>;

type GraphDimension = {
  categories: Array<{ name: string; defaultColor?: string | null }>;
};

type GraphSpecification = {
  axes: Array<[string, number]>;
  dimensions: GraphDimension[];
};

type LayoutConfig = Partial<Layout> & {
  subplotCount?: number;
  yRange?: [number | undefined, number | undefined];
};

type PlotTrace = Omit<Partial<PlotData>, 'x' | 'y'> & {
  x?: Array<string | number>;
  y?: Array<number | null>;
  _parentName?: string | null;
  legendGroup?: string;
  [key: string]: unknown;
};

const createLayout = (
  theme: Theme,
  timeResolution: IndicatorTimeResolution | undefined,
  xInterval: number | undefined,
  yRange: YRange,
  plotColors: PlotColors,
  config: LayoutConfig,
  subplotsNeeded: boolean,
  graphCustomBackground: string | undefined
): Partial<Layout> => {
  const fontFamily =
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, ' +
    'helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif';
  const hasCategories = false;

  // With Plotly you have choice between one significant digit precision for y axis ticks (.1r)
  // then on smaller (first digit) ranges you get repeated numbers on ticks.
  // With higher precision (.3r) you get more unique numbers but small numbers have decimals
  // Like 0.0 whiich is not very nice.

  const yaxis: NonNullable<Layout['yaxis']> = {
    automargin: true,
    hoverformat: ',.3r',
    tickformat: typeof yRange.ticksRounding === 'number' ? `,.${yRange.ticksRounding}~r` : ',.2~r',
    fixedrange: true,
    tickmode: 'auto',
    nticks: yRange.ticksCount ?? 5,
    tickfont: {
      family: fontFamily,
      size: 14,
    },
  };
  const yaxes: Partial<Layout> & Record<string, unknown> = { yaxis };

  // Define y-axis range
  yaxis.title = { text: yRange.unit };
  if (yRange.includeZero && yRange.range[0] == null) {
    yaxis.fixedrange = false;
    yaxis.rangemode = 'tozero';
  }

  // If min and max values are set, do not use autorange
  if (yRange.range[0] != null || yRange.range[1] != null) {
    yaxis.range = [yRange.range[0], yRange.range[1]];
    if (yRange.range[0] != null && yRange.range[1] != null) {
      yaxis.autorange = false;
    }
  } else if (config.yRange) {
    yaxis.autorange = false;
    yaxis.range = [config.yRange[0], config.yRange[1]];
  }

  // copy y-axis settings to all subplots
  for (let y = 2; y <= (config.subplotCount ?? 1); y += 1) {
    yaxes[`yaxis${y}`] = yaxis;
  }

  // X axis can be time or category
  const xaxes: Partial<Layout> & Record<string, unknown> = hasCategories
    ? {
        xaxis: {
          automargin: true,
          fixedrange: true,
          tickangle: (subplotsNeeded ? 'auto' : 90) as number | 'auto',
          tickfont: {
            family: fontFamily,
            size: 14,
          },
        },
      }
    : {
        xaxis: {
          automargin: true,
          fixedrange: true,
          showgrid: false,
          showline: false,
          tickformat: timeResolution === IndicatorTimeResolution.Year ? '%Y' : '%b %Y',
          tickmode: 'linear',
          dtick: `M${xInterval}`,
          tickfont: {
            family: fontFamily,
            size: 14,
          },
        },
      };

  // copy x-axis settings to all subplots
  for (let x = 2; x <= (config.subplotCount ?? 1); x += 1) {
    xaxes[`xaxis${x}`] = xaxes.xaxis;
  }

  const newLayout = {
    title: {},
    margin: {
      t: 25,
      r: 25,
      b: 25,
      l: 25,
      pad: 4,
    },
    ...yaxes,
    ...xaxes,
    hovermode: 'x unified',
    paper_bgcolor: theme.themeColors.white,
    plot_bgcolor: graphCustomBackground ?? theme.themeColors.white,
    autosize: true,
    colorway: plotColors.mainScale,
    font: { family: fontFamily, size: 12 },
    // showlegend: false,
    hoverlabel: {
      namelength: 0,
    },
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
        'sendDataToCloud',
      ],
      color: theme.textColor.secondary,
      bgcolor: theme.cardBackground.primary,
      activecolor: theme.brandDark,
    },
  } as Partial<Layout>;

  if (config.annotations?.length) {
    newLayout.annotations = config.annotations;
  }
  merge(newLayout, config);

  return newLayout;
};

interface CreateTracesParams {
  traces: LegacyTrace[];
  unit: string;
  plotColors: PlotColors;
  theme: Theme;
  styleCount?: number;
  categoryCount: number;
  hasTimeDimension: boolean;
  lineShape: string;
  useAreaGraph?: boolean | undefined;
  graphCustomBackground?: string | undefined;
  valueRounding: number | undefined;
}

interface TracesOutput {
  layoutConfig: LayoutConfig;
  traces: PlotTrace[];
}

const createTraces: (params: CreateTracesParams) => TracesOutput = (params) => {
  const {
    traces,
    unit,
    plotColors,
    theme,
    styleCount,
    categoryCount,
    hasTimeDimension,
    lineShape,
    useAreaGraph,
    valueRounding,
  } = params;

  // Figure out what we need to draw depending on dataset
  // and define trace and layout setup accordingly
  // First trace is always main/total

  const traceCount = traces.length;

  if (!traceCount)
    return {
      layoutConfig: {},
      traces: [],
    };

  const layoutConfig: Partial<Layout> = { xaxis: {} };

  let numColors = plotColors.mainScale.length;
  let numSymbols = plotColors.symbols.length;
  if (styleCount != null && styleCount > 0 && styleCount < numColors && styleCount < numSymbols) {
    numSymbols = numColors = styleCount;
  }

  const getMainColor = (index: number) => {
    const colors = plotColors.mainScale?.length ? plotColors.mainScale : ['#000000'];
    const colorCount = Math.max(1, Math.min(numColors, colors.length));
    return colors[index % colorCount];
  };

  const allXValues: Datum[] = [];

  const newTraces = traces.map((trace, idx) => {
    // Here we are excluding some properties from the trace
    const { xType, dataType, ...plotlyTrace } = trace;
    const modTrace: PlotTrace = { ...plotlyTrace };
    allXValues.push(...trace.x);

    // we have multiple categories in one time point - draw bar groups
    if (!hasTimeDimension) {
      modTrace.x = (modTrace.x as Datum[]).map((name) => splitLines(name as string));
      modTrace.type = 'bar';
      const hasSingleTraceWithMultipleBars = traceCount === 1 && trace.x.length > 1;
      modTrace.marker = {
        color:
          categoryCount < 2 || hasSingleTraceWithMultipleBars
            ? trace.y.map((_, i) => getMainColor(i))
            : getMainColor(idx),
      };
      layoutConfig.barmode = 'group';
      layoutConfig.xaxis!.type = 'category';
      layoutConfig.xaxis!.tickvals = undefined;
    }
    // we have one or more categories as time series - draw lines and markers
    if (hasTimeDimension) {
      modTrace.type = 'scatter';
      // we fill traces if there is only one trace and area graph is enabled
      if (traceCount === 1 && useAreaGraph) {
        modTrace.fill = 'tozeroy';
        modTrace.fillcolor = transparentize(0.8, plotColors.trace);
      }

      modTrace.line = {
        width: trace.dataType === 'total' ? 3 : 2, // TODO extension trace total vs dimension
        color:
          trace.dataType === 'total' ? plotColors.trace : plotColors.mainScale[idx % numColors],
      };

      // if we prefer smooth lines, set spline shape
      // TODO: 'smooth' is a wrong term we use in theme, we should use 'spline'
      if (lineShape === 'spline' || lineShape === 'smooth') {
        modTrace.line.shape = 'spline';
        modTrace.line.smoothing = 1.3;
      }

      modTrace.marker = {
        size: 8,
        symbol: plotColors.symbols[idx % numSymbols],
        color: plotColors.fillMarkers ? undefined : '#ffffff',
        line: {
          width: 2,
          color:
            trace.dataType === 'total' ? plotColors.trace : plotColors.mainScale[idx % numColors],
        },
      };
    }
    // Leave out markers for long time series
    if (modTrace.type === 'scatter') {
      if (trace.x.length > 30) {
        modTrace.mode = 'lines';
        modTrace.marker = { size: 0 };
      } else {
        modTrace.mode = 'lines+markers';
        modTrace.cliponaxis = false;
      }
    }

    // Theme setting is a hack for single user. Should be deprecated and use admin setting only.
    // If valueRounding for this indicator is defined we use it
    // If valueRounding is not defined we check if theme doesn't want rounding
    // Otherwise we default to 3 significant digits
    const significantDigits =
      theme.settings?.graphs?.roundIndicatorValue !== false ? (valueRounding ?? 3) : undefined;

    modTrace.hovertemplate = `${trace.name}: ${
      significantDigits ? `%{y:,.${significantDigits}r}` : '%{y:,.f}'
    } ${unit}`;
    modTrace.hoverlabel = {
      bgcolor:
        trace.dataType === 'total' ? plotColors.trace : plotColors.mainScale[idx % numColors],
      namelength: 0,
    };
    return modTrace;
  });

  return {
    layoutConfig,
    traces: newTraces,
  };
};

function getSubplotHeaders(
  subPlotRowCount: number,
  names: Array<string | null | undefined>
): Partial<Annotations>[] {
  return names.map((name, idx) => {
    const column = (idx / 2) % 1;
    const row = Math.floor(idx / 2) / subPlotRowCount;
    return {
      text: `<b>${splitLines(name ?? '')}</b>`,
      font: {
        size: 16,
      },
      showarrow: false,
      x: column + column * 0.1 + 0.02,
      y: 1 - row - row * 0.3 * (1 / subPlotRowCount), // wild improvisation
      xref: 'paper' as const,
      xanchor: 'left' as const,
      yref: 'paper' as const,
      yanchor: 'bottom' as const,
    };
  });
}

// Since plotlyjs is not great with determining x axis range, we do it ourselves
// Return nice interval in months depending on timeResolution
// We want max 10 xticks
const getXInterval = (
  dataset: PlotTrace[],
  timeResolution: IndicatorTimeResolution | undefined
) => {
  // Use flatMap to simplify the creation of allXValues
  const allXValues = dataset
    .flatMap((trace) => trace.x ?? [])
    .map((x) => new Date(x))
    .filter((d) => !Number.isNaN(d.getTime()));

  // It's a category dataset or all dates were invalid
  if (allXValues.length === 0) return undefined;

  const min = new Date(Math.min(...allXValues.map((date) => date.getTime())));
  const max = new Date(Math.max(...allXValues.map((date) => date.getTime())));

  // Simplified month calculation
  const months = (max.getFullYear() - min.getFullYear()) * 12 + max.getMonth() - min.getMonth();

  const MAX_TICKS = 10;

  if (timeResolution === IndicatorTimeResolution.Year) {
    // For yearly data, ensure the interval is divisible by 12
    return Math.max(12, Math.ceil(months / MAX_TICKS / 12) * 12);
  } else {
    // For other resolutions, use binary search to find the best interval
    const possibleIntervals = [1, 2, 3, 4, 6, 12, 24, 36, 48, 60];
    let low = 0;
    let high = possibleIntervals.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (months / possibleIntervals[mid] <= MAX_TICKS) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return possibleIntervals[low] || possibleIntervals[possibleIntervals.length - 1];
  }
};

interface IndicatorGraphProps {
  title?: string;
  yRange: YRange;
  timeResolution?: IndicatorTimeResolution;
  traces: LegacyTrace[];
  goalTraces: GoalTrace[];
  trendTrace: GoalTrace | null;
  specification: GraphSpecification;
}

const Plot = dynamic(() => import('@/components/graphs/Plot'));

function IndicatorGraph(props: IndicatorGraphProps) {
  const theme = useTheme();
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }
  const { yRange, timeResolution, traces, goalTraces, trendTrace, specification } = props;

  const traceNames = traces.map((trace) => {
    return trace.name;
  });
  const traceCategoryNames = traces.flatMap((trace) =>
    Array.isArray(trace.x) ? trace.x.map(String) : []
  );
  const categoryColors = specification.dimensions[0]?.categories
    ?.filter((category) => {
      // Only include colours of existing traces. (Takes care of filtering out
      // total line if visualization has been defined not to include total line)
      if (traceNames.includes(category.name) || traceCategoryNames.includes(category.name))
        return true;
      return false;
    })
    .map((category, idx) => {
      // If dimension categories have a color defined by user, use it,
      // otherwise use default colors from theme or fallback to black
      if (category.defaultColor) return category.defaultColor;
      if (theme.settings?.graphs?.categoryColors) {
        const length = theme.settings.graphs.categoryColors.length;
        return theme.settings.graphs.categoryColors[idx % length];
      }
      return '#000000';
    });

  const themeCategoryColors = theme.settings?.graphs?.categoryColors;

  const graphSettings = theme.settings.graphs!;
  const plotColors = {
    trace: graphSettings.totalLineColor,
    trend: graphSettings.trendLineColor,
    goalScale: graphSettings.goalLineColors,
    mainScale: categoryColors?.length
      ? categoryColors
      : themeCategoryColors?.length
        ? themeCategoryColors
        : ['#000000'],
    fillMarkers: graphSettings.fillMarkers ?? false,
    symbols: graphSettings.categorySymbols ?? ['circle'],
    goalSymbol: graphSettings.goalSymbol ?? 'circle',
    goalLine: graphSettings.drawGoalLine ?? false,
  };

  // TODO: these ought to be set in the backend
  const lineShape = theme.settings?.graphs?.lineShape || 'spline';
  const useAreaGraph = theme.settings?.graphs?.areaGraphs;

  const graphCustomBackground = theme.settings?.graphs?.customBackground;

  const subplotsNeeded =
    specification.axes.filter((a) => ['comparison', 'categories'].includes(a[0])).length > 1;
  const comparisonAxis = specification.axes.filter((a) => a[0] === 'comparison');
  const isComparison = comparisonAxis.length > 0;

  const categoryCount = specification.axes.length > 0 ? specification.axes[0][1] : 0;

  // Defines if we draw time series or bar graphs
  // Only multiple categories with single time point are bar graphs
  const hasTimeDimension =
    specification.axes.filter((a) => a[0] === 'time').length > 0 || categoryCount == 0;
  let styleCount = -1;
  const xAxisIsUsedForCategories =
    specification.axes[0] != null &&
    specification.axes[0][0] === 'categories' &&
    specification.dimensions[0] != null;
  if (isComparison) {
    styleCount = comparisonAxis[0][1] + 1;
  } else if (!hasTimeDimension && !subplotsNeeded) {
    if (categoryCount > 1 || xAxisIsUsedForCategories) {
      /* We want to use colors (styles) for categories, either because
       * that's the only available visual distinguishing mark for
       * categories (categoryCount > 1), or in addition to using the x
       * axis for categories, for added visual effect
       */
      styleCount = specification.dimensions[0]?.categories?.length ?? 1;
    } else {
      styleCount = 1;
    }
  }

  const mainTraces = createTraces({
    traces,
    unit: yRange.unit,
    plotColors,
    theme,
    styleCount,
    categoryCount,
    hasTimeDimension,
    lineShape,
    useAreaGraph,
    graphCustomBackground,
    valueRounding: yRange.valueRounding,
  });

  if (subplotsNeeded) {
    const categoryDimensions = specification.dimensions.slice(0, categoryCount);
    const organizationDimension = specification.dimensions[categoryCount];
    // Assume there is always type='aggregate' that doesn't get multiplied
    const combinationCount =
      categoryDimensions.reduce((p, c) => p * (c.categories.length - 1), 1) +
      categoryDimensions.length;
    const subplotRowCount = Math.ceil(combinationCount / 2);
    const comparisonCount = hasTimeDimension ? 2 : 1;
    const subplotHeaderTitles = mainTraces.traces
      .filter((_, i) => i % comparisonCount == 0)
      .map((t) => t._parentName);
    mainTraces.layoutConfig.grid = {
      rows: subplotRowCount,
      columns: 2,
      pattern: 'independent',
    };
    mainTraces.layoutConfig.yRange = [0, 100];
    mainTraces.layoutConfig.subplotCount = combinationCount;
    mainTraces.layoutConfig.annotations = getSubplotHeaders(subplotRowCount, subplotHeaderTitles);
    mainTraces.traces.forEach((t, idx) => {
      const axisIndex = hasTimeDimension ? Math.floor(idx / 2) + 1 : idx + 1;
      if (!hasTimeDimension || idx > 1) {
        t.showlegend = false;
      } else {
        t.legendGroup = t.name = organizationDimension.categories[idx % 2].name;
      }
      if (axisIndex > 1) {
        for (const c of ['x', 'y']) {
          t[`${c}axis`] = `${c}${axisIndex}`;
        }
      }
    });
  }
  const { layoutConfig, traces: plotlyData } = mainTraces;

  // add trend if defined
  if (!isComparison && trendTrace)
    plotlyData.push({
      type: 'scatter',
      mode: 'lines',
      line: {
        width: 3,
        color: plotColors.trend,
        dash: 'dash',
      },
      hoverinfo: 'skip',
      ...trendTrace,
    });

  // add goals if defined
  if (!isComparison && goalTraces.length) {
    goalTraces.forEach((goalTrace, idx) => {
      plotlyData.push({
        x: goalTrace.x,
        y: goalTrace.y,
        name: goalTrace.name,
        type: 'scatter',
        cliponaxis: false,
        // TODO: check legacy intention with different rendering of scenario goals
        mode: plotColors.goalLine ? 'lines+markers' : 'markers',
        ...(plotColors.goalLine && {
          line: {
            width: 3,
            dash: 'dash',
            color: plotColors.goalScale[idx % plotColors.goalScale.length],
          },
        }),
        marker: {
          size: 12,
          symbol: plotColors.goalSymbol,
          color: plotColors.goalScale[idx % plotColors.goalScale.length],
        },
        opacity: 0.5,
        hovertemplate: `${goalTrace.name}: %{y} ${yRange.unit}`,
        hoverlabel: {
          namelength: 0,
          bgcolor: '#fff',
        },
      });
    });
  }

  const layout = createLayout(
    theme,
    timeResolution,
    getXInterval(plotlyData, timeResolution),
    yRange,
    plotColors,
    layoutConfig,
    subplotsNeeded,
    graphCustomBackground
  );
  const height = layoutConfig?.grid?.rows
    ? layoutConfig.grid.rows * 300
    : 450 + (!hasTimeDimension ? CATEGORY_XAXIS_LABEL_EXTRA_MARGIN : 0);

  return (
    <PlotContainer data-element="indicator-graph-plot-container" $vizHeight={height}>
      <Plot
        data={plotlyData}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
        onAfterPlot={() => {
          const event = new Event('indicator_graph_ready');
          document.dispatchEvent(event);
        }}
        config={{
          displaylogo: false,
          staticPlot: false,
        }}
      />
    </PlotContainer>
  );
}

export default IndicatorGraph;
