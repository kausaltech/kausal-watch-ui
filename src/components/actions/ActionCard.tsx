import React, { Suspense, useState } from 'react';

import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import SVG from 'react-inlinesvg';
import { Tooltip } from 'reactstrap';
import styled, { css } from 'styled-components';
import { useTheme } from 'styled-components';

import { getStatusColorForAction } from '@/common/ActionStatusSummary';
import type {
  ActionCardFragment,
  GetActionDetailsQuery,
  PlanContextFragment,
} from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { ActionLink } from '@/common/links';
import { cleanActionStatus } from '@/common/preprocess';
import { getThemeStaticURL } from '@/common/theme';
import PlanChip from '@/components/plans/PlanChip';
import { usePlan } from '@/context/plan';
import { ACTION_CARD_FRAGMENT } from '@/fragments/action-card.fragment';

import Icon from '../common/Icon';
import { ActionDependenciesBlock } from './blocks/action-dependencies/ActionDependenciesBlock';

const StyledActionLink = styled(ActionLink)`
  text-decoration: none;
  display: flex;
  flex: 1 1 auto;

  &:hover {
    text-decoration: none;

    .card-title {
      text-decoration: underline;
    }
  }
`;

const PrimarySvgIcon = styled(SVG)`
  position: absolute;
  right: ${(props) => props.theme.spaces.s050};
  top: ${(props) => props.theme.spaces.s050};
  width: ${(props) => props.theme.spaces.s300};
  fill: white !important;
  path,
  stroke {
    fill: white !important;
  }
`;

const PrimaryImageIcon = styled.div<{ $imagesrc: string }>`
  position: absolute;
  right: ${(props) => props.theme.spaces.s050};
  top: ${(props) => props.theme.spaces.s050};
  width: ${(props) => props.theme.spaces.s300};
  height: ${(props) => props.theme.spaces.s300};
  background-image: url(${(props) => props.$imagesrc || 'none'});
  background-size: cover;
  background-position: center center;
`;

const SecondaryIcon = styled(SVG)<{ $color: string }>`
  width: ${(props) => props.theme.spaces.s100};
  margin-right: ${(props) => props.theme.spaces.s050};
  fill: ${(props) => props.$color};
  path,
  stroke {
    fill: ${(props) => props.$color};
  }
`;

const SecondaryIconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  text-align: right;
  padding: 0 ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s050}`};
`;

type ActionCardElementProps = {
  $isLink: boolean;
  $isHighlighted: boolean;
};

const ActionCardElement = styled.div<ActionCardElementProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.themeColors.white};
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  box-shadow: ${({ $isLink, theme }) =>
    $isLink ? `2px 2px 8px ${transparentize(0.9, theme.themeColors.dark)}` : 'none'};
  transition: all 0.5s ease;

  ${({ $isLink, theme }) =>
    $isLink &&
    css`
      &:hover {
        transform: translateY(-5px);
        box-shadow: 4px 4px 8px ${transparentize(0.8, theme.themeColors.dark)};
      }
    `}

  ${({ $isHighlighted, theme }) =>
    $isHighlighted &&
    css`
      border: 3px solid ${theme.brandDark};
    `}
`;

const ActionPlan = styled.div`
  padding: ${(props) =>
    `${props.theme.spaces.s050} ${props.theme.spaces.s050} ${props.theme.spaces.s050} 0`};
  background: ${(props) => props.theme.themeColors.white};
  border-bottom: 1px solid ${(props) => props.theme.cardBackground.secondary};
`;

const ActionNumber = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  color: ${(props) => props.theme.textColor.primary};
  background: ${(props) => props.theme.themeColors.white};

  &:after {
    content: '.';
  }
`;

const ActionStatusArea = styled.div<{ $statusColor: string | undefined; $isMini: boolean }>`
  color: ${(props) => readableColor(props.$statusColor || props.theme.themeColors.light)};
  background-color: ${(props) => props.$statusColor};
  min-height: ${({ theme, $isMini }) => ($isMini ? theme.spaces.s050 : theme.spaces.s400)};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

type StyledActionPhaseProps = {
  $hasStatus: boolean;
  $statusColor: string;
};

const StyledActionPhase = styled.div<StyledActionPhaseProps>`
  background-color: ${({ $hasStatus, theme, $statusColor }) =>
    $hasStatus ? theme.cardBackground.secondary : $statusColor};
  color: ${(props) => props.theme.textColor.primary};
`;

const StatusName = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: 1;
`;

