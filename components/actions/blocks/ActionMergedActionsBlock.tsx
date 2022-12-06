
import styled from 'styled-components';
import {
 Badge,
} from 'reactstrap';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { usePlan } from 'context/plan';
import type {ActionContentAction} from 'components/actions/ActionContent';
import { ActionSection } from 'components/actions/ActionContent';

const ActionNumberBadge = styled(Badge)`
font-size: ${(props) => props.theme.fontSizeBase};
padding: ${(props) => props.theme.spaces.s025};
border-radius: ${(props) => props.theme.btnBorderRadius};
background-color: ${(props) => props.theme.brandDark};
color: ${(props) => props.theme.themeColors.white};
`;

const MergedActionSection = styled.div`
margin-bottom: ${(props) => props.theme.spaces.s100};
`;

type MergedActionProps = {
  action: ActionContentAction['mergedActions'][0],
}

function MergedAction({ action }: MergedActionProps) {
  const { identifier, officialName, plan, name } = action;
  const currentPlan = usePlan();
  if (currentPlan.id != plan.id) {
    // TODO: Show the target plan of the merging
  }
  return (
    <MergedActionSection>
      <ActionNumberBadge key={identifier} className="me-1">
        {identifier}
      </ActionNumberBadge>
      {officialName || name}
    </MergedActionSection>
  );
}

type ActionMergedActionsBlockProps = {
  actions: MergedActionProps['action'][],
}

function ActionMergedActionsBlock({ actions }: ActionMergedActionsBlockProps) {
  const { t } = useTranslation();
  const plan = usePlan();

  if (!actions || !actions.length) {
    // render nothing
    return null;
  }

  const mergedActions = actions.map((act) => (
    <MergedAction action={act} key={act.id} />
  ));

  return (
    <ActionSection>
      <h2>{ t('actions:action-merged', getActionTermContext(plan)) }</h2>
      {mergedActions}
    </ActionSection>
  );
}

export default ActionMergedActionsBlock;
