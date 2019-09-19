import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Progress, Alert, Badge,
} from 'reactstrap';
import { Query } from 'react-apollo';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import moment from '../../common/moment';

import { Link } from '../../routes';
import PlanContext from '../../context/plan';

import IndicatorCausal from '../Indicators/IndicatorCausal';
import Timeline from '../Graphs/Timeline';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import ContactPersons from './ContactPersons';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionIndicators from './ActionIndicators';
import ActionBgImage from './ActionBgImage';
import ActionPager from './ActionPager';
import ContentLoader from '../Common/ContentLoader';
import Icon from '../Common/Icon';
import { SubpageTitle } from '../layout';
import ErrorMessage from '../Common/ErrorMessage';


const GET_ACTION_DETAILS = gql`
query ActionDetails($plan: ID!, $id: ID!) {
  action(plan: $plan, identifier: $id) {
    id
    identifier
    name
    officialName
    description
    completion
    imageUrl
    updatedAt

    categories {
      id
      name
      imageUrl
      parent {
        id
        name
        imageUrl
      }
    }
    contactPersons {
      id
      firstName
      lastName
      avatarUrl
      title
      organization {
        name
      }
    }
    responsibleParties {
      id
      organization {
        id
        abbreviation
        name
      }
    }
    tasks {
      id, name, dueAt, completedAt, comment
    }
    status {
      id, identifier, name
    }
    schedule {
      id, name, beginsAt, endsAt
    }
    impact {
      id, identifier, name
    }
    relatedIndicators {
      indicator {
        id
        name
        latestGraph {
          id
        }
        actions {
          id
          identifier
          name
        }
      }
    }
    nextAction {
      identifier
    }
    previousAction {
      identifier
    }
  }
}`;

const ActionHero = styled.div`
  position: relative;
  margin-bottom: 3rem;
  a {
    color: ${props => props.theme.brandLight};
  }
`;

const OverlayContainer = styled.div`
  color: white;
  padding: 2rem 0;
`;

const ActionHeadline = styled.h1`
  hyphens: auto;
  margin-bottom: 2rem;
`;

const LastUpdated = styled.div`
  margin-bottom: 1em;
  color: #aaaaaa;
`;

const ActionSection = styled.section`
  margin-bottom: 3rem;
`;

const OfficialText = styled.section`
  color: ${props => props.theme.brandDark};
  margin-bottom: 3rem;
`;

const CategoryBadge = styled(Badge)`
  margin-right: 1em;
  white-space: normal;
  text-align: left;
  font-size: 1rem;
`;

const CommentsSection = styled.section`
  background-color: ${props => props.theme.brandDark};
`;


function ActionDetails(props) {
  const { action, plan, theme } = props;

  const updated = moment(action.updatedAt).format('DD.MM.YYYY');

  return (
    <div>
      <SubpageTitle title={action.name} />
      <ActionHero>
        <ActionBgImage action={action} width={1200} height={600} color={theme.imageOverlay}>
          <OverlayContainer>
            <Container>
              <Row>
                <Col md="10">
                  <Link route="/#actions">
                    <a>
                      <h4>Toimenpiteet</h4>
                    </a>
                  </Link>
                  <h2 className="display-4">{action.identifier}</h2>
                  <ActionHeadline>{action.name}</ActionHeadline>
                  <p>
                  { action.previousAction
                    && (
                      <Link route="action" params={{ id: action.previousAction.identifier }} passHref={ true }>
                        <a><Icon name="arrowLeft" color={theme.brandLight}  /> Edellinen</a>
                      </Link>
                    )
                  }{ action.nextAction
                    && action.previousAction && <span>{' '}|{' '}</span>}{ action.nextAction
                    && (
                      <Link route="action" params={{ id: action.nextAction.identifier }} passHref={ true }>
                        <a>Seuraava <Icon name="arrowRight" color={theme.brandLight} /></a>
                      </Link>
                    )
                  }
                  </p>
                </Col>
              </Row>
            </Container>
          </OverlayContainer>
        </ActionBgImage>
      </ActionHero>
      <Container>
        <Row>
          <Col md="6" lg="8">
            {action.description
            && <ActionSection dangerouslySetInnerHTML={{ __html: action.description }} />}
            <OfficialText>
              <h5>Virallinen kuvaus</h5>
              <strong>Toimenpideohjelman mukaisesti</strong>
              <div dangerouslySetInnerHTML={{ __html: action.officialName }} />
              <small>(Hiilineutraali Helsinki 2035 -toimenpideohjelmasta)</small>
            </OfficialText>
            <LastUpdated>Tietoja päivitetty {updated}</LastUpdated>
          </Col>
          <Col md="6" lg="4">
            {action.impact &&
              <ActionSection>
                <ActionImpact name={action.impact.name} identifier={action.impact.identifier} />
              </ActionSection>
            }
            <ActionSection>
            {action.categories.map((item) => (
              <CategoryBadge key={item.id} className="mr-3">{item.name}</CategoryBadge>
            ))}
            </ActionSection>
            <ActionSection>
              <ResponsibleList data={action.responsibleParties.map((item) => item.organization)} />
            </ActionSection>
            <ActionSection>
              <ContactPersons persons={action.contactPersons} />
            </ActionSection>
            <ActionSection>
              <h5>Eteneminen</h5>
              { action.completion > 0
              && (
              <strong>
                {action.completion}
                % valmis
              </strong>
              ) }
              <ActionStatus
                name={action.status.name}
                identifier={action.status.identifier}
                completion={action.completion}
              />
            </ActionSection>
            { action.schedule.length ? (
              <ActionSection>
                <h5>Aikajänne</h5>
                <Timeline schedules={action.schedule} allSchedules={plan.actionSchedules} />
              </ActionSection>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="mb-5">Tehtävät</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ActionSection>
              <TaskList tasks={action.tasks} />
            </ActionSection>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="mb-5">Mittarit</h2>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mb-5">
            {action.relatedIndicators && action.relatedIndicators.length > 0
              ? <ActionIndicators actionId={action.id} relatedIndicators={action.relatedIndicators} />
              : <Alert color="light" className="mb-5"><h6>Ei määriteltyjä mittareita</h6></Alert>
              }
          </Col>
        </Row>
        </Container>
        {action.relatedIndicators && action.relatedIndicators.length > 0 && (
          <div>
            <Container>
              <Row>
                <Col sm="12">
                  <h2 className="mb-5">Vaikutusketju</h2>
                </Col>
              </Row>
            </Container>
            <IndicatorCausal actionId={action.id} />
          </div>
        )}
        <Container className="mb-5">
        <Row>
          <Col sm="12">
            <ActionPager
              nextId={action.nextAction ? action.nextAction.identifier : undefined}
              previousId={action.previousAction ? action.previousAction.identifier : undefined}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

class ActionContent extends React.Component {
  static contextType = PlanContext;

  render() {
    const { theme, id } = this.props;
    const plan = this.context;

    return (
      <Query query={GET_ACTION_DETAILS} variables={{ id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const { action } = data;
          return <ActionDetails action={action} theme={theme} plan={plan} />;
          /* ActionContent action={data.action} theme={ theme } /> */
        }}
      </Query>
    );
  }
}

ActionContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withTheme(ActionContent);
