import React from 'react';
import {
  Container, Row, Col, Alert,
} from 'reactstrap';
import { Query } from 'react-apollo';

import styled from 'styled-components';
import Layout from '../components/layout';
import ActionListFiltered, { GET_ACTION_LIST } from '../components/Actions/ActionListFiltered';
import IndexHero from '../components/IndexHero';
import FrontHero from '../components/FrontHero';
import ThlHero from '../components/ThlHero';
import ContentLoader from '../components/Common/ContentLoader';
import PlanContext from '../context/plan';


const ActionsSection = styled.div`
  background-color: ${props => props.theme.brandLight};
  position: relative;
  padding: 8rem 0;
  
  .container {
    text-align: center;
  }
`;

function ActionList(props) {
  const { plan } = props;
  if (!process.browser) {
    return <ContentLoader />;
  }
  return (
    <Query query={GET_ACTION_LIST} variables={{ plan: plan.identifier }}>
      {({ data, loading, error }) => {
        if (loading) return <ContentLoader />;
        if (error) return <p>Virhe</p>;
        return <ActionListFiltered plan={plan} {...data} />;
      }}
    </Query>
  );
}


class IndexPage extends React.Component {
  static contextType = PlanContext;

  render() {
    const plan = this.context;
    let { planHeaderText, planIntroText } = "";

    if (plan.identifier === 'hnh2035') {
      planHeaderText = "Hiilineutraali Helsinki 2035 -toimenpideohjelma";
      planIntroText= "Helsinki on sitoutunut kantamaan vastuunsa ilmastonmuutoksen hillinnässä. Helsingin kaupunkistrategiassa 2017–2021 tavoitteeksi on asetettu hiilineutraali Helsinki vuoteen 2035 mennessä. Ilmastotavoitteet koskevat kaupunkiorganisaation lisäksi kaupunkilaisia ja Helsingissä toimivia organisaatioita. Helsingistä saadaan  hiilineutraali yhteistyöllä. Hiilineutraali Helsinki 2035 –toimenpideohjelma on esitys siitä, miten päästövähennykset käytännössä saavutetaan."
    }

    if (plan.identifier === 'ktstrat') {
      planHeaderText = "Terveyden ja hyvinvoinnin laitoksen kansanterveysstrategia";
      planIntroText= "THL:n tehtävänä on tuottaa tietoa päätöksenteon tueksi ja kansanterveyden parantamiseksi. THL päivittää osaamistaan jatkuvasti ja pyrkii varmistamaan, että oikeita asioita tehdään sekä talon sisällä että yhteiskunnassa yleisesti. Tällä sivustolla kokeillaan ajatusta, että kansanterveysstrategian sisältöä mietittäisiin avoimen verkkotyökalun avulla. Tarkoituksena on tunnistaa tarpeellisia toimenpiteitä, joilla THL voisi edistää kansanterveyttä. Lisäksi mietitään mittareita, joiden avulla toimenpiteiden toteutusta ja vaikutuksia voidaan seurata ja ohjata."
    }

    let heroComponent = <FrontHero bgImage={plan.imageUrl} heroText={plan.name} />;

    if (plan.identifier === 'hnh2035') heroComponent = <IndexHero />;
    if (plan.identifier === 'ktstrat') heroComponent = <ThlHero />;
    return (
      <Layout>
        { heroComponent }
        <ActionsSection className="actions-section">
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className="footer-column">
                <Alert color="warning" className="mb-5">
                  <strong>HUOM:</strong>
                  Tämä on palvelun Alpha-kehitysversio. Sivustolla saattaa esiintyä
                  esimerkinomaisia sisältöjä jotka eivät perustu todellisiin tietoihin sekä toiminnallisuuksia,
                  jotka ovat vielä kehitysvaiheessa.
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }} className="footer-column">
                <div className="mb-5">
                  <h1 className="mb-4">{planHeaderText}</h1>
                  <p>
                    {planIntroText}
                  </p>
                </div>
              </Col>
            </Row>
            <ActionList plan={plan} />
          </Container>
        </ActionsSection>
      </Layout>
    );
  }
}

export default IndexPage;
