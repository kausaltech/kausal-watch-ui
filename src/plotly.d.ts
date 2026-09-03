declare module '@kausal/plotly-custom/dist/plotly-custom' {
  import type * as Plotly from 'plotly.js';

  const plotly: typeof Plotly;
  export default plotly;
}

declare module 'plotly.js-locales/*' {
  const locale: {
    dictionary: Record<string, string>;
    format: Record<string, unknown>;
    moduleType: 'locale';
    name: string;
  };
  export = locale;
}
