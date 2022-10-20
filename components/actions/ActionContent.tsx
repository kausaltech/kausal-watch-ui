import React, { Children, useCallback } from 'react';
import {
  Container, Row, Col, Badge,
} from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';

import { getActionLinkProps } from 'common/links';
import dayjs from 'common/dayjs';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { PlanContextType, usePlan } from 'context/plan';
import { cleanActionStatus } from 'common/preprocess';

import { Meta } from 'components/layout';
import images, { getBgImageAlignment, getActionImage } from 'common/images';
import IndicatorCausal from 'components/indicators/IndicatorCausal';
import Timeline from 'components/graphs/Timeline';
import ScheduleTimeline from 'components/graphs/ScheduleTimeline';
import AttributesBlock from 'components/common/AttributesBlock';
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
import type {
  ActionAsideContentBlocksFragmentFragment, ActionMainContentBlocksFragmentFragment,
  GetActionDetailsQuery
} from 'common/__generated__/graphql';
import { useTheme } from 'common/theme';

const GET_ACTION_DETAILS = gql`
query GetActionDetails($plan: ID!, $id: ID!) {
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
      name
      officialName
      plan {
        id
        viewUrl
      }
    }
    categories {
      ...CategoryTagsCategory
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
      ...AttributesBlockAttribute
    }
  }
  plan(id: $plan) {
    actionListPage {
      detailsMainTop {
        ...ActionMainContentBlocksFragment
      }
      detailsMainBottom {
        ...ActionMainContentBlocksFragment
      }
      detailsAside {
        ...ActionAsideContentBlocksFragment
      }
    }
    actionAttributeTypes {
      ...AttributesBlockAttributeType
    }
  }
}
fragment ActionAsideContentBlocksFragment on ActionAsideContentBlock {
  __typename
  ... on StreamFieldInterface {
    id
  }
  ... on ActionContentAttributeTypeBlock {
    attributeType {
      ...AttributesBlockAttributeType
    }
  }
  ... on ActionContentCategoryTypeBlock {
    categoryType {
      ...CategoryTagsCategoryType
    }
  }
}
fragment ActionMainContentBlocksFragment on ActionMainContentBlock {
  __typename
  ... on StreamFieldInterface {
    id
  }
  ... on ActionContentAttributeTypeBlock {
    attributeType {
      ...AttributesBlockAttributeType
    }
  }
  ... on ActionContentCategoryTypeBlock {
    categoryType {
      ...CategoryTagsCategoryType
    }
  }
}

${ActionCard.fragments.action}
${images.fragments.multiUseImage}
${AttributesBlock.fragments.attribute}
${AttributesBlock.fragments.attributeType}
${CategoryTags.fragments.category}
${CategoryTags.fragments.categoryType}
`;

export type ActionContentAction = NonNullable<GetActionDetailsQuery['action']>


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

type MergedActionProps = {
  action: ActionContentAction['mergedActions'][0],
}
function MergedAction({ action }: MergedActionProps) {
  const { identifier, officialName, plan, name } = action;
  const currentPlan = usePlan();
  if (currentPlan.id != plan.id) {
    // TODO: Show the target plan of the merging
  }
  return (
    <MergedActionSection>
      <ActionNumberBadge key={identifier} className="me-1">
        {identifier}
      </ActionNumberBadge>
      {officialName || name}
    </MergedActionSection>
  );
}

type MergedActionListProps = {
  actions: MergedActionProps['action'][],
}

function MergedActionList({ actions }: MergedActionListProps) {
  const { t } = useTranslation();
  const plan = usePlan();

  if (!actions || !actions.length) {
    // render nothing
    return null;
  }

  const mergedActions = actions.map((act) => (
    <MergedAction action={act} key={act.id} />
  ));

  return (
    <ActionSection>
      <h2>{ t('actions:action-merged', getActionTermContext(plan)) }</h2>
      {mergedActions}
    </ActionSection>
  );
}

