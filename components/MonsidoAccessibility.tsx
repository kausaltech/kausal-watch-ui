'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

type Props = {
  token: string;
};

declare global {
  interface Window {
    _monsido: any;
  }
}

const MonsidoAccessibility = ({ token }: Props) => {
  useEffect(() => {
    window._monsido = window._monsido || {
      token: token,
      statistics: {
        enabled: true,
        cookieLessTracking: true,
        documentTracking: {
          enabled: true,
          documentCls: 'monsido_download',
          documentIgnoreCls: 'monsido_ignore_download',
          documentExt: [],
        },
      },
      heatmap: {
        enabled: true,
      },
      pageCorrect: {
        enabled: true,
      },
      pageAssistV2: {
        enabled: true,
        theme: 'light',
        mainColor: '#023B64',
        textColor: '#ffffff',
        linkColor: '#000000',
        buttonHoverColor: '#A30046',
        mainDarkColor: '#052942',
        textDarkColor: '#ffffff',
        linkColorDark: '#FFCF4B',
        buttonHoverDarkColor: '#FFCF4B',
        greeting: 'Discover your personalization options',
        direction: 'rightbottom',
        coordinates: 'unset 20 20 unset',
        iconShape: 'circle',
        title: 'Personalization Options',
        titleText:
          'Welcome to PageAssist™ toolbar! Adjust the options below to cater the website to your accessibility needs.',
        iconPictureUrl: 'logo',
        logoPictureUrl: '',
        logoPictureBase64: '',
        languages: ['en-US', 'es-MX'],
        defaultLanguage: 'en-US',
        skipTo: false,
        alwaysOnTop: false,
      },
    };
  }, [token]);

  return (
    <Script
      type="text/javascript"
      async
      src="https://app-script.monsido.com/v2/monsido-script.js"
    />
  );
};

export default MonsidoAccessibility;
