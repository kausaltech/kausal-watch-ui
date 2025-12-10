import React from 'react';

import { useTranslations } from 'next-intl';
import { Button } from 'reactstrap';

import { IndicatorCounter, ModalNavigation } from './IndicatorModal.styles';

interface IndicatorModalNavigationProps {
  prevIndicatorId?: string;
  nextIndicatorId?: string;
  currentIndicatorNumber: number;
  indicatorCount: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function IndicatorModalNavigation({
  prevIndicatorId,
  nextIndicatorId,
  currentIndicatorNumber,
  indicatorCount,
  loading,
  onPrevious,
  onNext,
}: IndicatorModalNavigationProps) {
  const t = useTranslations();
  return (
    <ModalNavigation>
      <Button
        onClick={onPrevious}
        disabled={!prevIndicatorId || loading}
        style={{ visibility: prevIndicatorId ? 'visible' : 'hidden' }}
      >
        {t('previous-indicator')}
      </Button>
      <IndicatorCounter>
        {currentIndicatorNumber}/{indicatorCount}
      </IndicatorCounter>
      <Button
        onClick={onNext}
        disabled={!nextIndicatorId || loading}
        style={{ visibility: nextIndicatorId ? 'visible' : 'hidden' }}
      >
        {t('next-indicator')}
      </Button>
    </ModalNavigation>
  );
}
