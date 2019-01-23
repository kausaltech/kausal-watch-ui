import React from 'react';
import {
  Container, Nav, NavItem,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { withRouter } from 'next/router';
import ActiveLink from '../../common/ActiveLink';

const IndicatorsJumbo = styled.div`
  background-color: ${props => props.theme.helSummer};
  padding: 3em 0;
`;

const IndicatorsTabs = styled.div`
  background-color: ${props => props.theme.helSummer};
  margin-bottom: 2rem;
`;

const StyledActiveLink = styled(ActiveLink)`
  background: ${props => props.theme.helTram};
  color: white;
  &:hover {
    color: ${props => props.theme.helSummer};
  }
  &.active {
    color: ${props => props.theme.helTram};
    background: white;
    &:hover {
      color: black;
    }
  }
`;

class IndicatorsHero extends React.Component {

  render() {
    return (
      <div>
        <IndicatorsJumbo>
          <Container>
            <h1>
              Mittarit
            </h1>
          </Container>
        </IndicatorsJumbo>
        <IndicatorsTabs>
          <Container>
            <Nav>
              <NavItem>
                <StyledActiveLink href="/indicators" passHref className="nav-link">
                  Listana
                </StyledActiveLink>
              </NavItem>
              <NavItem>
                <StyledActiveLink href="/insight" passHref className="nav-link">
                  Näkemysverkossa
                </StyledActiveLink>
              </NavItem>
            </Nav>
          </Container>
        </IndicatorsTabs>
      </div>
    );
  }
}

export default withRouter(withTheme(IndicatorsHero));
