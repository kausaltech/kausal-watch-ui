import React from 'react'
import { Row } from 'reactstrap';

import ActionCard from './ActionCard';

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
            <ActionCard key={item.id} id={item.id} name={item.attributes.name} theme={item.relationships.categories.data.id}/>
          ))}
        </Row>
      );
    }
  }
}


export default ActionList
