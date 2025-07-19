'use client';

import { redirect } from 'next/navigation';

import { Link } from 'common/links';
import Button from 'components/common/Button';
import { usePlan } from 'context/plan';
import { useTranslations } from 'next-intl';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

const ErrorBackground = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  min-height: 800px;
`;

const StyledCard = styled(Card)`
  margin-top: 5rem;
  text-align: center;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  h2 {
    margin-bottom: 2rem;
  }

  svg {
    width: 4rem;
    margin-bottom: 2rem;
    fill: ${(props) => props.theme.brandDark};
  }
`;

export default function AdminPage() {
  const plan = usePlan();
  const t = useTranslations();

  if (plan.adminUrl) {
    redirect(plan.adminUrl);
  }

  return (
    <ErrorBackground className="mb-5">
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <StyledCard>
              <CardBody>
                <h1>{t('page-not-found')}</h1>
                <h2>{t('admin-login-not-defined')}</h2>
                <Link href="/">
                  <a>
                    <Button outline color="dark" size="sm">
                      {t('return-to-front')}
                    </Button>
                  </a>
                </Link>
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </ErrorBackground>
  );
}
