import React from 'react';

import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'styled-components';

import a11yMessages from '../../locales/en/a11y.json';
import actionsMessages from '../../locales/en/actions.json';
import commonMessages from '../../locales/en/common.json';
import theme from '../../public/static/themes/default/theme.json';

const messages = { ...a11yMessages, ...actionsMessages, ...commonMessages };

const AllTheProviders = ({ children }) => {
  return (
    <NextIntlClientProvider locale={'en'} messages={messages}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
