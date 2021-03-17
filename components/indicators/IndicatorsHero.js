import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Container, Row, Col, Nav, NavItem,
} from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { withTranslation } from '../../common/i18n';
import { NavigationLink } from '../../common/links';

const IndicatorsJumbo = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: 3em 0;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

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

function IndicatorsHero(props) {
  const { t, leadContent, showInsights } = props;
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
              <RichText html={leadContent} />
              </Col>
            </Row>
          )}
        </Container>
      </IndicatorsJumbo>
      { showInsights && (
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
      )}
    </div>
  );
}

IndicatorsHero.defaultProps = {
  leadContent: '',
  showInsights: true,
};

IndicatorsHero.propTypes = {
  t: PropTypes.func.isRequired,
  leadContent: PropTypes.string,
  showInsights: PropTypes.bool,
};

export default withTranslation('common')(IndicatorsHero);
