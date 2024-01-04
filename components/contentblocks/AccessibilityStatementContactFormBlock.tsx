import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { usePlan } from 'context/plan';
import FeedbackForm from 'components/common/FeedbackForm';
import { CommonContentBlockProps } from 'common/blocks.types';
import { useTranslations } from 'next-intl';

const AccessibilityStatementContactFormBlock = ({
  id = '',
}: CommonContentBlockProps) => {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
        >
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
