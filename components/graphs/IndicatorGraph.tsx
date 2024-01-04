'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { merge, uniq } from 'lodash';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { transparentize } from 'polished';
import { splitLines } from 'common/utils';
import { Layout } from 'plotly.js';
import { PlotParams } from 'react-plotly.js';

const log10 = Math.log(10);

const PlotContainer = styled.div<{ $vizHeight: number }>`
  height: ${(props) => props.$vizHeight}px;
`;

const CATEGORY_XAXIS_LABEL_EXTRA_MARGIN = 200;

const createLayout = (
  theme,
  timeResolution,
  yRange,
  plotColors,
  config,
  hasTimeDimension,
  subplotsNeeded,
  graphCustomBackground
): Partial<PlotParams['layout']> => {
  const fontFamily =
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif';
  const hasCategories = !hasTimeDimension;

  const yaxes: NonNullable<Pick<Layout, 'yaxis'>> = {
    yaxis: {
      automargin: true,
      hoverformat: `${config.maxDigits === 0 ? '' : '.'}${config.maxDigits}r`,
      separatethousands: true,
      tickformat: 'f',
      fixedrange: true,
      tickfont: {
        family: fontFamily,
        size: 14,
      },
    },
  };

  // Define y-axis range
  yaxes.yaxis.title = { text: yRange.unit };
  if (yRange.includeZero) {
    yaxes.yaxis.rangemode = 'tozero';
  }

  // If min and max values are set, do not use autorange
  if (yRange.range[0] != null || yRange.range[1] != null) {
    yaxes.yaxis.range = [yRange.range[0], yRange.range[1]];
    if (yRange.range[0] != null && yRange.range[1] != null) {
      yaxes.yaxis.autorange = false;
    }
  } else if (config.yRange) {
    yaxes.yaxis.autorange = false;
    yaxes.yaxis.range = [config.yRange[0], config.yRange[1]];
  }

  // copy y-axis settings to all subplots
  for (let y = 2; y <= config.subplotCount; y += 1) {
    yaxes[`yaxis${y}`] = yaxes.yaxis;
  }

  // X axis can be time or category
  const xaxes = hasCategories
    ? {
        xaxis: {
          automargin: true,
          type: 'category',
          tickangle: subplotsNeeded ? 'auto' : 90,
          tickfont: {
            family: fontFamily,
            size: 14,
          },
        },
      }
    : {
        xaxis: {
          automargin: true,
          showgrid: false,
          showline: false,
          fixedrange: false,
          nticks: config?.xTicksMax,
          tickformat: timeResolution === 'YEAR' ? '%Y' : '%b %Y',
          tickmode: 'auto',
          tickfont: {
            family: fontFamily,
            size: 14,
          },
        },
      };

  // copy x-axis settings to all subplots
  for (let x = 2; x <= config.subplotCount; x += 1) {
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
      autoexpand: true,
    },
    ...yaxes,
    ...xaxes,
    paper_bgcolor: theme.themeColors.white,
    plot_bgcolor: graphCustomBackground || theme.themeColors.white,
    autosize: true,
    colorway: plotColors.mainScale,
    font: { family: fontFamily, size: 12 },
    // showlegend: false,
    hoverlabel: {
      namelength: 0,
    },
  };

  if (config?.annotations?.length > 0) {
    newLayout.annotations = config.annotations;
  }
  merge(newLayout, config);

  return newLayout;
};

function getSignificantDigitCount(n) {
  let val = Math.abs(String(n).replace('.', '')); // remove decimal and make positive
  if (val === 0) return 0;
  while (val !== 0 && val % 10 === 0) val /= 10; // kill the 0s at the end of n

  return Math.floor(Math.log(val) / log10) + 1; // get number of digits
}

