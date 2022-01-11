import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';

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
  const yaxes = {
    yaxis: {
      hoverformat: `${yRange.maxDigits === 0 ? '' : '.'}${yRange.maxDigits}r`,
      separatethousands: true,
      fixedrange: true,
      tickfont: {
        family: fontFamily,
        size: 14,
      },
    },
  };

  // Define y-axis range
  yaxes.yaxis.title = yRange.title;
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

  const xaxes = {
    xaxis: {
      showgrid: false,
      showline: false,
      // domain: [0.01, 1],
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
    barmode: 'group',
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

const createTraces = (traces, plotColors) => {
  // Figure out what we need to draw depending on dataset
  // and define trace and layout setup accordingly
  // First trace is always main/total

  if (!traces.length) return [];

  const layoutConfig = {
    xaxis: {},
  };
  const newTraces = traces.map((trace, idx) => {
    const modTrace = trace;
    modTrace.line = {
      width: trace.dataType === 'total' ? 3 : 2,
      shape: 'spline',
      smoothing: 0.7,
    };
    // we have multiple categories in one time point - draw bar groups
    if (trace.xType === 'category') {
      modTrace.type = 'bar';
      modTrace.marker = {
        color: plotColors.mainScale[idx % plotColors.mainScale.length],
      };
      layoutConfig.barmode = 'group';
      layoutConfig.xaxis.type = 'category';
      layoutConfig.xaxis.tickvals = null;
    }
    // we have multiple categories as time series - draw lines and markers
    if (trace.xType === 'time') {
      modTrace.type = 'scatter';
      modTrace.marker = {
        size: 6,
        symbol: plotColors.symbols[idx % plotColors.symbols.length],
        color: '#ffffff',
        line: {
          width: 3,
          color: plotColors.mainScale[idx % plotColors.mainScale.length],
        },
      };
      if (trace.x.length < 4) {
        layoutConfig.xaxis.tickvals = trace.x.sort();
      }
    }
    modTrace.mode = (trace.x.length > 30) ? 'lines' : 'lines+markers';
    modTrace.line.color = plotColors.mainScale[idx % plotColors.mainScale.length];
    return modTrace;
  });

  if (newTraces[newTraces.length - 1].xType === 'category') newTraces.shift();

  return {
    layoutConfig,
    traces: newTraces,
  };
};

const compare = (org1, org2, plotColors) => {
  const yRange = [];
  const categoryPlots = org2.map((toCat, idx) => {
    const fromCat = org1.find((cat) => cat.name === toCat.name);
    yRange[0] = _.min(_.concat(fromCat.y, toCat.y, yRange[0]));
    yRange[1] = _.max(_.concat(fromCat.y, toCat.y, yRange[1]));
    return [
      {
        ...fromCat,
        name: fromCat.organization.abbreviation,
        xaxis: `x${idx + 1}`,
        yaxis: `y${idx + 1}`,
        showlegend: idx === 0,
      },
      {
        ...toCat,
        name: toCat.organization.abbreviation,
        xaxis: `x${idx + 1}`,
        yaxis: `y${idx + 1}`,
        showlegend: idx === 0,
      },
    ];
  });
  // TODO: Hack for demo - we are dealing with percentages so figure out a nice percentage range
  if (yRange[0] > 45) {
    yRange[0] = 45;
    yRange[1] = 105;
  } else if (yRange[1] < 50) {
    yRange[0] = 0;
    yRange[1] = 50;
  } else {
    yRange[0] = 0;
    yRange[1] = 105;
  }

  const traces = [];
  const categoryTraces = categoryPlots.map((plot) => createTraces(plot, plotColors));

  categoryTraces.forEach((cat) => {
    traces.push(cat.traces[0]);
    traces.push(cat.traces[1]);
  });

  const subPlotRowCount = Math.ceil(categoryTraces.length / 2);

  const subplotHeaders = org2.map((plot, idx) => {
    // Let us try to position annotations as headers for each of the subplots
    const column = (idx / 2) % 1;
    const row = Math.floor(idx / 2) / subPlotRowCount;
    return {
      text: `<b>${plot.name}</b>`,
      font: {
        size: 16,
      },
      showarrow: false,
      x: column + column * 0.1,
      y: 1 - row - (row * 0.3 * (1 / subPlotRowCount)), // wild improvisation
      xref: 'paper',
      xanchor: 'left',
      yref: 'paper',
      yanchor: 'bottom',
    };
  });

  // const compareTo = createTraces(org2, plotColors);
  // const { traces: comparisonTraces } = compareTo;
  return {
    layoutConfig: {
      ...categoryTraces[0].layoutConfig,
      grid: { rows: subPlotRowCount, columns: 2, pattern: 'independent' },
      subplotCount: categoryTraces.length,
      annotations: subplotHeaders,
      yRange,
    },
    traces,
  };
};
function IndicatorGraph(props) {
  if (!process.browser) {
    return null;
  }
  const {
    traces,
    yRange,
    timeResolution,
    goalTraces,
    trendTrace,
    comparison,
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

  console.log('traces', traces);
  let mainTraces = [];
  const isComparison = comparison && comparison.traces.length > 0;

  if (isComparison) {
    mainTraces = compare(traces, comparison.traces, plotColors);
  } else mainTraces = createTraces(traces, plotColors);

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
        hoverinfo: 'x+y',
        hovertemplate: `%{x}: %{y} ${yRange.title} ${goalTrace.name}`,
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
  comparison: undefined,
};

IndicatorGraph.propTypes = {
  traces: PropTypes.arrayOf(PropTypes.shape).isRequired,
  yRange: PropTypes.shape().isRequired,
  timeResolution: PropTypes.string.isRequired,
  goalTraces: PropTypes.arrayOf(PropTypes.shape),
  trendTrace: PropTypes.shape(),
  comparison: PropTypes.shape(),
};

export default IndicatorGraph;
