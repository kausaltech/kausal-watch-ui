import React from 'react';
import { withTheme } from 'styled-components';
import Plot from 'react-plotly.js';

class TimeSeries extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            type: 'bar', 
            x: [2018, 2019, 2020, 2021, 2022, 2023], 
            y: [2, 5, 3, 2, 5, 3],
            marker: {
              color: this.props.theme.helTram
            }
          },
          {
            type: 'bar', 
            x: [2018, 2019, 2020, 2021, 2022, 2023], 
            y: [2, 5, 3, 2, 5, 3],
            marker: {
              color: this.props.theme.helBus
            }
          },
        ]}
        layout={{
          title: 'Päästöt',
          autosize: true,
          barmode: 'stack'}}
        useResizeHandler 
        displayModeBar = { false }
        style= {{width: "100%", height: "100%"}}
      />
    );
  }
}

export default withTheme(TimeSeries);
