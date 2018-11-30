import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, Badge } from 'reactstrap';
import LazyLoad from 'react-lazyload';

import { Link } from "gatsby";
import ActionImage from './ActionImage';
import styled from 'styled-components';


const ActionNumber = styled.div`
  font-size: 5em;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
`

const ThemeBadge = styled(Badge)`
  white-space: normal !important;
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
          <LazyLoad height={200}>
            <ActionImage id={this.props.number} category={this.props.themeId}/>
          </LazyLoad>
          <CardImgOverlay>
            <ActionNumber className="action-number">{this.props.number}</ActionNumber>
          </CardImgOverlay>
        </Link>
        <CardBody>
          <CardTitle>{this.props.name.substring(0,100)}</CardTitle>
          {this.props.themes.map(item => (
            <ThemeBadge key={item.id} color="secondary">{item.name}</ThemeBadge>
          ))}
        </CardBody>
      </Card>
    );
  }
}


export default ActionCard
