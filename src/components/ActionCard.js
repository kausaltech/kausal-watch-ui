import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, Col, Badge } from 'reactstrap';
import { Link } from "@reach/router";
import ActionImage from './ActionImage';

class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let actionSlug = "action/" + this.props.id;
    return (
      <Col md="4" sm="6" key={this.props.id}>
        <Card className="mb-4">
          <Link to={actionSlug} >
            <ActionImage id={this.props.number} category={this.props.themeId}/>
            <CardImgOverlay>
              <h3>{this.props.number}</h3>
            </CardImgOverlay>
          </Link>
          <CardBody>
            <CardTitle>{this.props.name.substring(0,100)}</CardTitle>
            <Badge color="secondary">{this.props.theme}</Badge>
          </CardBody>
        </Card>
      </Col>
    );
  }
}


export default ActionCard
