import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';
import PlanContext from 'context/plan';

const AccessibilityStatementContactInformationBlock = (props) => {
  const { content } = props;
  const { t, i18n } = useTranslation(['a11y']);
  const plan = useContext(PlanContext);

  const accessibilityContactEmail = content?.find((block) => block.id==='email')?.value || 'accessibility@kausal.tech';
  const publisher = content?.find((block) => block.id === 'publisher')?.value;
  const customParagraph = content?.find((block) => block.id === 'maintenance_responsibility_paragraph')?.value;
  const responsibleBody = publisher || plan.generalContent.ownerName;

  return (
    <Container className="my-2 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <h2>{t('a11y:feedback-contact')}</h2>
          <p>
            {customParagraph || t('a11y:responsible-for-maintenance', {responsibleBody} )}
          </p>
          <p>
            {t('a11y:feedback-text')}
            {' '}
            <a href={`mailto:${accessibilityContactEmail}`}>
              {accessibilityContactEmail}
            </a>
            {' '}
            {t('a11y:response-time')}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementContactInformationBlock;
