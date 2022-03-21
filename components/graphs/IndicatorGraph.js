import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';

const log10 = Math.log(10);

const PlotContainer = styled.div`
  height: ${(props) => props.vizHeight}px;
`;

const createLayout = (
  timeResolution,
  yRange,
  plotColors,
  config,
) => {
  const fontFamily = '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif';
  const hasCategories = config.xType === 'category';

  const yaxes = {
    yaxis: {
      hoverformat: `${config.maxDigits === 0 ? '' : '.'}${config.maxDigits}r`,
      separatethousands: true,
      fixedrange: true,
      tickfont: {
        family: fontFamily,
        size: 14,
      },
    },
  };

  // Define y-axis range
  yaxes.yaxis.title = yRange.unit;
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

  const xaxes = hasCategories
    ? {
      xaxis: {
        type: 'category',
        tickfont: {
          family: fontFamily,
          size: 14,
        },
      },
    }
    : {
      xaxis: {
        showgrid: false,
        showline: false,
        type: timeResolution === 'YEAR' ? 'linear' : 'date',
        fixedrange: false,
        tickformat: timeResolution === 'YEAR' ? 'd' : '%d.%m.%Y',
        tickmode: null,
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
    title: null,
    margin: {
      t: 50,
      r: 50,
      b: 50,
      l: 50,
    },
    ...yaxes,
    ...xaxes,
    barmode: hasCategories && 'group',
    autosize: true,
    colorway: plotColors.mainScale,
    font: { family: fontFamily, size: 12 },

    // showlegend: false,
    separators: ', ',
    hoverlabel: {
      namelength: 0,
    },
    annotations: config?.annotations,
  };

  _.merge(newLayout, config);

  return newLayout;
};

function getSignificantDigitCount(n) {
  let val = Math.abs(String(n).replace('.', '')); // remove decimal and make positive
  if (val === 0) return 0;
  while (val !== 0 && val % 10 === 0) val /= 10; // kill the 0s at the end of n

  return Math.floor(Math.log(val) / log10) + 1; // get number of digits
}

const createTraces = (traces, unit, plotColors, styleCount, categoryCount) => {
  // Figure out what we need to draw depending on dataset
  // and define trace and layout setup accordingly
  // First trace is always main/total

  if (!traces.length) return [];
  let maxDigits = 0;
  const layoutConfig = {
    xaxis: {},
  };

  let numColors = plotColors.mainScale.length;
  let numSymbols = plotColors.symbols.length;
  if (styleCount != null && styleCount > 0 && styleCount < numColors && styleCount < numSymbols) {
    numSymbols = numColors = styleCount;
  }

  const allXValues = [];

  const newTraces = traces.map((trace, idx) => {
    const modTrace = trace;
    trace.y.forEach((value) => {
      // Determine the highest number of significant digits in the dataset
      // to be able to set suitable number formating.
      const digitCount = getSignificantDigitCount(value);
      if (digitCount > maxDigits) maxDigits = digitCount;
    });

    allXValues.push(...trace.x);

    // we have multiple categories in one time point - draw bar groups
    if (trace.xType === 'category') {
      modTrace.type = 'bar';
      modTrace.marker = {
        color: (categoryCount < 2 ?
                trace.y.map((y, i) => plotColors.mainScale[i % numColors]) :
                plotColors.mainScale[idx % numColors]),
      };
      layoutConfig.barmode = 'group';
      layoutConfig.xaxis.type = 'category';
      layoutConfig.xaxis.tickvals = null;
    }
    // we have multiple categories as time series - draw lines and markers
    if (trace.xType === 'time') {
      modTrace.type = 'scatter';
      modTrace.line = {
        width: trace.dataType === 'total' ? 3 : 2, // TODO extension trace total vs dimension
        shape: 'spline',
        smoothing: 0.7,
        color: plotColors.mainScale[idx % numColors],
      };
      modTrace.marker = {
        size: 6,
        symbol: plotColors.symbols[idx % numSymbols],
        color: '#ffffff',
        line: {
          width: 2,
          color: plotColors.mainScale[idx % numColors],
        },
      };
    }
    if (modTrace.type === 'scatter') modTrace.mode = (trace.x.length > 30) ? 'lines' : 'lines+markers';
    modTrace.hovertemplate = `(%{x}) ${trace.name}: %{y} ${unit}`;
    modTrace.hoverinfo = 'none';
    modTrace.hoverlabel = {
      bgcolor: plotColors.mainScale[idx % numColors],
      namelength: 0,
    };
    return modTrace;
  });
  if (layoutConfig.xaxis?.type !== 'category') {
    const uniqueXValues = _.uniq(allXValues.sort(), true);
    if (uniqueXValues.length < 4) {
      layoutConfig.xaxis.tickvals = uniqueXValues;
    }
  }
  layoutConfig.maxDigits = maxDigits > 3 ? 3 : maxDigits;

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
      text: `<b>${name}</b>`,
      font: {
        size: 16,
      },
      showarrow: false,
      x: column + column * 0.1 + 0.02,
      y: 1 - row - (row * 0.3 * (1 / subPlotRowCount)), // wild improvisation
      xref: 'paper',
      xanchor: 'left',
      yref: 'paper',
      yanchor: 'bottom',
    };
  });
}

