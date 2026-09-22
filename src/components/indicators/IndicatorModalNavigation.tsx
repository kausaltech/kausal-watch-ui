import { useTranslations } from 'next-intl';

import { getIndicatorTermContext } from '@/common/i18n';
import Button from '@/components/common/Button';
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
        color="primary"
        outline
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
        color="primary"
        outline
        onClick={onNext}
        disabled={!nextIndicatorId || loading}
        style={{ visibility: nextIndicatorId ? 'visible' : 'hidden' }}
      >
        {t('next-indicator', getIndicatorTermContext(plan))}
      </Button>
    </ModalNavigation>
  );
}
