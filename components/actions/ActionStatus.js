import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { Progress } from 'reactstrap';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.dark};
`;

const StatusTitle = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.themeColors.black};
  font-size: ${(props) => props.theme.fontSizeSm};
  line-height: ${(props) => props.theme.spaces.s150};
`;

const ActionProgress = styled(Progress)`
  position: relative;
  height: ${(props) => props.theme.spaces.s150};
  background-color: ${(props) => props.theme.themeColors.light};

  &.bg-not_started {
    background-color: ${(props) => props.theme.actionNotStartedColor};
  }

  &.bg-on_time {
    background-color: ${(props) => props.theme.actionOnTimeColor};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.actionOnTimeColor)};
    }
  }

  &.bg-completed {
    background-color: ${(props) => props.theme.actionCompletedColor};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.actionCompletedColor)};
    }
  }

  &.bg-late {
    background-color: ${(props) => props.theme.actionLateColor};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.actionLateColor)};
    }
  }

  &.bg-severely_late {
    background-color: ${(props) => props.theme.actionSeverelyLateColor};
    .progress-bar {
      background-color: ${(props) => darken(0.15, props.theme.actionSeverelyLateColor)};
    }
  }
`;
function ActionStatus(props) {
  const { identifier, name, completion, ...rest } = props;

  return (
    <Status {...rest}>
      <ActionProgress
        value={completion}
        className={`bg-${identifier}`}
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
