import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import RichText from 'components/common/RichText';
import { useTranslation, withTranslation } from '../../common/i18n';
import { NavigationLink } from '../../common/links';

const IndicatorsJumbo = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: 3em 0;
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.headingsColor,
        props.theme.themeColors.white
      )};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }
`;

const IndicatorsTabs = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Tab = styled.div`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  &:hover {
    color: ${(props) => props.theme.brandLight};
  }
  &.active {
    color: ${(props) => props.theme.brandDark};
    background: ${(props) => props.theme.themeColors.white};
    &:hover {
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

interface Props {
  leadContent?: string;
  showInsights: boolean;
  children: React.ReactNode;
}

function IndicatorsHero({
  leadContent = '',
  showInsights = true,
  children,
}: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <div>
      <IndicatorsJumbo>
        <Container>
          <h1>{t('indicators')}</h1>
          {leadContent && (
            <Row>
              <Col sm="12" md="8" className="mb-1">
                <RichText html={leadContent} />
              </Col>
            </Row>
          )}
          <Row>
            <Col sm="12">{children}</Col>
          </Row>
        </Container>
      </IndicatorsJumbo>
      {showInsights && (
        <IndicatorsTabs>
          <Container>
            <Nav>
              <NavItem>
                <NavigationLink slug="/indicators">
                  <Tab
                    className={`nav-link ${
                      router.pathname === '/indicators' ? 'active' : ''
                    }`}
                  >
                    {t('indicators-as-list')}
                  </Tab>
                </NavigationLink>
              </NavItem>
              <NavItem>
                <NavigationLink slug="/insight">
                  <Tab
                    className={`nav-link ${
                      router.pathname === '/insight' ? 'active' : ''
                    }`}
                  >
                    {t('indicators-as-insight')}
                  </Tab>
                </NavigationLink>
              </NavItem>
            </Nav>
          </Container>
        </IndicatorsTabs>
      )}
    </div>
  );
}

export default IndicatorsHero;
