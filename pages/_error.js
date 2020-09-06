import React from 'react';
import * as Sentry from '@sentry/browser';
import NextErrorComponent from 'next/error';
import getConfig from 'next/config';

import { i18n } from 'common/i18n';
import Layout from '../components/layout';

function Error({ statusCode, hasGetInitialPropsRun, err, errorMessage }) {
  let msg = errorMessage;
  const { t } = i18n;

  if (!msg) {
    if (statusCode) {
      msg = t('error-with-code', { code: statusCode });
      if (statusCode === 404) {
        msg = t('page-not-found');
      }
    } else {
      msg = t('error-occurred');
    }
  }
  return (
    <Layout>
      <div className="mb-5">
        <div className="jumbotron" style={{ marginBottom: '6rem' }}>
          <div className="container">
            <h1>{msg}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = async ({ req, res, err }) => {
  const props = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  props.hasGetInitialPropsRun = true;
  props.namespacesRequired = ['common'];

  if (err?.statusCode && res) res.statusCode = err.statusCode;

  if (res?.statusCode === 404) {
    // do not record an exception in Sentry for 404
    return { statusCode: 404, namespacesRequired: ['common'] };
  }

  if (res && !res.statusCode) res.statusCode = 500;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return props;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );
  await Sentry.flush(2000);

  return props;
};

export default Error;
