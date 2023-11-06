import { ActionListAction } from '../dashboard.types';
import styled from 'styled-components';
import { PlanContextFragment } from 'common/__generated__/graphql';
import ActionPhase from 'components/actions/ActionPhase';
import { useContext } from 'react';
import { ActionTableContext } from '../ActionStatusTable';

interface Props {
  action: ActionListAction;
  plan: PlanContextFragment;
}

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const ImplementationPhaseCell = ({ action }: Props) => {
  const { plan, config } = useContext(ActionTableContext);

  if (!plan) {
    return null;
  }

  return (
    <StatusDisplay>
      <ActionPhase
        action={action}
        status={
          config.hasPhaseAndStatusColumns ? undefined : action.statusSummary
        }
        activePhase={action.implementationPhase}
        reason={action.manualStatusReason}
        mergedWith={action.mergedWith?.identifier}
        phases={plan.actionImplementationPhases}
        compact
      />
    </StatusDisplay>
  );
};

export default ImplementationPhaseCell;
