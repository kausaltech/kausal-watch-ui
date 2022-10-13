import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Badge,
} from 'reactstrap';
import styled, { ThemeContext } from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';

import { getActionLinkProps } from 'common/links';
import dayjs from 'common/dayjs';
import { getActionTermContext, useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';
import { cleanActionStatus } from 'common/preprocess';

import { Meta } from 'components/layout';
import images, { getBgImageAlignment, getActionImage } from 'common/images';
import IndicatorCausal from 'components/indicators/IndicatorCausal';
import Timeline from 'components/graphs/Timeline';
import ScheduleTimeline from 'components/graphs/ScheduleTimeline';
import AttributesBlock from 'components/common/AttributesBlock';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import RichText from 'components/common/RichText';
import TaskList from './TaskList';
import ResponsibleList from './ResponsibleList';
import CategoryTags from './CategoryTags';
import ContactPersons from './ContactPersons';
import ActionPhase from './ActionPhase';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionIndicators from './ActionIndicators';
import ActionHero from './ActionHero';
import ActionPager from './ActionPager';
import ActionCard from './ActionCard';
import ActionUpdatesList from './ActionUpdatesList';
import EmissionScopeIcon from './EmissionScopeIcon';

const GET_ACTION_DETAILS = gql`
query ActionDetails($plan: ID!, $id: ID!) {
  action(plan: $plan, identifier: $id) {
    id
    identifier
    name
    officialName
    leadParagraph
    description
    completion
    image {
      ...MultiUseImageFragment
    }
    links {
      id
      order
      url
      title
    }
    updatedAt
    mergedActions {
      id
      identifier
      officialName
    }
    categories {
      id
      identifier
      name
      leadParagraph
      helpText
      color
      iconSvgUrl
      iconImage {
        rendition(size:"400x400", crop:false) {
          src
        }
      }
      type {
        id
        identifier
        name
      }
      level {
        id
        name
        namePlural
      }
      image {
        ...MultiUseImageFragment
      }
      categoryPage {
            title
            urlPath
          }
      parent {
        id
        identifier
        name
        image {
          ...MultiUseImageFragment
        }
        color
        iconSvgUrl
        iconImage {
          rendition(size:"400x400", crop:false) {
            src
          }
        }
        categoryPage {
            title
            urlPath
          }
       }
    }
    emissionScopes: categories(categoryType: "emission_scope") {
      id
      identifier
      name
      leadParagraph
    }
    contactPersons {
      id
      person {
        id
        firstName
        lastName
        avatarUrl(size: "150x150")
        title
        organization {
          name
        }
      }
    }
    primaryOrg {
      id
      abbreviation
      name
      logo {
        rendition(size: "128x128", crop: true) {
          src
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
      role
      specifier
    }
    tasks {
      id, name, dueAt, completedAt, comment, state
    }
    status {
      id, identifier, name
    }
    manualStatusReason
    implementationPhase {
      id
      identifier
      name
    }
    schedule {
      id, name, beginsAt, endsAt
    }
    scheduleContinuous
    startDate
    endDate
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
    relatedActions {
      ...ActionCard
    }
    nextAction {
      id
      identifier
    }
    previousAction {
      id
      identifier
    }
    attributes {
      __typename
      id
      key
      keyIdentifier
      ...on AttributeChoice {
        value
        valueIdentifier
        type {
          identifier
          name
        }
      }
      ...on AttributeRichText {
        value
        type {
          identifier
          name
        }
      }
      ...on AttributeNumericValue {
        numericValue: value
        type {
          identifier
          name
          unit {
            name
          }
        }
      }
    }
  }
  plan(id: $plan) {
    actionAttributeTypes {
      __typename
      format
      identifier
      choiceOptions {
        identifier
      }
      showChoiceNames
      hasZeroOption
    }
  }
}
${images.fragments.multiUseImage}
${ActionCard.fragments.action}
`;

const LastUpdated = styled.div`
  margin-bottom: 1em;
  color: ${(props) => props.theme.themeColors.dark};
  font-family: ${(props) => props.theme.fontFamilyContent};
`;

const ActionSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const PrimaryHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const SectionHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizeLg};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const OfficialText = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s300};
  font-family: ${(props) => props.theme.fontFamilyContent};

  .official-text-content {
    color: ${(props) => props.theme.neutralDark};
    padding-left: ${(props) => props.theme.spaces.s100};
    border-left: 4px solid ${(props) => props.theme.neutralLight};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const SolidSection = styled.div`
  padding:  ${(props) => props.theme.spaces.s100} 0;
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const ActionNumberBadge = styled(Badge)`
  font-size: ${(props) => props.theme.fontSizeBase};
  padding: ${(props) => props.theme.spaces.s025};
  border-radius: ${(props) => props.theme.btnBorderRadius};
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
`;

const MergedActionSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const RelatedActionList = styled(Row)`
  padding-left: 0;
`;

const RelatedActionItem = styled(Col)`
  list-style: none;
`;


function MergedAction({ action, theme }) {
  const { identifier, officialName } = action;
  return (
    <MergedActionSection>
      <ActionNumberBadge key={identifier} className="me-1">
        {identifier}
      </ActionNumberBadge>
      {officialName}
    </MergedActionSection>
  );
}

function MergedActionList({ actions, t, theme, plan }) {
  if (!actions || !actions.length) {
    // render nothing
    return null;
  }

  const mergedActions = actions.map((act) => (
    <MergedAction action={act} theme={theme} key={act.id} />
  ));

  return (
    <ActionSection>
      <h2>{ t('actions:action-merged', getActionTermContext(plan)) }</h2>
      {mergedActions}
    </ActionSection>
  );
}

function getMaxImpact(plan) {
  const max = plan.actionImpacts.reduce((planMax, item) => {
    const val = parseInt(item.identifier, 10);
    if (!planMax || val > planMax) return val;
    return planMax;
  }, null);
  return max;
}

function ActionContent({ id }) {
  const plan = useContext(PlanContext);
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const { t } = useTranslation(['common', 'actions']);
  const { loading, error, data } = useQuery(GET_ACTION_DETAILS, {
    variables: {
      id,
      plan: plan.identifier,
    },
  });
  const { action } = data || {};
  const attributeTypes = data?.plan.actionAttributeTypes;

  useHotkeys('ctrl+left, ctrl+right', (ev) => {
    const next = (ev.code == 'ArrowLeft' ? action.previousAction : action.nextAction);
    if (!next) {
      return;
    }
    const { href, as } = getActionLinkProps(next.identifier);
    router.push(href, as);
  }, {}, [action, router]);

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!action) {
    return <ErrorMessage statusCode={404} message={t('action-not-found', getActionTermContext(plan))} />;
  }

  const updated = dayjs(action.updatedAt).format('L');
  const generalContent = plan.generalContent || {};
  const officialName = action.officialName || '';
  const cleanOfficialText = officialName.replace(/(?:\r\n|\r|\n)/g, '<br>');
  const actionStatus = cleanActionStatus(action, plan.actionStatuses);
  const { emissionScopes, mergedActions } = action;
  const actionImage = getActionImage(plan, action);

  const hasPhases = plan.actionImplementationPhases.length > 0;

  const metaTitle = plan.hideActionIdentifiers
    ? `${t('action', getActionTermContext(plan))}: ${action.name}`
    : `${t('action', getActionTermContext(plan))} ${action.identifier}`;

  return (
    <div>
      <Meta
        title={metaTitle}
        shareImageUrl={actionImage?.social?.src}
        description={`${action.name}`}
      />
      <ActionHero
        categories={action.categories}
        previousAction={action.previousAction}
        nextAction={action.nextAction}
        identifier={action.identifier}
        name={action.name}
        imageUrl={actionImage?.large.src}
        imageCredit={action?.image?.imageCredit}
        imageTitle={action?.image?.title}
        altText={action?.image?.altText}
        imageAlign={getBgImageAlignment(actionImage)}
        hideActionIdentifiers={plan.hideActionIdentifiers}
        primaryOrg={action.primaryOrg}
      />
      <Container>

        <Row>
          <Col md="7" lg="8">
            {hasPhases && (
              <ActionSection>
                <PrimaryHeader>{ t('actions:action-progress') }</PrimaryHeader>
                <ActionPhase
                  status={actionStatus}
                  activePhase={action.implementationPhase}
                  reason={action.manualStatusReason}
                  mergedWith={action.mergedWith}
                  phases={plan.actionImplementationPhases}
                />
              </ActionSection>
            )}
            {action.leadParagraph && (
              <ActionSection className="text-content">
                <strong><RichText html={action.leadParagraph} /></strong>
              </ActionSection>
            )}
            {action.description && (
              <ActionSection className="text-content">
                <h2 className="visually-hidden">{ t('actions:action-description') }</h2>
                <RichText html={action.description} />
              </ActionSection>
            )}
            {cleanOfficialText && (
              <OfficialText>
                <h2>{ t('actions:action-description-official') }</h2>
                <div className="official-text-content">
                  <div dangerouslySetInnerHTML={{ __html: cleanOfficialText }} />
                  {generalContent.officialNameDescription && (
                    <small>{`(${generalContent.officialNameDescription})`}</small>
                  )}
                </div>
              </OfficialText>
            )}

            { action.links.length ? (
              <>
                <h4>{t('read-more')}</h4>
                <ul>
                  {action.links.map((actionLink) => (
                    <li key={actionLink.id}>
                      <a href={actionLink.url}>
                        {actionLink.title}
                      </a>
                    </li>
                  ))}
                </ul>

              </>
            ) : ''}
            <MergedActionList t={t} theme={theme} actions={mergedActions} plan={plan} />

            { action.attributes.length > 0 && (
              <ActionSection>
                <AttributesBlock attributes={action.attributes} types={attributeTypes} />
              </ActionSection>
            )}

            { action.statusUpdates.length > 0
            && (
            <SolidSection>
              <Row>
                <Col>
                  <SectionHeader>{ t('actions:action-status-updates') }</SectionHeader>
                </Col>
              </Row>
              <ActionUpdatesList id={action.id} />
            </SolidSection>
            )}
            { action.tasks.length > 0 && (
            <div>
              <Row>
                <Col>
                  <SectionHeader>{ t('actions:action-tasks') }</SectionHeader>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ActionSection>
                    <TaskList tasks={action.tasks} />
                  </ActionSection>
                </Col>
              </Row>
            </div>
            )}
            {action?.relatedIndicators.length > 0 && (
            <div>
              <Row>
                <Col>
                  <SectionHeader>{ t('indicators') }</SectionHeader>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ActionIndicators actionId={action.id} relatedIndicators={action.relatedIndicators} />
                </Col>
              </Row>
            </div>
            )}
          </Col>

          <Col md="5" lg="4">
            <h2 className="visually-hidden">{ t('actions:action-meta-header') }</h2>
            { action.impact
              && (
              <ActionSection>
                <SideHeader>{ t('actions:action-impact') }</SideHeader>
                <ActionImpact
                  name={action.impact.name}
                  identifier={action.impact.identifier}
                  max={getMaxImpact(plan)}
                />
              </ActionSection>
              )}
            { (!hasPhases || action.completion) && (
              <ActionSection>
                <SideHeader>{ t('actions:action-completion-percentage') }</SideHeader>
                { action.completion > 0
                && (
                <strong>
                  {action.completion}
                  %
                  {' '}
                  { t('actions:action-percent-ready') }
                </strong>
                ) }
                <ActionStatus
                  name={actionStatus.name}
                  identifier={actionStatus.identifier}
                  completion={action.completion}
                />
              </ActionSection>
            )}
            { action.schedule.length ? (
              <ActionSection>
                <SideHeader>{ t('actions:action-timeline') }</SideHeader>
                <ScheduleTimeline schedules={action.schedule} allSchedules={plan.actionSchedules} />
              </ActionSection>
            ) : null}
            { action.startDate || action.endDate || action.scheduleContinuous ? (
              <ActionSection>
                <SideHeader>{ t('actions:action-timeline') }</SideHeader>
                <Timeline
                  startDate={action.startDate}
                  endDate={action.endDate}
                  continuous={action.scheduleContinuous}
                />
              </ActionSection>
            ) : null}
            { emissionScopes.length ? (
              <ActionSection>
                <SideHeader>{ t('actions:emission-scopes') }</SideHeader>
                {emissionScopes.map((item) => (
                  <EmissionScopeIcon key={item.id} category={item} color={theme.brandDark} size="2em" />
                ))}
              </ActionSection>
            ) : null}
            { action.responsibleParties.length ? (
              <ActionSection>
                <ResponsibleList responsibleParties={action.responsibleParties} />
              </ActionSection>
            ) : null}
            { action.categories.length ? (
              <ActionSection>
                <CategoryTags data={action.categories} />
              </ActionSection>
            ) : null}
            { action?.contactPersons.length > 0 && (
              <ActionSection>
                <ContactPersons persons={action.contactPersons.map((item) => item.person)} />
              </ActionSection>
            )}
            <ActionSection>
              <LastUpdated>
                { t('actions:action-last-updated') }
                {' '}
                { updated }
              </LastUpdated>
            </ActionSection>
          </Col>
        </Row>
      </Container>
      {action?.relatedActions.length > 0 && (
        <div>
          <Container>
            <Row>
              <Col sm="12">
                <SectionHeader>{ t('actions:related-actions') }</SectionHeader>
              </Col>
            </Row>
            <RelatedActionList tag="ul">
              {action.relatedActions.map((relAction) => (
                <RelatedActionItem
                  tag="li"
                  xs="12"
                  sm="6"
                  lg="4"
                  className="mb-5 d-flex align-items-stretch"
                  style={{ transition: 'all 0.5s ease' }}
                  key={relAction.id}
                >
                  <ActionCard
                    action={relAction}
                    showPlan={true}
                  />
                </RelatedActionItem>
              ))}
            </RelatedActionList>
          </Container>
        </div>
      )}
      {action?.relatedIndicators.length > 0 && (
        <div>
          <Container>
            <Row>
              <Col sm="12">
                <SectionHeader>{ t('actions:action-what-effect-this-has', getActionTermContext(plan)) }</SectionHeader>
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
              nextAction={action.nextAction}
              previousAction={action.previousAction}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
ActionContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActionContent;
