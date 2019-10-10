import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImgOverlay, CardBody,
  CardTitle, Badge,
} from 'reactstrap';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { ActionLink } from '../../common/links';
import Icon from '../common/Icon';
import ActionImage from './ActionImage';
import ActionStatus from './ActionStatus';

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

const StyledCard = styled(Card)`
  width: 100%;
`;

const ActionNumber = styled.div`
  font-size: 4em;
  font-weight: 700;
  line-height: 1;
  color: rgba(255,255,255,0.8);
`;

const ReadyBadge = styled(Badge)`
  position: absolute;
  top: 1em;
  left: 1em;
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: 1.2em;
  text-align: left;
  hyphens: auto;
`;

function ActionCard(props) {
  const { action } = props;
  let actionName = action.name;
  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;
  return (
    <StyledCard>
      <ActionLink id={action.identifier}>
        <a>
          <ActionImage action={action} width={520} height={200} />
          <CardImgOverlay>
            <ActionNumber className="action-number">{action.identifier}</ActionNumber>
          </CardImgOverlay>
        </a>
      </ActionLink>
      {action.status && (
        <ActionStatus
          name={action.status.name}
          identifier={action.status.identifier}
          completion={action.completion}
        />
      )}
      <CardBody>
        { action.status && action.status.identifier === "completed"
          && (
            <ReadyBadge color="success" pill>
              <Icon name="check" color="#fff" width="2em" height="2em" />
            </ReadyBadge>
          )
        }
        <ActionLink id={action.identifier}>
          <a>
            <StyledCardTitle tag="h5">{actionName}</StyledCardTitle>
          </a>
        </ActionLink>
      </CardBody>
    </StyledCard>
  );
}

ActionCard.propTypes = {
  action: PropTypes.object,
};

ActionCard.fragments = {
  action: ACTION_CARD_FRAGMENT,
};

export default ActionCard;
