import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Badge,
} from 'reactstrap';
import { Query } from 'react-apollo';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import moment from '../../common/moment';

import { Link } from '../../routes';
import { ActionLink } from '../../common/links';

import { withTranslation } from '../../common/i18n';
import PlanContext from '../../context/plan';

import IndicatorCausal from '../indicators/IndicatorCausal';
import Timeline from '../graphs/Timeline';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import ContactPersons from './ContactPersons';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionBgImage from './ActionBgImage';
import ActionPager from './ActionPager';
import ActionUpdatesList from './ActionUpdatesList';
import ContentLoader from '../common/ContentLoader';
import Icon from '../common/Icon';
import { Meta } from '../layout';
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
      id
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
    statusUpdates {
      id
    }
    relatedIndicators {
      id
      indicator {
        id
        name
        latestGraph {
          id
        }
        latestValue {
          id
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
      id
      identifier
    }
    previousAction {
      id
      identifier
    }
  }
}`;

const ActionHero = styled.div`
  position: relative;
  margin-bottom: 3rem;
  a {
    color: ${(props) => props.theme.brandLight};
  }
`;

const OverlayContainer = styled.div`
  color: white;
  padding: 2rem 0;
`;

const ActionHeadline = styled.h1`
  hyphens: auto;
  margin-bottom: 2rem;

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    font-size: 1.75em;
  }
`;

const ActionNumber = styled.span`
  font-size: 3.5rem;
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    font-size: 2.5rem;
  }
`;

const LastUpdated = styled.div`
  margin-bottom: 1em;
  color: ${(props) => props.theme.themeColors.dark};
`;

const ActionSection = styled.div`
  margin-bottom: 2.5rem;
`;

const OfficialText = styled.div`
  color: ${(props) => props.theme.brandDark};
  margin-bottom: 3rem;
`;

const CategoryBadge = styled(Badge)`
  margin-right: 1em;
  white-space: normal;
  text-align: left;
  font-size: 1rem;
`;

const SolidSection = styled.div`
  padding: 2rem 0;

  margin-bottom: 3rem;
`;

function getImageURL(plan, action, width, height) {
  let url;
  if (action.imageUrl) {
    url = action.imageUrl;
  } else {
    action.categories.forEach((cat) => {
      if (url) return;
      let parent = cat;
      while (parent) {
        if (parent.imageUrl) {
          url = parent.imageUrl;
          return;
        }
        parent = parent.parent;
      }
    });
  }
  if (!url) {
    url = plan.imageUrl;
  }

  const params = [];
  if (height) {
    params.push(`height=${height}`);
  }
  if (width) {
    params.push(`width=${width}`);
  }
  if (params.length) {
    url += `?${params.join('&')}`;
  }
  return url;
}

function ActionDetails(props) {
  const {
    t,
    action,
    plan,
    theme,
  } = props;

  const updated = moment(action.updatedAt).format('DD.MM.YYYY');
  const generalContent = plan.generalContent || {};

  return (
    <div>
      <Meta
        title={`${t('action')} ${action.identifier}`}
        shareImageUrl={getImageURL(plan, action, 1200, 630)}
        description={`${action.name}`}
        />
      <ActionHero>
        <ActionBgImage action={action} width={1200} height={600} color={theme.imageOverlay}>
          <OverlayContainer>
            <Container>
              <Row>
                <Col md="10">
                  <Link href="/actions/">
                    <a>
                      <h4>{ t('actions') }</h4>
                    </a>
                  </Link>
                  <p>
                    { action.previousAction
                      && (
                        <ActionLink id={action.previousAction.identifier}>
                          <a href>
                            <Icon name="arrowLeft" color={theme.brandLight} />
                            {' '}
                            { t('previous') }
                          </a>
                        </ActionLink>
                      )}
                    { action.nextAction
                      && action.previousAction
                      && (
                        <span>
                          {' '}
                          |
                          {' '}
                        </span>
                      )}
                    { action.nextAction
                      && (
                        <ActionLink id={action.nextAction.identifier}>
                          <a href>
                            { t('next') }
                            <Icon name="arrowRight" color={theme.brandLight} />
                          </a>
                        </ActionLink>
                      )}
                  </p>
                  <ActionHeadline>
                    <ActionNumber>{action.identifier}</ActionNumber>
                    <br />
                    {action.name}
                  </ActionHeadline>
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
              <h5>{ t('action-description-official') }</h5>
              <strong>{ t('action-as-in-plan') }</strong>
              <div dangerouslySetInnerHTML={{ __html: action.officialName }} />
              {generalContent.officialNameDescription && (
                <small>{`(${generalContent.officialNameDescription})`}</small>
              )}
            </OfficialText>
          </Col>
          <Col md="5" lg="4">
            { action.impact
              && (
              <ActionSection>
                <h5>{ t('action-impact') }</h5>
                <ActionImpact name={action.impact.name} identifier={action.impact.identifier} />
              </ActionSection>
              )}
            <ActionSection>
              <h5>{ t('action-progress') }</h5>
              { action.completion > 0
              && (
              <strong>
                {action.completion}
                %
                {' '}
                { t('action-percent-ready') }
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
                <h5>{ t('action-timeline') }</h5>
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
              <LastUpdated>
                { t('action-last-updated') }
                {' '}
                { updated }
              </LastUpdated>
            </ActionSection>
          </Col>
        </Row>
      </Container>
      { action.statusUpdates.length > 0
        && (
        <SolidSection>
          <Container>
            <Row>
              <Col>
                <h2 className="mb-5">{ t('action-status-updates') }</h2>
              </Col>
            </Row>
            <ActionUpdatesList id={action.id} className="mb-5" />
          </Container>
        </SolidSection>
        )}
      <Container>
        <Row>
          <Col>
            <h2 className="mb-5">{ t('action-tasks') }</h2>
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
                <h2 className="mb-3">{ t('action-what-effect-this-has') }</h2>
              </Col>
            </Row>
          </Container>
          <IndicatorCausal actionId={action.id} />
        </div>
      )}
      <Container>
        <Row>
          <Col sm="12" className="mb-5">
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
    const { t, theme, id } = this.props;
    const plan = this.context;

    return (
      <Query query={GET_ACTION_DETAILS} variables={{ id, plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const { action } = data;
          if (!action) {
            return <ErrorMessage statusCode={404} message={t('action-not-found')} />;
          }
          return <ActionDetails action={action} theme={theme} plan={plan} t={t} />;
          /* ActionContent action={data.action} theme={ theme } /> */
        }}
      </Query>
    );
  }
}

ActionDetails.propTypes = {
  action: PropTypes.shape({}).isRequired,
  plan: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    brandLight: PropTypes.string.isRequired,
    imageOverlay: PropTypes.string.isRequired,
  }).isRequired,
};

ActionContent.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default withTranslation('common')(withTheme(ActionContent));
