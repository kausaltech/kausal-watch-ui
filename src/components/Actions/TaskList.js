import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

import styled from 'styled-components';


const Date = styled.span`
  font-weight: 700;
  font-size: 75%;
`


class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  render() {
    return (
        <div>
        { this.props.timing === "done" &&
        <ListGroup className="mb-4">
          <ListGroupItem>
            <Date>12.12.2018</Date> | Yhteyshenkilön nimeäminen
          </ListGroupItem>
          <ListGroupItem>
            <Date>12.12.2018</Date> | Kuvauksen selkeyttäminen
          </ListGroupItem>
          <ListGroupItem>
            <Date>12.12.2018</Date> | Järjestetään koulutus taloyhtiöille [<a href="#">Linkki</a>]
          </ListGroupItem>
        </ListGroup>
          }
        { this.props.timing === "todo" &&
        <ListGroup className="mb-4">
          <ListGroupItem>
            <Date>12.12.2018</Date> | Koulutusten loppuraportointi
          </ListGroupItem>
          <ListGroupItem>
            <Date>12.12.2018</Date> | Toimenpiteen valmistuminen
          </ListGroupItem>
        </ListGroup>
          }
        </div>
      
    );
  }
}


export default TaskList
