import React from 'react';
import {
  Container, Row, Col, Alert,
} from 'reactstrap';

import styled from 'styled-components';
import Layout from '../components/layout';
import ActionListFiltered from '../components/Actions/ActionListFiltered';
import IndexHero from '../components/IndexHero';
import FrontHero from '../components/FrontHero';
import ThlHero from '../components/ThlHero';
import ContentLoader from '../components/Common/ContentLoader';


const ActionsSection = styled.div`
  background-color: ${props => props.theme.brandLight};
  position: relative;
  padding: 8rem 0;
  
  .container {
    text-align: center;
  }
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionListProps: props.actionListProps,
    };
  }

  static async getInitialProps({ req, plan }) {
    const props = {};

    // When rendering on the server, load initial data here to pass to the
    // list component. Server-side-rendered content works better for social media
    // shares and SEO.
    props.plan = plan;
    if (req) {
      props.actionListProps = await ActionListFiltered.fetchData(plan);
    }
    return props;
  }

  async componentDidMount() {
    if (!this.state.actionListProps) {
      this.setState({
        actionListProps: await ActionListFiltered.fetchData(this.props.plan),
      });
    }
  }

  render() {
    let actionList;
    const { actionListProps } = this.state;
    const { plan } = this.props;
    var {planHeaderText, planIntroText} = "";
    
    if (process.env.PLAN_IDENTIFIER === 'hnh2035') {
      planHeaderText = "Hiilineutraali Helsinki 2035 -toimenpideohjelma";
      planIntroText= "Helsinki on sitoutunut kantamaan vastuunsa ilmastonmuutoksen hillinnässä. Helsingin kaupunkistrategiassa 2017–2021 tavoitteeksi on asetettu hiilineutraali Helsinki vuoteen 2035 mennessä. Ilmastotavoitteet koskevat kaupunkiorganisaation lisäksi kaupunkilaisia ja Helsingissä toimivia organisaatioita. Helsingistä saadaan  hiilineutraali yhteistyöllä. Hiilineutraali Helsinki 2035 –toimenpideohjelma on esitys siitä, miten päästövähennykset käytännössä saavutetaan."
    };

    if (process.env.PLAN_IDENTIFIER === 'ktstrat') {
      planHeaderText = "Terveyden ja hyvinvoinnin laitoksen kansanterveysstrategia";
      planIntroText= "THL:n tehtävänä on tuottaa tietoa päätöksenteon tueksi ja kansanterveyden parantamiseksi. THL päivittää osaamistaan jatkuvasti ja pyrkii varmistamaan, että oikeita asioita tehdään sekä talon sisällä että yhteiskunnassa yleisesti. Tällä sivustolla kokeillaan ajatusta, että kansanterveysstrategian sisältöä mietittäisiin avoimen verkkotyökalun avulla. Tarkoituksena on tunnistaa tarpeellisia toimenpiteitä, joilla THL voisi edistää kansanterveyttä. Lisäksi mietitään mittareita, joiden avulla toimenpiteiden toteutusta ja vaikutuksia voidaan seurata ja ohjata."
    };

    if (actionListProps) {
      actionList = <ActionListFiltered {...actionListProps} />;
    } else {
      actionList = <ContentLoader />;
    }
    
    let heroComponent = <FrontHero bgImage={plan.image_url} heroText={plan.name}/>;
    
    if (process.env.PLAN_IDENTIFIER === 'hnh2035') heroComponent = <IndexHero />;
    if (process.env.PLAN_IDENTIFIER === 'ktstrat') heroComponent = <ThlHero />;
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
            {actionList}
          </Container>
        </ActionsSection>
      </Layout>
    );
  }
}

export default IndexPage;
