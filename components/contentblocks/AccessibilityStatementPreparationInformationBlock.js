import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'common/i18n';
import { Container, Row, Col } from 'reactstrap';
import accessibilityStatementData from 'public/static/accessibility';

const AccessibilityStatementPreparationInformationBlock = (props) => {
  const { t, i18n } = useTranslation(['a11y']);

  let locale = i18n.language;
  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }

  return (
    <Container className="my-5 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
          className="my-4"
        >
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

export default AccessibilityStatementPreparationInformationBlock;
