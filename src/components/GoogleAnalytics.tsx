'use client';

import React, { useEffect } from 'react';

import Script from 'next/script';

type Props = {
  trackingId: string;
};

const GoogleAnalytics = ({ trackingId }: Props) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }, [trackingId]);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-inline" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
