import React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import {
  IndicatorDesiredTrend,
  type IndicatorDetailsQuery,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import PopoverTip from '@/components/common/PopoverTip';

import { beautifyValue } from '../../common/data/format';
import dayjs from '../../common/dayjs';

const ValueSummary = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spaces.s100};
  flex-direction: row;
  align-items: flex-start;
  justify-content: stretch;
  text-align: left;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-top: ${(props) => props.theme.spaces.s100};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey030};
`;

const ValueBlock = styled.div`
  flex: 1 0 auto;
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

const ValueDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.themeColors.dark};
`;

const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const ValueUnit = styled.span`
  margin: 0 0.5em 0 0.25em;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
`;

const ValueChange = styled.div`
  margin-top: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  color: ${(props) => props.color};
`;

const ChangeSymbol = styled.span`
  margin-right: 0.5em;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

const TooltipContent = styled.div`
  color: ${(props) => props.theme.themeColors.white};

  a {
    color: ${(props) => props.theme.themeColors.white};
    text-decoration: underline;
  }
`;

function determineDesirableDirection(
  desiredTrend: Indicator['desiredTrend'] | null | undefined,
  values: Indicator['values'],
  goals: Indicator['goals']
) {
  if (desiredTrend === IndicatorDesiredTrend.Increasing) {
    return '+';
  }
  if (desiredTrend === IndicatorDesiredTrend.Decreasing) {
    return '-';
  }

  // Default value for desiredTrend is `A_` that wil try to
  // guess the desired trend based on values and goals
  if (!values.length || !goals?.length) return null;

  const latestValue = values[values.length - 1];
  const latestGoal = goals[goals.length - 1];

  if (latestGoal?.value && latestValue.value && latestGoal.value - latestValue.value >= 0) {
    return '+';
  }
  return '-';
}

type Indicator = NonNullable<IndicatorDetailsQuery['indicator']>;

interface IndicatorValueSummaryProps {
  timeResolution: Indicator['timeResolution'];
  values: Indicator['values'];
  goals: Indicator['goals'];
  unit: Indicator['unit'];
  desiredTrend?: Indicator['desiredTrend'];
}

function IndicatorValueSummary(props: IndicatorValueSummaryProps) {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const { timeResolution, values, goals, unit, desiredTrend } = props;

  const desirableDirection = determineDesirableDirection(desiredTrend, values, goals);
  const shortUnitName =
    (unit.shortName || unit.name) === 'no unit' ? '' : unit.shortName || unit.name;
  const diffUnitName = unit.name === '%' ? t('percent-point-abbreviation') : shortUnitName;
  const now = dayjs();
  let timeFormat = 'l';

  if (timeResolution === IndicatorTimeResolution.Year) {
    timeFormat = 'YYYY';
  }

  if (values.length === 0) {
    return null;
  }

  const latestValue = values[values.length - 1];
  let absChange: number | null = null;
  //let relChange;
  //let desirableChange;
  let changeColor: string | undefined;
  let changeSymbol: string | undefined;

  if (values.length > 1) {
    absChange = latestValue.value - values[values.length - 2].value;
    //relChange = latestValue.value ? absChange / latestValue.value : 0;
    if (desirableDirection) {
      if (
        (absChange > 0 && desirableDirection === '+') ||
        (absChange < 0 && desirableDirection === '-')
      ) {
        //desirableChange = true;
        changeColor = theme.graphColors.green090;
      } else if (absChange === 0) {
        //desirableChange = null;
        changeColor = theme.themeColors.dark;
      } else {
        //desirableChange = false;
        changeColor = theme.graphColors.red070;
      }
    }
    if (absChange < 0) {
      changeSymbol = '▼';
    } else if (absChange > 0) {
      changeSymbol = '▲';
    } else changeSymbol = undefined;
  }
  const latestValueDisplay = beautifyValue(latestValue.value, locale);
  const valueDisplay = (
    <ValueBlock>
      <ValueLabel>{t('indicator-latest-value')}</ValueLabel>
      <ValueDate>{dayjs(latestValue.date).format(timeFormat)}</ValueDate>
      <ValueDisplay>
        <div>
          {latestValueDisplay}
          <ValueUnit>{shortUnitName}</ValueUnit>
        </div>
        {changeSymbol && (
          <ValueChange color={changeColor}>
            <ChangeSymbol>{changeSymbol}</ChangeSymbol>
            <span>{beautifyValue(absChange, locale)}</span> <small>{diffUnitName}</small>
          </ValueChange>
        )}
      </ValueDisplay>
    </ValueBlock>
  );

  const nextGoal = goals?.find((goal) => goal && dayjs(goal.date).isSameOrAfter(now));
  let goalDisplay: React.ReactNode | undefined;

  if (nextGoal) {
    const nextGoalDate = dayjs(nextGoal.date).format(timeFormat);
    const nextGoalValue = beautifyValue(nextGoal.value, locale);
    goalDisplay = (
      <ValueBlock>
        <ValueLabel>{t('indicator-goal')}</ValueLabel>
        <ValueDate>{nextGoalDate}</ValueDate>
        <ValueDisplay>
          <div>
            {nextGoalValue}
            <ValueUnit>{shortUnitName}</ValueUnit>
          </div>
        </ValueDisplay>
      </ValueBlock>
    );
  }

  // Find the next upcoming goal
  let differenceDisplay: React.ReactNode | undefined;
  if (nextGoal && dayjs(nextGoal.date).isSameOrAfter(latestValue.date)) {
    const difference = nextGoal.value - values[values.length - 1].value;
    const isPercentagePoint = unit?.name === '%';
    const goalReached = desirableDirection === '+' ? difference <= 0 : difference >= 0;
    const timeToGoal = dayjs(now).to(dayjs(nextGoal.date));
    const prefix = difference > 0 ? '+' : '-';
    differenceDisplay = (
      <ValueBlock>
        <ValueLabel>{t(goalReached ? 'indicator-goal-exceeded' : 'indicator-to-goal')}</ValueLabel>
        <ValueDate>{goalReached ? '-' : timeToGoal}</ValueDate>
        <ValueDisplay>
          <div>
            {goalReached ? '' : prefix}
            {beautifyValue(Math.abs(difference), locale)}
            <span style={{ display: 'inline-flex' }}>
              <ValueUnit>{diffUnitName}</ValueUnit>
              {isPercentagePoint && (
                <PopoverTip
                  compact
                  identifier="pp-explainer"
                  content={
                    <TooltipContent>
                      {t('percentage-point-explainer')}{' '}
                      <a
                        href="https://en.wikipedia.org/wiki/Percentage_point"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('read-more')}
                      </a>
                    </TooltipContent>
                  }
                />
              )}
            </span>
          </div>
        </ValueDisplay>
      </ValueBlock>
    );
  }
  return (
    <ValueSummary>
      {valueDisplay}
      {differenceDisplay}
      {goalDisplay}
    </ValueSummary>
  );
}

export default IndicatorValueSummary;
