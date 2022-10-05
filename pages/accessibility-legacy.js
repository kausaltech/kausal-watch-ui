import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';

import AccessibilityStatementComplianceStatusBlock
  from 'components/contentblocks/AccessibilityStatementComplianceStatusBlock';
import AccessibilityStatementContactInformationBlock
  from 'components/contentblocks/AccessibilityStatementContactInformationBlock';
import accessibilityStatementData from 'public/static/accessibility';


const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }
`;

const AccessibilityPage = () => {
  const { t, i18n } = useTranslation(['a11y']);

  const plan = useContext(PlanContext);

  let locale = i18n.language;
  if (!(locale in accessibilityStatementData)) {
    locale = 'en';
  }

  let additionalLinks = plan.additionalLinks;
  let blocks = null;
  let accessibilityContact = null;
  if (additionalLinks != null && additionalLinks.items != null) {
    blocks = additionalLinks.items.find(
      i => i.page.__typename == 'AccessibilityStatementPage'
    )?.page?.body?.find(
      b => b.__typename == 'AccessibilityStatementContactInformationBlock'
    )?.blocks;
  }
  if (blocks != null) {
    accessibilityContact = Object.fromEntries(
      blocks.map(
        b => [b.field, b.value]
      )
    );
  }

  return (
    <Layout>
      <Meta
        title={t('a11y:accessibility-statement')}
      />
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{t('a11y:accessibility-statement')}</h1>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area text-content my-5">
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <p>
                {plan.generalContent.ownerName}
                {' '}
                {t('a11y:commitment')}
                {' '}
                {t('a11y:legislation')}
              </p>
              <p>
                {t('a11y:applies-to')}
                {' '}
                {plan.generalContent.siteTitle}
                {' '}
                {t('a11y:website')}
                .
              </p>
            </Col>
          </Row>
          </Container>
          <AccessibilityStatementComplianceStatusBlock />
          <AccessibilityStatementContactInformationBlock />
          <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <h2>{t('a11y:enforcement-procedure')}</h2>
              <p>
                {t('a11y:enforcement-step-1')}
              </p>
              <p>
                {t('a11y:enforcement-step-2')}
              </p>
              <p>
                <a href={t('a11y:enforcement-url')}>
                  {t('a11y:enforcement-url')}
                </a>
              </p>
              <h3>{t('a11y:enforcement-contact')}</h3>
              <p>
                <strong>
                  {t('a11y:enforcement-body')}
                </strong>
              </p>
              <a href={t('a11y:enforcement-body-url')}>
                {t('a11y:enforcement-body-url')}
              </a>
              <br />
              <a href={`mailto:${t('a11y:enforcement-body-email')}`}>
                {t('a11y:enforcement-body-email')}
              </a>
              <p>
                {t('a11y:enforcement-body-tel')}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

const initialProps = {
  namespacesRequired: ['common', 'a11y'],
};

AccessibilityPage.getInitialProps = async () => (initialProps);

export default AccessibilityPage;
