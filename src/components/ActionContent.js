import React from 'react'
import { Jumbotron } from 'reactstrap';

class ActionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isLoaded: false,
      error: false
    };
  }

  render() {
    return (
      <Jumbotron>
        <h1>{this.props.uid}</h1>
      </Jumbotron>
    );
  }
}


export default ActionContent
