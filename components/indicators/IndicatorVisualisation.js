import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, capitalize } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { Alert } from 'reactstrap';
import dayjs from 'common/dayjs';
import { linearRegression } from 'simple-statistics';
import { useTranslation } from 'common/i18n';
import { captureMessage } from 'common/sentry';
import { capitalizeFirstLetter } from 'common/utils';
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
    return found.map(({ date, value }) => ({ date, value }));
  });
  return array;
}



function generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues, i18n) {
  const traces = [];
  const values = [...combinedValues].sort((a, b) => a.date - b.date).map((item) => {
    const { date, value, categories } = item;
    const newDate = indicator.timeResolution === 'YEAR' ? date.split('-')[0] : date;
    return { date: newDate, value, categories };
  });
  if (indicatorGraphSpecification.dimensions.length === 0) {
    return values;
  }
  indicatorGraphSpecification.dimensions =  indicatorGraphSpecification.dimensions.map(
    d => d.dimension
  ).sort((a, b) => {
    if (a.sort === 'last') {
      return 1;
    }
    else if (b.sort === 'last') {
      return -1;
    }
    return (a.categories.length - b.categories.length || a.id - b.id)
  });
  return generateCube(indicatorGraphSpecification.dimensions, values);
}

function getTraces(dimensions, cube, names, hasTimeDimension, i18n) {
  if (dimensions.length === 0) {
    return [{
      xType: cube.length === 1 ? 'category' : 'time',
      name: i18n.t('total'),
      dataType: 'total',
      x: cube.map(val => {
        const d = dayjs(val.date)
        return cube.length < 2 ? d.year() : val.date;
      }),
      y: cube.map(val => val.value)
    }];
  }
  const [firstDimension, ...rest] = dimensions;
  if (dimensions.length === 1) {
    if (hasTimeDimension) {
      return firstDimension.categories.map((cat, idx) => {
        const traceName = Array.from(
          (new Set(names ?? undefined)).add(cat.name)
        ).join(', ');
        let x, y, xType, _cube = cube[idx];
        x = _cube.map(val => val.date);
        y = _cube.map(val => val.value);
        return {
          xType: 'time',
          dataType: cat.id === 'total' ? 'total' : null,
          name: traceName,
          _parentName: names ? Array.from(names).join(', ') : null,
          x, y
        };
      });
    }

    // No time dimension, 'x' axis will be categories
    return [{
      xType: 'category',
      name: Array.from(new Set(names ?? [firstDimension.name])).join(', '),
      _parentName:  names ? Array.from(names).join(', ') : null,
      x: firstDimension.categories.map((cat) => cat.name),
      y: cube.map(c => c[0]?.value),
    }];
  }
  let traces = [];

  firstDimension.categories.forEach((cat, idx) => {
    const out = getTraces(rest, cube[idx], (new Set(names ?? undefined)).add(cat.name), hasTimeDimension, i18n);
    traces = traces.concat(out);
  });
  // Filter out empty traces resulting from
  // unavailable (total, category) combinations
  return traces.filter(t => (t.x.length > 0));
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
    return [predictedTrace, calculateBounds(predictedTrace.y)];
  }
  return [undefined, undefined];
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

  const bounds = calculateBounds(goalTraces.map(t => t.y).flat());
  return [goalTraces, bounds];
};

function calculateBounds(values) {
  if (values.length === 0) {
    return null;
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  }
}

function getIndicatorGraphSpecification(indicator, compareOrganization, t) {
  const specification = {}
  const indicators = [indicator];
  let dimensions = JSON.parse(JSON.stringify(indicator.dimensions));

  const dimensionedValues = indicator.values.filter((val) => val.categories.length > 0);
  if (dimensionedValues.length === 0 && dimensions.length !== 0) {
    captureMessage(`Data consistency error: indicator ${indicator.id} has dimensions, but the data does not`);
    dimensions = [];
  }

  if (compareOrganization) {
    const compareIndicator = indicator.common.indicators.find(
      x => x.organization.id === compareOrganization
    );
    indicators.push(compareIndicator);
    const comparisonDimension = { dimension: { sort: 'last', type: 'organization'} };
    comparisonDimension.dimension.categories = indicators.map(i => (
      {
        id: `org:${i.organization.id}`,
        name: i.organization.name,
        type: 'organization'
      }
    ));
    dimensions.push(comparisonDimension);
  }

  const allValues = indicators.map(i => i.values.map(x => x.value)).flat();
  specification.bounds = calculateBounds(allValues);

  const times = new Set(indicators.map(i => i.values.map(x => x.date)).flat());
  const hasTime = times.size > 1;

  if (hasTime) {
    dimensions.forEach(d => {
      const { categories, id: dimId, type } = d.dimension;
      if (type === 'organization') {
        return;
      }
      categories.unshift({
        id: `total`,
        type: 'aggregate',
        name: capitalizeFirstLetter(t('total'))
      });
    });
  }

  const axes = [];
  if (indicator.dimensions.length > 0) {
    axes.push(['categories', indicator.dimensions.length]);
  }
  if (compareOrganization != null) {
    axes.push(['comparison', 1]);
  }
  if (hasTime) {
    axes.push(['time', 1]);
  }

  specification.axes = axes;
  specification.dimensions = dimensions;
  return specification;
}

