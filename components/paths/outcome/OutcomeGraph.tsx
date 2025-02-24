import { useContext, useState } from 'react';

import { OutcomeNodeFieldsFragment } from 'common/__generated__/graphql';
import { useInstance } from 'common/instance';
import { getRange, metricToPlot } from 'common/preprocess';
import SiteContext from 'context/site';
import dynamic from 'next/dynamic';
import { tint } from 'polished';
import type { PlotParams } from 'react-plotly.js';
import { Spinner } from 'reactstrap';
import styled, { ThemeContext } from 'styled-components';

const Plot = dynamic(() => import('components/graphs/Plot'), { ssr: false });

const smoothingFactor = 0.8;

const PlotLoader = styled.div`
  position: relative;
  z-index: 1;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.graphColors.grey020};
`;

/* This is naughty, but it will be removed later anyway. */
let instanceNrDigits = 3;

const formatHover = (name, color, isPred, systemFont, predLabel, unit) => {
  const predText = isPred && predLabel ? ` <i> (${predLabel})</i>` : '';
  const out = {
    hovertemplate:
      `${name}: ` +
      `<b>%{y:,.${instanceNrDigits}r} ${unit}</b> ` +
      `<b>%{customdata}</b>` +
      `${predText}` +
      `<extra></extra>`,
    hoverlabel: {
      bgcolor: color,
      font: {
        family: systemFont,
      },
    },
  };
  return out;
};

const generatePlotFromNode = (
  n: OutcomeNodeFieldsFragment,
  startYear,
  endYear,
  minForecastYear,
  color,
  site,
  t,
  language,
  id,
  systemFont,
  predLabel,
  shortUnit,
  parentNode
) => {
  const plotData: Plotly.Data[] = [];
  const historicalValues = [];
  const parentHistoricalValues = [];
  let baseValue;
  let parentBaseValue;
  const forecastValues = [];
  const parentForecastValues = [];
  const historicalDates = [];
  const forecastDates = [];
  const fillColor = n.color || color;

  const getPercentage = (dataPoint, parentMetric) => {
    const parentDataPoint = parentMetric.find(
      (val) => val.year === dataPoint.year
    );
    const percentage = parentDataPoint
      ? ((dataPoint.value / parentDataPoint.value) * 100).toPrecision(3)
      : undefined;
    return percentage && parseFloat(percentage) < 100
      ? `(${parseFloat(percentage).toLocaleString(language)}%)`
      : '';
  };

  n.metric.historicalValues.forEach((dataPoint) => {
    // Do not include base year in historical values
    if (dataPoint.year === site.referenceYear) {
      baseValue = dataPoint.value;
      parentBaseValue = getPercentage(
        dataPoint,
        parentNode.metric.historicalValues
      );
      return;
    }
    // Filter out years outside user selected range
    if (dataPoint.year > endYear || dataPoint.year < startYear) return;
    // Generate historical values and dates
    let valueArray;
    let dateArray;
    let parentValueArray;
    if (minForecastYear && dataPoint.year >= minForecastYear) {
      valueArray = forecastValues;
      dateArray = forecastDates;
      parentValueArray = parentForecastValues;
    } else {
      valueArray = historicalValues;
      dateArray = historicalDates;
      parentValueArray = parentHistoricalValues;
    }
    valueArray.push(dataPoint.value);
    dateArray.push(dataPoint.year);
    parentValueArray.push(
      getPercentage(dataPoint, parentNode.metric.historicalValues)
    );
  });
  if (site.referenceYear && baseValue !== undefined) {
    const referenceYearTrace: Plotly.Data = {
      x: [site.referenceYear - 1, site.referenceYear],
      y: [baseValue, baseValue],
      customdata: [parentBaseValue, parentBaseValue],
      name: n.shortName || n.name,
      showlegend: false,
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: '#ffffff',
        width: 0.75,
      },
      stackgroup: `${id}group2`,
      fillcolor: fillColor,
      xaxis: 'x',
      yaxis: 'y',
      ...formatHover(
        n.shortName || n.name,
        fillColor,
        false,
        systemFont,
        predLabel,
        shortUnit
      ),
    };
    plotData.push(referenceYearTrace);
  }

  plotData.push({
    x: historicalDates,
    y: historicalValues,
    customdata: parentHistoricalValues,
    xaxis: 'x2',
    yaxis: 'y',
    name: n.shortName || n.name,
    showlegend: false,
    type: 'scatter',
    fill: 'tonexty',
    fillcolor: fillColor,
    stackgroup: `${id}group1`,
    line: {
      color: '#ffffff',
      shape: 'spline',
      smoothing: smoothingFactor,
      width: 0.75,
    },
    ...formatHover(
      n.shortName || n.name,
      fillColor,
      false,
      systemFont,
      predLabel,
      shortUnit
    ),
  });
  n.metric.forecastValues.forEach((dataPoint) => {
    if (dataPoint.year <= endYear && dataPoint.year >= startYear) {
      forecastValues.push(dataPoint.value);
      forecastDates.push(dataPoint.year);
      parentForecastValues.push(
        getPercentage(dataPoint, parentNode.metric.forecastValues)
      );
    }
  });

  const joinData: (typeof plotData)[0] = {
    y: [historicalValues[historicalValues.length - 1], forecastValues[0]],
    x: [historicalDates[historicalDates.length - 1], forecastDates[0]],
    customdata: [
      parentHistoricalValues[parentHistoricalValues.length - 1],
      parentForecastValues[0],
    ],
    xaxis: 'x2',
    yaxis: 'y',
    name: '',
    showlegend: false,
    type: 'scatter',
    fill: 'tonexty',
    fillcolor: tint(0.3, fillColor),
    stackgroup: `${id}group3`,
    line: {
      color: 'white',
      shape: 'spline',
      smoothing: smoothingFactor,
      width: 0.5,
    },
    hoverinfo: 'skip',
  };
  plotData.push(joinData);

  plotData.push({
    x: forecastDates,
    y: forecastValues,
    customdata: parentForecastValues,
    xaxis: 'x2',
    yaxis: 'y',
    name: `${n.shortName || n.name} (${t('pred')})`,
    showlegend: false,
    type: 'scatter',
    fill: 'tonexty',
    fillcolor: tint(0.3, fillColor),
    stackgroup: `${id}group2`,
    line: {
      color: 'white',
      shape: 'spline',
      smoothing: smoothingFactor,
      width: 0.5,
    },
    ...formatHover(
      n.shortName || n.name,
      fillColor,
      true,
      systemFont,
      predLabel,
      shortUnit
    ),
  });

  return plotData;
};

