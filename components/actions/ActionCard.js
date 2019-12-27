import React from 'react';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';
import {
  Progress,
} from 'reactstrap';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { ActionLink } from '../../common/links';
import { withTranslation } from '../../common/i18n';

const ACTION_CARD_FRAGMENT = gql`
  fragment ActionCard on Action {
    id
    identifier
    name
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

const ActionCardElement = styled.div`
  background: #ffffff;
  height: 100%;
  box-shadow: 2px 2px 8px rgba(82,90,101,0.1);
  transition: all 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px rgba(82,90,101,0.5);
  }
`;

const StretchLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const ActionNumber = styled.div`
  align-self: flex-start;
  padding: .5rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  color: #000000;
  background: #ffffff;
`;

const ActionStatusArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${(props) => props.theme.themeColors.black};
  background-color: ${(props) => props.theme.themeColors.success};
  min-height: 100px;

  &.bg-not_started {
    background-color: ${(props) => props.theme.themeColors.light};
  }

  &.bg-merged {
    background-color: ${(props) => props.theme.themeColors.light};
  }

  &.bg-completed {
    background-color:  ${(props) => darken(0.15, props.theme.themeColors.success)};
    color: ${(props) => props.theme.themeColors.white};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.themeColors.success)};
    }
  }

  &.bg-on_time {
    background-color:  ${(props) => lighten(0.10, props.theme.themeColors.success)};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.themeColors.success)};
    }
  }

  &.bg-late {
    background-color:  ${(props) => lighten(0.10, props.theme.themeColors.warning)};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.themeColors.warning)};
    }
  }

  &.bg-severely_late {
    background-color:  ${(props) => lighten(0.15, props.theme.themeColors.danger)};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.themeColors.danger)};
    }
  }
`;

const ActionStatus = styled.div`
`;

const StatusName = styled.div`
  margin-left: .5rem;
  font-size: 1rem;
  font-weight: 600
`;

const StatusProgress = styled(Progress)`
  height: .5em;
  background-color: transparent;

`;

const StyledCardTitle = styled.div`
  min-height: 4.8rem;
  margin-bottom: 0;
  padding: .5rem;
  color: #000000;
  background: #ffffff;
  font-size: 1rem;
  line-height: 1.2;
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
      <StretchLink>
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
      </StretchLink>
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
  }).isRequired,
  t: PropTypes.func.isRequired,
};

ActionCard.fragments = {
  action: ACTION_CARD_FRAGMENT,
};

export default withTranslation('common')(ActionCard);
