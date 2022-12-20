import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { Collapse } from 'reactstrap';
import Icon from 'components/common/Icon';
import PlanContext from 'context/plan';
import FeedbackForm from 'components/common/FeedbackForm';

const ActionContactFormSection = styled.div`
  padding: ${(props) => props.size === 'sm' ? props.theme.spaces.s050 : props.theme.spaces.s100};
  background-color: ${(props) => props.theme.graphColors.blue010};

  h2 {
    font-size: ${(props) => props.size === 'sm' ? props.theme.fontSizeMd : props.theme.fontSizeLg};
  }
`;

const ContactTriggerButton = styled.button`
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
  overflow: visible;
  text-transform: none;
  border: none;
  background: none;
  display: flex;
  text-align: left;

  .icon {
    margin-right: 1rem;
  }
`;

const ActionContactFormBlock = (props) => {
  const { context, formContext } = props;
  const { t } = useTranslation(['a11y']);
  const plan = useContext(PlanContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let size = 'md';
  if (context === 'sidebar') {
    size = 'sm';
  };

  return (
    <ActionContactFormSection size={size}>

    <ContactTriggerButton
      color="link"
      onClick={toggle}
    >
      <Icon name="commenting" width="2rem" height="2rem"/>
      <div>
        <h2>{t('feedback-on-action')}</h2>
        {t('feedback-on-action-description')}
      </div>
      <Icon name={isOpen ? 'angle-down' : 'angle-right'} width="2rem" height="2rem"/>
    </ContactTriggerButton>
    <Collapse isOpen={isOpen}>
    <FeedbackForm
      planIdentifier={plan.identifier}
      heading=""
      description=""
      prompt=""
      formContext={formContext}
    />
    </Collapse>
    </ActionContactFormSection>
  );
};

export default ActionContactFormBlock;
