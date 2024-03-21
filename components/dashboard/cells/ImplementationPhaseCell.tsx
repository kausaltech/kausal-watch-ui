import { ActionListAction } from '../dashboard.types';
import styled from 'styled-components';
import { PlanContextFragment } from 'common/__generated__/graphql';
import { useContext } from 'react';
import { ActionTableContext } from '../ActionStatusTable';
import { PhaseTimeline } from 'components/actions/PhaseTimeline';

interface Props {
  action: ActionListAction;
  plan: PlanContextFragment;
}

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const ImplementationPhaseCell = ({ action }: Props) => {
  const { plan } = useContext(ActionTableContext);

  if (!plan) {
    return null;
  }

  return (
    <StatusDisplay>
      {!!action.implementationPhase && (
        <PhaseTimeline
          layout="mini"
          activePhase={action.implementationPhase}
          isContinuous={action.scheduleContinuous}
        />
      )}
    </StatusDisplay>
  );
};

export default ImplementationPhaseCell;
