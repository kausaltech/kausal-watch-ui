import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import moment from '../../common/moment';
import { withTranslation } from '../../common/i18n';

const ValueSummary = styled.section`
  margin: 2em 0 0;
  padding: 1em 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`;


function beautifyValue(x) {
  let out;

  if (!Number.isInteger(x)) {
    out = x.toFixed(2);
  } else {
    out = x;
  }
  const s = out.toString();
  const displayNumber = s.replace('.', ',');
  return displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function determineDesirableDirection(values, goals) {
  if (!values.length || !goals.length) return null;

  const latestValue = values[values.length - 1];
  const latestGoal = goals[goals.length - 1];

  if (latestGoal.value - latestValue.value >= 0) {
    return '+';
  }
  return '-';
}

function IndicatorValueSummary({ timeResolution, values, goals, unit, t }) {
  const desirableDirection = determineDesirableDirection(values, goals);
  const pluralUnitName = unit.verboseNamePlural || unit.verboseName || unit.shortName || unit.name;
  const shortUnitName = unit.shortName || unit.name;
  const diffUnitName = unit.name === '%' ? t('percent-point-abbreviation') : shortUnitName;
  let timeFormat = 'D.M.YYYY';

  if (timeResolution === 'YEAR') {
    timeFormat = 'YYYY';
  }

  let valueDisplay = <h6>Ei arvoja</h6>;
  if (values.length > 0) {
    const latestValue = values[values.length - 1];
    let absChange;
    let relChange;
    let desirableChange;
    let changeColor;
    let changeSymbol;

    if (values.length > 1) {
      absChange = latestValue.value - values[values.length - 2].value;
      relChange = latestValue.value ? absChange / latestValue.value : 0;
      if (desirableDirection) {
        if ((absChange > 0 && desirableDirection == '+') ||
            (absChange < 0 && desirableDirection == '-')) {
          desirableChange = true;
          changeColor = 'green';
        } else if (absChange == 0) {
          desirableChange = null;
          changeColor = 'grey';
        } else {
          desirableChange = false;
          changeColor = 'red';
        }
      }
      if (absChange < 0) {
        changeSymbol = '▼';
      } else if (absChange > 0) {
        changeSymbol = '▲';
      }
    }
    const latestValueDisplay = beautifyValue(latestValue.value);
    valueDisplay = (
      <div>
        <div><strong>Viimeisin mittaus</strong></div>
        <small>{moment(latestValue.date).format(timeFormat)}</small>
        <h3>
          {latestValueDisplay}
          {' '}
          <small>{shortUnitName}</small>
          {absChange && (
            <span style={{ color: changeColor, fontSize: '1.2rem' }}>
              <strong>{changeSymbol}</strong>
              <span>{beautifyValue(absChange)}</span> <small>{diffUnitName}</small>
            </span>
          )}
        </h3>
      </div>
    );
  }

  let goalDisplay = <h6>Ei tavoitearvoja</h6>;
  if (goals.length > 0) {
    const nextGoal = goals[0];
    const nextGoalDate = moment(nextGoal.date).format(timeFormat);
    const nextGoalValue = beautifyValue(nextGoal.value);
    goalDisplay = (
      <div>
        <div><strong>Tavoite</strong></div>
        <small>{nextGoalDate}</small>
        <h3>
          {nextGoalValue}
          {' '}
          <small>{shortUnitName}</small>
        </h3>
      </div>
    );
  }

  let differenceDisplay = <h6>-</h6>;
  if (values.length > 0 && goals.length > 0) {
    const difference = goals[0].value - values[values.length - 1].value;
    const now = moment();
    const timeToGoal = moment(goals[0].date).diff(now, 'years', true).toFixed(0) + " vuotta";
    differenceDisplay = (
      <div>
        <div><strong>Tavoitteeseen matkaa</strong></div>
        <small>{timeToGoal}</small>
        <h3>
          {beautifyValue(difference)}
          {' '}
          <small>{diffUnitName}</small>
        </h3>
      </div>
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

export default withTranslation()(IndicatorValueSummary);
