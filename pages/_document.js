import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';


export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    // Ugly hack to include polyfills for IE
    const iePolyfill = '<!--[if lte IE 11]><script src=”https://cdn.polyfill.io/v2/polyfill.min.js?features=es6"></script><![endif]-->';

    return (
      <html lang="fi">
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <div style={{display: "none"}} id="ie-polyfill-hack" dangerouslySetInnerHTML={{__html: iePolyfill}} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
