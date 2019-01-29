import React from 'react';
import PropTypes from 'prop-types';

import {
  Jumbotron as BaseJumbotron, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';
import { aplans } from '../../common/api';
import IndicatorGraph from '../Graphs/IndicatorGraph';
import ActionCard from '../Actions/ActionCard';

const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;
`;

const Section = styled.section`
  padding: 3em 0 6em;
  margin-bottom: -3em;

  h2 {
    margin-bottom: 1em;
  }
`;


class IndicatorContent extends React.Component {
  static async fetchData(id) {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.find('indicator', id, {
      include: ['latest_graph', 'actions'],
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
    console.log(indicator.actions);
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
              <h2>Tähän mittariin vaikuttavat toimenpiteet</h2>
            </Row>
            <Row>
              { indicator.actions
                ? indicator.actions.map((action, index) => (
                  <Col lg="4" md="6" className="mb-4 d-flex align-items-stretch" key={index}>
                    <ActionCard action={action} />
                  </Col>
                ))
                : <h6>Ei suoria toimenpiteitä</h6>
              }
            </Row>
          </Container>
        </Section>
      </div>
    );
  }
}


export default IndicatorContent;
