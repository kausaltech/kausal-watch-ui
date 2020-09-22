import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { Progress } from 'reactstrap';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.white};
`;

const StatusTitle = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.spaces.s200};
`;

const ActionProgress = styled(Progress)`
  position: relative;
  height: ${(props) => props.theme.spaces.s200};
  background-color: ${(props) => props.theme.themeColors.light};

  &.bg-not_started {
    background-color: ${(props) => props.theme.actionNotStartedColor};
  }

  &.bg-in_progress {
    background-color: ${(props) => props.theme.actionOnTimeColor};
    .progress-bar {
      background-color: ${(props) => lighten(0.1, props.theme.actionOnTimeColor)};
    }
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.actionOnTimeColor};
    .progress-bar {
      background-color: ${(props) => darken(0.1, props.theme.actionOnTimeColor)};
    }
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.actionCompletedColor};
    .progress-bar {
      background-color: ${(props) => props.theme.actionCompletedColor};
    }
  }

  &.bg-late {
    background-color: ${(props) => props.theme.actionLateColor};
    .progress-bar {
      color: ${(props) => props.theme.themeColors.black};
      background-color: ${(props) => darken(0.25, props.theme.actionLateColor)};
    }
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
    .progress-bar {
      background-color: ${(props) => lighten(0.15, props.theme.actionSeverelyLateColor)};
    }
  }
`;
function ActionStatus(props) {
  const { identifier, name, completion, ...rest } = props;

  return (
    <Status {...rest}>
      <span className="sr-only">
        {name}
      </span>
      <ActionProgress
        value={completion}
        className={`bg-${identifier}`}
        aria-hidden
      >
        <StatusTitle>
          {name}
        </StatusTitle>
      </ActionProgress>
    </Status>
  );
}

ActionStatus.propTypes = {
  identifier: PropTypes.oneOf([
    'not_started',
    'on_time',
    'in_progress',
    'completed',
    'late',
    'severely_late',
  ]),
  name: PropTypes.string,
  completion: PropTypes.number,
};

ActionStatus.defaultProps = {
  identifier: 'not_started',
  name: '',
  completion: 0,
};

export default ActionStatus;
