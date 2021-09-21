import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { isEqual } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Alert } from 'reactstrap';
import { linearRegression } from 'simple-statistics';
import { useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';

import ContentLoader from '../common/ContentLoader';

const GET_INDICATOR_GRAPH_DATA = gql`
  query IndicatorGraphData($id: ID, $plan: ID) {
    plan(id: $plan) {
      scenarios {
        id
        identifier
        name
      }
    }
    indicator(plan: $plan, id: $id) {
      id
      name
      timeResolution
      minValue
      maxValue
      quantity {
        id
        name
      }
      values(includeDimensions: true) {
        id
        date
        value
        categories {
          id
        }
      }
      dimensions {
        dimension {
          id
          name
          categories {
            id
            name
          }
        }
      }
      goals(plan: $plan) {
        id
        date
        value
        scenario {
          id
        }
      }
      unit {
        id
        name
        shortName
        verboseName
        verboseNamePlural
      }
    }
  }
`;

function makeLayout(indicator) {
  const out = {
    margin: {
      t: 30,
      r: 15,
      l: 60,
      b: 35,
    },
    yaxis: {
      hoverformat: '.3r',
      separatethousands: true,
      anchor: 'free',
      domain: [0.02, 1],
      fixedrange: true,
    },
    xaxis: {
      showgrid: false,
      showline: false,
      anchor: 'free',
      // domain: [0.01, 1],
      type: indicator.timeResolution === 'YEAR' ? 'linear' : 'date',
      fixedrange: true,
      tickformat: indicator.timeResolution === 'YEAR' ? 'd' : '%d.%m.%Y',
      tickmode: null,
    },
    // showlegend: false,
    separators: ', ',
    hoverlabel: {
      namelength: 0,
    },
  };

  if (indicator.quantity) {
    if (indicator.quantity.name === 'päästöt') {
      out.yaxis.rangemode = 'tozero';
    }
  }

  return out;
}

const log10 = Math.log(10);

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getSignificantDigitCount(n) {
  let val = Math.abs(String(n).replace('.', '')); // remove decimal and make positive
  if (val === 0) return 0;
  while (val !== 0 && val % 10 === 0) val /= 10; // kill the 0s at the end of n

  return Math.floor(Math.log(val) / log10) + 1; // get number of digits
}

function shouldDrawLine(trace) {
  if (trace.x.length > 1) return true;
  return false;
}

function generateCube(dimensions, values, path) {
  const dim = dimensions[0];
  const rest = dimensions.slice(1);

  const array = dim.categories.map((cat) => {
    const catPath = path ? [...path, cat.id] : [cat.id];
    catPath.sort();

    if (rest.length) return generateCube(rest, values, catPath);

    const found = values.filter((val) => {
      const ids = val.categories.map((valCat) => valCat.id).sort();
      return isEqual(ids, catPath);
    });
    if (!found.length) return null;
    if (found.length === 1) return found[0].value;
    return found.map(({ date, value }) => ({ date, value }));
  });
  return array;
}

function getTraces(dimensions, cube, names) {
  const dim = dimensions[0];

  if (dimensions.length === 1) {
    // If the cube has a time dimension, the values will be objects (and not straight numbers)
    if (typeof cube[0] === 'object') {
      return dim.categories.map((cat, idx) => {
        const traceName = [
          ...(names || []),
          cat.name,
        ].join(', ');
        return {
          name: traceName,
          type: 'lines+markers',
          x: cube[idx].map((val) => val.date),
          y: cube[idx].map((val) => val.value),
        };
      });
    }

    // No time dimension, 'x' axis will be categories
    return [{
      name: (names || [dim.name]).join(', '),
      type: 'bar',
      x: dim.categories.map((cat) => cat.name),
      y: cube,
    }];
  }
  let traces = [];
  const rest = dimensions.splice(1);

  dim.categories.forEach((cat, idx) => {
    const out = getTraces(rest, cube[idx], (names || []).concat([cat.name]));
    traces = traces.concat(out);
  });
  return traces;
}

function generateSingleYearPlot(indicator, values, i18n, plotColors) {
  // Choose the dimension with the most categories as the X axis
  const dimensions = indicator.dimensions.map((indicatorDim) => indicatorDim.dimension)
    .sort((a, b) => (a.categories.length - b.categories.length));
  const cube = generateCube(dimensions, values);
  const allTraces = [];
  const dim = dimensions;
  let path;

  const traces = getTraces(dimensions, cube).map((trace, idx) => ({ marker: { color: plotColors.mainScale[idx + 1] }, ...trace }));

  return {
    data: traces,
    layout: {
      barmode: 'group',
      title: `${indicator.name} (${values[0].date})`,
    },
  };
}

function generateDataTraces(indicator, values, i18n, plotColors, unitLabel) {
  const dimensions = indicator.dimensions.map((indicatorDim) => indicatorDim.dimension)
    .sort((a, b) => (a.categories.length - b.categories.length));
  const symbols = [
    'square', 'diamond', 'pentagon', 'hexagram', 'star-diamond', 'hash', 'y-down',
  ];
  const cube = generateCube(dimensions, values);
  const dataTraces = getTraces(dimensions, cube).map((trace, idx) => {
    const color = plotColors.mainScale[(idx + 1) % plotColors.mainScale.length];

    return {
      ...trace,
      marker: {
        size: 8,
        line: {
          width: 2,
          color,
        },
        symbol: symbols[idx % symbols.length],
        gradient: {
          type: 'none',
        },
        color: '#ffffff',
      },
      line: {
        width: 2,
        shape: 'spline',
        smoothing: 0.7,
        color,
      },
      hovertemplate: `%{x} ${trace.name}: %{y} ${unitLabel}`,
      hoverinfo: 'x+y',
      hoverlabel: {
        namelength: 0,
        bgcolor: color,
      },
    };
  });

  return dataTraces;
}

function generatePlotFromValues(indicator, i18n, plotColors, planScenarios) {
  let onlyIntegers = true;
  let maxDigits = 0;
  const { unit } = indicator;
  const unitLabel = unit.name === 'no unit' ? '' : (unit.shortName || unit.name);
  const traces = [];

  function processItem(item) {
    let { date, value, categories } = item;

    if (indicator.timeResolution === 'YEAR') {
      // Strip the month-day part
      date = date.split('-')[0];
    }
    if (!Number.isInteger(value)) {
      onlyIntegers = false;
    }
    // Determine the highest number of significant digits in the dataset
    // to be able to set suitable number formating.
    const digitCount = getSignificantDigitCount(value);
    if (digitCount > maxDigits) maxDigits = digitCount;
    return { date, value, categories };
  }

  const values = [...indicator.values].sort((a, b) => a.date - b.date).map(processItem);
  const dimensionedValues = values.filter((val) => val.categories.length > 0);
  const dates = Array.from(new Set(values.map((item) => item.date))).sort();

  // Render in a different way for datasets with only one time point
  if (dates.length == 1 && indicator.dimensions.length && dimensionedValues.length) {
    return generateSingleYearPlot(indicator, values, i18n, plotColors);
  }

  // Draw the main historical series (non-dimensioned)
  const mainValues = values.filter((item) => !item.categories.length);
  let traceName = indicator.quantity ? capitalizeFirstLetter(indicator.quantity.name) : null;
  if (dimensionedValues.length) {
    traceName = capitalizeFirstLetter(i18n.t('total'));
  }
  const dataTrace = {
    y: mainValues.map((item) => item.value),
    x: mainValues.map((item) => item.date),
    name: traceName,
    color: plotColors.trace,
    hovertemplate: dimensionedValues.length ? `%{x} ${traceName}: %{y} ${unitLabel}` : `%{x}: %{y} ${unitLabel}`,
    hoverinfo: 'x+y',
    hoverlabel: {
      namelength: 0,
      bgcolor: '#fff',
      font: {
        color: dimensionedValues.length ? plotColors.trace : undefined,
      },
    },
    showlegend: indicator.quantity != null,
  };

  let attrs;
  const lineGraph = shouldDrawLine(dataTrace);
  let lineMode;
  if (values.length > 30) {
    lineMode = 'lines';
  } else {
    lineMode = 'lines+markers';
  }
  if (lineGraph) {
    attrs = {
      type: 'scatter',
      mode: lineMode,
      line: {
        width: 4,
        shape: 'spline',
        smoothing: 0.7,
        color: plotColors.trace,
      },
      marker: {
        size: 6,
        line: {
          width: 3,
          color: plotColors.trace,
        },
        symbol: 'circle',
        gradient: {
          type: 'none',
        },
        color: '#ffffff',
      },
    };
  } else {
    attrs = {
      type: 'scatter',
      mode: 'markers',
      marker: {
        size: 12,
        line: {
          width: 3,
          color: plotColors.trace,
        },
        symbol: 'circle',
        gradient: {
          type: 'none',
        },
        color: '#ffffff',
      },
    };
  }
  traces.push({ ...dataTrace, ...attrs });

  // Group goals by scenario
  const traceScenarios = new Map();
  let colorIdx = 2;

  (indicator.goals || []).forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      // Default scenario (organization goal) is plotted with color #1
      const color = scenarioId ? plotColors.goalScale[colorIdx++] : plotColors.goalScale[1];
      const scenario = { goals: [], color, config: planScenarios.find((sc) => sc.id == scenarioId) };

      if (scenarioId) {
        scenario.name = scenario.config.name;
      } else {
        scenario.name = i18n.t('goal');
      }
      traceScenarios.set(scenarioId, scenario);
    }
    traceScenarios.get(scenarioId).goals.push(goal);
  });

  // Sort
  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;
    scenario.goals = goals.sort((a, b) => a.date - b.date).map(processItem);
  });

  traceScenarios.forEach((scenario, scenarioId) => {
    const { goals } = scenario;

    goals.forEach((item) => {
      if (dates.indexOf(item.date) < 0) dates.push(item.date);
    });

    const trace = {
      y: goals.map((item) => item.value),
      x: goals.map((item) => item.date),
      type: 'scatter',
      mode: 'lines+markers',
      name: dataTrace.name ? `${dataTrace.name} (${scenario.name})` : scenario.name,
      line: {
        width: 3,
        dash: 'dash',
        color: scenario.color,
      },
      marker: {
        size: 12,
        symbol: 'x',
        color: scenario.color,
      },
      opacity: 0.7,
      hoverinfo: 'x+y',
      hovertemplate: `%{x}: %{y} ${unitLabel} (${scenario.name})`,
      hoverlabel: {
        namelength: 0,
        bgcolor: '#fff',
      },
    };
    if (scenarioId != null) {
      if (scenario.config?.identifier === 'potential') {
        trace.mode = 'lines';
        traces[0].showlegend = true;
        traces[0].name = i18n.t('indicator-legend-result');
      } else {
        trace.mode = 'markers';
      }
    }
    traces.push(trace);
  });

  // Draw current trend line
  if (indicator.timeResolution === 'YEAR' && mainValues.length >= 5) {
    const numberOfYears = Math.min(mainValues.length, 10);
    const regData = mainValues.slice(mainValues.length - numberOfYears, mainValues.length)
      .map((item) => [parseInt(item.date, 10), item.value]);
    const model = linearRegression(regData);
    const predictedTrace = {
      x: regData.map((item) => item[0]),
      type: 'scatter',
      mode: 'lines',
      line: {
        width: 3,
        color: plotColors.trend,
        dash: 'dash',
      },
      name: dataTrace.name ? `${dataTrace.name} (${i18n.t('current-trend')})` : i18n.t('current-trend'),
      hoverinfo: 'none',
    };

    let highestGoalYear = null;
    const highestDataYear = mainValues[mainValues.length - 1];

    // Draw from last historical value to first scenario goal
    traceScenarios.forEach((scenario, scenarioId) => {
      const { goals, color } = scenario;
      const highestScenarioGoalYear = goals[goals.length - 1];
      const lowestGoalYear = goals[0];

      if (!highestGoalYear || highestScenarioGoalYear.date > highestGoalYear) {
        highestGoalYear = highestScenarioGoalYear.date;
      }

      // Only draw goal line for the default scenario
      if (scenarioId != null) return;

      const goalLineTrace = {
        x: [highestDataYear.date, lowestGoalYear.date],
        y: [highestDataYear.value, lowestGoalYear.value],
        type: 'scatter',
        mode: 'lines',
        opacity: 0.7,
        line: {
          width: 3,
          color,
          dash: 'dash',
        },
        hoverinfo: 'none',
        showlegend: false,
      };
      traces.push(goalLineTrace);
    });

    // If the latest goal is in the future, draw the prediction line until
    // that year.
    if (highestGoalYear && highestGoalYear > highestDataYear.date) {
      predictedTrace.x.push(highestGoalYear);
    }

    predictedTrace.y = predictedTrace.x.map((year) => model.m * year + model.b);

    traces.push(predictedTrace);
  }

  if (indicator.dimensions.length && dimensionedValues.length) {
    const dimensionTraces = generateDataTraces(indicator, values, i18n, plotColors, unitLabel);
    dimensionTraces.forEach((trace) => traces.push(trace));
  }

  const layout = makeLayout(indicator);
  layout.title = indicator.name;
  layout.yaxis.title = unitLabel || indicator.quantity?.name;

  if (traceScenarios.size > 1 || indicator.dimensions.length || traceScenarios.values().next().value?.config) {
    layout.showlegend = true;
  } else {
    layout.showlegend = false;
  }

  if (dates.length < 4) {
    layout.xaxis.tickvals = dates.sort();
  }
  if (maxDigits > 3) maxDigits = 3;
  if (onlyIntegers) {
    layout.yaxis.hoverformat = `${onlyIntegers ? '' : '.'}${maxDigits}r`;
  }

  // If min and max values are set, do not use autorange
  if (indicator.minValue != null || indicator.maxValue != null) {
    layout.yaxis.range = [indicator.minValue, indicator.maxValue];
    if (indicator.minValue != null && indicator.maxValue != null) {
      layout.yaxis.autorange = false;
    }
  }

  const plot = { data: traces, layout };
  return plot;
}

