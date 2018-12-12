import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, Badge, Progress } from 'reactstrap';

import { Link } from "gatsby";
import ActionImage from './ActionImage';
import ActionIcon from './ActionIcon';
import styled from 'styled-components';


const ActionNumber = styled.div`
  font-size: 4em;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
`

const ThemeBadge = styled(Badge)`
  white-space: normal !important;
`

const StyledCardTitle = styled(CardTitle)`
  font-size: 1.2em;
  
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
          <Progress value={this.props.progress} />
        </Link>
        <CardBody>
          <Link to={actionSlug} >
          <StyledCardTitle>{this.props.number}: {this.props.name.substring(0,60)}&#8230;</StyledCardTitle>
          
          </Link>    
        </CardBody>
      </Card>
    );
  }
}


export default ActionCard
