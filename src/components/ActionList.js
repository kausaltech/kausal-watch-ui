import React from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';

import ActionImage from './ActionImage';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Row>
          {items.map(item => (
            <Col md="4" sm="6">
              <Card key={item.id}>
                <ActionImage id={item.id} />
                <CardBody>
                  <h6>#{item.id}</h6>
                  <CardTitle>{item.title}</CardTitle>
                  <CardSubtitle>Theme {item.userId}</CardSubtitle>
                  
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
