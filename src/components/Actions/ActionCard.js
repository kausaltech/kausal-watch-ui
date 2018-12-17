import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, Badge, Progress } from 'reactstrap';

import { Link } from "gatsby";
import ActionImage from './ActionImage';
import ActionStatus from './ActionStatus';
import styled from 'styled-components';


const ActionNumber = styled.div`
  font-size: 4em;
  font-weight: 700;
  line-height: 1;
  color: rgba(255,255,255,0.8);
`

const StyledCardTitle = styled(CardTitle)`
  font-size: 1.2em;
  text-align: left;
  hyphens: auto;
`

class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let actionSlug = "action/" + this.props.id;

    return (
      <Card>
        <Link to={actionSlug} >
          <ActionImage id={this.props.number} category={this.props.themeId}/>
          <CardImgOverlay>
            <ActionNumber className="action-number">{this.props.number}</ActionNumber>
          </CardImgOverlay>
          <Progress value={this.props.progress} color="status" />
        </Link>
        <CardBody>
          <Link to={actionSlug} >
          
            { this.props.name.length > 120 ?
              <StyledCardTitle>{this.props.name.substring(0,120)}&#8230;</StyledCardTitle>
              :
              <StyledCardTitle>{this.props.name}</StyledCardTitle> }
          
            { (this.props.statusIdentifier == "late" || this.props.statusIdentifier == "severely_late") &&
              <ActionStatus name={this.props.statusName} identifier={this.props.statusIdentifier} />
            }
          </Link>    
        </CardBody>
      </Card>
    );
  }
}


export default ActionCard
