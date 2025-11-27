import React from 'react';

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
  return (
    <ModalNavigation>
      <Button
        onClick={onPrevious}
        aria-label="Previous indicator"
        disabled={!prevIndicatorId || loading}
        style={{ visibility: prevIndicatorId ? 'visible' : 'hidden' }}
      >
        Previous
      </Button>
      <IndicatorCounter>
        {currentIndicatorNumber}/{indicatorCount}
      </IndicatorCounter>
      <Button
        onClick={onNext}
        aria-label="Next indicator"
        disabled={!nextIndicatorId || loading}
        style={{ visibility: nextIndicatorId ? 'visible' : 'hidden' }}
      >
        Next
      </Button>
    </ModalNavigation>
  );
}
