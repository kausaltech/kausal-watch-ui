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
  text-align: center;
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

const MissingValue = styled.span`
  color: ${(props) => props.theme.textColor.secondary};
  cursor: help;
`;

const DashboardIndicatorSummaryBlock = ({ indicator }) => {
  const locale = useLocale();
  const theme = useTheme();

  if (!indicator) return null;

  const { name, description, latestValue, goals, unit } = indicator;

  const shortUnit = unit?.shortName || unit?.name || '%';

  const latestFormatted = latestValue
    ? beautifyValue(latestValue.value, locale)
    : null;
  const latestYear = latestValue
    ? dayjs(latestValue.date).format('YYYY')
    : null;

  const goal = goals?.[0];
  const goalFormatted = goal ? beautifyValue(goal.value, locale) : null;
  const goalYear = goal ? dayjs(goal.date).format('YYYY') : null;

  return (
    <Container>
      <IndicatorTitle>{name}</IndicatorTitle>
      {description && (
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <SummaryRow>
        <ValueBlock>
          {latestYear && <YearLabel>{latestYear}</YearLabel>}
          <ValueText>
            {latestFormatted ? (
              <>
                {latestFormatted}
                <Unit>{shortUnit}</Unit>
              </>
            ) : (
              <MissingValue title="Value not available">
                – <Unit>{shortUnit}</Unit>
              </MissingValue>
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
          {goalYear && <YearLabel>{goalYear}</YearLabel>}
          <ValueText>
            {goalFormatted ? (
              <>
                {goalFormatted}
                <Unit>{shortUnit}</Unit>
              </>
            ) : (
              <MissingValue title="Goal not available">
                – <Unit>{shortUnit}</Unit>
              </MissingValue>
            )}
          </ValueText>
        </ValueBlock>
      </SummaryRow>
    </Container>
  );
};

export default DashboardIndicatorSummaryBlock;
