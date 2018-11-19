import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, CardSubtitle, Col } from 'reactstrap';
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
          <ActionImage id={this.props.id} />
          <CardImgOverlay>
            <Link to={actionSlug} ><h3>{this.props.id}</h3></Link>
          </CardImgOverlay>
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>Theme {this.props.theme}</CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    );
  }
}


export default ActionCard
