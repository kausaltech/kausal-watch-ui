import React from 'react';
import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import getConfig from 'next/config';

import { useTranslation } from 'common/i18n';
import Layout from '../components/layout';

function Error({ errorMessage, err, hasGetInitialPropsRun, statusCode }) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

  let msg = errorMessage;
  const { t } = useTranslation();

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
        <div className="rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
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

  if (err?.statusCode && res) res.statusCode = err.statusCode;

  if (res?.statusCode === 404) {
    // do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  if (res && !res.statusCode) res.statusCode = 500;
  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
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
