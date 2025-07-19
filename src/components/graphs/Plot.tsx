'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

import Plotly from '@kausal/plotly-custom/dist/plotly-custom';
import { useLocale } from 'next-intl';
import { Config, Data, Layout } from 'plotly.js';
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

const Plot = (props: PlotProps) => {
  const { data } = props;
  const config: NonNullable<PlotParams['config']> = props.config || {};
  const layout = props.layout || {};

  const lang = useLocale();
  config.locales = locales;
  config.locale = lang;

  config.responsive = true;
  if (!props.noValidate) {
    // @ts-ignore
    const ret = Plotly.validate(data, layout);
    if (ret && ret.length) {
      console.warn('Plotly validation returned errors');
      console.log(ret);
    }
  }
  props = {
    ...props,
    config,
    layout: { ...layout, separators: getSeparators(lang) },
  };
  return <PlotlyPlot {...props} />;
};

type UsePlotlyArgs = {
  data: Partial<Data>[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  noValidate?: boolean;
};

export function usePlotlyBasic({ data, layout, config, noValidate }: UsePlotlyArgs) {
  const ref = useRef<HTMLDivElement>(null);

  if (!noValidate) {
    // @ts-ignore
    const ret = Plotly.validate(data, layout);
    if (ret && ret.length) {
      console.warn('Plotly validation errors:');
      console.log(ret);
    }
  }
  useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      Plotly.react(current, data, layout, config);
    }
  }, [ref, data, layout, config]);

  useEffect(() => {
    return () => {
      const { current } = ref;
      if (current) {
        console.log('purge');
        Plotly.purge(current);
      }
    };
  }, [ref]);
  return ref;
}

export function BasicPlot(props: UsePlotlyArgs & React.HTMLAttributes<HTMLDivElement>) {
  const { data, layout, config, noValidate, ...rest } = props;
  const ref = usePlotlyBasic({ data, layout, config, noValidate });
  return <div ref={ref} {...rest} />;
}

export default Plot;
