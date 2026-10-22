import { useId, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { getActionTermContext } from '@/common/i18n';
import type { ActionContentAction } from '@/components/actions/ActionContent';
import FeedbackForm, { type FeedbackFormAdditionalField } from '@/components/common/FeedbackForm';
import Icon from '@/components/common/Icon';
import { usePlan } from '@/context/plan';

const FeedbackFormSection = styled.div<{ $size: 'sm' | 'md' }>`
  padding: ${(props) => (props.$size === 'sm' ? props.theme.spaces.s050 : props.theme.spaces.s100)};
  background-color: ${(props) => props.theme.graphColors.blue010};
  margin-bottom: ${(props) => props.theme.spaces.s400};

  @media print {
    display: none;
  }

  /* The h2 wraps the trigger button, so the heading look moves to .trigger-heading
     and the description gets the body text look back */
  h2 {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizeBase};
  }

  .trigger-heading {
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.themeColors.black};
    font-weight: ${(props) => props.theme.headingsFontWeight};
    font-size: ${(props) =>
      props.$size === 'sm' ? props.theme.fontSizeMd : props.theme.fontSizeLg};
    line-height: ${(props) => props.theme.lineHeightMd};
    text-transform: ${(props) => props.theme.headingsTextTransform};
  }

  .trigger-description {
    display: block;
    color: ${(props) => props.theme.themeColors.black};
    font-family: ${({ theme }) =>
      theme.fontFamily !== ''
        ? `${theme.fontFamily}, ${theme.fontFamilyFallback}`
        : theme.fontFamilyFallback};
    font-weight: ${(props) => props.theme.fontWeightBase};
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
  categoryId?: string;
  context?: 'sidebar' | 'default';
  heading?: string;
  description?: string;
  feedbackVisible?: boolean;
  feedbackRequired?: boolean;
  emailVisible?: boolean;
  emailRequired?: boolean;
  fields?: FeedbackFormAdditionalField[];
  pageId: string | null;
}

const ExpandableFeedbackFormBlock = ({
  action,
  categoryId,
  context = 'default',
  heading,
  description,
  feedbackVisible = true,
  feedbackRequired = true,
  emailVisible = true,
  emailRequired = true,
  fields,
  pageId,
}: Props) => {
  const t = useTranslations();
  const plan = usePlan();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const toggle = () => setIsOpen(!isOpen);
  const size = context === 'sidebar' ? 'sm' : 'md';

  const isAction = !!action;
  const isCategory = !!categoryId;

  const defaultHeading = isAction
    ? t('feedback-on-action', getActionTermContext(plan))
    : t('feedback-on-category');
  const defaultDescription = isAction
    ? t('feedback-on-action-description', getActionTermContext(plan))
    : t('feedback-on-category-description');

  return (
    <FeedbackFormSection $size={size}>
      {/* The button is inside the heading: a button may not contain a heading or a div */}
      <h2>
        <ContactTriggerButton onClick={toggle} aria-expanded={isOpen} aria-controls={panelId}>
          <Icon.Commenting width="2rem" height="2rem" />
          <span>
            <span className="trigger-heading">{heading || defaultHeading}</span>
            <span className="trigger-description">{description || defaultDescription}</span>
          </span>
          <Icon name={isOpen ? 'angle-down' : 'angle-right'} width="2rem" height="2rem" />
        </ContactTriggerButton>
      </h2>
      <Collapse in={isOpen} id={panelId}>
        <FeedbackForm
          planIdentifier={plan.identifier}
          actionId={isAction ? action.id : undefined}
          categoryId={isCategory ? categoryId : undefined}
          heading=""
          description=""
          feedbackVisible={feedbackVisible}
          feedbackRequired={feedbackRequired}
          emailVisible={emailVisible}
          emailRequired={emailRequired}
          prompt=""
          formContext={isAction ? 'action' : 'category'}
          additionalFields={fields}
          pageId={pageId}
        />
      </Collapse>
    </FeedbackFormSection>
  );
};

export default ExpandableFeedbackFormBlock;
