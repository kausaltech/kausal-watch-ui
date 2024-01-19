import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { readableColor } from 'polished';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { TFunction, getActionTermContext } from 'common/i18n';
import { IndicatorLink } from 'common/links';
import { usePlan } from 'context/plan';
import { useLocale, useTranslations } from 'next-intl';

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

const StyledIndicator = styled(Card)<{ $level: string | null }>`
  hyphens: manual;
  line-height: ${(props) => props.theme.lineHeightSm};
  border: 0;
  border-radius: ${(props) => props.theme.cardBorderRadius};

  color: ${(props) => {
    switch (props.$level) {
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
    if (props.disabled) return props.theme.graphColors.grey050;
    switch (props.$level) {
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
  hyphens: auto;
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
}

function IndicatorValue({
  latestValue,
  date,
  unit,
  resolution,
  goalValue = null,
  goalDate = null,
}: IndicatorValueProps) {
  const t = useTranslations();

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
  disabled?: boolean | null;
}

export function getIndicatorTranslation(level: string | null, t: TFunction) {
  if (!level) {
    return t('indicator');
  }

  switch (level) {
    case 'operational':
      return t('operational-indicator');
    case 'strategic':
      return t('strategic-indicator');
    case 'tactical':
      return t('tactical-indicator');
  }
}

function IndicatorCard({
  level = null,
  objectid,
  name,
  number = null,
  latestValue = null,
  resolution = 'day',
  goalValue = null,
  disabled = false,
}: IndicatorCardProps) {
  const plan = usePlan();
  const t = useTranslations();
  const locale = useLocale();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    level === 'action'
      ? t('action', getActionTermContext(plan))
      : getIndicatorTranslation(level, t);

  return (
    <CardLink level={level} indicatorId={objectid}>
      <StyledIndicator $level={level} disabled={disabled}>
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
              latestValue={latestValue.value.toLocaleString(locale)}
              date={latestValue.date}
              unit={latestValue.unit}
              resolution={resolution}
              goalValue={
                goalValue ? goalValue.value.toLocaleString(locale) : null
              }
              goalDate={goalValue ? goalValue.date : null}
            />
          )}
        </CardBody>
      </StyledIndicator>
    </CardLink>
  );
}

export default IndicatorCard;