function IndicatorGraph({ indicatorId }) {
  if (!process.browser) {
    return null;
  }

  const plan = useContext(PlanContext);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const plotColors = {
    trace: theme.graphColors.red070,
    trend: theme.graphColors.red030,
    goalScale: [
      theme.graphColors.green070,
      theme.graphColors.green050,
      theme.graphColors.green030,
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
  };

  function fixLayout(data) {
    const { layout } = data;
    const fontFamily = `${theme.fontFamily}, ${theme.fontFamilyFallback}`;

    layout.autosize = true;
    layout.colorway = plotColors.mainScale;
    layout.font = { family: fontFamily, size: 12 };
    layout.title = null;
    layout.xaxis = layout.xaxis || {};
    layout.xaxis.tickfont = layout.xaxis.tickfont || {};
    layout.xaxis.tickfont.family = fontFamily;
    layout.xaxis.tickfont.size = 14;
    layout.yaxis = layout.yaxis || {};
    layout.yaxis.tickfont = layout.yaxis.font || {};
    layout.yaxis.tickfont.family = fontFamily;
    layout.yaxis.tickfont.size = 14;
  }

  const { loading, error, data } = useQuery(GET_INDICATOR_GRAPH_DATA, {
    variables: {
      id: indicatorId,
      plan: plan.identifier,
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return (
    <Alert color="danger">
      {`${t('error')}: ${error.message}`}
    </Alert>
  );

  const { indicator, plan: { scenarios } } = data;
  if (!indicator) return (
    <Alert color="danger">
      {t('indicator-not-found')}
    </Alert>
  );

  const Plot = dynamic(import('./Plot'));

  const plot = generatePlotFromValues(indicator, i18n, plotColors, scenarios);

  let plotTitle = '';
  if (typeof plot.layout.title === 'object' && plot.layout.title !== null) {
    plotTitle = plot.layout.title.text;
  } else if (typeof plot.layout.title === 'string') {
    plotTitle = plot.layout.title;
  }

  fixLayout(plot); // TODO: do not mutate argument

  return (
    <div>
      <h3 className="mb-2">{plotTitle}</h3>
      <span className="sr-only">{ t('indicator-graph-not-accessible') }</span>
      <div aria-hidden="true">
        <Plot
          data={plot.data}
          layout={plot.layout}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
          config={{
            locale: i18n.language,
            displayModeBar: false,
            showSendToCloud: true,
            staticPlot: false,
          }}
        />
      </div>
    </div>
  );
}

IndicatorGraph.propTypes = {
  indicatorId: PropTypes.string.isRequired,
};

export default IndicatorGraph;
