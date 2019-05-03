import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import moment from '../../common/moment';

const ValueSummary = styled.section`
  margin: 2em 0 0;
  padding: 1em 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`;

class IndicatorValueSummary extends React.Component {
  beautifyValue(x) {
    const displayNumber = x.replace('.', ',');
    return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  render() {
    const { values, goals,  unit } = this.props;
    const timeFormat = 'D.M.YYYY';

    var valueDisplay = <h6>Ei arvoja</h6>;
    if (values.length > 0) {
    const latestValue = values[values.length-1];
    const latestValueDisplay = this.beautifyValue(latestValue.value.toFixed(2));
    valueDisplay = (  <div>
      <div><strong>Viimeisin mittaus</strong></div>
      <small>{moment(latestValue.time).format(timeFormat)}</small>
      <h3>{latestValueDisplay} <small>{unit.name}</small></h3></div>
    );
    }

    var goalDisplay = <h6>Ei tavoitearvoja</h6>;
    if (goals.length > 0) {
      const nextGoal = goals[0];
      const nextGoalDate = moment(nextGoal.date).format(timeFormat) ;
      const nextGoalValue = this.beautifyValue(nextGoal.value.toFixed(2));
      goalDisplay = ( <div>
          <div><strong>Tavoite</strong></div>
          <small>{nextGoalDate}</small>
          <h3>{nextGoalValue} <small>{unit.name}</small></h3>
        </div>);
    }
  
    var differenceDisplay = <h6>-</h6>;
    if (values.length > 0 && goals.length > 0) {
      const difference = Number(goals[0].value)-Number(values[values.length-1].value).toFixed(2);
      const timeToGoal = moment(goals[0].date).diff(moment(values[values.length-1].time),'years',true).toFixed(1)+" vuotta";
        differenceDisplay = (  <div>
          <div><strong>Tavoitteeseen matkaa</strong></div>
          <small>{timeToGoal}</small>
          <h3>{difference} <small>{unit.name}</small></h3></div>
        );
      }
    return (
      <ValueSummary>
        <Row>
          <Col sm={4}>
            {valueDisplay}
          </Col>
          <Col sm={4}>
            {differenceDisplay}
          </Col>
          <Col sm={4}>
            {goalDisplay}
          </Col>
        </Row>
      </ValueSummary>
    );
  }
}

export default IndicatorValueSummary;