import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { darken } from 'polished';
import { Progress } from 'reactstrap';
import { getStatusColor } from 'common/preprocess';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const ActionStatusBar = styled.div`
  height: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.color};
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

  .progress-bar {
    //background-color: ${(props) => darken(0.10, props.theme.graphColors.light)};
    background-color: ${(props) => props.theme.graphColors.green010};
    color: ${(props) => props.theme.themeColors.black};
  }
`;
function ActionStatus(props) {
  const { identifier: statusIdentifier, name: statusName, completion, ...rest } = props;
  const theme = useTheme();
  const statusColor = getStatusColor(statusIdentifier, theme);

  return (
    <Status {...rest}>
      <span className="sr-only">
        { statusName }
      </span>
      <ActionStatusBar color={statusColor} />
      <ActionProgress
        value={completion}
        aria-hidden
      >
        <StatusTitle>
          { statusName }
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
