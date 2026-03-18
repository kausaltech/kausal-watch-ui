import React from 'react';

import { useTranslations } from 'next-intl';
import { Button } from 'reactstrap';

import { getIndicatorTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';

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
  const plan = usePlan();
  const t = useTranslations();
  return (
    <ModalNavigation>
      <Button
        onClick={onPrevious}
        disabled={!prevIndicatorId || loading}
        style={{ visibility: prevIndicatorId ? 'visible' : 'hidden' }}
      >
        {t('previous-indicator', getIndicatorTermContext(plan))}
      </Button>
      <IndicatorCounter>
        {currentIndicatorNumber}/{indicatorCount}
      </IndicatorCounter>
      <Button
        onClick={onNext}
        disabled={!nextIndicatorId || loading}
        style={{ visibility: nextIndicatorId ? 'visible' : 'hidden' }}
      >
        {t('next-indicator', getIndicatorTermContext(plan))}
      </Button>
    </ModalNavigation>
  );
}
