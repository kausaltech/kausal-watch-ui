'use client';

import Plotly from '@kausal/plotly-custom/dist/plotly-custom';
import { PlotParams } from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { useLocale } from 'next-intl';

window.Plotly = Plotly; // this is needed for the locale setting to work
require('@kausal/plotly-custom/dist/plotly-locale-fi');
require('@kausal/plotly-custom/dist/plotly-locale-sv');
require('@kausal/plotly-custom/dist/plotly-locale-de');
require('@kausal/plotly-custom/dist/plotly-locale-de-ch');

const PlotlyPlot = createPlotlyComponent(Plotly);

const getSeparators = (locale: string) => {
  if (locale === 'fi') {
    return ', ';
  } else if (locale === 'sv') {
    return '.,';
  } else if (locale === 'en' || locale.slice(0, 2) === 'en') {
    return '.,';
  } else if (locale === 'de-CH') {
    return '.,';
  } else if (locale === 'de' || locale.slice(0, 2) === 'de') {
    return ',.';
  }
  return '.,';
};

export default function Plot(props: PlotParams) {
  const { data, layout, config } = props;
  const locale = useLocale();

  const separators = getSeparators(locale);
  const ret = Plotly.validate(data, layout, config);

  if (ret && ret.length) {
    console.warn('Plotly validation errors:');
    console.warn(ret);
  }

  props = {
    ...props,
    config: { ...props.config, locale },
    layout: { ...layout, separators },
  };

  return <PlotlyPlot {...props} />;
}
