import React, { Children, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled, { css } from 'styled-components';
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
import PopoverTip from 'components/common/PopoverTip';
import IndicatorCausalVisualisation from 'components/indicators/IndicatorCausalVisualisation';
import AttributesBlock from 'components/common/AttributesBlock';
import CategoryTags from './CategoryTags';
import ExpandableFeedbackFormBlock from 'components/contentblocks/ExpandableFeedbackFormBlock';
import ActionPhase from './ActionPhase';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionHero from './ActionHero';
import ActionPager from './ActionPager';
import ActionCard from './ActionCard';
import ActionUpdatesList from './ActionUpdatesList';
import ActionVersionHistory from 'components/versioning/ActionVersionHistory';
import EmissionScopeIcon from './EmissionScopeIcon';

import ActionMergedActionsBlock from 'components/actions/blocks/ActionMergedActionsBlock';
import ActionDescriptionBlock from 'components/actions/blocks/ActionDescriptionBlock';
import ActionLeadParagraphBlock from 'components/actions/blocks/ActionLeadParagraphBlock';
import ActionOfficialNameBlock from 'components/actions/blocks/ActionOfficialNameBlock';
import ActionLinksBlock from 'components/actions/blocks/ActionLinksBlock';
import ActionRelatedActionsBlock from 'components/actions/blocks/ActionRelatedActionsBlock';
import ActionRelatedIndicatorsBlock from 'components/actions/blocks/ActionRelatedIndicatorsBlock';
import ActionTasksBlock from 'components/actions/blocks/ActionTasksBlock';
import ActionContactPersonsBlock from 'components/actions/blocks/ActionContactPersonsBlock';
import ActionResponsiblePartiesBlock from 'components/actions/blocks/ActionResponsiblePartiesBlock';
import ActionScheduleBlock from 'components/actions/blocks/ActionScheduleBlock';
import ReportComparisonBlock from 'components/actions/blocks/ReportComparisonBlock';

import type {
  ActionAsideContentBlocksFragmentFragment,
  ActionMainContentBlocksFragmentFragment,
  GetActionDetailsQuery,
} from 'common/__generated__/graphql';
import { useTheme } from 'common/theme';
import { getStatusSummary } from 'common/ActionStatusSummary';
import ActionAttribute from 'components/common/ActionAttribute';

const GET_ACTION_DETAILS = gql`
  query GetActionDetails($plan: ID!, $id: ID!, $clientUrl: String!) {
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
      color
      statusSummary {
        identifier
        label
        color
        sentiment
        isCompleted
        isActive
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
          viewUrl(clientUrl: $clientUrl)
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
          email
        }
        role
        specifier
      }
      tasks {
        id
        name
        dueAt
        completedAt
        comment
        state
      }
      status {
        id
        identifier
        name
      }
      manualStatusReason
      implementationPhase {
        id
        identifier
        name
      }
      schedule {
        id
        name
        beginsAt
        endsAt
      }
      scheduleContinuous
      startDate
      endDate
      impact {
        id
        identifier
        name
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
          plans {
            id
          }
        }
      }
      relatedActions {
        ...ActionCard
      }
      mergedWith {
        id
        identifier
        plan {
          id
          shortName
          versionName
          viewUrl(clientUrl: $clientUrl)
        }
      }
      supersededBy {
        ...ActionCard
      }
      supersededActions {
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
      plan {
        id
        shortName
        versionName
        viewUrl(clientUrl: $clientUrl)
        hideActionIdentifiers
        image {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
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
    ... on ActionResponsiblePartiesBlock {
      heading
    }
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
    ... on ActionOfficialNameBlock {
      fieldLabel
      caption
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
    ... on ReportComparisonBlock {
      ...ReportComparisonBlockActionContent
    }
    ... on ActionContentSectionBlock {
      id
      heading
      helpText
      layout
      blocks {
        ... on StreamFieldInterface {
          id
        }
        ... on ActionOfficialNameBlock {
          fieldLabel
          caption
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
        ... on ReportComparisonBlock {
          ...ReportComparisonBlockActionContent
        }
      }
    }
  }
  fragment ReportComparisonBlockActionContent on ReportComparisonBlock {
    reportField
    reportType {
      name
    }
    reportsToCompare {
      identifier
      name
      startDate
      endDate
      valuesForAction(actionIdentifier: $id) {
        field {
          __typename
          ... on StreamFieldInterface {
            id
          }
        }
        ... on ActionAttributeReportValue {
          attribute {
            ...AttributesBlockAttribute
          }
        }
      }
    }
  }

  ${ActionCard.fragments.action}
  ${images.fragments.multiUseImage}
  ${ActionAttribute.fragments.attribute}
  ${ActionAttribute.fragments.attributeType}
  ${CategoryTags.fragments.category}
  ${CategoryTags.fragments.categoryType}
`;

export type ActionContentAction = NonNullable<GetActionDetailsQuery['action']>;

const LastUpdated = styled.div`
  margin-bottom: 1em;
  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeBase};
`;

export const ActionSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const PrimaryHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

export const SectionHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizeLg};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const SolidSection = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const ContentGroup = styled.div<{ vertical: boolean }>`
  ${(props) =>
    props.vertical &&
    css`
      max-width: ${(props) => props.theme.breakpointSm};
    `}
  margin: ${(props) => props.theme.spaces.s100} auto ${(props) =>
    props.theme.spaces.s300};
  padding: ${(props) => props.theme.spaces.s200} 0 0;
  border-top: 1px solid ${(props) => props.theme.graphColors.grey040};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey040};
  text-align: left;

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

function getMaxImpact(plan: PlanContextType) {
  const max = plan.actionImpacts.reduce((planMax, item) => {
    const val = parseInt(item.identifier, 10);
    if (!planMax || val > planMax) return val;
    return planMax;
  }, null);
  return max;
}

type SectionIdentifier =
  | 'detailsMainTop'
  | 'detailsMainBottom'
  | 'detailsAside';

type ActionContentBlockProps = {
  block:
    | ActionMainContentBlocksFragmentFragment
    | ActionAsideContentBlocksFragmentFragment;
  action: ActionContentAction;
  section: SectionIdentifier;
};
function ActionContentBlock(props: ActionContentBlockProps) {
  const { block, action, section } = props;
  const plan = usePlan();

  switch (block.__typename) {
    case 'ActionDescriptionBlock':
      if (!action.description) return null;
      return <ActionDescriptionBlock content={action.description} />;
    case 'ActionLeadParagraphBlock':
      if (!action.leadParagraph) return null;
      return <ActionLeadParagraphBlock content={action.leadParagraph} />;
    case 'ActionOfficialNameBlock':
      return (
        <ActionOfficialNameBlock plan={plan} block={block} action={action} />
      );
    case 'ActionLinksBlock':
      const { links } = action;
      if (!links.length) return null;
      return <ActionLinksBlock links={links} />;
    case 'ActionMergedActionsBlock':
      if (!action.mergedActions.length) return null;
      return <ActionMergedActionsBlock actions={action.mergedActions} />;
    case 'ActionRelatedActionsBlock':
      if (!action.relatedActions.length) return null;
      return (
        <ActionRelatedActionsBlock
          plan={plan}
          relatedActions={action.relatedActions}
        />
      );
    case 'ActionRelatedIndicatorsBlock':
      if (!action.relatedIndicators.length) return null;
      return (
        <ActionRelatedIndicatorsBlock
          actionId={action.id}
          indicators={action.relatedIndicators}
        />
      );
    case 'ActionTasksBlock':
      if (!action.tasks.length) return null;
      return <ActionTasksBlock tasks={action.tasks} />;
    case 'ActionContactPersonsBlock':
      if (!action.contactPersons?.length) return null;
      return (
        <ActionContactPersonsBlock contactPersons={action.contactPersons} />
      );
    case 'ActionResponsiblePartiesBlock':
      if (!action.responsibleParties.length) return null;
      return (
        <ActionResponsiblePartiesBlock
          block={block}
          responsibleParties={action.responsibleParties}
        />
      );
    case 'ActionScheduleBlock':
      return <ActionScheduleBlock action={action} plan={plan} />;
    case 'ActionContentSectionBlock':
      const { heading, helpText, layout, blocks } = block;
      return (
        <ActionContentSectionBlock
          blocks={blocks}
          action={action}
          section={section}
          heading={heading}
          layout={layout}
          helpText={helpText}
        />
      );
    case 'ActionContactFormBlock': {
      return <ExpandableFeedbackFormBlock {...block} action={action} />;
    }
    case 'ActionContentCategoryTypeBlock': {
      const categories = action.categories.filter(
        (cat) => cat.type.id === block.categoryType.id
      );
      return (
        <CategoryTags categories={categories} types={[block.categoryType]} />
      );
    }
    case 'ActionContentAttributeTypeBlock': {
      const attribute = action.attributes.find(
        (attr) => attr.type.id === block.attributeType.id
      );
      if (!attribute) return null;
      return (
        <ActionAttribute
          attribute={attribute}
          attributeType={block.attributeType}
        />
      );
    }
    case 'ReportComparisonBlock':
      return (
        <ReportComparisonBlock plan={plan} block={block} action={action} />
      );
    default:
      console.error('Unknown action content block', block.__typename);
      return null;
  }
  return null;
}

type ActionContentBlockGroupProps = Omit<ActionContentBlockProps, 'block'> & {
  blocks: ActionContentBlockProps['block'][];
};

type ActionContentAttributeTypeBlock = ActionContentBlockProps['block'] & {
  __typename: 'ActionContentAttributeTypeBlock';
};
type ActionContentCategoryTypeBlock = ActionContentBlockProps['block'] & {
  __typename: 'ActionContentCategoryTypeBlock';
};

function ActionContentBlockGroup(props: ActionContentBlockGroupProps) {
  const { blocks, action, section } = props;
  const blockType = blocks[0].__typename;

  if (blockType === 'ActionContentAttributeTypeBlock') {
    const types = new Map(
      blocks.map((block) => {
        const { attributeType } = block as ActionContentAttributeTypeBlock;
        return [attributeType!.id, attributeType!];
      })
    );

    // Render attributes in the order specified by blocks; action.attributes may have different order
    const attributesByType = new Map(
      action.attributes.map((att) => [att.type.id, att])
    );
    const attributes: typeof action.attributes = [];
    for (const block of blocks) {
      const typeId = (block as ActionContentAttributeTypeBlock).attributeType
        .id;
      const attribute = attributesByType.get(typeId);
      if (attribute != null) {
        attributes.push(attribute);
      }
    }
    if (!attributes.length) return null;
    return (
      <ActionSection>
        <AttributesBlock
          attributes={attributes}
          types={Array.from(types.values())}
          vertical={section === 'detailsAside'}
        />
      </ActionSection>
    );
  } else if (blockType === 'ActionContentCategoryTypeBlock') {
    const types = new Map(
      blocks.map((block) => {
        const { categoryType } = block as ActionContentCategoryTypeBlock;
        return [categoryType!.id, categoryType!];
      })
    );
    const categories = (action.categories || []).filter((cat) =>
      types.get(cat.type.id)
    );

    if (!categories.length) return null;
    return (
      <ActionSection>
        <CategoryTags
          categories={categories}
          types={Array.from(types.values())}
        />
      </ActionSection>
    );
  } else {
    console.error('Unsupported content block group', blockType);
  }
  return null;
}

function ActionContentSectionBlock(props) {
  const { blocks, action, section, heading, helpText, layout } = props;

  return (
    <ContentGroup vertical={layout !== 'grid'}>
      <h2>
        {heading}
        {helpText && <PopoverTip content={helpText} identifier={section.id} />}
      </h2>
      <Row>
        {blocks.map((block) => (
          <Col md={layout === 'grid' ? 4 : 12} key={block.id} className="mb-3">
            <ActionContentBlock
              key={block.id}
              block={block}
              action={action}
              section={section}
            />
          </Col>
        ))}
      </Row>
    </ContentGroup>
  );
  // console.error("Unsupported content block group", blockType);
  return null;
}

type ActionContentProps = {
  action: ActionContentAction;
  extraPlanData: NonNullable<GetActionDetailsQuery['plan']>;
};
function ActionContent(props: ActionContentProps) {
  const { action, extraPlanData } = props;
  const plan = usePlan();
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  useHotkeys(
    'ctrl+left, ctrl+right',
    (ev) => {
      if (!action) return;
      const next =
        ev.code == 'ArrowLeft' ? action.previousAction : action.nextAction;
      if (!next) {
        return;
      }
      const { href, as } = getActionLinkProps(next.identifier);
      router.push(href, as);
    },
    {},
    [action, router]
  );

  const actionListPage = extraPlanData.actionListPage!;

  const updated = dayjs(action.updatedAt).format('L');

  const actionState = 'live';
  // TODO: plug in action state from backend here. "draft" would display a banner

  const actionStatus = cleanActionStatus(action, plan.actionStatuses);
  const { emissionScopes } = action;
  const actionImage = getActionImage(plan, action);

  const hasPhases = plan.actionImplementationPhases.length > 0;

  const metaTitle = plan.hideActionIdentifiers
    ? `${t('action', getActionTermContext(plan))}: ${action.name}`
    : `${t('action', getActionTermContext(plan))} ${action.identifier}`;

  const makeComponents = useCallback(
    (section: SectionIdentifier) => {
      const blocks = actionListPage[section];
      if (!blocks) return null;

      const allSections: JSX.Element[] = [];
      let previousSectionBlock: undefined | typeof blocks[0];
      let groupedBlocks: typeof blocks = [];

      const staticProps = {
        action,
        section,
      };

      function emitGroupedBlocks() {
        if (!groupedBlocks.length) return;
        allSections.push(
          <ActionContentBlockGroup
            key={groupedBlocks[0].id}
            blocks={groupedBlocks}
            {...staticProps}
          />
        );
        previousSectionBlock = undefined;
        groupedBlocks = [];
      }

      const automaticallyGroupedBlockTypes = [
        'ActionContentAttributeTypeBlock',
        'ActionContentCategoryTypeBlock',
      ];

      const groupableBlockTypes = [
        'ActionContentAttributeTypeBlock',
        'ActionContentCategoryTypeBlock',
        'ActionOfficialNameBlock',
        'ActionLeadParagraphBlock',
        'ActionDescriptionBlock',
        'ActionLinksBlock',
        'ActionTasksBlock',
        'ActionMergedActionsBlock',
        'ActionRelatedActionsBlock',
        'ActionIndicatorsBlock',
      ];

      for (const block of blocks) {
        if (
          previousSectionBlock &&
          block.__typename !== previousSectionBlock.__typename
        ) {
          emitGroupedBlocks();
        }
        // some blocks get special treatment so that they can be grouped together
        if (automaticallyGroupedBlockTypes.includes(block.__typename)) {
          previousSectionBlock = block;
          // @ts-ignore
          groupedBlocks.push(block);
        } else {
          allSections.push(
            <ActionContentBlock key={block.id} block={block} {...staticProps} />
          );
        }
      }
      emitGroupedBlocks();
      return allSections;
    },
    [actionListPage, action]
  );

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
        imageCredit={actionImage?.imageCredit}
        imageTitle={actionImage?.title}
        altText={actionImage?.altText}
        imageAlign={getBgImageAlignment(actionImage)}
        hideActionIdentifiers={plan.hideActionIdentifiers}
        primaryOrg={action.primaryOrg}
        state={actionState}
      />
      <Container>
        <Row>
          <Col md="7" lg="8">
            {hasPhases && (
              <ActionSection>
                <PrimaryHeader>{t('actions:action-progress')}</PrimaryHeader>
                <ActionPhase
                  action={action}
                  status={getStatusSummary(plan, action.statusSummary)}
                  activePhase={action.implementationPhase}
                  reason={action.manualStatusReason}
                  phases={plan.actionImplementationPhases}
                />
              </ActionSection>
            )}

            <div className="action-main-top">
              {makeComponents('detailsMainTop')}
            </div>

            {action.statusUpdates.length > 0 && (
              <SolidSection>
                <Row>
                  <Col>
                    <SectionHeader>
                      {t('actions:action-status-updates')}
                    </SectionHeader>
                  </Col>
                </Row>
                <ActionUpdatesList id={action.id} />
              </SolidSection>
            )}
          </Col>

          <Col md="5" lg="4">
            <h2 className="visually-hidden">
              {t('actions:action-meta-header')}
            </h2>
            {action.impact && (
              <ActionSection>
                <SideHeader>{t('actions:action-impact')}</SideHeader>
                <ActionImpact
                  name={action.impact.name}
                  identifier={action.impact.identifier}
                  max={getMaxImpact(plan)}
                />
              </ActionSection>
            )}
            {(!hasPhases || action.completion) && (
              <ActionSection>
                <SideHeader>
                  {t('actions:action-completion-percentage')}
                </SideHeader>
                {(action.completion ?? 0) > 0 && (
                  <strong>
                    {action.completion}% {t('actions:action-percent-ready')}
                  </strong>
                )}
                <ActionStatus
                  plan={plan}
                  statusSummary={action.statusSummary}
                  completion={action.completion}
                />
              </ActionSection>
            )}
            {makeComponents('detailsAside')}
            {emissionScopes?.length ? (
              <ActionSection>
                <SideHeader>{t('actions:emission-scopes')}</SideHeader>
                {emissionScopes.map((item) => (
                  <EmissionScopeIcon
                    key={item.id}
                    category={item}
                    color={theme.brandDark}
                    size="2em"
                  />
                ))}
              </ActionSection>
            ) : null}
            {(action.supersededBy || action.supersededActions.length > 0) && (
              <ActionSection>
                <ActionVersionHistory action={action} />
              </ActionSection>
            )}
            <ActionSection>
              <LastUpdated>
                {t('actions:action-last-updated')} {updated}
              </LastUpdated>
            </ActionSection>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md="7" lg="8">
            {makeComponents('detailsMainBottom')}
          </Col>
        </Row>
      </Container>
      {action?.relatedIndicators.length > 0 && (
        <div>
          <Container>
            <Row>
              <Col sm="12">
                <SectionHeader>
                  {t(
                    'actions:action-what-effect-this-has',
                    getActionTermContext(plan)
                  )}
                </SectionHeader>
              </Col>
            </Row>
          </Container>
          <IndicatorCausalVisualisation actionId={action.id} />
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
