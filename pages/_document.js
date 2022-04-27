import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as Sentry from "@sentry/nextjs";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

import { getThemeCSS } from 'common/theme';

export default class WatchDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    let themeProps;
    let basePath;

    const sentryTraceId = Sentry.getCurrentHub()?.getScope()?.getTransaction()?.toTraceparent();

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => {
          themeProps = props.themeProps;
          basePath = props.router.basePath;
          return sheet.collectStyles(<App {...props} />);
        },
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {themeProps && (
              <link rel="stylesheet" type="text/css" href={getThemeCSS(themeProps.name)} />
            )}
            {false && sentryTraceId && (
              <meta name="sentry-trace" content={sentryTraceId} />
            )}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const nextData = this.props.__NEXT_DATA__;
    let serverError;

    if (!nextData) {
      serverError = (
        <h1>Internal Server Error</h1>
      );
    }

    return (
      <Html lang={nextData?.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
          {serverError}
        </body>
      </Html>
    );
  }
}
