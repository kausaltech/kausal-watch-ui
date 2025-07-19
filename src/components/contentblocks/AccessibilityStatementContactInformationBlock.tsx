import React from 'react';

import { CommonContentBlockProps } from 'common/blocks.types';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

interface Props extends CommonContentBlockProps {
  content?: unknown[]; // TODO: Type this prop
}

const AccessibilityStatementContactInformationBlock = ({ id = '', content }: Props) => {
  const t = useTranslations();
  const plan = usePlan();

  const accessibilityContactEmail =
    content?.find((block) => block.id === 'email')?.value || 'accessibility@kausal.tech';
  const publisher = content?.find((block) => block.id === 'publisher')?.value;
  const customParagraph = content?.find(
    (block) => block.id === 'maintenance_responsibility_paragraph'
  )?.value;
  const responsibleBody = publisher || plan.generalContent.ownerName;

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col xl={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <h2>{t('a11y-feedback-contact')}</h2>
          <p>{customParagraph || t('responsible-for-maintenance', { responsibleBody })}</p>
          <p>
            {t('a11y-feedback-text')}{' '}
            <a href={`mailto:${accessibilityContactEmail}`}>{accessibilityContactEmail}</a>{' '}
            {t('response-time')}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementContactInformationBlock;
