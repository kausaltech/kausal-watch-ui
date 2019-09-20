import React from 'react';
import { withTheme } from 'styled-components';
import createPlotlyComponent from 'react-plotly.js/factory';
import plotData from '../../data/hsy-paastodata.json';


class BarGraph extends React.Component {
  constructor(props) {
    super(props);
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

  mapColor(index) {
    // Repeat colors from the beginning of array if colors run out
    let colorIndex = index;
    const colorsAvailable = this.plotColors.length;
    if (colorIndex >= colorsAvailable) colorIndex = index % this.plotColors.length;
    return this.plotColors[colorIndex];
  }

  render() {
    const Plot = createPlotlyComponent(window.Plotly);
    const styledData = plotData.data.map((bar, ndx) => {
      bar.marker = { color: this.mapColor(ndx) };
      return bar;
    });
    return (
      <Plot
        data={styledData}
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
              color: this.props.theme.dark,
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
    );
  }
}

export default withTheme(BarGraph);
