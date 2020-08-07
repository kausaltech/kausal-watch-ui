import React from 'react';
import PropTypes from 'prop-types';

import {
  Jumbotron as BaseJumbotron, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { IndicatorListLink } from '../../common/links';
import PlanContext from '../../context/plan';

import { withTranslation } from '../../common/i18n';
import ContentLoader from '../common/ContentLoader';
import ErrorMessage from '../common/ErrorMessage';
import ErrorBoundary from '../common/ErrorBoundary';
import { Meta } from '../layout';

import IndicatorGraph from '../graphs/IndicatorGraph';
import IndicatorValueSummary from './IndicatorValueSummary';
import IndicatorCard from './IndicatorCard';
import ActionsTable from '../actions/ActionsTable';


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
        ...ActionsTable
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
  ${ActionsTable.fragments.action}
`;

const IndicatorHero = styled(BaseJumbotron)`
  margin-bottom: 2rem;

  a {
    color: inherit;
  }
  
  h1 {
    hyphens: auto;

    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      font-size: 1.75em;
    }
  }
`;

const IndicatorLevel = styled.h6`
  display: inline-block;
  border-radius: .75em;
  padding: .25em 1em;
  margin-bottom: 1.5rem;
  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColorFg;
      case 'operational':
        return props.theme.operationalIndicatorColorFg;
      case 'tactical':
        return props.theme.tacticalIndicatorColorFg;
      case 'strategic':
        return props.theme.strategicIndicatorColorFg;
      default:
        return props.theme.themeColors.black;
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

const CausalNavigation = styled.div`
  padding-top: 2rem;
  background-color: ${(props) => props.theme.themeColors.light};
`;

function IndicatorDetails(props) {
  const { t, indicator, plan } = props;
  const hasImpacts = indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;

  return (
    <div className="mb-5">
      <Meta
        title={indicator.name}
      />
      <IndicatorHero level={indicator.level}>
        <Container>
          <IndicatorLevel level={indicator.level}>
            <IndicatorListLink>
              <a>
                { t(indicator.level) }
              </a>
            </IndicatorListLink>
          </IndicatorLevel>
          <h1>{indicator.name}</h1>
          { (indicator.goals.length > 0  || indicator.goals.length > 0) &&
          (
            <IndicatorValueSummary
              timeResolution={indicator.timeResolution}
              values={indicator.values}
              unit={indicator.unit}
              goals={indicator.goals}
            />
          )}
        </Container>
      </IndicatorHero>
      <Container>
        <Row>
          <Col md="10" className="mb-5">
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: indicator.description }} />
          </Col>
        </Row>
        {(indicator.latestGraph || indicator.values.length > 0) &&
          (
          <Row>
            <Col className="mb-5">
              <ErrorBoundary><IndicatorGraph indicator={indicator} plan={plan} /></ErrorBoundary>
            </Col>
          </Row>
          )}
      </Container>
      { indicator.actions.length > 0 && (
        <Section>
          <Container>
            <Row>
              <Col className="mb-4">
                <h2>{t('indicator-related-actions')}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <ActionsTable
                  actions={indicator.actions}
                />
              </Col>
            </Row>
          </Container>
        </Section>
      )}
      { hasImpacts
        && (
          <CausalNavigation>
            <Container>
              <Row>
                <Col sm="6" lg={{ size: 5 }} className="mb-5">
                  { indicator.relatedCauses.length > 0 && (
                    <div>
                      <h3 className="mb-4">{ t('indicator-affected-by') }</h3>
                      { indicator.relatedCauses.map((cause) => (
                        <IndicatorCard
                          objectid={cause.causalIndicator.id}
                          name={cause.causalIndicator.name}
                          level={cause.causalIndicator.level}
                          key={cause.causalIndicator.id}
                        />
                      ))}
                    </div>
                  )}
                </Col>

                <Col sm="6" lg={{ size: 5, offset: 2 }} className="mb-5">
                  { indicator.relatedEffects.length > 0 && (
                    <div>
                      <h3 className="mb-4">{ t('indicator-has-effect-on') }</h3>
                      { indicator.relatedEffects.map((effect) => (
                        <IndicatorCard
                          objectid={effect.effectIndicator.id}
                          name={effect.effectIndicator.name}
                          level={effect.effectIndicator.level}
                          key={effect.effectIndicator.id}
                        />
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </CausalNavigation>
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
    const { t, id } = this.props;
    const plan = this.context;

    return (
      <Query query={GET_INDICATOR_DETAILS} variables={{ id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const { indicator } = data;
          if (!indicator) {
            return <ErrorMessage statusCode={404} message={ t('indicator-not-found') } />
          }
          return <IndicatorDetails indicator={indicator} plan={plan} t={t}/>;
        }}
      </Query>
    );
  }
}

IndicatorContent.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

IndicatorDetails.propTypes = {
  plan: PropTypes.shape({}).isRequired,
  indicator: PropTypes.shape({
    actions: PropTypes.array.isRequired,
    relatedCauses: PropTypes.array.isRequired,
    relatedEffects: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    timeResolution: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(IndicatorContent);
