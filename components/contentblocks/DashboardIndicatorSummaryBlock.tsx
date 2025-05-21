import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocale } from 'next-intl';
import { beautifyValue } from '../../common/data/format';
import Icon from 'components/common/Icon';
import dayjs from '../../common/dayjs';

const Container = styled.div`
  padding: 2rem;
  color: ${(props) => props.theme.themeColors.dark};
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

const SummaryRow = styled.div`
  margin-top: 2rem;
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
  align-items: center;
`;

const YearLabel = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: 0.25rem;
`;

const ValueText = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Unit = styled.span`
  margin-left: 0.25rem;
  font-size: 1.5rem;
`;

const DashboardIndicatorSummaryBlock = ({ indicator }) => {
  const locale = useLocale();
  const theme = useTheme();

  if (!indicator) return null;

  const { name, description, latestValue, goals, unit } = indicator;

  const shortUnit = unit?.shortName || unit?.name || '%';

  const latestFormatted = latestValue
    ? beautifyValue(latestValue.value, locale)
    : '-';

  const latestYear = latestValue ? dayjs(latestValue.date).format('YYYY') : '';

  const goal = goals?.[0];
  const goalFormatted = goal ? beautifyValue(goal.value, locale) : '-';
  const goalYear = goal ? dayjs(goal.date).format('YYYY') : '';

  return (
    <Container>
      <IndicatorTitle>{name}</IndicatorTitle>
      {description && (
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <SummaryRow>
        <ValueBlock>
          <YearLabel>{latestYear}</YearLabel>
          <ValueText>
            {latestFormatted}
            <Unit>{shortUnit}</Unit>
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
          <YearLabel>{goalYear}</YearLabel>
          <ValueText>
            {goalFormatted}
            <Unit>{shortUnit}</Unit>
          </ValueText>
        </ValueBlock>
      </SummaryRow>
    </Container>
  );
};

export default DashboardIndicatorSummaryBlock;
