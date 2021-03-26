import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { gql } from '@apollo/client';

import { cleanActionStatus, getStatusColor } from 'common/preprocess';
import { ActionLink } from 'common/links';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import PlanContext from 'context/plan';

const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name(hyphenated: true)
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
    }
    implementationPhase {
      id
      identifier
      name
    }
  }
`;

const StyledActionLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

const CategoryIcon = styled(SVG)`
  position: absolute;
  right: ${(props) => props.theme.spaces.s050};
  top: ${(props) => props.theme.spaces.s050};
  width: ${(props) => props.theme.spaces.s300};
  opacity: .75;
  fill: white;
`;

const ActionCardElement = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.themeColors.white};
  border-color: ${(props) => props.theme.themeColors.light};
  border-style: solid;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  box-shadow: 2px 2px 8px ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
  transition: all 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
  }
`;

const ActionNumber = styled.div`
  align-self: flex-start;
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
  color: ${(props) => props.theme.themeColors.black};
  background: ${(props) => props.theme.themeColors.white};
`;

const ActionStatusArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${(props) => props.theme.themeColors.white};
  background-color: ${(props) => props.statusColor};
  min-height: 100px;
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ActionStatus = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  color: ${(props) => props.theme.themeColors.dark};
`;

const StatusName = styled.div`
  margin: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const StyledCardTitle = styled.div`
  min-height: calc(1.5rem + 1.2em * 3);
  margin-bottom: 0;
  padding: ${(props) => props.theme.spaces.s100};
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  text-align: left;
  word-break: break-word;
  hyphens: auto;
`;

function getMockIconUrl(category) {
  const plan = useContext(PlanContext);
  let iconUrl = null;
  if (plan.identifier === 'liiku') iconUrl = `/static/themes/liiku/images/category-${category}.svg`;
  return iconUrl;
}

function ActionCard(props) {
  const { action } = props;
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['common', 'actions']);
  const theme = useTheme();

  let actionName = action.name;
  // mock category icon Url
  const iconUrl = action.categories.length ? getMockIconUrl(action.categories[0].identifier) : '';

  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;

  const { mergedWith, implementationPhase } = action;
  const status = cleanActionStatus(action, plan.actionStatuses);
  let statusText = status.name;

  // if Action is set in one of the phases, create message accordingly
  if (implementationPhase) {
    statusText = implementationPhase.name;
    if (status.name) statusText = `${statusText} (${status.name})`;
    // Let's assume if status is completed the phase is irrelevant
    if (status.identifier === 'completed') statusText = status.name;
  }

  return (

        <ActionCardElement>
          <ActionStatusArea statusColor={getStatusColor(status.identifier, theme)}>
            { iconUrl && (
              <CategoryIcon
                src={iconUrl}
                preserveAspectRatio="xMinYMid meet"
              />
            )}
            <ActionNumber className="action-number">{action.identifier}</ActionNumber>
            <ActionStatus>
              { mergedWith ? (
                <StatusName>
                  { t('action-status-merged') }
                  <span> &rarr; </span>
                  { mergedWith.identifier }
                </StatusName>
              ) : (
                <StatusName>
                  { statusText }
                </StatusName>
              )}
            </ActionStatus>
          </ActionStatusArea>
          <ActionLink action={action}>
            <StyledActionLink>
              <StyledCardTitle>{actionName}</StyledCardTitle>
            </StyledActionLink>
          </ActionLink>
        </ActionCardElement>
  );
}

ActionCard.defaultProps = {
};

ActionCard.propTypes = {
  action: PropTypes.shape({
    identifier: PropTypes.string,
    name: PropTypes.string,
    completion: PropTypes.number,
    status: PropTypes.shape({
      identifier: PropTypes.string,
      name: PropTypes.string,
    }),
    mergedWith: PropTypes.shape(),
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
