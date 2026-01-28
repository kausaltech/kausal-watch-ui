import React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import Icon from '@/components/common/Icon';

import { beautifyValue } from '../../common/data/format';
import dayjs from '../../common/dayjs';

const Container = styled.div<{ $hasDescription?: boolean }>`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  display: flex;
  flex-direction: column;
  justify-content: ${({ $hasDescription }) => ($hasDescription ? 'flex-start' : 'center')};
  height: 100%;
  align-items: flex-start;
`;

const IndicatorTitle = styled.h2`
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

const SummaryRow = styled.div<{ $hasDescription?: boolean }>`
  ${({ $hasDescription, theme }) =>
    $hasDescription
      ? `margin-top: ${theme.spaces.s200};`
      : `margin-top: auto; margin-bottom: auto;`}
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spaces.s100};
  flex-wrap: wrap;
`;

const ValueBlock = styled.div`
  flex: 1 1 0;
  min-width: 0;
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

const ArrowWrapper = styled.div`
  flex: 0 0 auto;
  margin-top: 2.5rem;

  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

type DashboardIndicatorSummaryBlockProps = {
  indicator: {
    name: string;
    description?: string | null;
    latestValue?: { value: number | null; date?: string | null } | null;
    goals?: Array<{ value: number | null; date?: string | null }> | null;
    unit?: { shortName?: string | null; name?: string | null } | null;
  } | null;
};

const DashboardIndicatorSummaryBlock = ({ indicator }: DashboardIndicatorSummaryBlockProps) => {
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations();

  if (!indicator) return null;

  const { name, description, latestValue, goals, unit } = indicator;
  const now = dayjs();

  const shortUnit = unit?.shortName || unit?.name || '';

  const latestFormatted =
    latestValue?.value != null ? beautifyValue(latestValue.value, locale) : null;

  const latestYear = latestValue?.date ? dayjs(latestValue.date).format('YYYY') : null;

  // Goal selection:
  // 1) The next goal from "now"
  // 2) If none, pick the closest goal in the past relative to latestValue.date
  // 3) Final fallback: most recent goal overall
  const latestDate = latestValue?.date ? dayjs(latestValue.date) : null;

  const validGoals = (goals ?? [])
    .filter((g) => g?.value != null && g?.date != null && dayjs(g.date).isValid())
    .map((g) => ({ ...g, __d: dayjs(g!.date!) }))
    .sort((a, b) => a.__d.valueOf() - b.__d.valueOf());

  const nextGoal = validGoals.find((g) => g.__d.isSameOrAfter(now, 'day'));
  const closestPastToLatest =
    !nextGoal && latestDate
      ? ([...validGoals].reverse().find((g) => !g.__d.isAfter(latestDate, 'day')) ?? null)
      : null;

  const selectedGoal = nextGoal ?? closestPastToLatest ?? validGoals.at(-1) ?? null;

  const goalFormatted =
    selectedGoal?.value != null ? beautifyValue(selectedGoal.value, locale) : null;
  const goalYear = selectedGoal?.__d ? selectedGoal.__d.format('YYYY') : null;

  const renderValue = (formatted: string | null) =>
    formatted != null ? (
      <>
        {formatted}
        {shortUnit && <UnitText>{` ${shortUnit}`}</UnitText>}
      </>
    ) : (
      <Missing title={t('data-not-available')}>–</Missing>
    );

  return (
    <Container $hasDescription={!!description}>
      <IndicatorTitle>{name}</IndicatorTitle>
      {description && <Description dangerouslySetInnerHTML={{ __html: description }} />}

      <SummaryRow $hasDescription={!!description}>
        <ValueBlock>
          <ValueLabel>{t('indicator-latest-value')}</ValueLabel>
          {latestYear && <YearLabel>{latestYear}</YearLabel>}
          <ValueText>{renderValue(latestFormatted)}</ValueText>
        </ValueBlock>

        <ArrowWrapper>
          <Icon.ArrowRight
            width="24px"
            height="24px"
            color={theme.themeColors.dark}
            aria-hidden="true"
          />
        </ArrowWrapper>

        <ValueBlock>
          <ValueLabel>{t('indicator-goal')}</ValueLabel>
          {goalYear && <YearLabel>{goalYear}</YearLabel>}
          <ValueText>{renderValue(goalFormatted)}</ValueText>
        </ValueBlock>
      </SummaryRow>
    </Container>
  );
};

export default DashboardIndicatorSummaryBlock;