const StyledCardTitle = styled.div<{ $isSmall: boolean }>`
  min-height: ${({ $isSmall }) => ($isSmall ? '0' : 'calc(1.5rem + 1.2em * 3)')};
  margin-bottom: 0;
  padding: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${({ theme, $isSmall }) => ($isSmall ? theme.fontSizeSm : theme.fontSizeBase)};
  line-height: ${(props) => props.theme.lineHeightMd};
  text-align: left;
  word-break: break-word;
  hyphens: auto;

  :lang(fi) & {
    hyphens: manual;
  }

  :lang(en) & {
    word-break: normal;
    hyphens: none;
`;

const ActionOrg = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.themeColors.white};
  border-bottom: 1px solid ${(props) => props.theme.cardBackground.secondary};
`;

const ActionOrgAvatar = styled.div`
  margin: ${(props) => props.theme.spaces.s050};
`;

const ActionOrgName = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${({ theme }) => `${theme.fontFamilyTiny}, ${theme.fontFamilyFallback}`};
  color: ${(props) => props.theme.textColor.primary};
  line-height: 1;
`;

const OrgLogo = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s150};
  height: ${(props) => props.theme.spaces.s150};
`;

const StyledTooltip = styled(Tooltip)`
  display: block;

  .tooltip {
    --bs-tooltip-bg: #fff;
    --bs-tooltip-opacity: 0.98;
  }

  .tooltip-inner {
    max-width: 300px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledActionDependencyIconWrapper = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.textColor.primary};
  top: 0;
  right: 0;
  margin: ${(props) => props.theme.spaces.s100};
