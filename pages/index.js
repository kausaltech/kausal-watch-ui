import React from 'react'
import { Container, Row, Col, Alert } from 'reactstrap';

import Layout from '../components/layout'
import ActionListFiltered from '../components/Actions/ActionListFiltered'
import IndexHero from '../components/IndexHero'

import { aplans } from '../common/api'
import styled from 'styled-components'


const ActionsSection = styled.div`
  background-color: ${props => props.theme.helSummer};
`

const IndexPage = (props) => (
  <Layout>
    <IndexHero />
    <ActionsSection className="actions-section">
      <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }} className="footer-column">
            <Alert color="warning" className="mb-5"><strong>HUOM:</strong>Tämä on palvelun Alpha-kehitysversio. Sivustolla saattaa esiintyä esimerkinomaisia sisältöjä jotka eivät perustu todellisiin tietoihin sekä toiminnallisuuksia jotka ovat vielä kehitysvaiheessa.</Alert>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} className="footer-column">
            <div className="mb-5">
              <h1 className="mb-4">Hiilineutraali Helsinki 2035 -toimenpideohjelma</h1>
              <p>Helsinki on sitoutunut kantamaan vastuunsa ilmastonmuutoksen hillinnässä. Helsingin kaupunkistrategiassa 2017–2021 tavoitteeksi on asetettu hiilineutraali Helsinki vuoteen 2035 mennessä. Ilmastotavoitteet koskevat kaupunkiorganisaation lisäksi kaupunkilaisia ja Helsingissä toimivia organisaatioita. Helsingistä saadaan hiilineutraali yhteistyöllä. Hiilineutraali Helsinki 2035 –toimenpideohjelma on esitys siitä, miten päästövähennykset käytännössä saavutetaan.</p>
            </div>
          </Col>
        </Row>
        <ActionListFiltered initialData={props.actionData} />
      </Container>
    </ActionsSection>
  </Layout>
)

IndexPage.getInitialProps = async function({req}) {
  let props = {}

  /* When rendering on the server, load initial data here to pass to the
   * component. This is better for social media shares and SEO. */
  if (req) {
    await aplans.enableCache()
    const resp = await aplans.getActionList()
    const actionData = resp.data
    props.actionData = actionData
  }
  return props
}

export default IndexPage
