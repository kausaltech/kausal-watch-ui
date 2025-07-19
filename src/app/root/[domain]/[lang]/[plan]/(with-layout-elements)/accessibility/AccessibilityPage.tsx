'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import AccessibilityStatementComplianceStatusBlock from '@/components/contentblocks/AccessibilityStatementComplianceStatusBlock';
import AccessibilityStatementContactInformationBlock from '@/components/contentblocks/AccessibilityStatementContactInformationBlock';
import AccessibilityStatementPreparationInformationBlock from '@/components/contentblocks/AccessibilityStatementPreparationInformationBlock';
import { usePlan } from '@/context/plan';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};
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

export const AccessibilityPage = () => {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <>
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{t('accessibility-statement')}</h1>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area text-content my-2">
        <Container>
          <Row>
            <Col
              xl={{ size: 6, offset: 3 }}
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
            >
              <p>
                {plan.generalContent.ownerName} {t('commitment')} {t('legislation')}
              </p>
              <p>
                {t('applies-to')} {plan.generalContent.siteTitle} {t('website')}.
              </p>
            </Col>
          </Row>
        </Container>
        <AccessibilityStatementComplianceStatusBlock />
        <AccessibilityStatementPreparationInformationBlock />
        <AccessibilityStatementContactInformationBlock />
        <Container>
          <Row>
            <Col
              xl={{ size: 6, offset: 3 }}
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
            >
              <h2>{t('enforcement-procedure')}</h2>
              <p>{t('enforcement-step-1')}</p>
              <p>{t('enforcement-step-2')}</p>
              <p>
                <a href={t('enforcement-url')}>{t('enforcement-url')}</a>
              </p>
              <h3>{t('enforcement-contact')}</h3>
              <p>
                <strong>{t('enforcement-body')}</strong>
              </p>
              <a href={t('enforcement-body-url')}>{t('enforcement-body-url')}</a>
              <br />
              <a href={`mailto:${t('enforcement-body-email')}`}>{t('enforcement-body-email')}</a>
              <p>{t('enforcement-body-tel')}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
