'use client';

import React, { useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled, { css } from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';

import { getActionLinkProps } from 'common/links';
import dayjs from 'common/dayjs';
import { getActionTermContext } from 'common/i18n';
import { PlanContextType, usePlan } from 'context/plan';

import { getBgImageAlignment, getActionImage } from 'common/images';
import PopoverTip from 'components/common/PopoverTip';
import IndicatorCausalVisualisation from 'components/indicators/IndicatorCausalVisualisation';
import AttributesBlock from 'components/common/AttributesBlock';
import CategoryTags from './CategoryTags';
import ExpandableFeedbackFormBlock from 'components/contentblocks/ExpandableFeedbackFormBlock';
import ActionStatus from './ActionStatus';
import ActionImpact from './ActionImpact';
import ActionHero from './ActionHero';
import ActionPager from './ActionPager';
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

import {
  ActionStatusSummaryIdentifier,
  type ActionAsideContentBlocksFragmentFragment,
  type ActionMainContentBlocksFragmentFragment,
  type GetActionDetailsQuery,
} from 'common/__generated__/graphql';
import { useTheme } from 'styled-components';
import ActionAttribute from 'components/common/ActionAttribute';
import { PhaseTimeline } from './PhaseTimeline';
import StatusBadge from 'components/common/StatusBadge';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import RestrictedBlockWrapper from './blocks/RestrictedBlockWrapper';
import { ACTION_CONTENT_MAIN_BOTTOM } from '@/constants/containers';
import {
  ActionDependenciesBlock,
  mapActionToDependencyGroups,
} from './blocks/action-dependencies/ActionDependenciesBlock';

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

const PrimaryHeaderInline = styled(PrimaryHeader)`
  margin-bottom: 0;
`;

const SideHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const StyledProgressCard = styled.div`
  background: ${({ theme }) => theme.cardBackground.secondary};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => `${theme.spaces.s200} ${theme.spaces.s100}`};
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const StyledProgressHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

export const SectionHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizeLg};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const SolidSection = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const ContentGroup = styled.div<{ $vertical: boolean }>`
  ${(props) =>
    props.$vertical &&
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

const StyledContentGrid = styled(Container)`
  display: grid;
  grid-gap: var(--bs-gutter-x);
  grid-template-areas:
    'top'
    'aside'
    'bottom';
  align-items: start;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    grid-template-columns: 7fr 5fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'top aside'
      'bottom aside';
  }

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    grid-template-columns: 8fr 4fr;
  }
`;

const StyledMainTop = styled.div`
  grid-area: top;
`;

const StyledAside = styled.div`
  grid-area: aside;
`;

const StyledMainBottom = styled(Col)`
  grid-area: bottom;
  container-type: inline-size;
  container-name: ${ACTION_CONTENT_MAIN_BOTTOM};
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
    case 'ActionDependenciesBlock':
      if (
        !action.dependencyRole ||
        !action.allDependencyRelationships?.length
      ) {
        return null;
      }

      return (
        <ActionDependenciesBlock
          activeActionId={action.id}
          title={block.fieldLabel || undefined}
          helpText={block.fieldHelpText || undefined}
          actionGroups={mapActionToDependencyGroups(
            action,
            plan.actionDependencyRoles
          )}
          showTitle
        />
      );
    case 'ActionDescriptionBlock':
      if (!action.description) return null;
      return (
        <ActionDescriptionBlock
          content={action.description}
          fieldLabel={block.fieldLabel}
        />
      );
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
          heading={block.fieldLabel}
          helpText={block.fieldHelpText}
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
        attributeType.meta = block.meta;
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

function ActionContentProgressContainer({
  action,
}: Pick<ActionContentProps, 'action'>) {
  const plan = usePlan();
  const t = useTranslations();
  const hasReason = !!action.manualStatusReason;
  const isBadgeVisible =
    action.status &&
    action.status.identifier !== ActionStatusSummaryIdentifier.Undefined &&
    !hasReason;

  const commonStatusBadgeProps = {
    action,
    plan,
    statusName: action.mergedWith
      ? t('action-status-merged', getActionTermContext(plan))
      : action.status?.name,
  };

  return (
    <>
      <StyledProgressHeaderContainer>
        <PrimaryHeaderInline>{t('action-progress')}</PrimaryHeaderInline>
        {isBadgeVisible && <StatusBadge {...commonStatusBadgeProps} />}
      </StyledProgressHeaderContainer>

      {!!action.implementationPhase && (
        <StyledProgressCard>
          <PhaseTimeline
            activePhase={action.implementationPhase}
            isContinuous={action.scheduleContinuous}
          />
        </StyledProgressCard>
      )}

      {hasReason && (
        <StatusBadge
          {...commonStatusBadgeProps}
          reason={action.manualStatusReason ?? undefined}
        />
      )}
    </>
  );
}

function ActionContentSectionBlock(props) {
  const { blocks, action, section, heading, helpText, layout } = props;

  return (
    <ContentGroup $vertical={layout !== 'grid'}>
      <h2>
        {heading}
        {helpText && <PopoverTip content={helpText} identifier={section.id} />}
      </h2>
      <Row>
        {blocks.map((block) => (
          <Col md={layout === 'grid' ? 4 : 12} key={block.id} className="mb-3">
            <RestrictedBlockWrapper
              key={block.id}
              isRestricted={block.meta?.restricted}
              isHidden={block.meta?.hidden}
            >
              <ActionContentBlock
                key={block.id}
                block={block}
                action={action}
                section={section}
              />
            </RestrictedBlockWrapper>
          </Col>
        ))}
      </Row>
    </ContentGroup>
  );
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
  const t = useTranslations();

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

  const { emissionScopes } = action;
  const actionImage = getActionImage(plan, action);

  const hasPhases = plan.actionImplementationPhases.length > 0;

  const makeComponents = useCallback(
    (section: SectionIdentifier) => {
      const blocks = actionListPage[section];
      if (!blocks) return null;

      const allSections: JSX.Element[] = [];
      let previousSectionBlock: undefined | (typeof blocks)[0];
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
            <RestrictedBlockWrapper
              key={block.id}
              isRestricted={block.meta?.restricted}
              isHidden={block.meta?.hidden}
            >
              <ActionContentBlock
                key={block.id}
                block={block}
                {...staticProps}
              />
            </RestrictedBlockWrapper>
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
      <ActionHero
        categories={action.categories}
        previousAction={action.previousAction}
        nextAction={action.nextAction}
        identifier={plan.hideActionIdentifiers ? undefined : action.identifier}
        name={action.name}
        imageUrl={actionImage?.large.src}
        imageCredit={actionImage?.imageCredit}
        imageTitle={actionImage?.title}
        altText={actionImage?.altText}
        imageAlign={getBgImageAlignment(actionImage)}
        primaryOrg={action.primaryOrg}
        state={actionState}
      />
      <StyledContentGrid>
        <StyledMainTop>
          {hasPhases && (
            <ActionSection>
              <ActionContentProgressContainer action={action} />
            </ActionSection>
          )}

          <div className="action-main-top">
            {makeComponents('detailsMainTop')}
          </div>

          {action.statusUpdates.length > 0 && (
            <SolidSection>
              <Row>
                <Col>
                  <SectionHeader>{t('action-status-updates')}</SectionHeader>
                </Col>
              </Row>
              <ActionUpdatesList id={action.id} />
            </SolidSection>
          )}
        </StyledMainTop>

        <StyledMainBottom>
          {makeComponents('detailsMainBottom')}
        </StyledMainBottom>

        <StyledAside>
          <h2 className="visually-hidden">{t('action-meta-header')}</h2>

          {action.impact && (
            <ActionSection>
              <SideHeader>{t('action-impact')}</SideHeader>
              <ActionImpact
                name={action.impact.name}
                identifier={action.impact.identifier}
                max={getMaxImpact(plan)}
              />
            </ActionSection>
          )}

          {(!hasPhases || action.completion) && (
            <ActionSection>
              <SideHeader>{t('action-completion-percentage')}</SideHeader>
              {(action.completion ?? 0) > 0 && (
                <strong>
                  {action.completion}% {t('action-percent-ready')}
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
              <SideHeader>{t('emission-scopes')}</SideHeader>
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
              {t('action-last-updated')} {updated}
            </LastUpdated>
          </ActionSection>
        </StyledAside>
      </StyledContentGrid>

      {action?.relatedIndicators.length > 0 && (
        <div>
          <Container>
            <Row>
              <Col sm="12">
                <SectionHeader>
                  {t('action-what-effect-this-has', getActionTermContext(plan))}
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

export default ActionContent;
