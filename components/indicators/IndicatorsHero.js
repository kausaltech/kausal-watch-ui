import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Container, Row, Col, Nav, NavItem,
} from 'reactstrap';
import styled from 'styled-components';

import { withTranslation } from '../../common/i18n';
import { NavigationLink } from '../../common/links';

const IndicatorsJumbo = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: 3em 0;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXxl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const IndicatorsTabs = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Tab = styled.a`
  background: ${(props) => props.theme.brandDark};
  color: white;
  &:hover {
    color: ${(props) => props.theme.brandLight};
  }
  &.active {
    color: ${(props) => props.theme.brandDark};
    background: white;
    &:hover {
      color: black;
    }
  }
`;

function IndicatorsHero(props) {
  const { t, leadContent } = props;
  const router = useRouter();

  return (
    <div>
      <IndicatorsJumbo>
        <Container>
          <h1>
            { t('indicators') }
          </h1>
          { leadContent && (
            <Row>
              <Col sm="12" md="8" className="mb-1">
                <div
                  className="text-content"
                  dangerouslySetInnerHTML={{ __html: leadContent }}
                />
              </Col>
            </Row>
          )}
        </Container>
      </IndicatorsJumbo>
      <IndicatorsTabs>
        <Container>
          <Nav>
            <NavItem>
              <NavigationLink slug="indicators">
                <Tab className={`nav-link ${router.pathname === '/indicators' ? 'active' : ''}`}>
                  { t('indicators-as-list') }
                </Tab>
              </NavigationLink>
            </NavItem>
            <NavItem>
              <NavigationLink slug="insight">
                <Tab className={`nav-link ${router.pathname === '/insight' ? 'active' : ''}`}>
                  { t('indicators-as-insight') }
                </Tab>
              </NavigationLink>
            </NavItem>
          </Nav>
        </Container>
      </IndicatorsTabs>
    </div>
  );
}

IndicatorsHero.propTypes = {
  t: PropTypes.func.isRequired,
  leadContent: PropTypes.string,
};

export default withTranslation('common')(IndicatorsHero);
