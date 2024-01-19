import styled from 'styled-components';
import { Row, Col, Badge } from 'reactstrap';
import { readableColor } from 'polished';
import { getActionTermContext } from 'common/i18n';
import { usePlan } from 'context/plan';
import type { ActionContentAction } from 'components/actions/ActionContent';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import { useTranslations } from 'next-intl';

const ActionNumberBadge = styled(Badge)`
  font-size: ${(props) => props.theme.fontSizeBase};
  padding: ${(props) => props.theme.spaces.s025};
  border-radius: ${(props) => props.theme.btnBorderRadius};
  background-color: ${(props) => props.theme.brandDark} !important;
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
`;

const MergedActionSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

type MergedActionProps = {
  action: ActionContentAction['mergedActions'][0];
};

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
  actions: MergedActionProps['action'][];
};

function ActionMergedActionsBlock({ actions }: ActionMergedActionsBlockProps) {
  const t = useTranslations();
  const plan = usePlan();

  if (!actions || !actions.length) {
    // render nothing
    return null;
  }

  const mergedActions = actions.map((act) => (
    <MergedAction action={act} key={act.id} />
  ));

  return (
    <div>
      <Row>
        <Col>
          <SectionHeader>
            {t('action-merged', getActionTermContext(plan))}
          </SectionHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionSection>{mergedActions}</ActionSection>
        </Col>
      </Row>
    </div>
  );
}

export default ActionMergedActionsBlock;
