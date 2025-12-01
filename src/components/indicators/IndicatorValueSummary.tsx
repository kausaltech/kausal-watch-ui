import React from 'react';

import { useFormatter, useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import {
  IndicatorDesiredTrend,
  type IndicatorDetailsQuery,
  IndicatorNonQuantifiedGoal,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';
import PopoverTip from '@/components/common/PopoverTip';

import dayjs from '../../common/dayjs';

const DEFAULT_ROUNDING = 2;

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

const TrendIcon = styled(Icon)`
  margin-bottom: -0.1em;
  color: ${(props) => props.theme.graphColors.grey040};
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

export type ValueSummaryOptions = {
  nonQuantifiedGoal: {
    trend: IndicatorNonQuantifiedGoal | null;
    date: string | null;
  };
  referenceValue: {
    show: boolean | null;
    year: number | null;
    defaultReferenceValue: Indicator['referenceValue'] | null;
  };
  currentValue: {
    show: boolean | null;
  };
  goalValue: {
    show: boolean | null;
  };
  goalGap: {
    show: boolean | null;
  };
  valueRounding: number | null;
};

interface IndicatorValueSummaryProps {
  timeResolution: Indicator['timeResolution'];
  values: Indicator['values'];
  goals: Indicator['goals'];
  unit: Indicator['unit'];
  desiredTrend?: Indicator['desiredTrend'];
  options: ValueSummaryOptions;
}

function IndicatorValueSummary(props: IndicatorValueSummaryProps) {
  const t = useTranslations();
  const theme = useTheme();
  const format = useFormatter();
  const { timeResolution, values, goals, unit, desiredTrend, options } = props;

  const rounding = options?.valueRounding ?? DEFAULT_ROUNDING;
  const displayOptions: ValueSummaryOptions = options || {
    referenceValue: {
      show: true,
      year: null,
      defaultReferenceValue: null,
    },
    currentValue: {
      show: false,
    },
    goalValue: {
      show: true,
    },
    goalGap: {
      show: true,
    },
    nonQuantifiedGoal: {
      trend: null,
      date: null,
    },
  };

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

  // Calculate reference value if displayOptions.referenceValue.show is true
  let referenceValue: { date: string; value: number } | null = null;
  if (displayOptions.referenceValue.show) {
    if (displayOptions.referenceValue.defaultReferenceValue) {
      referenceValue = {
        date: new Date(displayOptions.referenceValue.defaultReferenceValue.date ?? '')
          .getFullYear()
          .toString(),
        value: displayOptions.referenceValue.defaultReferenceValue.value,
      };
    } else if (displayOptions.referenceValue.year !== null) {
      // Find value for the specified year
      const valueForYear = values.find((val) => {
        if (!val.date) return false;
        const valYear = new Date(val.date).getFullYear();
        return valYear === displayOptions.referenceValue.year;
      });
      if (valueForYear && valueForYear.date) {
        referenceValue = {
          date: valueForYear.date,
          value: valueForYear.value,
        };
      }
    } else {
      // Use the first value in the series
      const firstValue = values[0];
      if (firstValue && firstValue.date) {
        referenceValue = {
          date: firstValue.date,
          value: firstValue.value,
        };
      }
    }
  }

  const referenceValueDisplay =
    referenceValue && displayOptions.referenceValue.show ? (
      <ValueBlock>
        <ValueLabel>{t('indicator-reference-value')}</ValueLabel>
        <ValueDate>{dayjs(referenceValue.date).format(timeFormat)}</ValueDate>
        <ValueDisplay>
          <div>
            {format.number(referenceValue.value, { maximumSignificantDigits: rounding })}
            <ValueUnit>{shortUnitName}</ValueUnit>
          </div>
        </ValueDisplay>
      </ValueBlock>
    ) : null;

  const latestValueDisplay = format.number(latestValue.value, {
    maximumSignificantDigits: rounding,
  });
  const valueDisplay = displayOptions.currentValue.show ? (
    <ValueBlock>
      <ValueLabel>{t('indicator-latest-value')}</ValueLabel>
      <ValueDate>{dayjs(latestValue.date).format(timeFormat)}</ValueDate>
      <ValueDisplay>
        <div>
          {latestValueDisplay}
          <ValueUnit>{shortUnitName}</ValueUnit>
        </div>
        {changeSymbol && absChange !== null && (
          <ValueChange color={changeColor}>
            <ChangeSymbol>{changeSymbol}</ChangeSymbol>
            <span>{format.number(absChange, { maximumSignificantDigits: rounding })}</span>{' '}
            <small>{diffUnitName}</small>
          </ValueChange>
        )}
      </ValueDisplay>
    </ValueBlock>
  ) : null;

  const nextGoal = goals?.find((goal) => goal && dayjs(goal.date).isSameOrAfter(now));
  let goalDisplay: React.ReactNode | undefined;

  if (nextGoal && displayOptions.goalValue.show) {
    const nextGoalDate = dayjs(nextGoal.date).format(timeFormat);
    const nextGoalValue = format.number(nextGoal.value, { maximumSignificantDigits: rounding });
    const DesiredTrendIcon =
      desiredTrend === IndicatorDesiredTrend.Increasing ? (
        <TrendIcon name="arrow-up" />
      ) : (
        <TrendIcon name="arrow-down" />
      );
    goalDisplay = (
      <ValueBlock>
        <ValueLabel>{t('indicator-goal')}</ValueLabel>
        <ValueDate>{nextGoalDate}</ValueDate>
        <ValueDisplay>
          <div>
            {desiredTrend && DesiredTrendIcon}
            {nextGoalValue}
            <ValueUnit>{shortUnitName}</ValueUnit>
          </div>
        </ValueDisplay>
      </ValueBlock>
    );
  } else if (displayOptions.nonQuantifiedGoal.trend && displayOptions.goalValue.show) {
    const DesiredTrendIcon =
      displayOptions.nonQuantifiedGoal.trend === IndicatorNonQuantifiedGoal.Increase ? (
        <TrendIcon name="arrow-up" />
      ) : (
        <TrendIcon name="arrow-down" />
      );
    const goalDate = displayOptions.nonQuantifiedGoal.date
      ? dayjs(displayOptions.nonQuantifiedGoal.date).format(timeFormat)
      : '\u00A0';
    goalDisplay = (
      <ValueBlock>
        <ValueLabel>{t('indicator-goal')}</ValueLabel>
        <ValueDate>{goalDate}</ValueDate>
        <ValueDisplay>
          <div>
            {DesiredTrendIcon}
            <ValueUnit>
              {t(`indicator-desired-trend-${displayOptions.nonQuantifiedGoal.trend.toLowerCase()}`)}
            </ValueUnit>
          </div>
        </ValueDisplay>
      </ValueBlock>
    );
  }

  // Find the next upcoming goal
  let differenceDisplay: React.ReactNode | undefined;
  if (
    nextGoal &&
    dayjs(nextGoal.date).isSameOrAfter(latestValue.date) &&
    displayOptions.goalGap.show
  ) {
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
            {format.number(Math.abs(difference), { maximumSignificantDigits: rounding })}
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
      {referenceValueDisplay}
      {valueDisplay}
      {differenceDisplay}
      {goalDisplay}
    </ValueSummary>
  );
}

export default IndicatorValueSummary;
