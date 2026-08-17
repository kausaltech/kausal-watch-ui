import React from 'react';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { ThemeProvider } from '@emotion/react';

import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { initializeMuiTheme } from '@common/themes/mui-theme/theme';

import a11yMessages from '../../locales/en/a11y.json';
import actionsMessages from '../../locales/en/actions.json';
import commonMessages from '../../locales/en/common.json';
import themeJson from '../../public/static/themes/default/theme.json';

/*
 * Importing JSON widens literal values to plain strings, which no longer
 * satisfies Theme's literal-union properties (e.g. headingsTextTransform).
 */
const theme = /** @type {import('@kausal/themes/types').Theme} */ (
  /** @type {unknown} */ (themeJson)
);

const messages = { ...a11yMessages, ...actionsMessages, ...commonMessages };
const muiTheme = initializeMuiTheme(theme);

const AllTheProviders = ({ children }) => {
  return (
    <NextIntlClientProvider locale={'en'} messages={messages}>
      <MUIThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MUIThemeProvider>
    </NextIntlClientProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
