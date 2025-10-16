import { useQuery } from '@apollo/client';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import type {
  IndicatorDetailsQuery,
  IndicatorDetailsQueryVariables,
} from '@/common/__generated__/graphql';
import { GET_INDICATOR_DETAILS } from '@/queries/get-indicator';

import IndicatorModalContent from './IndicatorModalContent';

const AriaModalOverlay = styled(ModalOverlay)<{ $bodyHeight: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  /* react-aria ModalOverlay SHOULD provide this as --page-height, but it doesn't */
  height: ${(props) => props.$bodyHeight}px;
  background: rgba(0 0 0 / 0.5);
  z-index: 100;
  font-family: system-ui;
  font-size: 0.875rem;

  &[data-entering] {
    animation: modal-fade 200ms;
  }

  &[data-exiting] {
    animation: modal-fade 150ms reverse ease-in;
  }
`;

const AriaModal = styled(Modal)`
  position: sticky;
  max-height: var(--visual-viewport-height);
  top: calc(var(--visual-viewport-height) / 2);
  margin-left: 50vw;
  translate: -50% -50%;
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 6px;
  background: var(--overlay-background);
  color: var(--text-color);
  border: 1px solid var(--gray-400);
  outline: none;
  width: max-content;
  max-width: 300px;

  &[data-entering] {
    animation: modal-zoom 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .react-aria-TextField {
    margin-bottom: 8px;
  }
`;

const AriaDialog = styled(Dialog)`
  background-color: #eeeeee;
  padding: 20px;
`;

interface IndicatorModalProps {
  indicatorId: string;
  onChange: (indicatorId?: string | null) => void;
  planIdentifier: string;
  prevIndicatorId?: string;
  nextIndicatorId?: string;
}

const IndicatorModal = (props: IndicatorModalProps) => {
  const { indicatorId, onChange, planIdentifier, prevIndicatorId, nextIndicatorId } = props;

  const { loading, error, data, previousData } = useQuery<
    IndicatorDetailsQuery,
    IndicatorDetailsQueryVariables
  >(GET_INDICATOR_DETAILS, {
    variables: {
      plan: planIdentifier,
      id: indicatorId,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <AriaModalOverlay
      isDismissable
      isOpen={indicatorId !== null}
      onOpenChange={() => onChange(null)}
      $bodyHeight={document.body.clientHeight}
    >
      <AriaModal>
        <AriaDialog>
          <Heading slot="title">Indicator</Heading>

          <Button onClick={() => onChange(null)}>X</Button>
          <IndicatorModalContent
            indicator={data?.indicator || previousData?.indicator}
            loading={loading}
            error={error}
          />
          {prevIndicatorId && <Button onClick={() => onChange(prevIndicatorId)}>Previous</Button>}
          {nextIndicatorId && <Button onClick={() => onChange(nextIndicatorId)}>Next</Button>}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
};

export default IndicatorModal;
