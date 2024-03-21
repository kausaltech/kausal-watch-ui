import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import PopoverTip from 'components/common/PopoverTip';
import ActionCard from 'components/actions/ActionCard';
import { useTranslations } from 'next-intl';

const RelatedActionList = styled(Row)`
  padding-left: 0;
`;

const RelatedActionItem = styled(Col)`
  list-style: none;
`;

const ActionRelatedActionsBlock = (props) => {
  const { relatedActions, plan, heading, helpText } = props;
  const t = useTranslations();

  // Display the plan name only if there are related actions from other plans
  const hasRelatedActionsFromOtherPlans = relatedActions.some(
    (relAction) => relAction.plan.id !== plan.id
  );
  return (
    <div>
      <Row>
        <Col>
          <SectionHeader>
            {heading || t('related-actions')}
            {helpText && (
              <PopoverTip
                identifier="related-actions-help"
                content={helpText}
              />
            )}
          </SectionHeader>
          <RelatedActionList tag="ul">
            {relatedActions.map((relAction) => (
              <RelatedActionItem
                tag="li"
                xs="12"
                sm="6"
                lg="4"
                className="mb-5 d-flex align-items-stretch"
                style={{ transition: 'all 0.5s ease' }}
                key={relAction.id}
              >
                <ActionCard
                  action={relAction}
                  showPlan={hasRelatedActionsFromOtherPlans}
                />
              </RelatedActionItem>
            ))}
          </RelatedActionList>
        </Col>
      </Row>
    </div>
  );
};

export default ActionRelatedActionsBlock;
