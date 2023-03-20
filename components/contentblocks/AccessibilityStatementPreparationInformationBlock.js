import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'common/dayjs';
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
    <Container className="my-2 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <h2>{t('a11y:preparation')}</h2>
          <p>
            {t('a11y:prepared-on')}
            {' '}
            {dayjs(accessibilityStatementData.en.preparedOn).format('L')}
            .
          </p>
          <p>
            {t('a11y:prepared-how')}
          </p>
          <p>
            {t('a11y:reviewed-on')}
            {' '}
            {dayjs(accessibilityStatementData.en.reviewedOn).format('L')}
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementPreparationInformationBlock;
