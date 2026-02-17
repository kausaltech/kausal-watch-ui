import React from 'react';

import { usePathname } from 'next/navigation';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Col, Container, Nav, NavItem, Row } from 'reactstrap';

import RichText from '@/components/common/RichText';

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
  a {
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
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
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  &:hover {
    color: ${(props) =>
      readableColor(
        props.theme.brandDark,
        props.theme.themeColors.dark,
        props.theme.themeColors.light
      )};
  }
  &.active {
    color: ${(props) => props.theme.linkColor};
    background: ${(props) => props.theme.themeColors.white};
    &:hover {
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

interface Props {
  title?: string;
  leadContent?: string;
  showInsights?: boolean;
  children?: React.ReactNode;
  testId?: string;
}

function IndicatorsHero({ title, leadContent = '', showInsights = true, children, testId }: Props) {
  const t = useTranslations();
  const pathname = usePathname();

  const header = title ? title : t('indicators');

  return (
    <div data-testid={testId}>
      <IndicatorsJumbo>
        <Container>
          <h1>{header}</h1>
          {leadContent && (
            <Row>
              <Col sm="12" md="8" className="mb-3">
                <RichText html={leadContent} />
              </Col>
            </Row>
          )}
          {!!children && (
            <Row>
              <Col sm="12">{children}</Col>
            </Row>
          )}
        </Container>
      </IndicatorsJumbo>
      {showInsights && (
        <IndicatorsTabs>
          <Container>
            <Nav>
              <NavItem>
                <NavigationLink slug="/indicators">
                  <Tab className={`nav-link ${pathname?.includes('/indicators') ? 'active' : ''}`}>
                    {t('indicators-as-list')}
                  </Tab>
                </NavigationLink>
              </NavItem>
              <NavItem>
                <NavigationLink slug="/insight">
                  <Tab className={`nav-link ${pathname?.includes('/insight') ? 'active' : ''}`}>
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
