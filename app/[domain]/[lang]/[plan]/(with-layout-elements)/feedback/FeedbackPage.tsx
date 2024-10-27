'use client';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { useTranslations } from 'next-intl';

import { usePlan } from '@/context/plan';
import FeedbackForm from '@/components/common/FeedbackForm';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0
    ${(props) => props.theme.spaces.s200};
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) =>
      readableColor(
        props.theme.brandDark,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )} !important;
  }
`;

export function FeedbackPage() {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <>
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
    </>
  );
}
