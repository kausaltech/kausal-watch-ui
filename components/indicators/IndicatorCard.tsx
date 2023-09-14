import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { readableColor } from 'polished';
import styled from 'styled-components';
import { TFunction } from 'next-i18next';
import dayjs from 'common/dayjs';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { IndicatorLink } from 'common/links';
import { usePlan } from 'context/plan';

const IndicatorValueDisplay = styled.div`
  margin-top: 1em;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const IndicatorValues = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spaces.s150};
`;

const IndicatorValueType = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const IndicatorValueUnit = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const IndicatorValueTime = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const StyledLink = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const Indicator = styled(Card)`
  hyphens: manual;
  line-height: ${(props) => props.theme.lineHeightSm};
  border: 0;
  border-radius: ${(props) => props.theme.cardBorderRadius};

  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return readableColor(props.theme.actionColor);
      case 'operational':
        return props.theme.themeColors.white;
      case 'tactical':
        return props.theme.themeColors.black;
      case 'strategic':
        return props.theme.themeColors.black;
      default:
        return props.theme.themeColors.black;
    }
  }};
  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.graphColors.blue070;
      case 'tactical':
        return props.theme.graphColors.blue030;
      case 'strategic':
        return props.theme.graphColors.blue010;
      default:
        return '#cccccc';
    }
  }};

  transition: all 0.25s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px rgba(82, 90, 101, 0.5);
  }
`;

const IndicatorType = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  margin-bottom: 0.5em;
`;

const IndicatorNumber = styled.span`
  display: block;
`;

const IndicatorTitle = styled(CardTitle)`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const formatTime = (date, resolution) => {
  const time = dayjs(date, 'YYYY-MM-DD');
  let tagVal;
  let formattedTime;

  if (resolution === 'year') {
    formattedTime = time.format('YYYY');
    tagVal = formattedTime;
  } else if (resolution === 'month') {
    formattedTime = time.format('YYYY-MM');
    tagVal = formattedTime;
  } else {
    formattedTime = time.format('L');
    tagVal = time.format(); // ISO format
  }

  return { formattedTime, tagVal };
};

interface IndicatorValueProps {
  latestValue: string | null;
  date: string;
  unit: string;
  resolution: string;
  goalValue?: string | null;
  goalDate?: string | null;
  t: TFunction;
}

function IndicatorValue({
  latestValue,
  date,
  unit,
  resolution,
  goalValue = null,
  goalDate = null,
  t,
}: IndicatorValueProps) {
  if (!latestValue) return null;

  return (
    <IndicatorValues>
      <IndicatorValueDisplay>
        <IndicatorValueType>{t('indicator-latest-value')}</IndicatorValueType>
        {latestValue} <IndicatorValueUnit>{unit}</IndicatorValueUnit>
        <IndicatorValueTime>
          <time dateTime={formatTime(date, resolution).tagVal}>
            {formatTime(date, resolution).formattedTime}
          </time>
        </IndicatorValueTime>
      </IndicatorValueDisplay>
      {goalValue && (
        <IndicatorValueDisplay>
          <IndicatorValueType>{t('indicator-goal')}</IndicatorValueType>
          {goalValue} <IndicatorValueUnit>{unit}</IndicatorValueUnit>
          <IndicatorValueTime>
            <time dateTime={formatTime(goalDate, resolution).tagVal}>
              {formatTime(goalDate, resolution).formattedTime}
            </time>
          </IndicatorValueTime>
        </IndicatorValueDisplay>
      )}
    </IndicatorValues>
  );
}

function CardLink(props) {
  const { level, indicatorId, children } = props;

  if (level !== 'action')
    return (
      <IndicatorLink id={indicatorId}>
        <StyledLink href>{children}</StyledLink>
      </IndicatorLink>
    );
  return <>{children}</>;
}

interface IndicatorCardProps {
  level?: string | null;
  objectid: string;
  name: string;
  number?: number | null;
  latestValue?: {
    value: number;
    date: string;
    unit: string;
  } | null;
  resolution: string;
  goalValue?: {
    value: number;
    date: string;
    unit: string;
  } | null;
}

function IndicatorCard({
  level = null,
  objectid,
  name,
  number = null,
  latestValue = null,
  resolution = 'day',
  goalValue = null,
}: IndicatorCardProps) {
  const plan = usePlan();
  const { t, i18n } = useTranslation();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    level === 'action' ? t('action', getActionTermContext(plan)) : t(level);

  return (
    <CardLink level={level} indicatorId={objectid}>
      <Indicator level={level}>
        <CardBody>
          <div>
            <IndicatorType>{indicatorType}</IndicatorType>
            <IndicatorTitle>
              {number && <IndicatorNumber>{number}</IndicatorNumber>}
              {name}
            </IndicatorTitle>
          </div>
          {latestValue && (
            <IndicatorValue
              latestValue={latestValue.value.toLocaleString(i18n.language)}
              date={latestValue.date}
              unit={latestValue.unit}
              resolution={resolution}
              goalValue={
                goalValue ? goalValue.value.toLocaleString(i18n.language) : null
              }
              goalDate={goalValue ? goalValue.date : null}
              t={t}
            />
          )}
        </CardBody>
      </Indicator>
    </CardLink>
  );
}

export default IndicatorCard;
