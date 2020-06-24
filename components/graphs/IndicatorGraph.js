import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withTheme } from 'styled-components';
import {
  Card, CardBody, Alert,
} from 'reactstrap';
import { linearRegression } from 'simple-statistics';

import ContentLoader from '../common/ContentLoader';
import InfoTooltip from '../common/InfoTooltip';
import { withTranslation } from '../../common/i18n';


const GET_INDICATOR_GRAPH_DATA = gql`
  query IndicatorGraphData($id: ID, $plan: ID) {
    indicator(plan: $plan, id: $id) {
      id
      name
      timeResolution
      latestGraph {
        id
        data
      }
      quantity {
        id
        name
      }
      values {
        id
        date
        value
      }
      goals(plan: $plan) {
        id
        date
        value
        scenario {
          id
          name
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
      //domain: [0.01, 1],
      type: indicator.timeResolution === 'YEAR' ? 'linear' : 'date',
      fixedrange: true,
      tickformat: indicator.timeResolution === 'YEAR' ? 'd' : '%d.%m.%Y',
      tickmode: null,
    },
    //showlegend: false,
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
  n = Math.abs(String(n).replace('.', '')); // remove decimal and make positive
  if (n == 0) return 0;
  while (n != 0 && n % 10 == 0) n /= 10; // kill the 0s at the end of n

  return Math.floor(Math.log(n) / log10) + 1; // get number of digits
}

function shouldDrawLine(trace) {
  if (trace.x.length > 2) return true;
  return false;
}

function generatePlotFromValues(indicator, i18n, plotColors) {
  let onlyIntegers = true;
  let maxDigits = 0;
  const { unit } = indicator;
  const unitLabel = unit.name === 'no unit' ? '' : (unit.shortName || unit.name)

  function processItem(item) {
    let { date, value } = item;

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
    return { date, value };
  }

  const values = indicator.values.sort((a, b) => a.date - b.date).map(processItem);

  // Group goals by scenario
  const scenarios = new Map();
  let colorIdx = 2;

  (indicator.goals || []).forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!scenarios.has(scenarioId)) {
      // Default scenario (organization goal) is plotted with color #1
      const color = scenarioId ? plotColors[colorIdx++] : plotColors[1];
      const scenario = { goals: [], color };

      if (scenarioId) {
        scenario.name = goal.scenario.name;
      } else {
        scenario.name = i18n.t('goal');
      }
      scenarios.set(scenarioId, scenario);
    }
    scenarios.get(scenarioId).goals.push(goal);
  });

  // Sort
  scenarios.forEach((scenario, scenarioId) => {
    const { goals } = scenario;
    scenario.goals = goals.sort((a, b) => a.date - b.date).map(processItem);
  });

  const dataTrace = {
    y: values.map((item) => item.value),
    x: values.map((item) => item.date),
    name: indicator.quantity ? capitalizeFirstLetter(indicator.quantity.name) : null,
    color: plotColors[0],
    hovertemplate: `%{x}: %{y} ${unitLabel}`,
    hoverinfo: 'x+y',
    hoverlabel: {
      namelength: 0,
      bgcolor: '#fff',
    },
    showlegend: indicator.quantity != null,
  };
  let attrs;
  const lineGraph = shouldDrawLine(dataTrace);
  if (lineGraph) {
    attrs = {
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        width: 3,
        shape: 'spline',
        color: plotColors[0],
      },
      marker: {
        size: 6,
        line: {
          width: 3,
          color: plotColors[0],
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
      type: 'bar',
    };
  }
  const traces = [{ ...dataTrace, ...attrs }];
  scenarios.forEach((scenario, scenarioId) => {
    const { goals } = scenario;

    const trace = {
      y: goals.map((item) => item.value),
      x: goals.map((item) => item.date),
      type: 'scatter',
      mode: 'lines+markers',
      name: dataTrace.name ? `${dataTrace.name} (${scenario.name})` : scenario.name,
      line: {
        width: 3,
        dash: 'dash',
      },
      marker: {
        size: 12,
        symbol: 'x',
      },
      opacity: 0.7,
      color: scenario.color,
      hoverinfo: 'x+y',
      hovertemplate: `%{x}: %{y} ${unitLabel} (${scenario.name})`,
      hoverlabel: {
        namelength: 0,
        bgcolor: '#fff',
      },
    };
    if (scenarioId != null) trace.mode = 'markers';
    traces.push(trace);
  });

  // Draw current trend line
  if (indicator.timeResolution === 'YEAR' && indicator.values.length >= 5) {
    const numberOfYears = Math.min(values.length, 10);
    const regData = values.slice(values.length - numberOfYears, values.length)
      .map((item) => [parseInt(item.date, 10), item.value]);
    const model = linearRegression(regData);
    const predictedTrace = {
      x: regData.map((item) => item[0]),
      type: 'scatter',
      mode: 'lines',
      opacity: 0.7,
      line: {
        width: 3,
        color: plotColors[0],
        dash: 'dash',
      },
      name: dataTrace.name ? `${dataTrace.name} (${i18n.t('current-trend')})` : i18n.t('current-trend'),
      hoverinfo: 'none',
    };

    let highestGoalYear = null;
    const highestDataYear = values[values.length - 1];

    // Draw from last historical value to first scenario goal
    scenarios.forEach((scenario, scenarioId) => {
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

  const layout = makeLayout(indicator);
  layout.title = indicator.name;
  layout.yaxis.title = unitLabel;

  if (scenarios.size < 2) {
    layout.showlegend = false;
  }

  if (maxDigits > 3) maxDigits = 3;
  if (onlyIntegers) {
    layout.yaxis.hoverformat = `${onlyIntegers ? '' : '.'}${maxDigits}r`;
  }
  const plot = { data: traces, layout };
  return plot;
}

function IndicatorGraph(props) {
  if (!process.browser) {
    return null;
  }

  const {
    t,
    theme,
    indicator,
    plan,
    i18n,
  } = props;

  const graphInfoContent = 'This is test content for graph info tooltip. Can be Long but maybe not too long.';
  const plotColors = [
    theme.themeColors.danger,
    theme.brandDark,
    theme.themeColors.success,
    theme.themeColors.warning,
    theme.themeColors.dark,
    theme.themeColors.info,
  ];

  function fixLayout(data) {
    const { layout } = data;

    layout.autosize = true;
    layout.colorway = plotColors;
    layout.font = { family: theme.fontFamilySansSerif, size: 12 };
    layout.title = '';
    layout.xaxis = layout.xaxis || {};
    layout.xaxis.tickfont = layout.xaxis.tickfont || {};
    layout.xaxis.tickfont.family = theme.fontFamilySansSerif;
    layout.xaxis.tickfont.size = 14;

    layout.yaxis = layout.yaxis || {};
    layout.yaxis.tickfont = layout.yaxis.font || {};
    layout.yaxis.tickfont.family = theme.fontFamilySansSerif;
    layout.yaxis.tickfont.size = 14;
  }

  return (
    <Card>
      <Query query={GET_INDICATOR_GRAPH_DATA} variables={{ id: indicator.id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return (
            <Alert color="danger">
              Error:
              {error.message}
            </Alert>
          );
          const Plot = dynamic(import('./Plot'));
          const { indicator } = data;
          if (!indicator) return (
            <Alert color="danger">
              Mittaria ei löydy
            </Alert>
          );
          let plot;
          if (indicator.latestGraph) {
            plot = JSON.parse(indicator.latestGraph.data);
          } else {
            plot = generatePlotFromValues(indicator, i18n, plotColors);
          }
          let graphTitle;
          if (typeof plot.layout.title === 'object' && plot.layout.title !== null) {
            graphTitle = plot.layout.title.text;
          } else if (typeof plot.layout.title === 'string') {
            graphTitle = plot.layout.title;
          }
          fixLayout(plot);

          return (
            <CardBody>
              <h5>
                { graphTitle }
                {' '}
                { graphInfoContent && <InfoTooltip content={graphInfoContent} />}
              </h5>
              <Plot
                data={plot.data}
                layout={plot.layout}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler
                config={{
                  locale: 'fi',
                  displayModeBar: false,
                  showSendToCloud: true,
                  staticPlot: false,
                }}
              />
            </CardBody>
          );
        }}
      </Query>
    </Card>
  );
}

IndicatorGraph.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.shape({
      name: PropTypes.string,
    }),
    latestGraph: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    latestValue: PropTypes.shape({
      value: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  }).isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
  }).isRequired,
};


export default withTranslation()(withTheme(IndicatorGraph));
