'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { Spinner } from 'reactstrap';

type Props = {
  /** Support rendering server-side */
  initiallyVisible?: boolean;
};

function ContentLoader({ initiallyVisible = false }: Props) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    // Only display the message and spinner after 250ms has passed
    const timer = setTimeout(() => setIsVisible(true));

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div aria-busy="true">
      <Spinner type="grow" className="mx-1" />
      <Spinner type="grow" className="mx-1" />
      <Spinner type="grow" className="mx-1" />
      <div className="visually-hidden">{t('loading')}</div>
    </div>
  );
}

export default ContentLoader;
