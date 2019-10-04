import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withTheme } from 'styled-components';
import {
  Card, CardBody, Alert,
} from 'reactstrap';

import ContentLoader from '../common/ContentLoader';
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
      values {
        date
        value
      }
      goals(plan: $plan) {
        date
        value
      }
      unit {
        name
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
      b: 30,
    },
    yaxis: {
      rangemode: 'tozero',
      hoverformat: '.3r',
      separatethousands: true,
      anchor: 'free',
      domain: [0.02, 1],
    },
    xaxis: {
      showgrid: false,
      showline: false,
      anchor: 'free',
      domain: [0.01, 1],
      tickfont: {
      },
      type: 'category',
    },
    showlegend: false,
    separators: ', ',
  };
  return out;
}

function generatePlotFromValues(indicator) {
  const trace = {
    x: indicator.values.map((item) => {
      const { date } = item;

      if (indicator.timeResolution === 'YEAR') {
        return date.split('-')[0];
      }
      return date;
    }),
    y: indicator.values.map((item) => item.value),
    type: 'bar',
  };
  const data = [trace];
  const layout = makeLayout(indicator);
  layout.title = indicator.name;
  layout.yaxis.title = indicator.unit.name;
  return { data, layout };
}

function IndicatorGraph(props) {
  if (!process.browser) {
    return null;
  }

  const { theme, indicator, plan, i18n } = props;
  const plotColors = [
    theme.brandDark,
    theme.brandLight,
    theme.helFog,
    theme.helGold,
    theme.helCopper,
    theme.helCoat,
    theme.helGold,
  ];

  function fixLayout(indicator, data) {
    const layout = data.layout;

    layout.autosize = true;
    layout.colorway = plotColors;
    layout.font = { family: '"HelsinkiGrotesk", Arial', size: 12 };
    if (typeof layout.title === 'object' && layout.title !== null) {
      layout.title.text = `<b>${layout.title.text}</b>`;
    } else if (typeof layout.title === 'string') {
      layout.title = { text: `<b>${layout.title}</b>` };
    }
    layout.xaxis = layout.xaxis || {};
    layout.xaxis.tickfont = layout.xaxis.tickfont || {};
    layout.xaxis.tickfont.family = 'HelsinkiGrotesk, Arial';
    layout.xaxis.tickfont.size = 14;

    layout.yaxis = layout.yaxis || {};
    layout.yaxis.tickfont = layout.yaxis.font || {};
    layout.yaxis.tickfont.family = 'HelsinkiGrotesk, Arial';
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
            plot = generatePlotFromValues(indicator);
          }
          fixLayout(indicator, plot);

          return (
            <CardBody style={{ height: '400px' }}>
              <Plot
                data={plot.data}
                layout={plot.layout}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler
                staticPlot
                config={{
                  locale: 'fi',
                  displayModeBar: true,
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
      name: PropTypes.string.isRequired,
    }).isRequired,
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