// TODO: incorporate these range heuristics somewhere
// TODO: Hack for demo - we are dealing with percentages so figure out a nice percentage range
// if (yRange[0] > 45) {
//   yRange[0] = 45;
//   yRange[1] = 105;
// } else if (yRange[1] < 50) {
//   yRange[0] = 0;
//   yRange[1] = 50;
// } else {
//   yRange[0] = 0;
//   yRange[1] = 105;
// }


function IndicatorGraph(props) {
  if (!process.browser) {
    return null;
  }
  const {
    yRange,
    timeResolution,
    traces,
    goalTraces,
    trendTrace,
    specification
  } = props;

  const Plot = dynamic(import('./Plot'));
  const theme = useTheme();
  const { i18n } = useTranslation();

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

  let mainTraces = [];
  let isComparison = false;
  const subplotsNeeded = specification.axes.filter(a => ['comparison', 'categories'].includes(a[0])).length > 1;
  const comparisonAxis = specification.axes.filter(a => a[0] === 'comparison');
  const hasTimeDimension = specification.axes.filter(a => a[0] === 'time').length > 0;
  const categoryCount = specification.axes.length > 0 ? specification.axes[0][1] : 0;
  let styleCount = null;
  if (comparisonAxis.length > 0) {
    styleCount = comparisonAxis[0][1] + 1;
    isComparison = true;
  }
  else if (!hasTimeDimension && !subplotsNeeded && categoryCount > 1) {
    styleCount = specification.dimensions[0].categories.length;
  }
  mainTraces = createTraces(traces, yRange.unit, plotColors, styleCount, categoryCount);

  if (subplotsNeeded) {
    const categoryDimensions = specification.dimensions.slice(0, categoryCount);
    const organizationDimension = specification.dimensions.at(categoryCount);
    const combinationCount = categoryDimensions.reduce(((p, c) => (p * c.categories.length)), 1)
    const subplotRowCount = Math.ceil(combinationCount/2);
    const COMPARISON_COUNT = 2;
    const subplotHeaderTitles = mainTraces.traces.filter((_,i) => (
      (i % COMPARISON_COUNT) == 0)
    ).map(t => t._parentName);
    mainTraces.layoutConfig.grid = { rows: subplotRowCount, columns: 2, pattern: 'independent' };
    mainTraces.layoutConfig.yRange = [0, 100];
    mainTraces.layoutConfig.subplotCount = combinationCount;
    mainTraces.layoutConfig.annotations = getSubplotHeaders(subplotRowCount, subplotHeaderTitles);
    mainTraces.traces.forEach((t, idx) => {
      const axisIndex = hasTimeDimension ? Math.floor(idx / 2) + 1: idx + 1;
      if (!hasTimeDimension || idx > 1) {
        t.showlegend = false;
      }
      else {
        t.legendGroup = t.name = organizationDimension.categories[idx % 2].name;
      }
      if (axisIndex > 1) {
        for (let c of ['x', 'y']) {
          t[`${c}axis`] = `${c}${axisIndex}`;
        }
      }
    });
  }
  const { layoutConfig, traces: plotlyData } = mainTraces;

  // add trend if defined
  if (!isComparison && trendTrace) plotlyData.push({
    type: 'scatter',
    mode: 'lines',
    line: {
      width: 3,
      color: plotColors.trend,
      dash: 'dash',
    },
    hoverinfo: 'none',
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
        hoverinfo: 'none',
        hovertemplate: `(%{x}) ${goalTrace.name}: %{y} ${yRange.unit}`,
        hoverlabel: {
          namelength: 0,
          bgcolor: '#fff',
        },
      });
    });
  }

  const layout = createLayout(
    timeResolution,
    yRange,
    plotColors,
    layoutConfig,
  );
  return (
    <PlotContainer vizHeight={layoutConfig?.grid?.rows ? layoutConfig.grid.rows * 300 : 450}>
      <Plot
        data={plotlyData}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
        config={{
          locale: i18n.language,
          displayModeBar: false,
          showSendToCloud: true,
          staticPlot: false,
        }}
      />
    </PlotContainer>
  );
}

IndicatorGraph.defaultProps = {
  goalTraces: [],
  trendTrace: {},
};

IndicatorGraph.propTypes = {
  yRange: PropTypes.shape().isRequired,
  timeResolution: PropTypes.string.isRequired,
  goalTraces: PropTypes.arrayOf(PropTypes.shape),
  trendTrace: PropTypes.shape(),
};

export default IndicatorGraph;
