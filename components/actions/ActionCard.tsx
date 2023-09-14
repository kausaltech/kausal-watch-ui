import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { gql } from '@apollo/client';

import { cleanActionStatus } from 'common/preprocess';
import {
  getStatusColor,
  getStatusColorForAction,
} from 'common/ActionStatusSummary';
import { ActionLink } from 'common/links';
import { useTheme } from 'common/theme';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { usePlan, PlanContextType } from 'context/plan';
import PlanChip from 'components/plans/PlanChip';
import { ActionCardFragment } from 'common/__generated__/graphql';
import { ContactPersonLeader } from 'stories/actions/ContactPerson.stories';

const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name(hyphenated: true)
    viewUrl
    color
    status {
      id
      identifier
      name
    }
    completion
    categories {
      id
      identifier
      name
      iconSvgUrl
      type {
        id
      }
    }
    statusSummary {
      identifier
    }
    implementationPhase {
      id
      identifier
      name
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
    plan {
      id
      shortName
      versionName
      viewUrl(clientUrl: $clientUrl)
      hideActionIdentifiers
      publishedAt
      image {
        rendition(size: "128x128", crop: true) {
          src
        }
      }
    }
  }
`;

type ActionCardAction = ActionCardFragment;

const StyledActionLink = styled.a`
  text-decoration: none;
  display: flex;
  width: 100%;

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
  fill: white;
`;

const PrimaryImageIcon = styled.div`
  position: absolute;
  right: ${(props) => props.theme.spaces.s050};
  top: ${(props) => props.theme.spaces.s050};
  width: ${(props) => props.theme.spaces.s300};
  height: ${(props) => props.theme.spaces.s300};
  background-image: url(${(props) => props.imagesrc || 'none'});
  background-size: cover;
  background-position: center center;
`;

const SecondaryIcon = styled(SVG)`
  width: ${(props) => props.theme.spaces.s100};
  margin-right: ${(props) => props.theme.spaces.s050};
  fill: ${(props) => props.color};
`;

const SecondaryIconsContainer = styled.div`
  text-align: right;
  padding: 0 ${(props) => props.theme.spaces.s050}
    ${(props) => props.theme.spaces.s050};
`;

const ActionCardElement = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.themeColors.white};
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  box-shadow: 2px 2px 8px
    ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
  transition: all 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px
      ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
  }
`;

const ActionId = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  color: ${(props) => props.theme.themeColors.black};
  background: ${(props) => props.theme.themeColors.white};
`;

const ActionNumber = styled.div`
  margin-left: ${(props) => props.theme.spaces.s050};

  &:after {
    content: '.';
  }
`;

const ActionStatusArea = styled.div<{ statusColor: string }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${(props) => props.theme.themeColors.white};
  background-color: ${(props) => props.statusColor};
  min-height: ${(props) => props.theme.spaces.s400};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ActionPhase = styled.div`
  background-color: ${(props) =>
    props.hasStatus === 'true'
      ? props.theme.themeColors.light
      : props.statusColor};
  color: ${(props) => props.theme.themeColors.dark};
`;

const StatusName = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: 1;

  &:after {
    content: '\\00a0';
  }
`;

const StyledCardTitle = styled.div`
  min-height: calc(1.5rem + 1.2em * 3);
  margin-bottom: 0;
  padding: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  text-align: left;
  word-break: break-word;
  hyphens: manual;
`;

const ActionOrg = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.themeColors.white};
  border-bottom: 1px solid ${(props) => props.theme.themeColors.light};
`;

const ActionOrgAvatar = styled.div`
  margin: ${(props) => props.theme.spaces.s050};
`;

const ActionOrgName = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  color: ${(props) => props.theme.themeColors.dark};
  line-height: 1;
`;

const OrgLogo = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s150};
  height: ${(props) => props.theme.spaces.s150};
