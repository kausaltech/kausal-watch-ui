import React from 'react';
import PropTypes from 'prop-types';

import {
  Jumbotron as BaseJumbotron, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from '../../routes';
import PlanContext from '../../context/plan';

import ContentLoader from '../Common/ContentLoader';
import ErrorMessage from '../Common/ErrorMessage';
import { SubpageTitle } from '../layout';

import IndicatorGraph from '../Graphs/IndicatorGraph';
import ActionCard from '../Actions/ActionCard';


const GET_INDICATOR_DETAILS = gql`
query IndicatorDetails($id: ID, $plan: ID, $identifier: ID) {
  indicator(plan: $plan, id: $id, identifier: $identifier) {
    id
    identifier
    name
    level(plan: $plan)
    description
    timeResolution
    latestGraph {
      id
    }
    values {
      time
      value
    }
    goals(plan: $plan) {
      date
      value
    }
    actions(plan: $plan) {
      id
      identifier
      name
      status {
        id
        identifier
        name
      }
      categories {
        id
        identifier
        name
        imageUrl
      }
    }
  }
}
`;

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


function IndicatorDetails(props) {
  const { indicator } = props;
  return (
    <div className="mb-5">
      <SubpageTitle title={indicator.name} />
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
            {indicator.latestGraph
              ? <IndicatorGraph graphId={indicator.latestGraph.id} />
              : <h5>Ei kuvaajaa</h5>}
          </Col>
        </Row>
      </Container>
      { indicator.actions.length > 0 && (
        <Section>
          <Container>
            <Row>
              <h2>Tähän mittariin vaikuttavat toimenpiteet</h2>
            </Row>
            <Row>
              { indicator.actions
                ? indicator.actions.map(action => (
                  <Col lg="4" md="6" className="mb-4 d-flex align-items-stretch" key={action.id}>
                    <ActionCard action={action} />
                  </Col>
                ))
                : <h6>Ei suoria toimenpiteitä</h6>
              }
            </Row>
          </Container>
        </Section>
      )}
    </div>
  );
}


class IndicatorContent extends React.Component {
  static contextType = PlanContext;

  render() {
    const { id } = this.props;
    const plan = this.context;

    return (
      <Query query={GET_INDICATOR_DETAILS} variables={{ id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const { indicator } = data;
          return <IndicatorDetails indicator={indicator} plan={plan} />;
        }}
      </Query>
    );
  }
}

IndicatorContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IndicatorContent;
