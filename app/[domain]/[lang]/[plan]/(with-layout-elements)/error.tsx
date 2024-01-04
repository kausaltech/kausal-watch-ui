'use client';

import React, { useEffect } from 'react';

import { ErrorPage } from '@/components/common/ErrorPage';

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  console.log(error, error.message);

  useEffect(() => {
    // TODO: Log error to Sentry
    console.error(error);

    //   if (!hasGetInitialPropsRun && err) {
    //     // getInitialProps is not called in case of
    //     // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    //     // err via _app.js so it can be captured
    //     Sentry.captureException(err);
    //     // Flushing is not required in this case as it only happens on the client
    //   }
  }, [error]);

  return <ErrorPage message={error.message} />;
}
