import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { readableColor } from 'polished';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { IndicatorLink } from 'common/links';
import { usePlan } from 'context/plan';

const IndicatorValue = styled.div`
  margin-top: 1em;
  font-weight: ${(props) => props.theme.fontWeightBold};
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

function IndicatorLatestValue(props) {
  const { latestValue, date, unit, resolution } = props;

  if (!latestValue) return null;

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

  return (
    <IndicatorValue>
      {latestValue} <IndicatorValueUnit>{unit}</IndicatorValueUnit>
      <IndicatorValueTime>
        <time dateTime={tagVal}>{formattedTime}</time>
      </IndicatorValueTime>
    </IndicatorValue>
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

function IndicatorCard(props) {
  const { level, objectid, name, number, latestValue, resolution } = props;
  const plan = usePlan();
  const { t, i18n } = useTranslation();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    level === 'action' ? t('action', getActionTermContext(plan)) : t(level);
  const formattedValue = latestValue
    ? latestValue.value.toLocaleString(i18n.language)
    : null;
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
            <IndicatorLatestValue
              latestValue={formattedValue}
              date={latestValue.date}
              unit={latestValue.unit}
              resolution={resolution}
            />
          )}
        </CardBody>
      </Indicator>
    </CardLink>
  );
}

IndicatorCard.defaultProps = {
  number: null,
  level: null,
  latestValue: null,
  resolution: 'day',
};

IndicatorCard.propTypes = {
  t: PropTypes.func,
  level: PropTypes.string,
  objectid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  latestValue: PropTypes.shape({
    value: PropTypes.number,
    date: PropTypes.string,
    unit: PropTypes.string,
  }),
  resolution: PropTypes.string,
};

export default IndicatorCard;
