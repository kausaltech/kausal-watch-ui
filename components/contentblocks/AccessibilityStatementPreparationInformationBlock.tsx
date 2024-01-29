import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'common/dayjs';

import { Container, Row, Col } from 'reactstrap';
import accessibilityStatementData from 'public/static/accessibility';
import { CommonContentBlockProps } from 'common/blocks.types';
import { useLocale, useTranslations } from 'next-intl';

const AccessibilityStatementPreparationInformationBlock = ({
  id = '',
}: CommonContentBlockProps) => {
  const t = useTranslations();
  let locale = useLocale();

  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col
          xl={{ size: 6, offset: 3 }}
          lg={{ size: 8, offset: 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <h2>{t('preparation')}</h2>
          <p>
            {t('prepared-on')}{' '}
            {dayjs(accessibilityStatementData.en.preparedOn).format('L')}.
          </p>
          <p>{t('prepared-how')}</p>
          <p>
            {t('reviewed-on')}{' '}
            {dayjs(accessibilityStatementData.en.reviewedOn).format('L')}.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementPreparationInformationBlock;
