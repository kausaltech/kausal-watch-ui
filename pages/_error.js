import * as Sentry from '@sentry/browser';
import getConfig from 'next/config';
import React from 'react';

import Layout from '../components/layout';

export default class Error extends React.Component {
  static getInitialProps(context) {
    let statusCode;
    const { req, res, err } = context;

    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    } else {
      statusCode = null;
    }

    return { statusCode };
  }

  render() {
    let errorMessage = '';
    const statusCode = this.props.statusCode;

    if (statusCode) {
      errorMessage = `Virhe ${statusCode}`;
      if (statusCode === 404) {
        errorMessage = 'Sivua ei löydy';
      }
    } else {
      errorMessage = 'Tapahtui virhe';
    }
    return (
      <Layout>
        <div className="mb-5">
          <div className="jumbotron" style={{ marginBottom: '6rem' }}>
            <div className="container">
              <h1>{errorMessage}</h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
