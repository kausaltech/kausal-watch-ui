import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class WatchDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const nextDataProps = this.props.__NEXT_DATA__.props;
    let serverError;

    if (!nextDataProps) {
      serverError = (
        <h1>Internal Server Error</h1>
      );
    }

    return (
      <Html lang={nextDataProps?.initialLanguage}>
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
