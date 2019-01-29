import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImgOverlay, CardBody,
  CardTitle, Progress,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from '../../routes';

import ActionImage from './ActionImage';
import ActionStatus from './ActionStatus';

const StyledCard = styled(Card)`
  width: 100%;
`;

const ActionNumber = styled.div`
  font-size: 4em;
  font-weight: 700;
  line-height: 1;
  color: rgba(255,255,255,0.8);
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: 1.2em;
  text-align: left;
  hyphens: auto;
`;

class ActionCard extends React.Component {

  render() {
    const { action } = this.props;
    let actionName = action.name;
    if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;
    return (
      <StyledCard>
        <Link route="action" params={{ id: action.identifier }} passHref={ true }>
          <a>
            <ActionImage action={action} width={520} height={200} />
            <CardImgOverlay>
              <ActionNumber className="action-number">{action.identifier}</ActionNumber>
            </CardImgOverlay>
            <Progress value={action.completion} color="status" />
          </a>
        </Link>
        <CardBody>
          <Link route="action" params={{ id: action.id }} passHref={ true }>
            <a>
              <StyledCardTitle tag="h5">{actionName}</StyledCardTitle>
              {
                (action.status !== null) && (action.status.identifier === 'late' || action.status.identifier === 'severely_late')
                && <ActionStatus name={action.status.name} identifier={action.status.identifier} />
              }
            </a>
          </Link>
        </CardBody>
      </StyledCard>
    );
  }
}

ActionCard.propTypes = {
  action: PropTypes.object,
};

export default ActionCard;
