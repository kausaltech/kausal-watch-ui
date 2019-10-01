import Plotly from 'plotly.js/dist/plotly-basic.min';
import createPlotlyComponent from 'react-plotly.js/factory';

window.Plotly = Plotly; // this is needed for the locale setting to work
require('plotly.js/dist/plotly-locale-fi');

export default createPlotlyComponent(Plotly);
