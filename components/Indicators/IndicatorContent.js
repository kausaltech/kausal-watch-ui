import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';
import {
  Jumbotron as BaseJumbotron, Alert, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { aplans } from '../../common/api';
import ContentLoader from '../Common/ContentLoader';
import IndicatorGraph from '../Graphs/IndicatorGraph';
import IndicatorCausal from './IndicatorCausal';
import ActionCard from '../Actions/ActionCard';

const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;
`;

const Section = styled.section`
  padding: 3em 0 6em;
  margin-bottom: -3em;
  //background-color: #eeeeee;

  h2 {
    margin-bottom: 1em;
  }
`;


class IndicatorContent extends React.Component {
  static async fetchData(id) {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.find('indicator', id, {
      include: 'latest_graph',
    });
    return {
      indicator: resp.data,
    };
  }

  static getHeadTags(props) {
    const { indicator } = props;

    return {
      subPageName: indicator.name,
    };
  }

  render() {
    const { indicator } = this.props;

    return (
      <div className="mb-5">
        <IndicatorHero>
          <Container>
            <h5><Link route="indicators"><a>Mittarit</a></Link></h5>
            <h1>{indicator.name}</h1>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }} />
          </Container>
        </IndicatorHero>
        <Container>
          <Row>
            <Col className="mb-5">
              <h2>Kuvaaja</h2>
              {indicator.latest_graph
                ? <IndicatorGraph graphId={indicator.latest_graph.id} />
                : <h5>Ei kuvaajaa</h5>}
            </Col>
          </Row>
        </Container>
        <Section>
          <Container>
            <Row>
              <Col>
                <h2>Kuinka tämä ilmiö vaikuttaa kasvihuonepäästöihin?</h2>
                <a href="#">Näytä näkemysverkossa</a>
                <IndicatorCausal />
              </Col>
            </Row>
          </Container>
        </Section>
        <Section>
          <Container>
            <Row>
              <h2>Tähän mittariin vaikuttavat toimenpiteet</h2>
            </Row>
            <Row>
              <Col lg="4" md="6" className="mb-4 d-flex align-items-stretch">
                <ActionCard action={{id:5, name:'Toimenpiteen nimi', identifier:'5', status:{identifier:3}}} />
              </Col>
              <Col lg="4" md="6" className="mb-4 d-flex align-items-stretch">
                <ActionCard action={{id:34, name:'Toimenpiteen nimi', identifier:'34', status:{identifier:3}}} />
              </Col>
              <Col lg="4" md="6" className="mb-4 d-flex align-items-stretch">
                <ActionCard action={{id:123, name:'Toimenpiteen nimi', identifier:'123', status:{identifier:3}}} />
              </Col>
            </Row>
          </Container>
        </Section>
      </div>
    );
  }
}


export default IndicatorContent;
