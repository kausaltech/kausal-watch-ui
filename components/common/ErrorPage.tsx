'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';

import Button from '@/components/common/Button';
import Link from 'next/link';

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

export function ErrorPage({ message }: { message?: string }) {
  const t = useTranslations();

  const errorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px">
      <title>emoticon, emoji, face, sick frowning</title>
      <g data-name="Layer 25">
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28ZM8.61,14.72,11.2,13,8.61,11.28,9.72,9.61,14.8,13,9.72,16.39Zm14.78-3.44L20.8,13l2.59,1.72-1.11,1.67L17.2,13l5.08-3.39ZM21.62,22.22l.79.62-1.25,1.57-.78-.63c-3-2.39-5.77-2.39-8.76,0l-.78.63L9.59,22.84l.79-.62C14.05,19.27,18,19.27,21.62,22.22Z"></path>
      </g>
    </svg>
  );

  return (
    <ErrorBackground className="mb-5">
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <StyledCard>
              <CardBody>
                {errorIcon}
                <h1>{message || t('error-occurred')}</h1>
                <Link href="/">
                  <Button outline color="dark" size="sm">
                    {t('return-to-front')}
                  </Button>
                </Link>
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </ErrorBackground>
  );
}
