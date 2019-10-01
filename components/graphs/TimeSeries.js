import React from 'react';
import { withTheme } from 'styled-components';
import createPlotlyComponent from 'react-plotly.js/factory';


class TimeSeries extends React.Component {
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
    const measured = {
      name: 'Toteutunut',
      x: ['2001', '2005', '2007', '2009', '2011', '2013', '2015', '2017'],
      y: [
        51,
        68,
        63,
        66,
        77,
        86,
        87,
        100,
      ],
      mode: 'lines',
      line: {
        width: 4,
      },
    };
    const target = {
      name: 'Tavoite',
      x: ['2017', '2019', '2021', '2023', '2025', '2027', '2029', '2031', '2033', '2035'],
      y: [
        100,
        136,
        149,
        150,
        154,
        160,
        175,
        190,
        205,
        210,
      ],
      mode: 'lines',
      line: {
        width: 2,
      },
    };

    const bau = {
      name: 'BAU',
      x: ['2017', '2019', '2021', '2023', '2025', '2027', '2029', '2031', '2033', '2035'],
      y: [
        100,
        109,
        111,
        116,
        120,
        126,
        128,
        131,
        136,
        140,
      ],
      mode: 'lines',
      line: {
        width: 2,
      },
    };

    const plotData = [measured, bau, target];

    const Plot = createPlotlyComponent(window.Plotly);
    const styledData = plotData.map((line, ndx) => {
      line.color = this.mapColor(ndx);
      return line;
    });
    return (
      <Plot
        data={styledData}
        layout={{
          title: 'Sähköauton latauspaikkojen määrä',
          autosize: true,
          xaxis: {
            type: 'category',
          },
          yaxis: {
            hoverformat: '.3r',
            separatethousands: true,
            title: 'Latauspaikkoja',
          },
          font: {
            family: '"HelsinkiGrotesk", Arial',
          },
        }}
        useResizeHandler
        displayModeBar={false}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

export default withTheme(TimeSeries);
