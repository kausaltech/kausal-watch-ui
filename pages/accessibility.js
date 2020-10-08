import React, { useContext } from 'react';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import accessibilityStatementData from 'public/static/accessibility';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};
  h1 {
    font-size: ${(props) => props.theme.fontSizeXxl};
    margin-bottom: ${(props) => props.theme.spaces.s150};
  }
`;

// https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32018D1523&from=EN

const AccessibilityPage = () => {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);
  const accessibilityProblems = accessibilityStatementData.en.nonAccessibleContent.nonCompliant;

  return (
    <Layout>
      <Meta
        title={t('accessiblity-statement')}
        />
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>Accessibility Statement</h1>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area">
        <Container>
          <Row>
            <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <p>
                {plan.generalContent.ownerName}
                {' '}
                is committed to making its online services
                {' '}
                accessible, in accordance with
                {accessibilityStatementData.en.legislation}
              </p>
              <p>
                This accessibility statement applies to
                {plan.generalContent.siteTitle}
              </p>
            </Col>
          </Row>
        </Container>
        { accessibilityProblems.length > 0 &&
          (
            <Container>
              <Row>
                <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <h2>Non-accessible content</h2>
                  { accessibilityProblems.map((problem) => (
                    <div>
                      <h3>{problem.title}</h3>
                      <p className="text-content" dangerouslySetInnerHTML={{ __html: problem.description }}/>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          )}
      </div>
    </Layout>
  );
};

export default AccessibilityPage;
