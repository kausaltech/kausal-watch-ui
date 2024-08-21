'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

type Props = {
  trackingId: string;
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}

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
    <Script
      type="text/javascript"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
    />
  );
};

export default GoogleAnalytics;
