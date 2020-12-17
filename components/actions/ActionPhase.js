import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};

  &.compact {
    font-size: ${(props) => props.theme.fontSizeSm};
  }

  ul {
    display: flex;
    align-items: flex-end;
    margin-bottom: ${(props) => props.theme.spaces.s050};
    padding: 0;
    list-style-type: none;
  }

  li {
    flex: 1;
    margin-right: 4px;
  }

  .label {
    font-size: ${(props) => props.theme.fontSizeSm};
    line-height: ${(props) => props.theme.lineHeightMd};
    hyphens: auto;
  }
`;

const PhaseReason = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const PhaseLabel = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
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
  height: ${(props) => props.theme.spaces.s050};
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
  const { statusName, status, active, passed, disabled, compact } = props;

  let phaseClass = 'bg-inactive';
  let labelClass = 'disabled';

  // Passed phase gets active status color
  if (passed) {
    // phaseClass = 'bg-active';
    phaseClass = `bg-${status}`;
    labelClass = '';
  }
  if (active) {
    phaseClass = `bg-${status}`;
    labelClass = 'active';
  }
  // Let status completed override the phase
  if (status === 'completed') {
    phaseClass = 'bg-completed';
    labelClass = 'disabled';
  }

  return (
    <li>
      { !compact && (
        <PhaseLabel className={labelClass}>
          {name}
        </PhaseLabel>
      )}
      <PhaseBlock className={phaseClass} />
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
    compact,
    ...rest } = props;

  const { t } = useTranslation(['common', 'actions']);
  let activePhaseName = '';
  let phaseIndex = -1;
  // Find name of the active phase
  if (activePhase !== '') {
    phaseIndex = phases.findIndex((phase) => phase.id === activePhase);
    activePhaseName = phases[phaseIndex].name;
  }
  // Override phase name in special case statuses
  const inactive = ['cancelled', 'merged', 'postponed', 'completed'].includes(statusIdentifier);
  if (inactive) activePhaseName = statusName;

  return (
    <Status {...rest} className={compact && 'compact'}>
      <ul>
        { phases.map((phase, indx) => (
          <Phase
            phase={phase}
            passed={indx < phaseIndex}
            active={indx === phaseIndex}
            status={statusIdentifier}
            statusName={statusName}
            disabled={inactive}
            key={phase.id}
            compact={compact}
          />
        ))}
      </ul>
      { !compact && (
        <>
          <strong>{ statusName }</strong>
          { reason && (
            <PhaseReason>
              <strong>
                { t('action-status-reason') }
                :
                {' '}
              </strong>
              { reason }
            </PhaseReason>
          )}
        </>
      )}
      { compact && (
        <span>{ activePhaseName }</span>
      )}
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
  compact: PropTypes.bool,
};

ActionPhase.defaultProps = {
  statusIdentifier: '',
  statusName: '',
  activePhase: '',
  reason: '',
  phases: [],
  mergedWith: '',
  compact: false,
};

export default ActionPhase;
