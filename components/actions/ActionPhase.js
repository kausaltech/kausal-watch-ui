import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const PhaseBlock = styled.div`
  position: relative;
  height: ${(props) => props.theme.spaces.s200};
  width: ${(props) => props.theme.spaces.s200};
  background-color: ${(props) => props.theme.themeColors.light};

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

function PhaseIndicator(props) {
  const { completed, active } = props.phase;
  const { status } = props;

  let phaseClass = 'bg-inactive';
  if (completed) phaseClass = 'bg-active';
  if (active) phaseClass = `bg-${status}`;

  return (
    <PhaseBlock className={phaseClass} />
  );
}

function ActionPhase(props) {
  const { status, message, reason, phases, ...rest } = props;

  return (
    <Status {...rest}>
      <ul>
        { phases.map((phase) => (
          <li key={phase.id}>
            <PhaseIndicator phase={phase} status={status} />
            { phase.name }
          </li>
        ))}
      </ul>
    </Status>
  );
}

ActionPhase.propTypes = {
  status: PropTypes.oneOf([
    'not_started',
    'on_time',
    'in_progress',
    'completed',
    'late',
    'severely_late',
  ]),
  message: PropTypes.string,
  reason: PropTypes.string,
  phases: PropTypes.arrayOf(PropTypes.shape),
};

ActionPhase.defaultProps = {
  status: 'not_started',
  message: '',
  reason: '',
  phases: [],
};

export default ActionPhase;

/*
    PropTypes.shapeOf({
      id: PropTypes.number,
      name: PropTypes.string,
      completed: PropTypes.bool,
      active: PropTypes.bool,
    }),
    */