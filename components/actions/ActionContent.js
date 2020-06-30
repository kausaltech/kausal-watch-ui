import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Badge, Alert,
} from 'reactstrap';
import { Query } from 'react-apollo';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import moment from '../../common/moment';

import { ActionLink, ActionListLink } from '../../common/links';
import { withTranslation } from '../../common/i18n';
import PlanContext from '../../context/plan';

import { Meta } from '../layout';
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
import ActionUpdatesList from './ActionUpdatesList';
import EmissionScopeIcon from './EmissionScopeIcon';
import ContentLoader from '../common/ContentLoader';
import Icon from '../common/Icon';
import ErrorMessage from '../common/ErrorMessage';
import { getActionImageURL } from '../../common/utils';

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
    mergedActions {
      id
      identifier
      officialName
    }
    categories(categoryType: "action") {
      id
      name
      imageUrl
      parent {
        id
        name
        imageUrl
      }
    }
    emissionScopes: categories(categoryType: "emission_scope") {
      id
      identifier
      name
      shortDescription
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

const SectionHeader = styled.h2`
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    font-size: 1.75em;
  }
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
  color: ${(props) => props.theme.themeColors.light};
  background-color: ${(props) => props.theme.brandDark};
`;

const SolidSection = styled.div`
  padding: 2rem 0;

  margin-bottom: 3rem;
`;

const ActionNumberBadge = styled(Badge)`
  font-size: 1rem;
  padding: .2rem;
`;

const MergedActionSection = styled.div`
  margin-bottom: 1rem;
`;

function MergedAction(props) {
  const { action, theme } = props;
  const { identifier, officialName } = action;
  return (
    <MergedActionSection>
      <ActionNumberBadge key={identifier} className="mr-1">
        {identifier}
      </ActionNumberBadge>
      {officialName}
    </MergedActionSection>
  );
}

function MergedActionList(props) {
  const { actions, t, theme } = props;
  if (!actions || !actions.length) {
    // render nothing
    return null;
  }

  const mergedActions = actions.map(act => (
    <MergedAction action={act} theme={theme} key={act.id} />
  ));

  return (
    <ActionSection>
      <h5>{ t('action-merged') }</h5>
      {mergedActions}
    </ActionSection>
  );
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
  const officialName = action.officialName || '';
  const cleanOfficialText = officialName.replace(/(?:\r\n|\r|\n)/g, '<br>');

  const { categories, emissionScopes, mergedActions } = action;
  const hasMergedActions = mergedActions.length > 0;

  return (
    <div>
      <Meta
        title={`${t('action')} ${action.identifier}`}
        shareImageUrl={getActionImageURL(plan, action, 1200, 630)}
        description={`${action.name}`}
      />
      <ActionHero>
        <ActionBgImage action={action} width={1200} height={600} color={theme.imageOverlay}>
          <OverlayContainer>
            <Container>
              <Row>
                <Col md="10">
                  <ActionListLink>
                    <a>
                      <h4>{ t('actions') }</h4>
                    </a>
                  </ActionListLink>
                  <p>
                    { action.previousAction
                      && (
                        <ActionLink action={action.previousAction}>
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
                        <ActionLink action={action.nextAction}>
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
                  {categories.map((item) => (
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
            && <ActionSection className="text-content" dangerouslySetInnerHTML={{ __html: action.description }} />}
            {cleanOfficialText
            && <OfficialText>
              <h5>{ t('action-description-official') }</h5>
              <strong>{ t('action-as-in-plan') }</strong>
              <div dangerouslySetInnerHTML={{ __html: cleanOfficialText }} />
              {generalContent.officialNameDescription && (
                <small>{`(${generalContent.officialNameDescription})`}</small>
              )}
            </OfficialText>}

            <MergedActionList t={t} theme={theme} actions={mergedActions} />

            { action.statusUpdates.length > 0
            && (
            <SolidSection>
              <Row>
                <Col>
                  <SectionHeader className="mb-5">{ t('action-status-updates') }</SectionHeader>
                </Col>
              </Row>
              <ActionUpdatesList id={action.id} className="mb-5" />
            </SolidSection>
            )}
            <Row>
              <Col>
                <SectionHeader className="mb-5">{ t('action-tasks') }</SectionHeader>
              </Col>
            </Row>
            <Row>
              <Col className="mb-5">
                <ActionSection className="mb-5">
                  <TaskList tasks={action.tasks} />
                </ActionSection>
              </Col>
            </Row>
            <Row>
              <Col>
                <SectionHeader className="mb-5">{ t('indicators') }</SectionHeader>
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
            { emissionScopes.length ? (
              <ActionSection>
                <h5>{ t('emission-scopes') }</h5>
                {emissionScopes.map((item) => (
                  <EmissionScopeIcon key={item.id} category={item} color={theme.brandDark} size="2em" />
                ))}
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
      {action.relatedIndicators && action.relatedIndicators.length > 0 && (
        <div>
          <Container>
            <Row>
              <Col sm="12">
                <SectionHeader className="mb-3">{ t('action-what-effect-this-has') }</SectionHeader>
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
