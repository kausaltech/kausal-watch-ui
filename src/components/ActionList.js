import React from 'react'
import { Card, CardImgOverlay, CardBody,
  CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

import ActionImage from './ActionImage';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isLoaded: false,
      error: false
    };
  }

  render() {
    if (this.props.error) {
      return <div>Error: {this.props.error.message}</div>;
    } else if (!this.props.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Row>
          {this.props.data.map(item => (
            <Col md="4" sm="6" key={item.id}>
              <Card className="mb-4">
                <ActionImage id={item.id} />
                <CardImgOverlay>
                  <h3>{item.id}</h3>
                </CardImgOverlay>
                <CardBody>
                  <CardTitle>{item.attributes.name}</CardTitle>
                  <CardSubtitle>Theme {item.relationships.categories.data.id}</CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
  }
}


export default ActionList
