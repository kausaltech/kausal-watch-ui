import Plotly from '@kausal/plotly-custom/dist/plotly-custom';
import { PlotParams } from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

window.Plotly = Plotly; // this is needed for the locale setting to work
require('@kausal/plotly-custom/dist/plotly-locale-fi');
require('@kausal/plotly-custom/dist/plotly-locale-sv');

const PlotlyPlot = createPlotlyComponent(Plotly);

export default function Plot(props: PlotParams) {
  const { data, layout, config } = props;
  const ret = Plotly.validate(data, layout, config);
  if (ret && ret.length) {
    console.warn('Plotly validation errors:');
    console.warn(ret);
  }
  return <PlotlyPlot {...props} />
}