const createTraces = (
  traces,
  unit,
  plotColors,
  styleCount,
  categoryCount,
  hasTimeDimension,
  timeResolution,
  lineShape,
  useAreaGraph
) => {
  // Figure out what we need to draw depending on dataset
  // and define trace and layout setup accordingly
  // First trace is always main/total

  const traceCount = traces.length;

  if (!traceCount) return [];
  let maxDigits = 0;
  const layoutConfig = {
    xaxis: {},
  };

  let numColors = plotColors.mainScale.length;
  let numSymbols = plotColors.symbols.length;
  if (
    styleCount != null &&
    styleCount > 0 &&
    styleCount < numColors &&
    styleCount < numSymbols
  ) {
    numSymbols = numColors = styleCount;
  }

  const allXValues = [];

  const newTraces = traces.map((trace, idx) => {
    const modTrace = { ...trace, cliponaxis: false };

    trace.y.forEach((value) => {
      // Determine the highest number of significant digits in the dataset
      // to be able to set suitable number formating.
      const digitCount = getSignificantDigitCount(value);
      if (digitCount > maxDigits) maxDigits = digitCount;
    });

    allXValues.push(...trace.x);

    // we have multiple categories in one time point - draw bar groups
    if (!hasTimeDimension) {
      modTrace.x = modTrace.x.map((name) => splitLines(name));
      modTrace.type = 'bar';
      modTrace.marker = {
        color:
          categoryCount < 2
            ? trace.y.map((y, i) => plotColors.mainScale[i % numColors])
            : plotColors.mainScale[idx % numColors],
      };
      layoutConfig.barmode = 'group';
      layoutConfig.xaxis.type = 'category';
      layoutConfig.xaxis.tickvals = null;
    }
    // we have one or more categories as time series - draw lines and markers
    if (hasTimeDimension) {
      modTrace.type = 'scatter';
      // we fill traces if there is only one trace and area graph is enabled
      if (traceCount === 1 && useAreaGraph) {
        modTrace.fill = 'tozeroy';
        modTrace.fillcolor = transparentize(
          0.8,
          plotColors.mainScale[idx % numColors]
        );
      }

      modTrace.line = {
        width: trace.dataType === 'total' ? 3 : 2, // TODO extension trace total vs dimension
        color: plotColors.mainScale[idx % numColors],
      };

      // if we prefer smooth lines, set spline shape
      if (lineShape === 'spline') {
        modTrace.line.shape = 'spline';
        modTrace.line.smoothing = 1.3;
      }

      modTrace.marker = {
        size: 8,
        symbol: plotColors.symbols[idx % numSymbols],
        color: '#ffffff',
        line: {
          width: 2,
          color: plotColors.mainScale[idx % numColors],
        },
      };
    }
    // Leave out markers for long time series
    if (modTrace.type === 'scatter')
      modTrace.mode = trace.x.length > 30 ? 'lines' : 'lines+markers';
    const timeFormat = timeResolution === 'YEAR' ? '%Y' : '%x';
    modTrace.hovertemplate = `(%{x|${timeFormat}})<br> ${trace.name}: %{y:f} ${unit}`;
    modTrace.hoverinfo = 'none';
    modTrace.hoverlabel = {
      bgcolor: plotColors.mainScale[idx % numColors],
      namelength: 0,
    };
    return modTrace;
  });
  const uniqueXValues = uniq(allXValues.sort(), true);
  if (layoutConfig.xaxis?.type !== 'category') {
    if (uniqueXValues.length < 4) {
      layoutConfig.xaxis.tickvals = uniqueXValues;
    }
  }
  layoutConfig.maxDigits = maxDigits > 3 ? 3 : maxDigits;

  // Avoid repetitive years to set max value of xaxis ticks
  layoutConfig.xTicksMax = uniqueXValues.length;

  return {
    layoutConfig,
    traces: newTraces,
  };
};

function getSubplotHeaders(subPlotRowCount, names) {
  return names.map((name, idx) => {
    const column = (idx / 2) % 1;
    const row = Math.floor(idx / 2) / subPlotRowCount;
    return {
      text: `<b>${splitLines(name)}</b>`,
      font: {
        size: 16,
      },
      showarrow: false,
      x: column + column * 0.1 + 0.02,
      y: 1 - row - row * 0.3 * (1 / subPlotRowCount), // wild improvisation
      xref: 'paper',
      xanchor: 'left',
      yref: 'paper',
      yanchor: 'bottom',
    };
  });
}

interface IndicatorGraphProps {
  yRange: any;
  timeResolution?: 'YEAR' | 'MONTH';
  traces: any;
  goalTraces: any;
  trendTrace: any;
  specification: {
    axes: any;
    dimensions: any;
  };
}

const Plot = dynamic(() => import('./Plot'));

