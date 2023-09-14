import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import FeedbackForm from 'components/common/FeedbackForm';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0
    ${(props) => props.theme.spaces.s200};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }
`;

function FeedbackPage() {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);

  return (
    <Layout>
      <Meta title={t('give-feedback')} />
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{t('feedback')}</h1>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area my-5">
        <Container className="pb-4">
          <Row>
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <FeedbackForm planIdentifier={plan.identifier} />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default FeedbackPage;