function addOrganizationCategory(value, orgId) {
  const newCategories = [...(value.categories)]//
  newCategories.push({id: `org:${orgId}`});
  return Object.assign({}, value, {categories: newCategories});
}

function _addTotal(v, categoryCount) {
  if (v.categories.length === 0) {
    const newCategories = new Array(categoryCount).fill({id: 'total'});
    return Object.assign({}, v, {
      categories: [...v.categories, ...newCategories] });
  }
  return v;
}

function combineValues(indicator, compareTo, indicatorGraphSpecification) {
  let categoryCount = 0;
  const categoryAxis = indicatorGraphSpecification.axes.filter(a => a[0] === 'categories');
  if (categoryAxis.length > 0) {
    categoryCount = categoryAxis[0][1];
  }
  const indicatorValues = indicator.values
    .map(v => _addTotal(v, categoryCount))
    .filter(v => v.categories.length === categoryCount);
  if (compareTo == null) {
    return indicatorValues;
  }
  const comparisonIndicator = indicator.common.indicators.find((ind) => ind.organization.id === compareTo);
  const comparisonIndicatorValues = comparisonIndicator.values
    .map(v => _addTotal(v, categoryCount))
    .filter(v => v.categories.length === categoryCount);
  return [
    ...(indicatorValues.map(v => addOrganizationCategory(v, indicator.organization.id))),
    ...(comparisonIndicatorValues.map(v => addOrganizationCategory(v, compareTo)))
  ];

}

function IndicatorVisualisation({ indicatorId }) {
  if (!process.browser) {
    return null;
  }

  const plan = useContext(PlanContext);
  const { t, i18n } = useTranslation();
  const [compareTo, setCompareTo] = useState(undefined);

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

  if (indicator.values.length === 0) {
    return null;
  }
  const indicatorGraphSpecification = getIndicatorGraphSpecification(indicator, compareTo, t);

  /// Determine Indicator unit label and y-axis range
  const { unit } = indicator;
  const unitLabel = unit.name === 'no unit' ? '' : (unit.shortName || unit.name);


  /// Handle object type indicator name (?)
  let plotTitle = '';
  if (typeof indicator.name === 'object') {
    plotTitle = indicator.name.text;
  } else if (typeof indicator.name === 'string') {
    plotTitle = indicator.name;
  }

  const combinedValues = combineValues(indicator, compareTo, indicatorGraphSpecification);
  /// Process data for data traces
  const cube = generateCubeFromValues(indicator, indicatorGraphSpecification, combinedValues, i18n);
  indicatorGraphSpecification.cube = cube;
  const hasTimeDimension = indicatorGraphSpecification.axes.filter(a => a[0] === 'time').length > 0;
  const traces = getTraces(
    indicatorGraphSpecification.dimensions, cube, null, hasTimeDimension, i18n);
  const [goalTraces, goalBounds] = generateGoalTraces(indicator, scenarios, i18n);
  const [trendTrace, trendBounds] = hasTimeDimension ?
        generateTrendTrace(indicator, traces, goalTraces, i18n) : [null, null];

  let bounds = indicatorGraphSpecification.bounds;
  for (const addBounds of [goalBounds, trendBounds]) {
    if (addBounds) {
      bounds = calculateBounds([
        ...Object.values(bounds),
        ...(Object.values(addBounds).filter(b => b != null && !isNaN(b)))]);
    }
  }
  const delta = bounds.max - bounds.min;
  bounds.max = bounds.max + delta*0.1;
  bounds.min = bounds.min - delta*0.1;
  indicatorGraphSpecification.bounds = bounds;

  const yRange = {
    unit: unitLabel,
    minDigits: 0,
    maxDigits: 0,
    includeZero: false,
    range: [],
  };
  if (indicator?.quantity?.name === 'päästöt') {
    yRange.includeZero = true;
  }
  let minValue, maxValue;
  minValue = indicator.minValue ?? indicatorGraphSpecification.bounds.min;
  maxValue = indicator.maxValue ?? indicatorGraphSpecification.bounds.max;

  // If min and max values are set, do not use autorange
  if (minValue != null || maxValue != null) {
    yRange.range = [minValue, maxValue];
    if (minValue != null && maxValue != null) {
      yRange.autorange = false;
    }
  }

  const comparisonOrgs = indicator.common?.indicators
    .map((common) => common.organization)
    .filter((org) => org.id !== indicator.organization.id);

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
          specification={indicatorGraphSpecification}
          yRange={yRange}
          timeResolution={indicator.timeResolution}
          traces={traces}
          goalTraces={goalTraces}
          trendTrace={trendTrace}
        />
      </div>
    </div>
  );
}

IndicatorVisualisation.propTypes = {
  indicatorId: PropTypes.string.isRequired,
};

export default IndicatorVisualisation;
