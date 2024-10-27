import { PlanContextFragment } from '@/common/__generated__/graphql';
import { PhaseTimeline } from '@/components/actions/PhaseTimeline';
import styled from 'styled-components';

import { ActionListAction } from '../dashboard.types';

interface Props {
  action: ActionListAction;
  plan: PlanContextFragment;
}

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const ImplementationPhaseCell = ({ action, plan }: Props) => {
  if (!plan) {
    return null;
  }

  return (
    <StatusDisplay>
      {!!action.implementationPhase && (
        <PhaseTimeline
          layout="mini"
          activePhase={action.implementationPhase}
          phases={plan.actionImplementationPhases}
          isContinuous={action.scheduleContinuous}
        />
      )}
    </StatusDisplay>
  );
};

export default ImplementationPhaseCell;
