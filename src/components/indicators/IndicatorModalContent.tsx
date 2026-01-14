import type { ApolloError } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Alert, Spinner } from 'reactstrap';
import styled from 'styled-components';

import type { IndicatorDetailsQuery, IndicatorListQuery } from '@/common/__generated__/graphql';
import { deploymentType } from '@/common/environment';
import ChangeHistory from '@/components/common/ChangeHistory';
import { usePlan } from '@/context/plan';

import IndicatorModalContentBlock, {
  IndicatorGroupedCategoryBlock,
  groupConsecutiveCategoryBlocks,
} from './IndicatorModalContentBlock';

const ContentLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  min-height: 0;
`;

const ModalHeader = styled.div`
  flex: 0 0 auto;
  padding: ${({ theme }) => `${theme.spaces.s150}`};
  padding-right: ${({ theme }) => theme.spaces.s300};
  background-color: ${({ theme }) => theme.themeColors.white};
  border-bottom: 1px solid ${({ theme }) => theme.cardBackground.secondary};
  h1 {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.fontSizeMd};
  }
`;

const ModalScrollableContent = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spaces.s200};
  min-height: 0;
  background:
    /* Shadow Cover TOP */
    linear-gradient(${({ theme }) => theme.themeColors.white} 30%, rgba(255, 255, 255, 0)) center
      top,
    /* Shadow Cover BOTTOM */
    linear-gradient(rgba(255, 255, 255, 0), ${({ theme }) => theme.themeColors.white} 70%) center
      bottom,
    /* Shadow TOP */ linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)) center top,
    /* Shadow BOTTOM */ linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)) center bottom,
    /* Base background color */ ${({ theme }) => theme.themeColors.white};
  background-repeat: no-repeat;
  background-size:
    100% 40px,
    100% 40px,
    100% 14px,
    100% 14px;
  background-attachment: local, local, scroll, scroll;
`;

const ModalContentBlocksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spaces.s300};
`;

// Remove ChangeHistory's internal padding (s150) to align it with modal content.
const ChangeHistoryInModal = styled.div`
  margin-left: ${({ theme }) => `-${theme.spaces.s150}`};
  margin-right: ${({ theme }) => `-${theme.spaces.s150}`};
`;

interface IndicatorModalContentProps {
  indicator?: IndicatorDetailsQuery['indicator'] | null;
  loading: boolean;
  error: ApolloError | undefined;
  usableCategoryTypes: NonNullable<IndicatorListQuery['plan']>['categoryTypes'];
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
}

const IndicatorModalContent = ({
  indicator,
  loading,
  error,
  layout,
}: IndicatorModalContentProps) => {
  const t = useTranslations();
  const plan = usePlan();
  const hasLayout =
    !loading &&
    ((layout.detailsMainTop && layout.detailsMainTop.length > 0) ||
      (layout.detailsMainBottom && layout.detailsMainBottom.length > 0) ||
      (layout.detailsAside && layout.detailsAside.length > 0));

  if (loading && !indicator)
    return (
      <ContentWrapper>
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      </ContentWrapper>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!indicator) return <div>No data</div>;

  const indicatorName = indicator.name;

  const showChangeHistory = plan.features.enableChangeLog && !!indicator.changeLogMessage;

  return (
    <ContentWrapper>
      {loading && (
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      )}
      <ModalHeader>
        <h1 id="indicator-modal-title">{indicatorName}</h1>
      </ModalHeader>
      <ModalScrollableContent>
        {!hasLayout && deploymentType !== 'production' && (
          <Alert color="warning">{t('error-no-layout')}</Alert>
        )}
        <ModalContentBlocksWrapper>
          {groupConsecutiveCategoryBlocks(layout.detailsMainTop || []).map(
            (groupedBlock, index) => {
              if (groupedBlock.type === 'grouped') {
                return (
                  <IndicatorGroupedCategoryBlock
                    key={`grouped-${index}-${groupedBlock.blocks[0]?.id}`}
                    blocks={groupedBlock.blocks}
                    indicator={indicator}
                    hideLegacyLastUpdated={showChangeHistory}
                  />
                );
              }
              return (
                <IndicatorModalContentBlock
                  key={groupedBlock.block.id}
                  block={groupedBlock.block}
                  indicator={indicator}
                  hideLegacyLastUpdated={showChangeHistory}
                />
              );
            }
          )}
          {groupConsecutiveCategoryBlocks(layout.detailsMainBottom || []).map(
            (groupedBlock, index) => {
              if (groupedBlock.type === 'grouped') {
                return (
                  <IndicatorGroupedCategoryBlock
                    key={`grouped-${index}-${groupedBlock.blocks[0]?.id}`}
                    blocks={groupedBlock.blocks}
                    indicator={indicator}
                    hideLegacyLastUpdated={showChangeHistory}
                  />
                );
              }
              return (
                <IndicatorModalContentBlock
                  key={groupedBlock.block.id}
                  block={groupedBlock.block}
                  indicator={indicator}
                  hideLegacyLastUpdated={showChangeHistory}
                />
              );
            }
          )}
          {groupConsecutiveCategoryBlocks(layout.detailsAside || []).map((groupedBlock, index) => {
            if (groupedBlock.type === 'grouped') {
              return (
                <IndicatorGroupedCategoryBlock
                  key={`grouped-${index}-${groupedBlock.blocks[0]?.id}`}
                  blocks={groupedBlock.blocks}
                  indicator={indicator}
                  hideLegacyLastUpdated={showChangeHistory}
                />
              );
            }
            return (
              <IndicatorModalContentBlock
                key={groupedBlock.block.id}
                block={groupedBlock.block}
                indicator={indicator}
                hideLegacyLastUpdated={showChangeHistory}
              />
            );
          })}
        </ModalContentBlocksWrapper>
        {showChangeHistory && (
          <ChangeHistoryInModal>
            <ChangeHistory
              entityType="indicator"
              entityId={String(indicator.id)}
              entry={indicator.changeLogMessage}
            />
          </ChangeHistoryInModal>
        )}
      </ModalScrollableContent>
    </ContentWrapper>
  );
};

export default IndicatorModalContent;
