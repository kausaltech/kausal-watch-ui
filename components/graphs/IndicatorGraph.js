import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import { useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';

const createLayout = (
  timeResolution,
  yRange,
  plotColors,
  config,
) => {
  const fontFamily = '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif';
  const newLayout = {
    title: null,
    margin: {
      t: 0,
      r: 15,
      l: 60,
      b: 35,
    },
    yaxis: {
      hoverformat: `${yRange.maxDigits === 0 ? '' : '.'}${yRange.maxDigits}r`,
      separatethousands: true,
      anchor: 'free',
      domain: [0.02, 1],
      fixedrange: true,
      tickfont: {
        family: fontFamily,
        size: 14,
      },
    },
    xaxis: {
      showgrid: false,
      showline: false,
      anchor: 'free',
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
    barmode: 'group',
    autosize: true,
    colorway: plotColors.mainScale,
    font: { family: fontFamily, size: 12 },

    // showlegend: false,
    separators: ', ',
    hoverlabel: {
      namelength: 0,
    },
  };

  // Define y-axis range
  newLayout.yaxis.title = yRange.title;
  if (yRange.includeZero) {
    newLayout.yaxis.rangemode = 'tozero';
  }

  // If min and max values are set, do not use autorange
  if (yRange.range[0] != null || yRange.range[1] != null) {
    newLayout.yaxis.range = [yRange.range[0], yRange.range[1]];
    if (yRange.range[0] != null && yRange.range[1] != null) {
      newLayout.yaxis.autorange = false;
    }
  }

  _.merge(newLayout, config);

  return newLayout;
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

  const layoutConfig = {};
  let plotlyData = [];

  // Figure out what we need to draw depending on dataset
  // and define trace and layout setup accordingly
  // First trace is always main/total

  // we have dimensions so hide the main (total) trace
  layoutConfig.xaxis = {};
  plotlyData = traces.map((trace, idx) => {
    const modTrace = trace;
    modTrace.line = {
      width: idx === 0 ? 3 : 2,
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

  // remove total if not relevant
  if (plotlyData[plotlyData.length - 1].xType === 'category') plotlyData.shift();

  // add trend if defined
  if (trendTrace) plotlyData.push({
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
  if (goalTraces.length) {
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
  );
}

IndicatorGraph.defaultProps = {
  goalTraces: [],
  trendTrace: [],
};

IndicatorGraph.propTypes = {
  traces: PropTypes.arrayOf(PropTypes.shape).isRequired,
  yRange: PropTypes.shape().isRequired,
  timeResolution: PropTypes.string.isRequired,
  goalTraces: PropTypes.arrayOf(PropTypes.shape),
  trendTrace: PropTypes.arrayOf(PropTypes.shape),
};

export default IndicatorGraph;
