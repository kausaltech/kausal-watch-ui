import React from 'react';
import PropTypes from 'prop-types';
import { darken, transparentize } from 'polished';
import {
  Progress,
} from 'reactstrap';
import styled from 'styled-components';
import { gql } from '@apollo/client';

import { ActionLink } from '../../common/links';
import { withTranslation } from '../../common/i18n';

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
      imageUrl
    }
    status {
      id
      identifier
      name
    }
  }
`;

const StyledActionLink = styled.a`
  text-decoration: none;
  display: flex;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`;

const ActionCardElement = styled.div`
  width: 100%;
  background: ${(props) => props.theme.themeColors.white};
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  overflow: hidden;
  box-shadow: 2px 2px 8px rgba(82,90,101,0.1);
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
  color: ${(props) => props.theme.themeColors.black};
  background-color: ${(props) => props.theme.themeColors.success};
  min-height: 100px;
  line-height: ${(props) => props.theme.lineHeightSm};

  .progress-bar {
      background-color: ${(props) => transparentize(0.5, props.theme.themeColors.dark)};
    }

  &.bg-not_started {
    background-color: ${(props) => props.theme.actionNotStartedColor};
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.actionOnTimeColor};
    .progress-bar {
      background-color: ${(props) => darken(0.25, props.theme.actionOnTimeColor)};
    }
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.actionCompletedColor};
    .progress-bar {
      background-color: ${(props) => darken(0.25, props.theme.actionCompletedColor)};
    }
  }

  &.bg-late {
    background-color: ${(props) => props.theme.actionLateColor};
    .progress-bar {
      background-color: ${(props) => darken(0.25, props.theme.actionLateColor)};
    }
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
    .progress-bar {
      background-color: ${(props) => darken(0.25, props.theme.actionSeverelyLateColor)};
    }
  }

  &.bg-merged {
    color: ${(props) => props.theme.themeColors.dark};
    background-color: ${(props) => props.theme.actionMergedColor};

    .action-number {
      background-color: ${(props) => props.theme.actionMergedColor};
    }
  }
`;

const ActionStatus = styled.div`
`;

const StatusName = styled.div`
  margin: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const StatusProgress = styled(Progress)`
  height: ${(props) => props.theme.spaces.s050};
  background-color: transparent;

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

function ActionCard(props) {
  const { action, t } = props;
  let actionName = action.name;
  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;

  const { mergedWith, status } = action;

  // Use different styling for merged action
  const bgClass = mergedWith === null ? `bg-${status.identifier}` : 'bg-merged';
  const statusName = mergedWith === null ? status.name : `${t('action-status-merged')} ${mergedWith.identifier}`;

  return (
    <ActionLink action={action}>
      <StyledActionLink>
        <ActionCardElement>
          <ActionStatusArea className={bgClass}>
            <ActionNumber className="action-number">{action.identifier}</ActionNumber>
            <ActionStatus>
              <StatusName>{statusName}</StatusName>
              <StatusProgress
                value={action.completion}
                className={bgClass}
              />
            </ActionStatus>
          </ActionStatusArea>
          <StyledCardTitle>{actionName}</StyledCardTitle>
        </ActionCardElement>
      </StyledActionLink>
    </ActionLink>
  );
}

ActionCard.propTypes = {
  action: PropTypes.shape({
    identifier: PropTypes.string,
    name: PropTypes.string,
    completion: PropTypes.number,
    status: PropTypes.shape({
      identifier: PropTypes.string,
      name: PropTypes.string,
    }),
    mergedWith: PropTypes.object,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

ActionCard.fragments = {
  action: ACTION_CARD_FRAGMENT,
};

export default withTranslation('common')(ActionCard);
