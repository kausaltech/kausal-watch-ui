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

function PhaseIndicator(props) {
  const { completed, active, name } = props.phase;
  const { status } = props;

  let phaseClass = 'bg-inactive';
  if (completed) phaseClass = 'bg-active';
  if (active) phaseClass = `bg-${status}`;

  return (
    <li>
      <PhaseBlock className={phaseClass} />
      <PhaseLabel className={active && 'active'}>{name}</PhaseLabel>
    </li>
  );
}

function ActionPhase(props) {
  const { status, message, reason, phases, ...rest } = props;

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
        { phases.map((phase) => (
          <PhaseIndicator phase={phase} status={status} key={phase.id} />
        ))}
      </ul>
    </Status>
  );
}

ActionPhase.propTypes = {
  status: PropTypes.oneOf([
    'neutral',
    'on_time',
    'completed',
    'late',
    'severely_late',
  ]),
  message: PropTypes.string,
  reason: PropTypes.string,
  phases: PropTypes.arrayOf(PropTypes.shape),
};

ActionPhase.defaultProps = {
  status: 'neutral',
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