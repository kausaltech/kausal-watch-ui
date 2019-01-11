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


const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;
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
            <h5><Link route="indicators"><a>Indikaattorit</a></Link></h5>
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
      </div>
    );
  }
}


export default IndicatorContent;
