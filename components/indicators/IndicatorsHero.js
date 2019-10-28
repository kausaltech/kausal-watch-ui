import React from 'react';
import {
  Container, Row, Col, Nav, NavItem,
} from 'reactstrap';
import { withTranslation } from '../../common/i18n';
import styled, { withTheme } from 'styled-components';
import ActiveLink from '../../common/ActiveLink';

const IndicatorsJumbo = styled.div`
  background-color: ${props => props.theme.brandLight};
  padding: 3em 0;
`;

const IndicatorsTabs = styled.div`
  background-color: ${props => props.theme.brandLight};
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
    const { t } = this.props;

    return (
      <div>
        <IndicatorsJumbo>
          <Container>
            <h1 className="mb-5">
              { t('indicators') }
            </h1>
            <Row>
              <Col sm="12" md="8" className="mb-1">
                <div className="text-content">
                  <p>Ilmastokriisin pys&auml;ytt&auml;misell&auml; on kiire. Haluamme varmistaa, ett&auml; sovitut 147 toimenpidett&auml; etenev&auml;t aikataulussa ja ett&auml; Helsingin kasvihuonekaasup&auml;&auml;st&ouml;t pienenev&auml;t tarpeeksi nopeasti. Olemme kehitt&auml;neet toimenpiteille mittareita, joita seuraamalla n&auml;emme, mihin suuntaan olemme menossa. Mittareita on kolmenlaisia.</p>
                  <p>Toiminnalliset mittarit kytkeytyv&auml;t suoraan toimenpiteisiin. Ne kertovat toimenpiteen etenemisest&auml; ja sit&auml;, kuinka paljon kaupungilla ponnistellaan kyseisen toimenpiteen puolesta. Toiminnallinen mittari on esimerkiksi vuodessa rakennetun baanaverkon pituus.</p>
                  <p>Taktiset mittarit kuvaavat ilmi&ouml;t&auml;, jota kaupunki pyrkii lis&auml;&auml;m&auml;&auml;n tai v&auml;hent&auml;m&auml;&auml;n toimenpiteill&auml;. Esimerkki taktisesta mittarista on py&ouml;r&auml;liikenteen m&auml;&auml;r&auml;.</p>
                  <p>Strategiset mittarit puolestaan kuvaavat Helsingin kasvihuonekaasup&auml;&auml;st&ouml;j&auml; ja niit&auml; seuraamalla saamme tietoa toimenpiteiden vaikuttavuudesta: teemmeh&auml;n Helsingiss&auml; oikeita asioita, jotta p&auml;&auml;st&ouml;t v&auml;henev&auml;t?</p>
                </div>
            </Col>
          </Row>
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

export default withTranslation('common')(IndicatorsHero);
