'use client';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';

import RichText from '@/components/common/RichText';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import AccessibilityStatementComplianceStatusBlock from '@/components/contentblocks/AccessibilityStatementComplianceStatusBlock';
import AccessibilityStatementContactInformationBlock from '@/components/contentblocks/AccessibilityStatementContactInformationBlock';
import AccessibilityStatementPreparationInformationBlock from '@/components/contentblocks/AccessibilityStatementPreparationInformationBlock';
import { usePlan } from '@/context/plan';

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.pageHeaderBackgroundColor};
  position: relative;
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};
  color: ${(props) =>
    readableColor(
      props.theme.pageHeaderBackgroundColor,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) =>
      readableColor(
        props.theme.pageHeaderBackgroundColor,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )} !important;
  }
`;

const StatementContent = styled.div`
  margin-bottom: var(--block-padding-bottom);
`;

type Props = {
  leadContent?: string | null;
};

export const AccessibilityPage = ({ leadContent }: Props) => {
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
      <StatementContent className="text-content mt-2" data-testid="accessibility-page">
        <Container>
          <Row>
            <Col
              xl={{ size: 6, offset: 3 }}
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
            >
              {leadContent && <RichText html={leadContent} />}
              <p>{t('intro', { owner: plan.generalContent.ownerName ?? '' })}</p>
              <p>
                {t.rich('applies-to-site', {
                  url: plan.viewUrl ?? '',
                  link: (chunks) => <a href={plan.viewUrl ?? ''}>{chunks}</a>,
                })}
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
              <p>
                <a href={t('enforcement-body-url')}>{t('enforcement-body-url')}</a>
              </p>
            </Col>
          </Row>
        </Container>
      </StatementContent>
    </>
  );
};
