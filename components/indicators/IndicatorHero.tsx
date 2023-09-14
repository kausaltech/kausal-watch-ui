import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { IndicatorListLink } from 'common/links';
import OrgSelector from 'components/orgs/OrgSelector';
import IndicatorValueSummary from 'components/indicators/IndicatorValueSummary';
import { usePlan } from 'context/plan';

import { IndicatorDetailsQuery } from 'common/__generated__/graphql';
import { readableColor } from 'polished';

const Hero = styled.header`
  position: relative;
  background-color: ${(props) => props.theme.brandDark};
  margin-bottom: ${(props) => props.theme.spaces.s400};
  a {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      color: ${(props) => props.theme.brandDark};
    }
  }
`;

interface IndicatorBgImageProps {
  bgColor?: string;
  bgImage?: string;
  imageAlign?: string;
}

const IndicatorBgImage = styled.div<IndicatorBgImageProps>`
  background-size: cover;
  background-blend-mode: multiply;
  background-color: ${(p) => p.bgColor ?? 'unset'};
  background-image: url(${(p) => p.bgImage ?? 'unset'});
  background-position: ${(p) => p.imageAlign ?? 'unset'};
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
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
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
  padding: ${(props) => props.theme.spaces.s300} 0
    ${(props) => props.theme.spaces.s300};
`;

const IndicatorLevel = styled.span<{ level: string }>`
  a {
    display: inline-block;
    border-radius: ${(props) => props.theme.badgeBorderRadius};
    padding: ${(props) => props.theme.badgePaddingY}
      ${(props) => props.theme.badgePaddingX};
    font-weight: ${(props) => props.theme.badgeFontWeight};
    margin: ${(props) => props.theme.spaces.s150} 0 0;

    color: ${(props) => {
      switch (props.level) {
        case 'action':
          return readableColor(props.theme.actionColor);
        case 'operational':
          return readableColor(props.theme.graphColors.blue070);
        case 'tactical':
          return readableColor(props.theme.graphColors.blue030);
        case 'strategic':
          return readableColor(props.theme.graphColors.blue010);
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

    &:hover {
      color: ${(props) => {
        switch (props.level) {
          case 'action':
            return readableColor(props.theme.actionColor);
          case 'operational':
            return readableColor(props.theme.graphColors.blue070);
          case 'tactical':
            return readableColor(props.theme.graphColors.blue030);
          case 'strategic':
            return readableColor(props.theme.graphColors.blue010);
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
  font-size: ${(props) => props.theme.fontSizeLg};
  color: ${(props) => props.theme.themeColors.black} !important;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeLg};
  }
`;

interface IndicatorHeroProps {
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
  orgs: any;
  goals: any;
}

function IndicatorHero(props: IndicatorHeroProps) {
  const { indicator, orgs, goals } = props;
  // const theme = useTheme();
  const { t } = useTranslation();
  const plan = usePlan();

  // FIXME: It sucks that we only use the context for the translation key 'action'
  const indicatorType =
    indicator.level === 'action'
      ? t('action', getActionTermContext(plan))
      : indicator.level != null
      ? t(indicator.level)
      : null;

  return (
    <Hero>
      <IndicatorBgImage>
        <OverlayContainer>
          <Container>
            <Row>
              <Col lg={8}>
                <HeroCardBg>
                  <CardContent>
                    {orgs && orgs.length > 0 && (
                      <PrimaryOrg>
                        <OrgSelector orgs={orgs} />
                      </PrimaryOrg>
                    )}
                    <IndicatorListLink>
                      <a>
                        <IndexLink>{t('indicators')}</IndexLink>
                      </a>
                    </IndicatorListLink>
                    <IndicatorHeadline>
                      <span>{indicator.name}</span>
                    </IndicatorHeadline>
                    {goals.length > 0 && (
                      <IndicatorValueSummary
                        timeResolution={indicator.timeResolution}
                        values={indicator.values}
                        unit={indicator.unit}
                        goals={goals}
                      />
                    )}
                    {indicator.level && (
                      <IndicatorLevel level={indicator.level}>
                        <IndicatorListLink>
                          <a>{indicatorType}</a>
                        </IndicatorListLink>
                      </IndicatorLevel>
                    )}
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
