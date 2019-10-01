import React from 'react';
import PropTypes from 'prop-types';

import {
  Jumbotron as BaseJumbotron, Container, Row, Col, Alert, Badge
} from 'reactstrap';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from '../../routes';
import PlanContext from '../../context/plan';

import ContentLoader from '../common/ContentLoader';
import ErrorMessage from '../common/ErrorMessage';
import ErrorBoundary from '../common/ErrorBoundary';
import { Meta } from '../layout';

import IndicatorGraph from '../graphs/IndicatorGraph';
import IndicatorValueSummary from './IndicatorValueSummary';
import IndicatorCard from './IndicatorCard';
import ActionCard from '../actions/ActionCard';


const GET_INDICATOR_DETAILS = gql`
  query IndicatorDetails($id: ID, $plan: ID, $identifier: ID) {
    indicator(plan: $plan, id: $id, identifier: $identifier) {
      id
      identifier
      name
      level(plan: $plan)
      description
      timeResolution
      unit {
        id
        name
        shortName
        verboseName
        verboseNamePlural
      }
      latestGraph {
        id
      }
      values {
        id
        date
        value
      }
      goals(plan: $plan) {
        id
        date
        value
      }
      actions(plan: $plan) {
        ...ActionCard
      }
      relatedCauses {
        id
        effectType
        confidenceLevel
        causalIndicator {
          id
          name
          level(plan: $plan)
        }
      }
      relatedEffects {
        id
        effectType
        confidenceLevel
        effectIndicator {
          id
          name
          level(plan: $plan)
        }
      }
    }
  }
  ${ActionCard.fragments.action}
`;

const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;
  
  a {
    color: inherit;
  }
`;

const IndicatorLevel = styled.h6 `
  display: inline-block;
  border-radius: .75em;
  padding: .25em 1em;
  margin-bottom: 1em;
  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return '#ffffff';
      case 'operational':
        return '#000000';
      case 'tactical':
        return '#000000';
      case 'strategic':
        return '#ffffff';
      default:
        return '#000000';
    }
  }};
  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.operationalIndicatorColor;
      case 'tactical':
        return props.theme.tacticalIndicatorColor;
      case 'strategic':
        return props.theme.strategicIndicatorColor;
      default:
        return '#cccccc';
    }
  }};
`;

const Section = styled.section`
  padding: 3em 0 6em;
  margin-bottom: -3em;

  h2 {
    margin-bottom: 1em;
  }
`;

const CausalNavigation = styled.div `
  background-color: ${props => props.theme.themeColors.light};
`;

function getLevelName(level) {
  switch (level) {
    case 'action':
      return 'Toimenpide';
    case 'operational':
      return 'Toiminnallinen mittari';
    case 'tactical':
      return 'Taktinen mittari';
    case 'strategic':
      return 'Strateginen mittari';
    default:
      return '';
  }
}

function IndicatorDetails(props) {
  const { indicator, plan } = props;

  return (
    <div className="mb-5">
      <Meta
        title={`Mittarit`}
        description={`${indicator.name}`}
        />
      <IndicatorHero level={indicator.level}>
        <Container>
          <IndicatorLevel level={indicator.level}><Link href="/indicators"><a>{ getLevelName(indicator.level) }</a></Link></IndicatorLevel>
          <h1>{indicator.name}</h1>
          { (indicator.goals.length > 0  || indicator.goals.length > 0) && 
          <IndicatorValueSummary timeResolution={indicator.timeResolution} values={indicator.values} unit={indicator.unit} goals={indicator.goals}/>}
        </Container>
      </IndicatorHero>
      <Container>
        <Row>
          <Col md="10"  className="mb-5">
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }} />
          </Col>
        </Row>
        <Row>
          <Col className="mb-5">
            <h2>Kuvaaja</h2>
            {(indicator.latestGraph || indicator.values.length)
              ? <ErrorBoundary><IndicatorGraph indicator={indicator} plan={plan} /></ErrorBoundary>
              : <Alert><h5>Ei kuvaajaa</h5></Alert>}
          </Col>
        </Row>
      </Container>
      <CausalNavigation>
        <Container>
          <Row>
            <Col md="6" className="mb-5">
              <h4>->Tähän vaikuttaa</h4>
              { indicator.relatedCauses
                ? indicator.relatedCauses.map(cause => (
                <IndicatorCard
                  objectid={ cause.causalIndicator.id }
                  name={ cause.causalIndicator.name }
                  level={ cause.causalIndicator.level }
                  />
              )) : <Alert>Ei vaikuttavia</Alert>
            }
            </Col>

            <Col md="6" className="mb-5">
              <h4>Tämä vaikuttaa-></h4>
              { indicator.relatedEffects.length
                ? indicator.relatedEffects.map(effect => (
                  <IndicatorCard
                    objectid={ effect.effectIndicator.id }
                    name={ effect.effectIndicator.name }
                    level={ effect.effectIndicator.level }
                    />
              )) : <Alert>Ei vaikutusta</Alert>
            }
            </Col>
          </Row>
        </Container>
      </CausalNavigation>
      { indicator.actions.length > 0 && (
        <Section>
          <Container>
            <Row>
              <Col>
                <h3>Mittariin liittyvät toimenpiteet</h3>
              </Col>
            </Row>
            <Row>
              { indicator.actions
                ? indicator.actions.map(action => (
                  <Col lg="4" md="4" key={action.id}>
                    <IndicatorCard
                      objectid={ action.identifier }
                      name={ action.name }
                      level="action"
                      number={ action.identifier }
                      />
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

IndicatorDetails.propTypes = {
  indicator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    goals: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
    })),
  }).isRequired,
};


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
          if (!indicator) {
            return <ErrorMessage statusCode={404} message="Mittaria ei löydy" />
          }
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
