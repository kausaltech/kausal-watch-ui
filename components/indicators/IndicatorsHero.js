import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Nav, NavItem,
} from 'reactstrap';
import { withTranslation } from '../../common/i18n';
import styled, { withTheme } from 'styled-components';
import ActiveLink from '../../common/ActiveLink';

const IndicatorsJumbo = styled.div`
  background-color: ${props => props.theme.neutralLight};
  padding: 3em 0;
`;

const IndicatorsTabs = styled.div`
  background-color: ${props => props.theme.neutralLight};
  margin-bottom: 2rem;
`;

const StyledActiveLink = styled(ActiveLink)`
  background: ${props => props.theme.brandDark};
  color: white;
  &:hover {
    color: ${props => props.theme.brandLight};
  }
  &.active {
    color: ${props => props.theme.brandDark};
    background: white;
    &:hover {
      color: black;
    }
  }
`;

class IndicatorsHero extends React.Component {

  render() {
    const { t, leadContent } = this.props;

    return (
      <div>
        <IndicatorsJumbo>
          <Container>
            <h1 className="mb-5">
              { t('indicators') }
            </h1>
            { leadContent && (
              <Row>
                <Col sm="12" md="8" className="mb-1">
                  <div className="text-content" dangerouslySetInnerHTML={{ __html: leadContent }} />
                </Col>
              </Row>
            )}
          </Container>
        </IndicatorsJumbo>
        <IndicatorsTabs>
          <Container>
            <Nav>
              <NavItem>
                <StyledActiveLink href="/indicators" passHref className="nav-link">
                  { t('indicators-as-list') }
                </StyledActiveLink>
              </NavItem>
              <NavItem>
                <StyledActiveLink href="/insight" passHref className="nav-link">
                  { t('indicators-as-insight') }
                </StyledActiveLink>
              </NavItem>
            </Nav>
          </Container>
        </IndicatorsTabs>
      </div>
    );
  }
}

IndicatorsHero.propTypes = {
  t: PropTypes.func.isRequired,
  leadContent: PropTypes.string,
};

export default withTranslation('common')(IndicatorsHero);
