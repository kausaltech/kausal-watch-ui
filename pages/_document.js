import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class WatchDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    let themeProps;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => {
          themeProps = props.themeProps;
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
            {themeProps?.themeCustomStylesUrl && (
              <link rel="stylesheet" type="text/css" href={themeProps.themeCustomStylesUrl} />
            )}
            {themeProps?.fontUrl && (
              <link rel="stylesheet" type="text/css" href={themeProps.fontUrl} />
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
