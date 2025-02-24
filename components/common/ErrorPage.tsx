'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import Button from '@/components/common/Button';

export const ErrorBackground = styled.div<{ $isFullPage?: boolean }>`
  background-color: ${(props) => props.theme.brandDark};
  min-height: ${({ $isFullPage }) => ($isFullPage ? '800px' : undefined)};
  padding: 5rem 0;
`;

export const StyledCard = styled(Card)`
  text-align: center;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  svg {
    width: 4rem;
    margin-bottom: 2rem;
    fill: ${(props) => props.theme.brandDark};
  }
`;

export const StyledTitle = styled.h1`
  margin-bottom: 1rem;
`;

export const StyledSubtitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeightBase};
  color: ${({ theme }) => theme.textColor.secondary};
`;

type Props = {
  message?: string;
  type?: 'page' | 'block';
};

export const errorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px">
    <title>emoticon, emoji, face, sick frowning</title>
    <g data-name="Layer 25">
      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28ZM8.61,14.72,11.2,13,8.61,11.28,9.72,9.61,14.8,13,9.72,16.39Zm14.78-3.44L20.8,13l2.59,1.72-1.11,1.67L17.2,13l5.08-3.39ZM21.62,22.22l.79.62-1.25,1.57-.78-.63c-3-2.39-5.77-2.39-8.76,0l-.78.63L9.59,22.84l.79-.62C14.05,19.27,18,19.27,21.62,22.22Z"></path>
    </g>
  </svg>
);

export function ErrorPage({ message, type = 'page' }: Props) {
  const t = useTranslations();

  return (
    <ErrorBackground $isFullPage={type === 'page'}>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <StyledCard>
              <CardBody>
                {errorIcon}

                <StyledTitle as={type === 'page' ? 'h1' : 'h2'}>
                  {message || t('error-occurred')}
                </StyledTitle>

                {type === 'page' && (
                  <Link href="/">
                    <Button outline color="dark" size="sm">
                      {t('return-to-front')}
                    </Button>
                  </Link>
                )}

                {type === 'block' && (
                  <StyledSubtitle>
                    {t('content-could-not-be-displayed')}
                  </StyledSubtitle>
                )}
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </ErrorBackground>
  );
}
