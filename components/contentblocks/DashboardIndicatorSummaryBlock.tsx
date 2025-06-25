import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { beautifyValue } from '../../common/data/format';
import Icon from 'components/common/Icon';
import dayjs from '../../common/dayjs';

const Container = styled.div<{ hasDescription: boolean }>`
  padding: 1rem;
  color: ${(props) => props.theme.themeColors.dark};
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasDescription }) =>
    hasDescription ? 'flex-start' : 'center'};
  height: 100%;
  align-items: flex-start;
`;

const IndicatorTitle = styled.h4`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizeLg};
`;

const Description = styled.div`
  margin-top: 1rem;
  font-size: ${(props) => props.theme.fontSizeBase};

  p {
    margin-bottom: 0.75rem;
  }
`;

const SummaryRow = styled.div<{ hasDescription: boolean }>`
  margin-top: 2rem;
  ${({ hasDescription, theme }) =>
    hasDescription
      ? `margin-top: ${theme.spaces.s200};`
      : `margin-top: auto; margin-bottom: auto;`}
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ValueBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const ValueLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const YearLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: normal;
  margin-bottom: 0.25rem;
`;

const ValueText = styled.div`
  font-size: ${(props) => props.theme.fontSizeXl};
  font-weight: bold;
`;
const UnitText = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: normal;
`;

const Missing = styled.span`
  color: ${(props) => props.theme.textColor.secondary};
  cursor: help;
`;

const DashboardIndicatorSummaryBlock = ({ indicator }) => {
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations();

  if (!indicator) return null;

  const { name, description, latestValue, goals, unit } = indicator;
  const now = dayjs();

  const shortUnit = unit?.shortName || unit?.name || '';

  const latestFormatted = latestValue
    ? beautifyValue(latestValue.value, locale)
    : null;
  const latestYear = latestValue?.date
    ? dayjs(latestValue.date).format('YYYY')
    : null;

  const nextGoal = goals?.find((goal) => dayjs(goal.date).isSameOrAfter(now));
  const goalFormatted = nextGoal ? beautifyValue(nextGoal.value, locale) : null;
  const goalYear = nextGoal?.date ? dayjs(nextGoal.date).format('YYYY') : null;

  return (
    <Container hasDescription={!!description}>
      <IndicatorTitle>{name}</IndicatorTitle>
      {description && (
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      )}

      <SummaryRow hasDescription={!!description}>
        <ValueBlock>
          <ValueLabel>{t('indicator-latest-value')}</ValueLabel>
          {latestYear && <YearLabel>{latestYear}</YearLabel>}
          <ValueText>
            {latestFormatted ? (
              <>
                {latestFormatted}
                {shortUnit && <UnitText>{` ${shortUnit}`}</UnitText>}
              </>
            ) : (
              <Missing title={t('data-not-available')}>–</Missing>
            )}
          </ValueText>
        </ValueBlock>

        <div style={{ marginTop: '2.5rem' }}>
          <Icon.ArrowRight
            size={24}
            color={theme.themeColors.dark}
            aria-hidden="true"
          />
        </div>

        <ValueBlock>
          <ValueLabel>{t('indicator-goal')}</ValueLabel>
          {goalYear && <YearLabel>{goalYear}</YearLabel>}
          <ValueText>
            {goalFormatted ? (
              <>
                {goalFormatted}
                {shortUnit && <UnitText>{` ${shortUnit}`}</UnitText>}
              </>
            ) : (
              <Missing title={t('data-not-available')}>–</Missing>
            )}
          </ValueText>
        </ValueBlock>
      </SummaryRow>
    </Container>
  );
};

export default DashboardIndicatorSummaryBlock;
