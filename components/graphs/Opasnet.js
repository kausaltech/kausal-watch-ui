import React from 'react';
import axios from 'axios';
import createPlotlyComponent from 'react-plotly.js/factory';

import { Alert } from 'reactstrap';

import styled from 'styled-components';
import ContentLoader from '../common/ContentLoader';


const GraphSection = styled.section`
  margin-bottom: 3rem;
`;

class Opasnet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: [],
    };
    this.loadData = this.loadData.bind(this);
  }

  reloadComments() {
    this.setState({ newComments: !this.state.newComments });
  }

  componentDidMount() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://cl1.opasnet.org/opasnet_base_2/index.php?ident=op_en7923.answer&act=0';
    axios.get(proxyurl + apiUrl)
      .then(
        (result) => {
          this.loadData(result.data.key);
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

  loadData(key) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `http://cl1.opasnet.org/opasnet_base_2/index.php?key=${key}`;
    axios.get(proxyurl + apiUrl, {
      transformResponse: [(data) => {
        let cleanData = data.replace(/\\/g, '');
        cleanData = cleanData.replace(/u00e4/g, 'ä');
        cleanData = cleanData.replace(/u00f6/g, 'ö');
        cleanData = cleanData.substring(cleanData.indexOf('['));
        cleanData = cleanData.substring(0, cleanData.lastIndexOf(']') + 1);
        return cleanData;
      }],
    })
      .then(
        (result) => {
          const jsonResult = JSON.parse(result.data);
          // console.log("parsed: " + JSON.stringify(jsonResult));
          this.setState({
            isLoaded: true,
            data: jsonResult,
          });
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

  getSources(data) {
    // let sources = [...new Set(data.map(item => item[2]))];
    const flags = []; const output = []; const l = data.length; let
      i;
    for (i = 0; i < l; i++) {
      if (flags[data[i][2]]) continue;
      flags[data[i][2]] = true;
      output.push(data[i][2]);
    }
    return output;
  }

  getSeriesBars(source, city) {
    let filtered = this.state.data.filter(datum => datum[0] === city);
    // console.log("sources= " + this.getSources(filtered));
    filtered = filtered.filter(datum => datum[2] === source);
    const x = filtered.map(bar => bar[1]);
    const y = filtered.map(bar => Number(bar.res));
    // console.log("x: "+x);
    // console.log("y: "+y);
    const bar = {
      name: source,
      x,
      y,
      type: 'line',
    };
    // console.log(JSON.stringify(bar));
    return bar;
  }

  render() {
    const { error, isLoaded } = this.state;
    const Plot = createPlotlyComponent(window.Plotly);
    const plotData = {
      data: [
        this.getSeriesBars('työkoneet', 'Helsinki'),
        this.getSeriesBars('linja-autot', 'Helsinki'),
      ],
      layout: {
        barmode: 'stack',
        separators: ', ',
        shapes: [
          {
            line: {
              color: '#555',
              dash: 'dash',
              width: 4,
            },
            opacity: 0.5,
            type: 'line',
            x0: 0.5,
            x1: 0.5,
            xref: 'x',
            y0: 0,
            y1: 1,
            yref: 'paper',
          },
        ],
        xaxis: {
          type: 'category',
        },
        yaxis: {
          hoverformat: '.3r',
          separatethousands: true,
          title: 'KHK-päästöt (kt CO₂-ekv.)',
        },
      },
    };

    if (error) {
      return (
        <Alert color="danger">
Error:
          {error.message}
        </Alert>
      );
    } if (!isLoaded) {
      return <ContentLoader />;
    }
    return (
      <GraphSection>
        <Plot
          data={plotData.data}
          layout={{
            title: 'Päästöjen jakauma',
            autosize: true,
            barmode: 'stack',
            separators: ', ',
            xaxis: {
              type: 'category',
            },
            yaxis: {
              hoverformat: '.3r',
              separatethousands: true,
              title: 'KHK-päästöt (kt CO₂-ekv.)',
            },
            font: {
              family: '"HelsinkiGrotesk", Arial',
            },
            shapes: [{
              line: {
                color: '#cccccc',
                dash: 'dash',
                width: 2,
              },
              opacity: 0.5,
              type: 'line',
              x0: 0.5,
              x1: 0.5,
              xref: 'x',
              y0: -0.15,
              y1: 1,
              yref: 'paper',
            }],
          }}
          useResizeHandler
          displayModeBar={false}
          style={{ width: '100%', height: '100%' }}
        />
      </GraphSection>
    );
  }
}

export default Opasnet;
