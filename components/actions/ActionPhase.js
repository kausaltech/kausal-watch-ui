import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { useTranslation } from 'common/i18n';
import { getStatusColor } from 'common/preprocess';

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
  background-color: ${(props) => props.blockColor};
`;

function Phase(props) {
  const { name } = props.phase;
  const { statusIdentifier, active, passed, disabled, compact } = props;
  const theme = useTheme();

  let blockColor = theme.themeColors.light;

  let labelClass = 'disabled';

  // Passed phase gets active status color
  if (passed) {
    // phaseClass = 'bg-active';
    blockColor = getStatusColor(statusIdentifier, theme);
    labelClass = '';
  } else if (active) {
    blockColor = getStatusColor(statusIdentifier, theme);
    labelClass = 'active';
  } else if (statusIdentifier === 'completed') {
    blockColor = getStatusColor(statusIdentifier, theme);
    labelClass = 'disabled';
  }

  return (
    <li>
      { !compact && (
        <PhaseLabel className={labelClass}>
          {name}
        </PhaseLabel>
      )}
      <PhaseBlock blockColor={blockColor} />
    </li>
  );
}

function ActionPhase(props) {
  const {
    status,
    activePhase,
    reason,
    mergedWith,
    phases,
    compact,
    ...rest } = props;

  const { t } = useTranslation(['common', 'actions']);
  let activePhaseName = activePhase?.name;
  let phaseIndex = -1;

  // Find position of the active phase
  if (activePhase !== '') {
    phaseIndex = phases.findIndex((phase) => phase.identifier === activePhase);
  }
  // Override phase name in special case statuses
  const inactive = ['cancelled', 'merged', 'postponed', 'completed'].includes(status.identifier);
  if (inactive) activePhaseName = status.name;

  return (
    <Status {...rest} className={compact && 'compact'}>
      <ul>
        { phases.map((phase, indx) => (
          <Phase
            phase={phase}
            passed={indx < phaseIndex}
            active={indx === phaseIndex}
            statusIdentifier={status.identifier}
            statusName={status.name}
            disabled={inactive}
            key={phase.id}
            compact={compact}
          />
        ))}
      </ul>
      { !compact && (
        <>
          <strong>{ status.name }</strong>
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
  status: PropTypes.shape().isRequired,
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
  activePhase: '',
  reason: '',
  phases: [],
  mergedWith: '',
  compact: false,
};

export default ActionPhase;
