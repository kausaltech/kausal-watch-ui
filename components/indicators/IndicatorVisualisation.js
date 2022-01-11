import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, capitalize } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Alert } from 'reactstrap';
import { linearRegression } from 'simple-statistics';
import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import ContentLoader from 'components/common/ContentLoader';
import IndicatorComparisonSelect from 'components/indicators/IndicatorComparisonSelect';
import IndicatorGraph from 'components/graphs/IndicatorGraph';

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
      organization {
        id
        name
        abbreviation
      }
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
      common {
        id
        name
        indicators {
          id
          organization {
            id
            name
            abbreviation
          }
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
    }
  }
`;

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
  const dataMode = '';

  if (dimensions.length === 1) {
    // If the cube has a time dimension, the values will be objects (and not straight numbers)
    if (typeof cube[0] === 'object') {
      return dim.categories.map((cat, idx) => {
        const traceName = [
          ...(names || []),
          cat.name,
        ].join(', ');
        return {
          xType: 'time',
          name: traceName,
          x: cube[idx].map((val) => val.date),
          y: cube[idx].map((val) => val.value),
        };
      });
    }

    // No time dimension, 'x' axis will be categories
    return [{
      xType: 'category',
      name: (names || [dim.name]).join(', '),
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

function generateTracesFromValues(indicator, i18n) {
  const traces = [];
  const values = [...indicator.values].sort((a, b) => a.date - b.date).map((item) => {
    const { date, value, categories } = item;
    const newDate = indicator.timeResolution === 'YEAR' ? date.split('-')[0] : date;
    return { date: newDate, value, categories };
  });

  const dimensionedValues = values.filter((val) => val.categories.length > 0);

  // Draw the main historical series (non-dimensioned)
  const mainValues = values.filter((item) => !item.categories.length);
  let traceName = indicator.quantity ? capitalize(indicator.quantity.name) : null;
  if (dimensionedValues.length) {
    traceName = capitalize(i18n.t('total'));
  }
  const dataTrace = {
    xType: 'time',
    y: mainValues.map((item) => item.value),
    x: mainValues.map((item) => item.date),
    name: traceName,
    organization: indicator.organization,
    dataType: 'total',
  };

  traces.push({ ...dataTrace });

  // Add trace data for dimensions
  if (indicator.dimensions.length && dimensionedValues.length) {
    const dimensions = indicator.dimensions.map((indicatorDim) => indicatorDim.dimension)
      .sort((a, b) => (a.categories.length - b.categories.length));
    const cube = generateCube(dimensions, values);
    const dataTraces = getTraces(dimensions, cube);
    dataTraces.forEach((trace) => traces.push({
      ...trace,
      organization: indicator.organization,
      dataType: 'dimension',
    }));
  }

  return traces;
}

const generateTrendTrace = (indicator, traces, goals, i18n) => {
  const hasPotentialScenario = traces.find((goal) => goal.scenario?.identifier === 'potential');
  if (indicator.timeResolution === 'YEAR' && traces[0].y.length >= 5 && !hasPotentialScenario) {
    const values = [...indicator.values].sort((a, b) => a.date - b.date).map((item) => {
      const { date, value, categories } = item;
      const newDate = indicator.timeResolution === 'YEAR' ? date.split('-')[0] : date;
      return { date: newDate, value, categories };
    });
    const mainValues = values.filter((item) => !item.categories.length);
    const numberOfYears = Math.min(mainValues.length, 10);
    const regData = mainValues.slice(mainValues.length - numberOfYears, mainValues.length)
      .map((item) => [parseInt(item.date, 10), item.value]);
    const model = linearRegression(regData);
    const predictedTrace = {
      x: regData.map((item) => item[0]),
      name: i18n.t('current-trend'),
    };

    const highestDataYear = traces[0].y[traces[0].y.length - 1];
    const highestGoalYear = Math.max(...goals.map((goal) => goal.x[goal.x.length - 1]));
    if (highestGoalYear && highestGoalYear > highestDataYear) {
      predictedTrace.x.push(highestGoalYear);
    }

    predictedTrace.y = predictedTrace.x.map((year) => model.m * year + model.b);
    return predictedTrace;
  }
  return undefined;
};

const generateGoalTraces = (indicator, planScenarios, i18n) => {
  // Group goals by scenario
  const traceScenarios = new Map();
  const goalTraces = [];
  (indicator.goals || []).forEach((goal) => {
    const scenarioId = goal.scenario ? goal.scenario.id : null;

    if (!traceScenarios.has(scenarioId)) {
      const scenario = { goals: [], config: planScenarios.find((sc) => sc.id === scenarioId) };

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
    scenario.goals = goals.sort((a, b) => a.date - b.date).map((item) => {
      const { date, value, categories } = item;
      const newDate = indicator.timeResolution === 'YEAR' ? date.split('-')[0] : date;
      return { date: newDate, value, categories };
    });
  });

  traceScenarios.forEach((scenario) => {
    const { goals } = scenario;

    const trace = {
      scenario: scenario.config,
      y: goals.map((item) => item.value),
      x: goals.map((item) => item.date),
      name: scenario.name,
    };

    goalTraces.push(trace);
  });

  return goalTraces;
};
function IndicatorVisualisation({ indicatorId }) {
  if (!process.browser) {
    return null;
  }

  const plan = useContext(PlanContext);
  const { t, i18n } = useTranslation();
  const [compareTo, setCompareTo] = useState(undefined);
  // const [comparisonTraces, setComparisonTraces] = useState(undefined);

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

  /// Determine Indicator unit label and y-axis range
  const { unit } = indicator;
  const unitLabel = unit.name === 'no unit' ? '' : (unit.shortName || unit.name);

  const yRange = {
    title: unitLabel,
    minDigits: 0,
    maxDigits: 0,
    includeZero: false,
    range: [],
  };
  if (indicator?.quantity.name === 'päästöt') {
    yRange.includeZero = true;
  }
  // If min and max values are set, do not use autorange
  if (indicator.minValue != null || indicator.maxValue != null) {
    yRange.range = [indicator.minValue, indicator.maxValue];
    if (indicator.minValue != null && indicator.maxValue != null) {
      yRange.autorange = false;
    }
  }

  /// Handle object type indicator name (?)
  let plotTitle = '';
  if (typeof indicator.name === 'object') {
    plotTitle = indicator.name.text;
  } else if (typeof indicator.name === 'string') {
    plotTitle = indicator.name;
  }

  console.log(data);
  /// Process data for data traces
  const traces = generateTracesFromValues(indicator, i18n);
  const goalTraces = generateGoalTraces(indicator, scenarios, i18n);
  const trendTrace = generateTrendTrace(indicator, traces, goalTraces, i18n);

  const comparisonOrgs = indicator.common?.indicators
    .map((common) => common.organization)
    .filter((org) => org.id !== indicator.organization.id);

  const comparison = {};
  if (indicator.common && compareTo) {
    const comparisonIndicator = indicator.common.indicators.find((ind) => ind.organization.id === compareTo);
    const comparisonTraces = generateTracesFromValues(comparisonIndicator, i18n);
    comparison.organization = comparisonIndicator.organization;
    comparison.traces = comparisonTraces;
  } else comparison.organization = undefined;

  return (
    <div>
      <h3 className="mb-2">{plotTitle}</h3>
      <span className="visually-hidden">{ t('indicator-graph-not-accessible') }</span>
      { comparisonOrgs && (
        <IndicatorComparisonSelect
          handleChange={setCompareTo}
          currentValue={compareTo}
          options={comparisonOrgs}
          defaultOrg={indicator.organization}
        />
      )}
      <div aria-hidden="true">
        <IndicatorGraph
          yRange={yRange}
          timeResolution={indicator.timeResolution}
          traces={traces}
          goalTraces={goalTraces}
          trendTrace={trendTrace}
          comparison={comparison.organization && comparison}
        />
      </div>
    </div>
  );
}

IndicatorVisualisation.propTypes = {
  indicatorId: PropTypes.string.isRequired,
};

export default IndicatorVisualisation;