type OutcomeGraphProps = {
  node: OutcomeNodeFieldsFragment;
  subNodes: OutcomeNodeFieldsFragment[];
  color: string;
  startYear: number;
  endYear: number;
};

const OutcomeGraph = (props: OutcomeGraphProps) => {
  const { node: parentNode, subNodes, color, startYear, endYear } = props;
  const { t, i18n } = useTranslation();
  const theme = useContext(ThemeContext);
  const site = useContext(SiteContext);
  const instance = useInstance();
  instanceNrDigits = instance.features.showSignificantDigits;
  const shapes: Plotly.Layout['shapes'] = [];
  const plotData: Plotly.Data[] = [];
  const [loading, setLoading] = useState(true);

  const metric = parentNode.metric!;

  const baselineForecast =
    metric.baselineForecastValues &&
    metricToPlot(
      parentNode.metric,
      'baselineForecastValues',
      startYear,
      endYear
    );
  const goals = parentNode.goals;
  const targetYearGoal = parentNode.targetYearGoal;

  const systemFont =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

  const displayNodes = (
    subNodes?.length > 1 ? subNodes : parentNode && [parentNode]
  ).map((node) => ({ ...node }));
  const shortUnit = metric.unit?.short;
  const longUnit = metric.unit?.htmlLong;
  const predLabel = t('pred');

  // Find the lowes forecast year
  const forecastYears = displayNodes.map(
    (node) => node.metric.forecastValues[0]?.year
  );
  const minForecastYear = forecastYears.reduce((p, v) => (p < v ? p : v));

  // Split nodes to pos and neg
  const hasNegativeValues = (node) => {
    if (node.metric?.forecastValues.find((val) => val.value < 0)) return true;
    if (node.metric?.historicalValues.find((val) => val.value < 0)) return true;
    return false;
  };
  const negativeDisplayNodes = displayNodes?.filter(hasNegativeValues);
  const positiveDisplayNodes = displayNodes?.filter(
    (node) => !hasNegativeValues(node)
  );

  // generate separate stacks for positive and negative side
  positiveDisplayNodes?.forEach((node, index) => {
    const trace = generatePlotFromNode(
      node,
      startYear,
      endYear,
      minForecastYear,
      color,
      site,
      t,
      i18n.language,
      'pos',
      systemFont,
      predLabel,
      shortUnit,
      parentNode
    );
    if (trace) plotData.push(...trace);
  });
  negativeDisplayNodes?.forEach((node, index) => {
    plotData.push(
      ...generatePlotFromNode(
        node,
        startYear,
        endYear,
        minForecastYear,
        color,
        site,
        t,
        i18n.language,
        'neg',
        systemFont,
        predLabel,
        shortUnit,
        parentNode
      )
    );
  });

  if (
    baselineForecast &&
    site.baselineName &&
    instance.features?.baselineVisibleInGraphs
  ) {
    plotData.push({
      x: baselineForecast.x,
      y: baselineForecast.y,
      customdata: baselineForecast.y.map(() => ''),
      xaxis: 'x2',
      yaxis: 'y',
      mode: 'lines',
      name: site.baselineName,
      type: 'scatter',
      line: {
        color: theme.graphColors.grey060,
        shape: 'spline',
        smoothing: smoothingFactor,
        width: 2,
        dash: 'dash',
      },
      ...formatHover(
        site.baselineName,
        theme.graphColors.grey030,
        false,
        systemFont,
        predLabel,
        shortUnit
      ),
    });
  }
  const goalsWithinRange = goals.filter(
    (goal) => goal.year >= startYear && goal.year <= endYear
  );
  if (goalsWithinRange.length >= 2) {
    const name = t('target')!;
    plotData.push({
      name,
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y',
      line: {
        color: theme.graphColors.red090,
        width: 1,
        dash: 'dot',
      },
      marker: {
        size: 6,
      },
      x: goalsWithinRange.map((v) => v.year),
      y: goalsWithinRange.map((v) => v.value),
      hovertemplate: `<b>${name} %{x}: %{y:,.3r} ${shortUnit}</b><extra></extra>`,
    });
  } else if (goals.length) {
    const goal = goals[goals.length - 1];
    shapes.push({
      type: 'line',
      yref: 'y',
      xref: 'x2',
      x0: startYear === site.referenceYear ? site.minYear : startYear,
      y0: goal.value,
      x1: goal.year > endYear ? endYear : goal.year,
      y1: goal.value,
      line: {
        color: theme.graphColors.red090,
        width: 2,
        dash: 'dot',
      },
    });
    if (endYear === goal.year) {
      plotData.push({
        x: [goal.year],
        y: [goal.value],
        type: 'scatter',
        xaxis: 'x2',
        yaxis: 'y',
        name: `${t('target')} ${goal.year}`,
        line: {
          color: theme.graphColors.red090,
          width: 2,
          dash: 'dot',
        },
      });
    }
  }

  const totalYears = [];
  const totalValues = [];

  parentNode.metric.historicalValues.forEach((dataPoint) => {
    if (dataPoint.year >= startYear && dataPoint.year <= endYear) {
      totalYears.push(dataPoint.year);
      totalValues.push(dataPoint.value);
    }
  });
  parentNode.metric.forecastValues.forEach((dataPoint) => {
    if (dataPoint.year >= startYear && dataPoint.year <= endYear) {
      totalYears.push(dataPoint.year);
      totalValues.push(dataPoint.value);
    }
  });

  // Add a total figure on hover if there are multiple subnodes
  if (subNodes?.length > 1) {
    plotData.push({
      type: 'scatter',
      name: t('plot-total')!,
      mode: 'lines',
      line: {
        color: theme.graphColors.grey080,
        width: 0,
      },
      x: totalYears,
      y: totalValues,
      customdata: totalValues.map(() => ''),
      xaxis: 'x2',
      yaxis: 'y',
      ...formatHover(
        t('plot-total')!,
        theme.graphColors.grey080,
        false,
        systemFont,
        predLabel,
        shortUnit
      ),
      showlegend: false,
    });
  }
  const layout: PlotParams['layout'] = {
    height: 300,
    hovermode: 'x unified',
    hoverdistance: 10,
    margin: {
      r: 20,
      t: 30,
    },
    annotations: [
      {
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
      },
    ],
    yaxis: {
      domain: [0, 1],
      range: getRange(totalValues),
      anchor: 'x',
      ticklen: 10,
      tickcolor: theme.graphColors.grey030,
    },
    xaxis: {
      domain: [0, 1],
      anchor: 'y',
      nticks: 1,
      ticklen: 10,
      tickcolor: theme.graphColors.grey030,
      hoverformat: '%Y',
      automargin: true,
    },
    xaxis2: {
      domain: [0, 1],
      anchor: 'y',
      ticklen: 10,
      tickformat: 'd',
      tickcolor: theme.graphColors.grey030,
      automargin: true,
    },
    autosize: true,
    font: {
      family: systemFont,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'top',
      y: -0.2,
      xanchor: 'right',
      x: 1,
    },
    shapes,
  };

  if (instance.features.baselineVisibleInGraphs || site.referenceYear) {
    layout.grid = { rows: 1, columns: 2, pattern: 'independent' };
    layout.xaxis = {
      domain: [0, 0.03],
      anchor: 'y',
      nticks: 1,
      ticklen: 10,
      tickcolor: theme.graphColors.grey030,
    };
    layout.xaxis2 = {
      domain: [0.066, 1],
      anchor: 'y',
      ticklen: 10,
      tickformat: 'd',
      tickcolor: theme.graphColors.grey030,
    };
  }
  return (
    <>
      {loading && (
        <PlotLoader>
          <Spinner color="dark" />
        </PlotLoader>
      )}
      <Plot
        noValidate
        data={plotData}
        layout={layout}
        useResizeHandler
        style={{ minWidth: '600px', width: '100%' }}
        config={{ displayModeBar: false }}
        onInitialized={() => setLoading(false)}
      />
    </>
  );
};

export default OutcomeGraph;
