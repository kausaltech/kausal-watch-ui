import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { Progress } from 'reactstrap';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.dark};
  background-color: ${(props) => props.theme.themeColors.dark};
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: left;
  line-height: 2;
`;

const StatusTitle = styled.div`
  position: absolute;
  left: 1em;
`;

const ActionProgress = styled(Progress)`
  position: relative;
  height: 2em;
  background-color: ${(props) => props.theme.themeColors.light};

  &.bg-not_started {
    background-color: ${(props) => props.theme.themeColors.light};

    .progress-bar {
      color: ${(props) => props.theme.themeColors.dark};
    }
  }

  &.bg-on_time, &.bg-completed {
    background-color:  ${(props) => darken(0.20, props.theme.themeColors.success)};
    .progress-bar {
      background-color: ${(props) => props.theme.themeColors.success};
    }
  }

  &.bg-late {
    background-color:  ${(props) => darken(0.15, props.theme.themeColors.warning)};
    .progress-bar {
      background-color: ${(props) => props.theme.themeColors.warning};
    }
  }

  &.bg-severely_late {
    background-color:  ${(props) => darken(0.20, props.theme.themeColors.danger)};
    .progress-bar {
      background-color: ${(props) => props.theme.themeColors.danger};
    }
}
`;


function ActionStatus(props) {
  const { identifier, name, completion } = props;

  return (
    <Status>
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
