import type { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useTranslations } from 'next-intl';

import type { IndicatorDetailsQuery, IndicatorListQuery } from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';

import { StyledDialog } from './IndicatorModal.styles';
import IndicatorModalContent from './IndicatorModalContent';
import { IndicatorModalNavigation } from './IndicatorModalNavigation';

interface IndicatorModalBaseProps {
  indicator: IndicatorDetailsQuery['indicator'] | null | undefined;
  loading: boolean;
  error: Error | undefined;
  layout: {
    detailsMainTop: NonNullable<
      NonNullable<IndicatorDetailsQuery['plan']>['indicatorListPage']
    >['detailsMainTop'];
    detailsMainBottom: NonNullable<
      NonNullable<IndicatorDetailsQuery['plan']>['indicatorListPage']
    >['detailsMainBottom'];
    detailsAside: NonNullable<
      NonNullable<IndicatorDetailsQuery['plan']>['indicatorListPage']
    >['detailsAside'];
  };
  usableCategoryTypes: Array<{ id: string; name: string; identifier: string }>;
  isOpen: boolean;
  onClose: () => void;
  navigation?: {
    prevIndicatorId?: string;
    nextIndicatorId?: string;
    currentIndicatorNumber: number;
    indicatorCount: number;
    onPrevious: () => void;
    onNext: () => void;
  };
}

export function IndicatorModalBase({
  indicator,
  loading,
  error,
  layout,
  usableCategoryTypes,
  isOpen,
  onClose,
  navigation,
}: IndicatorModalBaseProps) {
  const t = useTranslations();

  return (
    <StyledDialog open={isOpen} onClose={onClose} aria-labelledby="indicator-modal-title">
      <button
        type="button"
        onClick={onClose}
        aria-label={t('close')}
        style={{
          position: 'absolute',
          top: '5px',
          right: '0',
          zIndex: 1001,
          border: 0,
          background: 'transparent',
        }}
      >
        <Icon.Times width="32px" height="32px" />
      </button>
      <IndicatorModalContent
        indicator={indicator}
        layout={layout}
        loading={loading}
        error={error as CombinedGraphQLErrors}
        usableCategoryTypes={
          usableCategoryTypes as NonNullable<IndicatorListQuery['plan']>['categoryTypes']
        }
      />
      {navigation && (
        <IndicatorModalNavigation
          prevIndicatorId={navigation.prevIndicatorId}
          nextIndicatorId={navigation.nextIndicatorId}
          currentIndicatorNumber={navigation.currentIndicatorNumber}
          indicatorCount={navigation.indicatorCount}
          loading={loading}
          onPrevious={() => navigation.onPrevious()}
          onNext={() => navigation.onNext()}
        />
      )}
    </StyledDialog>
  );
}