`;

type PrimaryIconProps = {
  category: ActionCardFragment['categories'][number];
};

const PrimaryIcon = (props: PrimaryIconProps) => {
  const { category } = props;
  if (!category) return null;
  if (category.iconSvgUrl) return <PrimarySvgIcon src={category.iconSvgUrl} />;
  if (category.iconImage?.rendition)
    return <PrimaryImageIcon $imagesrc={category.iconImage.rendition.src} />;
  else return null;
};

type SecondaryIconsProps = {
  actionCategories: ActionCardFragment['categories'];
  secondaryClassificationId: string;
};

const SecondaryIcons = (props: SecondaryIconsProps) => {
  const { actionCategories, secondaryClassificationId } = props;
  const secondaryIcons = actionCategories?.filter(
    (cat) => cat.type.id === secondaryClassificationId && cat.iconSvgUrl !== null
  );

  if (secondaryIcons.length < 1) return undefined;

  return (
    <SecondaryIconsContainer>
      {secondaryIcons.map((cat) => (
        <SecondaryIcon
          $color={cat.color ? cat.color : 'black'}
          key={cat.id}
          src={cat.iconSvgUrl!}
          preserveAspectRatio="xMinYMid meet"
          title={cat.name}
        />
      ))}
    </SecondaryIconsContainer>
  );
};

const getDependencyTooltipId = (actionId: string) => `dependency-tooltip-${actionId}`;

type Action = NonNullable<GetActionDetailsQuery['action']>;

type ActionCardProps = {
  action: ActionCardFragment;
  showPlan?: boolean;
  variant?: 'primary' | 'mini' | 'text-only';
  isLink?: boolean;
  isHighlighted?: boolean;
  getFullAction?: (id: string) => Action;
};

function ActionCard({
  action,
  showPlan = false,
  variant = 'primary',
  isLink = true,
  isHighlighted = false,
  getFullAction,
}: ActionCardProps) {
  const plan = usePlan();
  const t = useTranslations();
  const theme = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  if (!action || !action.name) {
    /**
     * action should always be defined but reading action.name.length has been
     * throwing errors in Sentry. Check for an action to avoid uncaught errors.
     */
    captureException('Required prop `action` missing from ActionCard', {
      extra: { action, plan: plan.identifier },
    });

    return null;
  }

  let actionName = action.name;

  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;

  const { mergedWith, implementationPhase, primaryOrg, scheduleContinuous } = action;
  const status = cleanActionStatus(action, plan.actionStatuses);
  let statusText = status.name || null;

  // if Action is set in one of the phases, create message accordingly
  if (implementationPhase) {
    statusText = implementationPhase.name;
    if (status.name) statusText = `${statusText} (${status.name})`;
    // Let's assume if status is completed or continuous the phase is irrelevant
    if (status.identifier === 'completed') {
      if (scheduleContinuous) statusText = t('action-continuous');
      else statusText = status.name;
    }
  }
  const getPlanUrl = (mergedWith, actionPlan, planId) => {
    if (mergedWith && mergedWith?.plan.id !== planId) return mergedWith.plan.viewUrl;
    if (actionPlan.id !== planId) return actionPlan.viewUrl;
    return undefined;
  };

  const getMergedName = (mergedWith, planId) => {
    if (mergedWith.plan.id !== planId)
      return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
    else return mergedWith.identifier;
  };
  const primaryRootCategory = action.primaryCategories ? action.primaryCategories[0] : null;

  function getidentifierPosition(
    showPlan: boolean,
    variant: ActionCardProps['variant'],
    plan: PlanContextFragment
  ) {
    if (plan.hideActionIdentifiers) {
      return 'HIDDEN';
    }

    if (showPlan || variant === 'mini' || variant === 'text-only') {
      return 'WITH_NAME';
    }

    return 'IN_HERO';
  }

  const identifierPosition = getidentifierPosition(showPlan, variant, plan);
  const statusColor: string | undefined = getStatusColorForAction(action, plan, theme);

  const actionCard = (
    <ActionCardElement $isLink={isLink} $isHighlighted={isHighlighted}>
      {variant !== 'text-only' && (
        <>
          <ActionStatusArea $statusColor={statusColor} $isMini={variant === 'mini'}>
            {!theme.settings.hideIconOnActionListCards && variant !== 'mini' && (
              <PrimaryIcon category={primaryRootCategory} />
            )}
            {identifierPosition === 'IN_HERO' && <ActionNumber>{action.identifier}</ActionNumber>}
          </ActionStatusArea>
          <StyledActionPhase
            $statusColor={statusColor}
            $hasStatus={mergedWith !== null || statusText !== null}
          >
            {mergedWith ? (
              <StatusName>
                {t('action-status-merged', getActionTermContext(plan))}
                <span> &rarr; </span>
                {getMergedName(mergedWith, plan.id)}
              </StatusName>
            ) : (
              <StatusName>{statusText}</StatusName>
            )}
          </StyledActionPhase>
        </>
      )}

      {primaryOrg && variant === 'primary' && (
        <ActionOrg>
          <ActionOrgAvatar>
            <OrgLogo
              src={
                primaryOrg?.logo?.rendition?.src || getThemeStaticURL(theme.defaultAvatarOrgImage)
              }
              alt=""
            />
          </ActionOrgAvatar>
          <ActionOrgName>{primaryOrg.abbreviation || primaryOrg.name}</ActionOrgName>
        </ActionOrg>
      )}

      {showPlan && variant === 'primary' && (
        <ActionPlan>
          <PlanChip
            planImage={action.plan.image?.rendition?.src}
            planShortName={action.plan.shortName || action.plan.name}
            size="xs"
          />
        </ActionPlan>
      )}

      <StyledCardTitle className="card-title" $isSmall={variant === 'text-only'}>
        {identifierPosition === 'WITH_NAME' && <strong>{action.identifier}. </strong>}
        {actionName}
      </StyledCardTitle>
      {plan.secondaryActionClassification && (
        <SecondaryIcons
          actionCategories={action.categories}
          secondaryClassificationId={plan.secondaryActionClassification.id}
        />
      )}

      {variant === 'primary' && action.hasDependencyRelationships && (
        <>
          <StyledActionDependencyIconWrapper id={getDependencyTooltipId(action.id)}>
            <Icon.ActionDependency width="24px" height="24px" role="presentation" />
          </StyledActionDependencyIconWrapper>
          <StyledTooltip
            target={getDependencyTooltipId(action.id)}
            role="tooltip"
            autohide={false}
            placement="top"
            id={`tt-content-${getDependencyTooltipId(action.id)}`}
            isOpen={tooltipOpen}
            toggle={toggle}
          >
            <Suspense fallback={<ActionDependenciesBlock loading={true} />}>
              <ActionDependenciesBlock
                action={action}
                size="small"
                activeActionId={action.id}
                getFullAction={getFullAction}
                showTitle
              />
            </Suspense>
          </StyledTooltip>
        </>
      )}
    </ActionCardElement>
  );

  if (!isLink) {
    return actionCard;
  }

  const fromOtherPlan = action.plan.id !== plan.id;
  const mergedWithActionFromOtherPlan = mergedWith != null && mergedWith.plan.id !== plan.id;

  return (
    <StyledActionLink
      action={action}
      viewUrl={action.mergedWith?.viewUrl ?? action.viewUrl}
      planUrl={getPlanUrl(mergedWith, action.plan, plan.id)}
      crossPlan={fromOtherPlan || mergedWithActionFromOtherPlan}
    >
      {actionCard}
    </StyledActionLink>
  );
}

ActionCard.fragments = {
  action: ACTION_CARD_FRAGMENT,
};

export default ActionCard;
