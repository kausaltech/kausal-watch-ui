import React, { useState } from 'react';
import styled from 'styled-components';

import { Collapse } from 'reactstrap';
import Icon from 'components/common/Icon';
import { usePlan } from 'context/plan';
import FeedbackForm from 'components/common/FeedbackForm';
import { ActionContentAction } from 'components/actions/ActionContent';
import { useTranslations } from 'next-intl';

const FeedbackFormSection = styled.div`
  padding: ${(props) =>
    props.size === 'sm' ? props.theme.spaces.s050 : props.theme.spaces.s100};
  background-color: ${(props) => props.theme.graphColors.blue010};
  margin-bottom: ${(props) => props.theme.spaces.s400};

  h2 {
    font-size: ${(props) =>
      props.size === 'sm' ? props.theme.fontSizeMd : props.theme.fontSizeLg};
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

interface Props {
  action?: ActionContentAction;
  context?: 'sidebar' | 'default';
  heading?: string;
  description?: string;
}

const ExpandableFeedbackFormBlock = ({
  action,
  context = 'default',
  heading,
  description,
}: Props) => {
  const t = useTranslations();
  const plan = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const size = context === 'sidebar' ? 'sm' : 'md';

  return (
    <FeedbackFormSection size={size}>
      <ContactTriggerButton color="link" onClick={toggle}>
        <Icon name="commenting" width="2rem" height="2rem" />
        <div>
          <h2>{heading || t('feedback-on-action')}</h2>
          {description || t('feedback-on-action-description')}
        </div>
        <Icon
          name={isOpen ? 'angle-down' : 'angle-right'}
          width="2rem"
          height="2rem"
        />
      </ContactTriggerButton>
      <Collapse isOpen={isOpen}>
        <FeedbackForm
          planIdentifier={plan.identifier}
          actionId={action?.id}
          heading=""
          description=""
          prompt=""
          formContext="action"
        />
      </Collapse>
    </FeedbackFormSection>
  );
};

export default ExpandableFeedbackFormBlock;
