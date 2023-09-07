import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';
import accessibilityStatementData from 'public/static/accessibility';

const AccessibilityStatementComplianceStatusBlock = ({ id = '' }) => {
  const { t, i18n } = useTranslation(['a11y']);

  let locale = i18n.language;
  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }
  const accessibilityProblems = accessibilityStatementData[locale].nonAccessibleContent.nonCompliant;
  const complianceStatus = accessibilityStatementData[locale].complianceStatus;
  const complianceStatusText = t(`a11y:${complianceStatus}-compliant`);

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <h2>{t('a11y:compliance-status')}</h2>
          <p>
            {complianceStatusText}
            {' '}
            <a href={t('a11y:wcag-url')}>{t('a11y:target-level')}</a>
          </p>
        { accessibilityProblems.length > 0
          && (
            <>
              {' '}
              {t('a11y:due-to')}
              <h2>{t('a11y:non-accessible-content')}</h2>
              <h3>{t('a11y:non-compliance-aa')}</h3>
              <p>
                {t('a11y:non-compliance-below')}
                :
              </p>
              <ul>
                { accessibilityProblems.map((problem) => (
                  <li key={problem.id}>
                    <h4>{problem.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: problem.description }}/>
                    <p>
                      WCAG:
                      {' '}
                      {problem.WCAGSection}
                    </p>
                  </li>
                ))}
              </ul>
              <p>
                {t('a11y:when-fixed')}
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementComplianceStatusBlock;
