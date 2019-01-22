import React from 'react';
import {
  Container, Row, Col, Alert,
} from 'reactstrap';

import styled from 'styled-components';
import Layout from '../components/layout';
import ActionListFiltered from '../components/Actions/ActionListFiltered';
import IndexHero from '../components/IndexHero';
import ContentLoader from '../components/Common/ContentLoader';


const ActionsSection = styled.div`
  background-color: ${props => props.theme.helSummer};
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionListProps: props.actionListProps,
    };
  }

  static async getInitialProps({ req }) {
    const props = {};

    // When rendering on the server, load initial data here to pass to the
    // list component. Server-side-rendered content works better for social media
    // shares and SEO.
    if (req) {
      props.actionListProps = await ActionListFiltered.fetchData();
    }
    return props;
  }

  async componentDidMount() {
    if (!this.state.actionListProps) {
      this.setState({
        actionListProps: await ActionListFiltered.fetchData(),
      });
    }
  }

  render() {
    let actionList;
    const { actionListProps } = this.state;
    if (actionListProps) {
      actionList = <ActionListFiltered {...actionListProps} />;
    } else {
      actionList = <ContentLoader />;
    }
    return (
      <Layout>
        <IndexHero />
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
                  <h1 className="mb-4">Hiilineutraali Helsinki 2035 -toimenpideohjelma</h1>
                  <p>
                    Helsinki on sitoutunut kantamaan vastuunsa ilmastonmuutoksen hillinnässä.
                    Helsingin kaupunkistrategiassa 2017–2021 tavoitteeksi on asetettu hiilineutraali
                    Helsinki vuoteen 2035 mennessä. Ilmastotavoitteet koskevat kaupunkiorganisaation
                    lisäksi kaupunkilaisia ja Helsingissä toimivia organisaatioita. Helsingistä saadaan
                    hiilineutraali yhteistyöllä. Hiilineutraali Helsinki 2035 –toimenpideohjelma on esitys
                    siitä, miten päästövähennykset käytännössä saavutetaan.
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
