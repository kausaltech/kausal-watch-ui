import React from 'react'
import { Badge } from 'reactstrap';


class ActionStatus extends React.Component {

  render() {
    return (
      <Badge className={`bg-${this.props.identifier}`}>{this.props.name}</Badge>
    )
  }
}

export default ActionStatus