function getMaxImpact(plan: PlanContextType) {
  const max = plan.actionImpacts.reduce((planMax, item) => {
    const val = parseInt(item.identifier, 10);
    if (!planMax || val > planMax) return val;
    return planMax;
  }, null);
  return max;
}

type SectionIdentifier = 'detailsMainTop' | 'detailsMainBottom' | 'detailsAside';

type ActionContentBlockProps = {
  block: ActionMainContentBlocksFragmentFragment | ActionAsideContentBlocksFragmentFragment,
  action: ActionContentAction,
  section: SectionIdentifier,
}
function ActionContentBlock({ block, action, section }: ActionContentBlockProps) {
  const { t } = useTranslation();
  const plan = usePlan();

  switch (block.__typename) {
    case 'ActionDescriptionBlock':
      if (!action.description) return null;
      return (
        <ActionSection className="text-content">
          <h2 className="visually-hidden">{ t('actions:action-description') }</h2>
          <RichText html={action.description} />
        </ActionSection>
      );
    case 'ActionLeadParagraphBlock':
      if (!action.leadParagraph) return null;
      return (
        <ActionSection className="text-content">
          <strong><RichText html={action.leadParagraph} /></strong>
        </ActionSection>
      )
    case 'ActionOfficialNameBlock':
      const generalContent = plan.generalContent || {};
      const cleanOfficialText = action.officialName?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
      if (!cleanOfficialText) return null;
      return (
        <OfficialText>
          <h2>{ t('actions:action-description-official') }</h2>
          <div className="official-text-content">
            <div dangerouslySetInnerHTML={{ __html: cleanOfficialText }} />
            {generalContent.officialNameDescription && (
              <small>{`(${generalContent.officialNameDescription})`}</small>
            )}
          </div>
        </OfficialText>
      )
    case 'ActionLinksBlock':
      const { links } = action;
      if (!links.length) return null;
      return (
        <>
          <h4>{t('read-more')}</h4>
          <ul>
            {links.map((actionLink) => (
              <li key={actionLink.id}>
                <a href={actionLink.url}>
                  {actionLink.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      );
    case 'ActionMergedActionsBlock':
      if (!action.mergedActions.length) return null;
      return <MergedActionList actions={action.mergedActions} />;
    case 'ActionRelatedActionsBlock':
      break
    case 'ActionRelatedIndicatorsBlock':
      if (!action.relatedIndicators.length) return null;
      return (
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
      )
    case 'ActionTasksBlock':
      if (!action.tasks.length) return null;
      return (
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
      );
    case 'ActionContactPersonsBlock':
      if (!action.contactPersons?.length) return null;
      return (
        <ActionSection>
          <ContactPersons persons={action.contactPersons.map((item) => item.person)} />
        </ActionSection>
      );
    case 'ActionResponsiblePartiesBlock':
      if (!action.responsibleParties.length) return null;
      return (
        <ActionSection>
          <ResponsibleList responsibleParties={action.responsibleParties} />
        </ActionSection>
      );
    case'ActionScheduleBlock':
      return (
        <>
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
        </>
      )
    default:
      console.error("Unknown action content block", block.__typename);
      return null;
  }
  return null;
}

type ActionContentBlockGroupProps = Omit<ActionContentBlockProps, 'block'> & {
  blocks: ActionContentBlockProps['block'][]
};

type ActionContentAttributeTypeBlock = ActionContentBlockProps['block'] & {
  __typename: 'ActionContentAttributeTypeBlock'
}
type ActionContentCategoryTypeBlock = ActionContentBlockProps['block'] & {
  __typename: 'ActionContentCategoryTypeBlock'
}


function ActionContentBlockGroup(props: ActionContentBlockGroupProps) {
  const { blocks, action, section } = props;
  const blockType = blocks[0].__typename;

  if (blockType === 'ActionContentAttributeTypeBlock') {
    const types = new Map(blocks.map(block => {
      const { attributeType } = block as ActionContentAttributeTypeBlock;
      return [attributeType!.id, attributeType!];
    }));

    const attributes = action.attributes.filter(att => types.get(att.type.id));
    if (!attributes.length) return null;
    return (
      <ActionSection>
        <AttributesBlock attributes={attributes} types={Array.from(types.values())} />
      </ActionSection>
    )
  } else if (blockType === 'ActionContentCategoryTypeBlock') {
    const types = new Map(blocks.map(block => {
      const { categoryType } = block as ActionContentCategoryTypeBlock;
      return [categoryType!.id, categoryType!];
    }));
    const categories = (action.categories || []).filter(cat => types.get(cat.type.id));

    if (!categories.length) return null;
    return (
      <ActionSection>
        <CategoryTags categories={categories} types={Array.from(types.values())} />
      </ActionSection>
    )
  } else {
    console.error("Unsupported content block group", blockType);
  }
  return null;
}

type ActionContentProps = {
  action: ActionContentAction,
  extraPlanData: NonNullable<GetActionDetailsQuery['plan']>
}
function ActionContent({ action, extraPlanData }: ActionContentProps) {
  const plan = usePlan();
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  useHotkeys('ctrl+left, ctrl+right', (ev) => {
    if (!action) return;
    const next = (ev.code == 'ArrowLeft' ? action.previousAction : action.nextAction);
    if (!next) {
      return;
    }
    const { href, as } = getActionLinkProps(next.identifier);
    router.push(href, as);
  }, {}, [action, router]);

  const actionListPage = extraPlanData.actionListPage!;

  const updated = dayjs(action.updatedAt).format('L');
  const actionStatus = cleanActionStatus(action, plan.actionStatuses);
  const { emissionScopes } = action;
  const actionImage = getActionImage(plan, action);

  const hasPhases = plan.actionImplementationPhases.length > 0;

  const metaTitle = plan.hideActionIdentifiers
    ? `${t('action', getActionTermContext(plan))}: ${action.name}`
    : `${t('action', getActionTermContext(plan))} ${action.identifier}`;

  const makeComponents = useCallback((section: SectionIdentifier) => {
    const blocks = actionListPage[section];
    if (!blocks) return null;

    let allSections: JSX.Element[] = [];
    let previousSectionBlock: undefined | typeof blocks[0];
    let groupedBlocks: typeof blocks = [];

    const staticProps = {
      action,
      section,
    };

    function emitGroupedBlocks() {
      if (!groupedBlocks.length) return;
      allSections.push(<ActionContentBlockGroup key={groupedBlocks[0].id} blocks={groupedBlocks} {...staticProps} />);
      previousSectionBlock = undefined;
      groupedBlocks = [];
    }

    const groupedBlockTypes = [
      'ActionContentAttributeTypeBlock',
      'ActionContentCategoryTypeBlock',
    ]

    for (const block of blocks) {
      if (previousSectionBlock && block.__typename !== previousSectionBlock.__typename) {
        emitGroupedBlocks();
      }
      // some blocks get special treatment so that they can be grouped together
      if (groupedBlockTypes.includes(block.__typename)) {
        previousSectionBlock = block;
        // @ts-ignore
        groupedBlocks.push(block);
      } else {
        allSections.push(<ActionContentBlock key={block.id} block={block} {...staticProps} />)
      }
    }
    emitGroupedBlocks();
    return allSections;
  }, [actionListPage, action]);

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
                  phases={plan.actionImplementationPhases}
                />
              </ActionSection>
            )}

            <div className="action-main-top">{makeComponents('detailsMainTop')}</div>

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
                { (action.completion ?? 0) > 0
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
            { makeComponents('detailsAside') }
            { emissionScopes?.length ? (
              <ActionSection>
                <SideHeader>{ t('actions:emission-scopes') }</SideHeader>
                {emissionScopes.map((item) => (
                  <EmissionScopeIcon key={item.id} category={item} color={theme.brandDark} size="2em" />
                ))}
              </ActionSection>
            ) : null}
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
ActionContent.query = GET_ACTION_DETAILS;

export default ActionContent;
