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
import { ActionLink } from '../../common/links';

import PlanContext from '../../context/plan';

import IndicatorCausal from '../indicators/IndicatorCausal';
import Timeline from '../graphs/Timeline';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import ContactPersons from './ContactPersons';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionIndicators from './ActionIndicators';
import ActionBgImage from './ActionBgImage';
import ActionPager from './ActionPager';
import ContentLoader from '../common/ContentLoader';
import Icon from '../common/Icon';
import { SubpageTitle } from '../layout';
import ErrorMessage from '../common/ErrorMessage';


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
      person {
        id
        firstName
        lastName
        avatarUrl
        title
        organization {
          name
        }
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
        latestValue {
          date
          value
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
  color: ${props => props.theme.themeColors.dark};
`;

const ActionSection = styled.div`
  margin-bottom: 2.5rem;
`;

const OfficialText = styled.div`
  color: ${props => props.theme.brandDark};
  margin-bottom: 3rem;
`;

const CategoryBadge = styled(Badge)`
  margin-right: 1em;
  white-space: normal;
  text-align: left;
  font-size: 1rem;
`;

const CausalSection = styled.div`
  background-color: ${props => props.theme.themeColors.light};
`;

const ActionUpdate = styled.div`
  padding: 1em;
  margin: 0 0 2em;
  border-top: solid 2px ${props => props.theme.brandDark};
  border-bottom: solid 2px ${props => props.theme.brandDark};
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
                  <Link href="/#actions">
                    <a>
                      <h4>Toimenpiteet</h4>
                    </a>
                  </Link>
                  <p>
                  { action.previousAction
                    && (
                      <ActionLink id={action.previousAction.identifier}>
                        <a><Icon name="arrowLeft" color={theme.brandLight}  /> Edellinen</a>
                      </ActionLink>
                    )
                  }{ action.nextAction
                    && action.previousAction && <span>{' '}|{' '}</span>}{ action.nextAction
                    && (
                      <ActionLink id={action.nextAction.identifier}>
                        <a>Seuraava <Icon name="arrowRight" color={theme.brandLight} /></a>
                      </ActionLink>
                    )
                  }
                  </p>
                  <h2 className="display-4">{action.identifier}</h2>
                  <ActionHeadline>{action.name}</ActionHeadline>
                  {action.categories.map((item) => (
                    <CategoryBadge key={item.id} className="mr-3">{item.name}</CategoryBadge>
                  ))}
                </Col>
              </Row>
            </Container>
          </OverlayContainer>
        </ActionBgImage>
      </ActionHero>
      <Container>
        <Row>
          <Col md="7" lg="8">
            {action.description
            && <ActionSection dangerouslySetInnerHTML={{ __html: action.description }} />}
            <OfficialText>
              <h5>Virallinen kuvaus</h5>
              <strong>Toimenpideohjelman mukaisesti</strong>
              <div dangerouslySetInnerHTML={{ __html: action.officialName }} />
              <small>(Hiilineutraali Helsinki 2035 -toimenpideohjelmasta)</small>
            </OfficialText>
          </Col>
          <Col md="5" lg="4">
            {action.impact &&
              <ActionSection>
                <h5>Vaikutus</h5>
                <ActionImpact name={action.impact.name} identifier={action.impact.identifier} />
              </ActionSection>
            }
            <ActionSection>
              <h5>Eteneminen</h5>
              { action.completion > 0
              && (
              <strong>
                {action.completion}
                % valmis
              </strong>
              ) }
              {action.status && (
                <ActionStatus
                  name={action.status.name}
                  identifier={action.status.identifier}
                  completion={action.completion}
                />
              )}
            </ActionSection>
            { action.schedule.length ? (
              <ActionSection>
                <h5>Aikajänne</h5>
                <Timeline schedules={action.schedule} allSchedules={plan.actionSchedules} />
              </ActionSection>
            ) : null}
            <ActionSection>
              <ResponsibleList data={action.responsibleParties.map((item) => item.organization)} />
            </ActionSection>
            <ActionSection>
              <ContactPersons persons={action.contactPersons.map((item) => item.person)} />
            </ActionSection>
            <ActionSection>
              <LastUpdated>Tietoja päivitetty {updated}</LastUpdated>
            </ActionSection>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="mb-5">Tehtävät</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ActionSection className="mb-5">
              <TaskList tasks={action.tasks} />
            </ActionSection>
          </Col>
        </Row>
        </Container>
        {action.relatedIndicators && action.relatedIndicators.length > 0 && (
          <div>
            <Container>
              <Row>
                <Col sm="12">
                  <h2 className="mb-3">Miten tämä vaikuttaa?</h2>
                </Col>
              </Row>
            </Container>
            <IndicatorCausal actionId={action.id} />
          </div>
        )}
        <Container className="mb-5">
        <Row>
          <Col md="8" className="mb-5">
            <h2 className="mb-5">Viimeisimmät päivitykset</h2>
            <ActionUpdate>
              <p><strong>5.10.2019</strong></p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </ActionUpdate>
            <ActionUpdate>
              <p><strong>5.10.2019</strong></p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </ActionUpdate>
          </Col>
        </Row>
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
          if (!action) {
            return <ErrorMessage statusCode={404} message="Toimenpidettä ei löydy" />
          }
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
