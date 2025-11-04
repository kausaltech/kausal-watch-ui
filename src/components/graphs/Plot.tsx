'use client';

import React, { useMemo } from 'react';

import Plotly from '@kausal/plotly-custom/dist/plotly-custom';
import { useLocale } from 'next-intl';
// import Plotly from 'plotly.js';
import * as cs from 'plotly.js-locales/cs';
import * as da from 'plotly.js-locales/da';
import * as de from 'plotly.js-locales/de';
import * as de_ch from 'plotly.js-locales/de-ch';
import * as fi from 'plotly.js-locales/fi';
import * as lv from 'plotly.js-locales/lv';
import * as pl from 'plotly.js-locales/pl';
import * as sv from 'plotly.js-locales/sv';
import type { PlotParams } from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const locales = { sv, de, de_ch, cs, da, lv, pl, fi };

const getSeparators = (locale: string): string | undefined => {
  const separators = Intl.NumberFormat(locale)?.formatToParts(10000.1);
  const decimalSeparator = separators?.find((part) => part?.type === 'decimal')?.value;
  const groupSeparator = separators?.find((part) => part?.type === 'group')?.value;
  if (decimalSeparator && groupSeparator) return decimalSeparator + groupSeparator;
  else return '.,';
};

const PlotlyPlot = createPlotlyComponent(Plotly);

type PlotProps = PlotParams & {
  noValidate?: boolean;
};

const Plot = ({
  noValidate,
  data,
  config: initialConfig,
  layout: initialLayout,
  ...rest
}: PlotProps) => {
  const lang = useLocale();

  const layout = useMemo(
    () => ({
      ...initialLayout,
      separators: getSeparators(lang),
    }),
    [initialLayout, lang]
  );

  const config = useMemo(
    () => ({
      ...initialConfig,
      locales,
      locale: lang,
      showLink: false,
      responsive: true,
    }),
    [initialConfig, lang]
  );

  console.log('Render Plot - noValidate:', noValidate);

  if (!noValidate) {
    const ret = Plotly.validate(data, layout);

    if (ret && ret.length) {
      console.warn('Plotly validation returned errors');
      console.log(ret);
      console.log('Plotly layout:');
      console.log(layout);
      console.log('Plotly data:');
      console.log(data);
    }
  }

  return <PlotlyPlot showLink={false} data={data} config={config} layout={layout} {...rest} />;
};

export default Plot;