function IndicatorGraph(props: IndicatorGraphProps) {
  const theme = useTheme();
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }
  const {
    yRange,
    timeResolution,
    traces,
    goalTraces,
    trendTrace,
    specification,
  } = props;

  const plotColors = {
    trace: theme.graphColors.red070,
    trend: theme.graphColors.red030,
    goalScale: [
      theme.graphColors.green070,
      theme.graphColors.green030,
      theme.graphColors.green050,
      theme.graphColors.green090,
      theme.graphColors.green010,
    ],
    mainScale: [
      theme.graphColors.red070,
      theme.graphColors.blue050,
      theme.graphColors.yellow030,
      theme.graphColors.green030,
      theme.graphColors.blue030,
      theme.graphColors.yellow070,
      theme.graphColors.green070,
      theme.graphColors.red030,
      theme.graphColors.green090,
      theme.graphColors.yellow010,
    ],
    symbols: [
      'circle',
      'square',
      'diamond',
      'pentagon',
      'hexagram',
      'star-diamond',
      'hash',
      'y-down',
    ],
  };

  /* Override goal line color from theme, only supports single color */
  if (theme.settings?.graphs?.goalLineColor) {
    plotColors.goalScale = [theme.settings.graphs.goalLineColor];
  }

  // TODO: these ought to be set in the backend
  const lineShape = theme.settings?.graphs?.lineShape || 'spline';
  const useAreaGraph = theme.settings?.graphs?.areaGraphs;
  const showTrendline = theme.settings?.graphs?.showTrendline ?? true;
  const graphCustomBackground = theme.settings?.graphs?.customBackground;

  let mainTraces = [];
  let isComparison = false;
  const subplotsNeeded =
    specification.axes.filter((a) =>
      ['comparison', 'categories'].includes(a[0])
    ).length > 1;
  const comparisonAxis = specification.axes.filter(
    (a) => a[0] === 'comparison'
  );
  const hasTimeDimension =
    specification.axes.filter((a) => a[0] === 'time').length > 0;
  const categoryCount =
    specification.axes.length > 0 ? specification.axes[0][1] : 0;
  let styleCount = null;
  if (comparisonAxis.length > 0) {
    styleCount = comparisonAxis[0][1] + 1;
    isComparison = true;
  } else if (!hasTimeDimension && !subplotsNeeded) {
    if (categoryCount > 1) {
      styleCount = specification.dimensions[0].categories.length;
    } else {
      styleCount = 1;
    }
  }
  if (!hasTimeDimension) {
    // For bar graphs, the red color looks too heavy.
    // Shift to blue.
    plotColors.mainScale.shift();
  }
  mainTraces = createTraces(
    traces,
    yRange.unit,
    plotColors,
    styleCount,
    categoryCount,
    hasTimeDimension,
    timeResolution,
    lineShape,
    useAreaGraph,
    graphCustomBackground
  );

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
    mainTraces.layoutConfig.annotations = getSubplotHeaders(
      subplotRowCount,
      subplotHeaderTitles
    );
    mainTraces.layoutConfig.xTicksMax = mainTraces.traces[0].length;
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
  if (!isComparison && trendTrace && showTrendline)
    plotlyData.push({
      type: 'scatter',
      mode: 'lines',
      line: {
        width: 3,
        color: plotColors.trend,
        dash: 'dash',
      },
      //info: 'none',
      ...trendTrace,
    });

  // add goals if defined
  if (!isComparison && goalTraces.length) {
    goalTraces.forEach((goalTrace, idx) => {
      plotlyData.push({
        ...goalTrace,
        type: 'scatter',
        mode: goalTrace.scenario ? 'markers' : 'lines+markers',
        line: {
          width: 3,
          dash: 'dash',
          color: plotColors.goalScale[idx % plotColors.goalScale.length],
        },
        marker: {
          size: 12,
          symbol: 'x',
          color: plotColors.goalScale[idx % plotColors.goalScale.length],
        },
        opacity: 0.7,
        hovertemplate: `(%{x}) ${goalTrace.name}: %{y} ${yRange.unit}`,
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
    yRange,
    plotColors,
    layoutConfig,
    hasTimeDimension,
    subplotsNeeded,
    graphCustomBackground
  );
  const height = layoutConfig?.grid?.rows
    ? layoutConfig.grid.rows * 300
    : 450 + (!hasTimeDimension ? CATEGORY_XAXIS_LABEL_EXTRA_MARGIN : 0);

  return (
    <>
      <PlotContainer
        data-element="indicator-graph-plot-container"
        $vizHeight={height}
      >
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
            displayModeBar: false,
            showSendToCloud: true,
            staticPlot: false,
          }}
        />
      </PlotContainer>
    </>
  );
}

export default IndicatorGraph;
