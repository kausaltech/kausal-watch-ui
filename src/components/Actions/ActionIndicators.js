import React from 'react';
import { Card, CardBody, Col, Badge, Container } from 'reactstrap';
import TimeSeries from '../Graphs/TimeSeries';

class ActionList extends React.Component {

  render() {
      let plot;

      if (typeof window !== 'undefined') {
        plot = <TimeSeries />
      } else {
        plot = <Container />
      }
      return (
            <Card>
              <CardBody>
              <Col sm="12" style={{height: '400px'}}>
                {plot}
              </Col>
              <Col sm="12">
                <p>
                  <a href="/indicator/1">Katso mittarin tarkemmat tiedot</a>
                  {' '}|{' '}
                  Tämä mittari liittyy myös toimenpiteisiin: <Badge>25</Badge> <Badge>28</Badge> <Badge>30</Badge>
                </p>
              </Col>
              </CardBody>
            </Card>
      );
    }
}


export default ActionList
