import Plotly from 'plotly.js/dist/plotly-basic';
import createPlotlyComponent from 'react-plotly.js/factory';

window.Plotly = Plotly; // this is needed for the locale setting to work
require('plotly.js/dist/plotly-locale-fi');
require('plotly.js/dist/plotly-locale-sv');

export default createPlotlyComponent(Plotly);
