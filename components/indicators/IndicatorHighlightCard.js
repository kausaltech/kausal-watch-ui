import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImgOverlay, CardBody, CardTitle,
} from 'reactstrap';
import { Spring } from 'react-spring/renderprops.cjs';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { IndicatorLink } from '../../common/links';

const IndicatorType = styled.div`
  margin-bottom: .5em;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.neutralDark};
`;

const IndicatorBg = styled.div`
  height: ${(props) => props.theme.spaces.s600};
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
`;

const StyledCard = styled(Card)`
  width: 100%;
  background-color: ${(props) => props.theme.themeColors.light};
  transition: all 0.5s ease;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  a {
    color: ${(props) => props.theme.neutralDark};
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px rgba(82,90,101,0.5);
  }
`;

const IndicatorValue = styled.div`
  margin-top: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeXl};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
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
`;

const IndicatorUnit = styled.span`
  margin-left: .25em;
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledCardTitle = styled(CardTitle)`
  margin-bottom: 0;
  font-size: ${(props) => props.theme.fontSizeMd};
  color: ${(props) => props.theme.neutralDark};
  text-align: left;
  hyphens: auto;
`;


function beautifyValue(x) {
  let out;

  if (!Number.isInteger(x)) {
    out = x.toFixed(2);
  } else {
    out = x;
  }
  const s = out.toString();
  const displayNumber = s.replace('.', ',');
  return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function IndicatorHighlightCard(props) {
  const {
    t,
    level,
    objectid,
    name,
    value,
    unit,
  } = props;

  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(springProps) => (
        <StyledCard style={springProps}>
          <IndicatorLink id={objectid} prefetch={false}>
            <a>
              <IndicatorBg level={level} />
              <CardImgOverlay>
                <IndicatorValue
                  level={level}
                  className="action-number"
                >
                  { beautifyValue(value) }
                  <IndicatorUnit>{unit}</IndicatorUnit>
                </IndicatorValue>
              </CardImgOverlay>
            </a>
          </IndicatorLink>
          <CardBody>
            <IndicatorType>{ t(level) }</IndicatorType>
            <IndicatorLink id={objectid}>
              <a>
                <StyledCardTitle tag="h3">{ name }</StyledCardTitle>
              </a>
            </IndicatorLink>
          </CardBody>
        </StyledCard>
      )}
    </Spring>
  );
}

IndicatorHighlightCard.defaultProps = {
  value: null,
  unit: '-',
};

IndicatorHighlightCard.propTypes = {
  level: PropTypes.string.isRequired,
  objectid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  unit: PropTypes.string,
};

export default withTranslation('common')(IndicatorHighlightCard);
