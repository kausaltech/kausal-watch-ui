import { useQuery } from '@apollo/client';
import { Button as AriaButton, Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
  IndicatorListQuery,
} from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';
import { GET_INDICATOR_DETAILS } from '@/queries/get-indicator';

import IndicatorModalContent from './IndicatorModalContent';

const AriaModalOverlay = styled(ModalOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0 0 0 / 0.5);
  z-index: 750;

  &[data-entering] {
    animation: modal-fade 200ms;
  }

  &[data-exiting] {
    animation: modal-fade 150ms reverse ease-in;
  }
`;

const AriaModal = styled(Modal)`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  width: calc(100vw - 40px);
  max-width: 720px;
  height: calc(var(--visual-viewport-height) - 100px);
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 6px;
  background: var(--overlay-background);
  color: var(--text-color);
  outline: none;

  &[data-entering] {
    animation: modal-zoom 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .react-aria-TextField {
    margin-bottom: 8px;
  }
`;

const AriaDialog = styled(Dialog)`
  background-color: #eeeeee;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const ModalNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spaces.s050};
  flex: 0 0 auto;
  border-top: 1px solid ${({ theme }) => theme.cardBackground.secondary};
  background-color: ${({ theme }) => theme.themeColors.white};
`;

const IndicatorCounter = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;
interface IndicatorModalProps {
  indicatorId: string;
  onChange: (indicatorId?: string | null) => void;
  indicatorPlanIdentifier: string;
  sitePlanIdentifier: string;
  prevIndicatorId?: string;
  nextIndicatorId?: string;
  indicatorsOrder: string[];
  usableCategoryTypes: NonNullable<IndicatorListQuery['plan']>['categoryTypes'];
}

const IndicatorModal = (props: IndicatorModalProps) => {
  const {
    indicatorId,
    onChange,
    indicatorPlanIdentifier,
    sitePlanIdentifier,
    indicatorsOrder,
    usableCategoryTypes,
  } = props;

  const { loading, error, data, previousData } = useQuery<
    IndicatorDetailsQuery,
    IndicatorDetailsQueryVariables
  >(GET_INDICATOR_DETAILS, {
    variables: {
      plan: indicatorPlanIdentifier,
      sitePlan: sitePlanIdentifier,
      id: indicatorId,
    },
    fetchPolicy: 'no-cache',
  });

  const currentIndicatorIndex = indicatorsOrder.indexOf(indicatorId);
  const prevIndicatorId = indicatorsOrder[currentIndicatorIndex - 1];
  const nextIndicatorId = indicatorsOrder[currentIndicatorIndex + 1];
  const indicatorCount = indicatorsOrder.length;
  const currentIndicatorNumber = currentIndicatorIndex + 1;

  return (
    <AriaModalOverlay
      isDismissable
      isOpen={indicatorId !== null}
      onOpenChange={() => onChange(null)}
    >
      <AriaModal>
        <AriaDialog aria-labelledby="indicator-modal-title">
          <AriaButton
            slot="close"
            onClick={() => onChange(null)}
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
          </AriaButton>
          <IndicatorModalContent
            indicator={data?.indicator || previousData?.indicator}
            layout={{
              detailsMainTop: data?.plan?.indicatorListPage?.detailsMainTop ?? [],
              detailsMainBottom: data?.plan?.indicatorListPage?.detailsMainBottom ?? [],
              detailsAside: data?.plan?.indicatorListPage?.detailsAside ?? [],
            }}
            loading={loading}
            error={error}
            usableCategoryTypes={usableCategoryTypes}
          />
          <ModalNavigation>
            <Button
              onClick={() => onChange(prevIndicatorId)}
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
              onClick={() => onChange(nextIndicatorId)}
              aria-label="Next indicator"
              disabled={!nextIndicatorId || loading}
              style={{ visibility: nextIndicatorId ? 'visible' : 'hidden' }}
            >
              Next
            </Button>
          </ModalNavigation>
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
};

export default IndicatorModal;
