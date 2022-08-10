import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import { IndicatorLink, IndicatorListLink, Link } from 'common/links';
import OrgSelector from 'components/orgs/OrgSelector';
import IndicatorValueSummary from 'components/indicators//IndicatorValueSummary';
import { usePlan } from 'context/plan';

const Hero = styled.header`
  position: relative;
  background-color: ${(props) => props.bgColor};
  margin-bottom: ${(props) => props.theme.spaces.s400};
  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }
`;

const IndicatorBgImage = styled.div`
  background-color: ${(props) => props.bgColor};
  background-image: url(${(props) => props.bgImage});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;
  background-blend-mode: multiply;
`;

const PrimaryOrg = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  padding-bottom: ${(props) => props.theme.spaces.s100};
  border-bottom: 1px solid #eeeeee;
`;

const HeroCardBg = styled.div`
  margin-bottom: -${(props) => props.theme.spaces.s400};
  background-color: white;
  border-radius: ${(props) => props.theme.cardBorderRadius};
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.spaces.s150};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s200};
  }
`;

const OverlayContainer = styled.div`
  display: flex;
  align-items: flex-end;
  min-height: 18rem;
  padding: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s300};
`;

const IndicatorLevel = styled.span`
a {
  display: inline-block;
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  margin: ${(props) => props.theme.spaces.s150} 0 0;

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

  &:hover {
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
    text-decoration: underline;
  }
}
`;

const IndexLink = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const IndicatorHeadline = styled.h1`
  hyphens: manual;
  margin: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeXl};
  color: ${(props) => props.theme.themeColors.black} !important;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

function IndicatorHero(props) {
  const {
    indicator,
    orgs,
    goals,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const plan = usePlan();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType = indicator.level === 'action' ? t('action', getActionTermContext(plan)) : t(indicator.level);

  return (
    <Hero bgColor={theme.brandDark}>
      <IndicatorBgImage
      >
        <OverlayContainer>
          <Container>
            <Row>
              <Col lg={8}>
                <HeroCardBg>
                  <CardContent>
                  { orgs && (
                    <PrimaryOrg>
                      <OrgSelector
                        orgs={orgs}
                      />
                    </PrimaryOrg>
                  )}
                    <IndicatorListLink>
                      <a>
                        <IndexLink>{ t('indicators') }</IndexLink>
                      </a>
                    </IndicatorListLink>
                    <IndicatorHeadline>
                      <span>{indicator.name}</span>
                    </IndicatorHeadline>
                    { (goals.length > 0) && (
                      <IndicatorValueSummary
                        timeResolution={indicator.timeResolution}
                        values={indicator.values}
                        unit={indicator.unit}
                        goals={goals}
                      />
                    )}
                    <IndicatorLevel level={indicator.level}>
                      <IndicatorListLink>
                        <a>
                          { indicatorType }
                        </a>
                      </IndicatorListLink>
                    </IndicatorLevel>
                  </CardContent>
                </HeroCardBg>
              </Col>
            </Row>
          </Container>
        </OverlayContainer>
      </IndicatorBgImage>
    </Hero>
  );
}

export default IndicatorHero;
