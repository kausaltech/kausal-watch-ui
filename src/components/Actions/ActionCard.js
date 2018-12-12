import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, Badge, Progress } from 'reactstrap';

import { Link } from "gatsby";
import ActionImage from './ActionImage';
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
    let progressStatuses = ["not_started", "on_time", "late", "severely_late"];
    let progressVerbose = ["Ei aloitettu", "Etenee ajallaan", "Myöhässä", "Pahasti myöhässä"];
    let progressLottery = Math.floor(Math.random() * Math.floor(4));
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
          <StyledCardTitle>
            {this.props.name.substring(0,60)}&#8230;
          </StyledCardTitle>
          { progressLottery > 1 && 
              <Badge className={`bg-${progressStatuses[progressLottery]}`}>{progressVerbose[progressLottery]}</Badge>
          }
          </Link>    
        </CardBody>
      </Card>
    );
  }
}


export default ActionCard
