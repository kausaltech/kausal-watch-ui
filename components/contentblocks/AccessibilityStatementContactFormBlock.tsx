import React, { useContext } from 'react';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';

import PlanContext from 'context/plan';
import FeedbackForm from 'components/common/FeedbackForm';
import { CommonContentBlockProps } from 'common/blocks.types';

const AccessibilityStatementContactFormBlock = ({
  id = '',
}: CommonContentBlockProps) => {
  const { t } = useTranslation(['a11y']);
  const plan = useContext(PlanContext);

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
            heading={t('a11y:feedback-heading')}
            description={t('a11y:feedback-description')}
            prompt={t('a11y:feedback-prompt')}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementContactFormBlock;
