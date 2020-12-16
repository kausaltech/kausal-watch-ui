import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};

  ul {
    display: flex;
    margin-top: ${(props) => props.theme.spaces.s100};
    padding: 0;
    list-style-type: none;
  }

  li {
    flex: 1;
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  .label {
    font-size: ${(props) => props.theme.fontSizeSm};
    line-height: ${(props) => props.theme.lineHeightMd};
    hyphens: auto;
  }
`;

const PhaseDescription = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const PhaseReason = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const PhaseLabel = styled.div`
  margin-top: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: auto;

  &.active {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  &.disabled {
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const PhaseBlock = styled.div`
  position: relative;
  height: ${(props) => props.theme.spaces.s100};
  width: auto;
  background-color: ${(props) => props.theme.themeColors.light};
  border-radius: ${(props) => props.theme.badgeBorderRadius};

  &.bg-active {
    background-color: ${(props) => props.theme.graphColors.blue070};
  }

  &.bg-not_started {
    background-color: ${(props) => props.theme.graphColors.blue070};
  }

  &.bg-in_progress {
    background-color: ${(props) => props.theme.graphColors.blue070};
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.graphColors.green050};
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.graphColors.green090};
  }

  &.bg-late {
    background-color: ${(props) => props.theme.graphColors.yellow050};
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.graphColors.red050};
  }
`;

function Phase(props) {
  const { name } = props.phase;
  const { status, active, passed, disabled } = props;

  let phaseClass = 'bg-inactive';
  if (passed) phaseClass = 'bg-active';
  if (active) phaseClass = `bg-${status}`;

  return (
    <li>
      <PhaseBlock className={phaseClass} />
      <PhaseLabel className={(active && 'active') || (disabled && 'disabled')}>
        {name}
      </PhaseLabel>
    </li>
  );
}

function ActionPhase(props) {
  const {
    statusIdentifier,
    statusName,
    activePhase,
    reason,
    mergedWith,
    phases,
    ...rest } = props;

  let message = '';
  let phaseIndex = -1;
  // if Action is set in one of the phases, find its index and create message accordingly
  if (activePhase !== '') {
    phaseIndex = phases.findIndex((phase) => phase.id === activePhase);
    message = phases[phaseIndex].name;
    if (statusName) message = `${message} (${statusName})`;
  }
  // if Action is in one of the inactive statuses set phase viz to disabled
  const inactive = ['cancelled', 'merged', 'postponed'].includes(statusIdentifier);
  if (inactive) message = statusName;

  return (
    <Status {...rest}>
      <PhaseDescription>{ message }</PhaseDescription>
      { reason && (
        <PhaseReason>
          <strong>Reason: </strong>
          { reason }
        </PhaseReason>
      )}
      <ul>
        { phases.map((phase, indx) => (
          <Phase
            phase={phase}
            passed={indx < phaseIndex}
            active={indx === phaseIndex}
            status={statusIdentifier}
            disabled={inactive}
            key={phase.id}
          />
        ))}
      </ul>
    </Status>
  );
}

ActionPhase.propTypes = {
  statusIdentifier: PropTypes.oneOf([
    '',
    'on_time',
    'completed',
    'late',
    'severely_late',
    'cancelled',
    'merged',
    'postponed',
  ]),
  statusName: PropTypes.string,
  activePhase: PropTypes.string,
  reason: PropTypes.string,
  phases: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string,
      identifier: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    },
  )),
  mergedWith: PropTypes.string,
};

ActionPhase.defaultProps = {
  statusIdentifier: '',
  statusName: '',
  activePhase: '',
  reason: '',
  phases: [],
  mergedWith: '',
};

export default ActionPhase;
