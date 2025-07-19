import React from 'react';

import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import { CommonContentBlockProps } from '@/common/blocks.types';
import FeedbackForm from '@/components/common/FeedbackForm';
import { usePlan } from '@/context/plan';

const AccessibilityStatementContactFormBlock = ({ id = '' }: CommonContentBlockProps) => {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col xl={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <FeedbackForm
            planIdentifier={plan.identifier}
            formContext="accessibility"
            heading={t('a11y-feedback-heading')}
            description={t('a11y-feedback-description')}
            prompt={t('a11y-feedback-prompt')}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementContactFormBlock;
