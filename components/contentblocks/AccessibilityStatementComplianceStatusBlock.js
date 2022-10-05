import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';
import accessibilityStatementData from 'public/static/accessibility';

const AccessibilityStatementComplianceStatusBlock = (props) => {
  const { t, i18n } = useTranslation(['a11y']);

  let locale = i18n.language;
  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }
  const accessibilityProblems = accessibilityStatementData[locale].nonAccessibleContent.nonCompliant;

  return (
    <Container className="my-5 text-content">
      <Row>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <h2>{t('a11y:compliance-status')}</h2>
          <p>
            {t('a11y:partially-compliant')}
            {' '}
            <a href={t('a11y:wcag-url')}>{t('a11y:target-level')}</a>
            {' '}
            {t('a11y:due-to')}
          </p>
        { accessibilityProblems.length > 0
          && (
            <>
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
          <h2>{t('a11y:preparation')}</h2>
          <p>
            {t('a11y:prepared-on')}
            {' '}
            {accessibilityStatementData.en.preparedOn}
            .
          </p>
          <p>
            {t('a11y:prepared-how')}
          </p>
          <p>
            {t('a11y:reviewed-on')}
            {' '}
            {accessibilityStatementData.en.reviewedOn}
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementComplianceStatusBlock;
