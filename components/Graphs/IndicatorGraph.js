import React from 'react';
import dynamic from 'next/dynamic';
import { withTheme } from 'styled-components';
import {
  Card, CardBody, Alert,
} from 'reactstrap';
import { aplans } from '../../common/api';

import ContentLoader from '../Common/ContentLoader';

class IndicatorGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
    };
    this.plotColors = [
      props.theme.brandDark,
      props.theme.brandLight,
      props.theme.helFog,
      props.theme.helGold,
      props.theme.helCopper,
      props.theme.helCoat,
      props.theme.helGold,
    ];
  }

  componentDidMount() {
    aplans.get(`indicator_graph/${this.props.graphId}/`).then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result.data.data.attributes.data,
        });
        console.log(result.data.data.attributes.data);
      },
    )
      .catch(
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return (
        <Alert color="danger">
          Error:
          {error.message}
        </Alert>
      );
    }
    if (!process.browser || !isLoaded) {
      return <ContentLoader />;
    }
    const Plot = dynamic(import('react-plotly.js'));
    data.layout.autosize = true;
    data.layout.colorway = this.plotColors;
    data.layout.font = {family: '"HelsinkiGrotesk", Arial', size: 12};
    //data.layout.titlefont = {size:36};
    //data.layout.legend = {orientation: 'h', bordercolor: '#ffffff', borderwidth: 2, bgcolor: '#efefef'};
    //data.layout.title = {text:`<b>${data.layout.title}</b>`, xref: 'paper', x: 0.05, font: { size: 24}};
    data.layout.title = {text:`<b>${data.layout.title}</b>`};
    return (
      <Card>
        <CardBody style={{ height: '400px' }}>
          <Plot
            data={data.data}
            layout={data.layout}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler
            staticPlot
            displayModeBar={false}
          />
        </CardBody>
      </Card>
    );
  }
}


export default withTheme(IndicatorGraph);
