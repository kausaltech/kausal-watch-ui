import React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import accessibilityStatementData from '@/public/static/accessibility';

function getComplianceStatusText(t, complianceStatus) {
  switch (complianceStatus) {
    case 'partial':
      return t('partial-compliant');
    case 'full':
      return t('full-compliant');
    case 'not':
      return t('not-compliant');
  }
}

const AccessibilityStatementComplianceStatusBlock = ({ id = '' }) => {
  const t = useTranslations();
  let locale = useLocale();

  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }
  const accessibilityProblems =
    accessibilityStatementData[locale].nonAccessibleContent.nonCompliant;
  const complianceStatus = accessibilityStatementData[locale].complianceStatus;
  const complianceStatusText = getComplianceStatusText(t, complianceStatus);

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col xl={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <h2>{t('compliance-status')}</h2>
          <p>
            {complianceStatusText} <a href={t('wcag-url')}>{t('target-level')}</a>
          </p>
          {accessibilityProblems.length > 0 && (
            <>
              {' '}
              {t('due-to')}
              <h2>{t('non-accessible-content')}</h2>
              <h3>{t('non-compliance-aa')}</h3>
              <p>{t('non-compliance-below')}:</p>
              <ul>
                {accessibilityProblems.map((problem) => (
                  <li key={problem.id}>
                    <h4>{problem.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: problem.description }} />
                    <p>WCAG: {problem.WCAGSection}</p>
                  </li>
                ))}
              </ul>
              <p>{t('when-fixed')}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementComplianceStatusBlock;
