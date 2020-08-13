import React from 'react';
import { Row, Col } from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import moment from '../../common/moment';
import { withTranslation } from '../../common/i18n';

const ValueSummary = styled.div`
  margin: 2em 0 0;
  padding: 1em 0 0;
  border-top: 1px solid ${(props) => props.theme.themeColors.dark};
  border-bottom: 1px solid ${(props) => props.theme.themeColors.dark};
`;

const ValueLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ValueDate = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.themeColors.dark};
`;

const ValueDisplay = styled.div`
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ValueUnit = styled.span`
  margin: 0 .5em 0 .25em;
  font-size: ${(props) => props.theme.fontSizeBase};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  color: ${(props) => props.theme.themeColors.dark};
`;

const ValueChange = styled.div`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizeBase};
  color: ${(props) => props.color};
`;

const ChangeSymbol = styled.span`
  margin-right: .5em;
  font-size: ${(props) => props.theme.fontSizeSm};
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

function IndicatorValueSummary(props) {
  const { timeResolution, values, goals, unit, t, theme } = props;
  const desirableDirection = determineDesirableDirection(values, goals);
  const pluralUnitName = unit.verboseNamePlural || unit.verboseName || unit.shortName || unit.name;
  const shortUnitName = unit.shortName || unit.name;
  const diffUnitName = unit.name === '%' ? t('percent-point-abbreviation') : shortUnitName;
  const now = moment();
  let timeFormat = 'D.M.YYYY';

  if (timeResolution === 'YEAR') {
    timeFormat = 'YYYY';
  }

  let valueDisplay = <h6>{ t('indicator-no-values') }</h6>;
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
        if ((absChange > 0 && desirableDirection === '+') ||
            (absChange < 0 && desirableDirection === '-')) {
          desirableChange = true;
          changeColor = theme.themeColors.success;
        } else if (absChange === 0) {
          desirableChange = null;
          changeColor = theme.themeColors.dark;
        } else {
          desirableChange = false;
          changeColor = theme.themeColors.danger;
        }
      }
      if (absChange < 0) {
        changeSymbol = '▼';
      } else if (absChange > 0) {
        changeSymbol = '▲';
      } else changeSymbol = '—';
    }
    const latestValueDisplay = beautifyValue(latestValue.value);
    valueDisplay = (
      <div className="mb-4">
        <ValueLabel>{ t('indicator-latest-value') }</ValueLabel>
        <ValueDate>{moment(latestValue.date).format(timeFormat)}</ValueDate>
        <ValueDisplay>
          {latestValueDisplay}
          <ValueUnit>{shortUnitName}</ValueUnit>
          {changeSymbol && (
            <ValueChange color={changeColor}>
              <ChangeSymbol>{changeSymbol}</ChangeSymbol>
              <span>{beautifyValue(absChange)}</span>
              {' '}
              <small>{diffUnitName}</small>
            </ValueChange>
          )}
        </ValueDisplay>
      </div>
    );
  }

  const nextGoal = goals.find((goal) => moment(goal.date).isSameOrAfter(now));
  let goalDisplay = <h6>{ t('indicator-time-no-goals') }</h6>;

  if (nextGoal) {
    const nextGoalDate = moment(nextGoal.date).format(timeFormat);
    const nextGoalValue = beautifyValue(nextGoal.value);
    goalDisplay = (
      <div className="mb-4">
        <ValueLabel>{ t('indicator-goal') }</ValueLabel>
        <ValueDate>{nextGoalDate}</ValueDate>
        <ValueDisplay>
          {nextGoalValue}
          <ValueUnit>{shortUnitName}</ValueUnit>
        </ValueDisplay>
      </div>
    );
  }

  // Find the next upcoming goal
  let differenceDisplay = <h6>-</h6>;
  if (values.length > 0 && nextGoal) {
    const difference = nextGoal.value - values[values.length - 1].value;
    const timeToGoal = `${moment(nextGoal.date).diff(now, 'years', true).toFixed(0)} ${' '} ${t('indicator-resolution-years')}`;
    differenceDisplay = (
      <div className="mb-4">
        <ValueLabel>{ t('indicator-time-to-goal') }</ValueLabel>
        <ValueDate>{timeToGoal}</ValueDate>
        <ValueDisplay>
          {beautifyValue(difference)}
          <ValueUnit>{diffUnitName}</ValueUnit>
        </ValueDisplay>
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

export default withTranslation()(withTheme(IndicatorValueSummary));
