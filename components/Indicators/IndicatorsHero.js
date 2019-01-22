import React from 'react';
import {
  Container, Nav, NavItem,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { withRouter } from 'next/router';
import { Link } from '../../routes';

const IndicatorsJumbo = styled.div`
  background-color: ${props => props.theme.helSummer};
  padding: 3em 0;
`;

const IndicatorsTabs = styled.div`
  background-color: ${props => props.theme.helSummer};
  margin-bottom: 2rem;
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
                <Link route="indicators" passHref={ true }>
                  <a className="nav-link">Listana</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link route="insight" passHref={ true }>
                  <a className="nav-link">Näkemysverkossa</a>
                </Link>
              </NavItem>
            </Nav>
          </Container>
        </IndicatorsTabs>
      </div>
    );
  }
}

export default withRouter(withTheme(IndicatorsHero));
