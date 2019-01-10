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
  constructor(props) {
    super(props);
  }

  render() {
    const action = this.props.action;
    let actionName = action.name;

    if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;

    return (
      <Card>
        <Link route="action" params={{ id: action.identifier }}>
          <a>
            <ActionImage id={action.identifier} category={this.root_category} />
            <CardImgOverlay>
              <ActionNumber className="action-number">{action.identifier}</ActionNumber>
            </CardImgOverlay>
            <Progress value={action.completion} color="status" />
          </a>
        </Link>
        <CardBody>
          <Link route="action" params={{ id: action.id }}>
            <a>
              <StyledCardTitle>{actionName}</StyledCardTitle>
              { (action.status.identifier !== 'late' || action.status.identifier === 'severely_late')
                && <ActionStatus name={action.status.name} identifier={action.status.identifier} />
              }
            </a>
          </Link>
        </CardBody>
      </Card>
    );
  }
}
ActionCard.propTypes = {
  action: PropTypes.object,
};


export default ActionCard;
