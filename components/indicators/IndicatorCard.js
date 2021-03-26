import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
} from 'reactstrap';
import styled from 'styled-components';
import dayjs from 'common/dayjs';
import { withTranslation } from 'common/i18n';
import { IndicatorLink } from 'common/links';

const IndicatorValue = styled.div`
  margin-top: 1em;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const IndicatorValueUnit = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const IndicatorValueTime = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const StyledLink = styled.a`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

const Indicator = styled(Card)`
  hyphens: auto;
  line-height: ${(props) => props.theme.lineHeightSm};
  border: 0;
  border-radius: ${(props) => props.theme.cardBorderRadius};

  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColorFg;
      case 'operational':
        return props.theme.operationalIndicatorColorFg;
      case 'tactical':
        return props.theme.tacticalIndicatorColorFg;
      case 'strategic':
        return props.theme.strategicIndicatorColorFg;
      default:
        return props.theme.themeColors.black;
    }
  }};
  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.operationalIndicatorColor;
      case 'tactical':
        return props.theme.tacticalIndicatorColor;
      case 'strategic':
        return props.theme.strategicIndicatorColor;
      default:
        return '#cccccc';
    }
  }};

  transition: all 0.25s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px rgba(82,90,101,0.5);
  }
`;

const IndicatorType = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  margin-bottom: .5em;
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
      {Number.isInteger(latestValue) ? latestValue : latestValue.toFixed(2).replace('.', ',')}
      {' '}
      <IndicatorValueUnit>
        {unit}
      </IndicatorValueUnit>
      <IndicatorValueTime>
        <time dateTime={tagVal}>{formattedTime}</time>
      </IndicatorValueTime>
    </IndicatorValue>
  );
}

function CardLink(props) {
  const { level, indicatorId, children } = props;
  if (level !== 'action') return (
    <IndicatorLink id={indicatorId}>
      <StyledLink href>
        { children }
      </StyledLink>
    </IndicatorLink>
  );
  return <>{children}</>;
}

function IndicatorCard(props) {
  const {
    t,
    level,
    objectid,
    name,
    number,
    latestValue,
    resolution,
  } = props;

  return (
    <Indicator level={level}>
      <CardBody>
        <div>
          <IndicatorType>{ t(level) }</IndicatorType>
          <CardLink level={level} indicatorId={objectid}>
            <IndicatorTitle>
              { number && <IndicatorNumber>{ number }</IndicatorNumber> }
              { name }
            </IndicatorTitle>
          </CardLink>
        </div>
        { latestValue && (
          <IndicatorLatestValue
            latestValue={latestValue.value}
            date={latestValue.date}
            unit={latestValue.unit}
            resolution={resolution}
          />
        )}
      </CardBody>
    </Indicator>
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
  latestValue: PropTypes.shape({ value: PropTypes.number, date: PropTypes.string, unit: PropTypes.string }),
  resolution: PropTypes.string,
};

export default withTranslation('common')(IndicatorCard);
