import { useTranslation } from 'next-i18next';
import { ActionListAction } from '../dashboard.types';
import styled from 'styled-components';
import StatusBadge from 'components/common/StatusBadge';
import { getActionTermContext } from 'common/i18n';
import { PlanContextFragment } from 'common/__generated__/graphql';

interface Props {
  action: ActionListAction;
  plan: PlanContextFragment;
}

const StatusDisplay = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  height: 100%;
`;

const StatusCell = ({ action, plan }: Props) => {
  const { t } = useTranslation();

  if (action.statusSummary.identifier === 'UNDEFINED') {
    return null;
  }

  return (
    <StatusDisplay>
      <StatusBadge
        action={action}
        plan={plan}
        subtle
        statusName={
          action.mergedWith
            ? t('actions:action-status-merged', getActionTermContext(plan))
            : action.statusSummary.label
        }
      />
    </StatusDisplay>
  );
};

export default StatusCell;