`;

const ActionIdentifier = (props) => {
  const { showId, identifier, plan, size } = props;
  if (!showId && !plan) return <div />;

  return (
    <ActionId>
      {plan && (
        <PlanChip
          planImage={plan.image?.rendition?.src}
          planShortName={plan.shortName || plan.name}
          size={size}
        />
      )}
      {showId && <ActionNumber>{identifier}</ActionNumber>}
    </ActionId>
  );
};

const PrimaryIcon = (props) => {
  const { category } = props;
  if (!category) return null;
  if (category.iconSvgUrl) return <PrimarySvgIcon src={category.iconSvgUrl} />;
  if (category.iconImage)
    return <PrimaryImageIcon imagesrc={category.iconImage.rendition.src} />;
  else return null;
};

const SecondaryIcons = (props) => {
  const { actionCategories, secondaryClassificationId } = props;
  const secondaryIcons = actionCategories?.filter(
    (cat) =>
      cat.type.id === secondaryClassificationId && cat.iconSvgUrl !== null
  );

  if (secondaryIcons.length < 1) return undefined;

  return (
    <SecondaryIconsContainer>
      {secondaryIcons.map((cat) => (
        <SecondaryIcon
          color={cat.color ? cat.color : 'black'}
          key={cat.id}
          src={cat.iconSvgUrl}
          preserveAspectRatio="xMinYMid meet"
          alt={cat.name}
        />
      ))}
    </SecondaryIconsContainer>
  );
};

ActionIdentifier.propTypes = {
  showId: PropTypes.bool,
  identifier: PropTypes.string,
  plan: PropTypes.shape({}),
};

type ActionCardProps = {
  action: ActionCardFragment;
  showPlan: boolean;
  size?: string;
};
function ActionCard(props: ActionCardProps) {
  const { action, showPlan, size } = props;

  const plan = usePlan();
  const { t } = useTranslation(['common', 'actions']);
  const theme = useTheme();

  let actionName = action.name;

  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;

  const { mergedWith, implementationPhase, primaryOrg } = action;
  const status = cleanActionStatus(action, plan.actionStatuses);
  let statusText = status.name || null;

  // if Action is set in one of the phases, create message accordingly
  if (implementationPhase) {
    statusText = implementationPhase.name;
    if (status.name) statusText = `${statusText} (${status.name})`;
    // Let's assume if status is completed the phase is irrelevant
    if (status.identifier === 'completed') statusText = status.name;
  }
  const getPlanUrl = (mergedWith, actionPlan, planId) => {
    if (mergedWith && mergedWith?.plan.id !== planId)
      return mergedWith.plan.viewUrl;
    if (actionPlan.id !== planId) return actionPlan.viewUrl;
    return undefined;
  };

  const getMergedName = (mergedWith, planId) => {
    if (mergedWith.plan.id !== planId)
      return `${mergedWith.plan.shortName} ${mergedWith.identifier}`;
    else return mergedWith.identifier;
  };
  const primaryRootCategory = action.primaryCategories
    ? action.primaryCategories[0]
    : null;
  const statusColor = getStatusColorForAction(action, plan, theme);
  return (
    <ActionLink
      action={action}
      viewUrl={action.viewUrl}
      planUrl={getPlanUrl(mergedWith, action.plan, plan.id)}
      crossPlan={action?.plan && action.plan.id !== plan.id}
    >
      <StyledActionLink>
        <ActionCardElement>
          <ActionStatusArea statusColor={statusColor}>
            <PrimaryIcon category={primaryRootCategory} />
            <ActionIdentifier
              showId={!plan.hideActionIdentifiers}
              identifier={action.identifier}
              size={size ?? 'sm'}
              plan={showPlan ? action.plan : null}
            />
          </ActionStatusArea>
          <ActionPhase
            statusColor={statusColor}
            hasStatus={(mergedWith !== null || statusText !== null).toString()}
          >
            {mergedWith ? (
              <StatusName>
                {t('actions:action-status-merged', getActionTermContext(plan))}
                <span> &rarr; </span>
                {getMergedName(mergedWith, plan.id)}
              </StatusName>
            ) : (
              <StatusName>{statusText}</StatusName>
            )}
          </ActionPhase>
          {primaryOrg && (
            <ActionOrg>
              <ActionOrgAvatar>
                <OrgLogo
                  src={
                    primaryOrg?.logo?.rendition?.src ||
                    '/static/themes/default/images/default-avatar-org.png'
                  }
                  alt=""
                />
              </ActionOrgAvatar>
              <ActionOrgName>
                {primaryOrg.abbreviation || primaryOrg.name}
              </ActionOrgName>
            </ActionOrg>
          )}
          <StyledCardTitle className="card-title">{actionName}</StyledCardTitle>
          {plan.secondaryActionClassification && (
            <SecondaryIcons
              actionCategories={action.categories}
              secondaryClassificationId={plan.secondaryActionClassification.id}
            />
          )}
        </ActionCardElement>
      </StyledActionLink>
    </ActionLink>
  );
}

ActionCard.defaultProps = {
  showPlan: false,
};

ActionCard.propTypes = {
  showPlan: PropTypes.bool,
  action: PropTypes.shape({
    identifier: PropTypes.string,
    name: PropTypes.string,
    completion: PropTypes.number,
    iconSvgUrl: PropTypes.string,
    primaryRoot: PropTypes.object,
    status: PropTypes.shape({
      identifier: PropTypes.string,
      name: PropTypes.string,
    }),
    mergedWith: PropTypes.object,
    implementationPhase: PropTypes.shape({
      id: PropTypes.string,
      identifier: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

ActionCard.fragments = {
  action: ACTION_CARD_FRAGMENT,
};

export default ActionCard;
