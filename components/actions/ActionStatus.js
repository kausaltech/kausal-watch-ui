import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { Progress } from 'reactstrap';
import { getStatusColor } from 'common/preprocess';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const StatusTitle = styled.div`
  padding: 3px 6px;
  text-align: left;
  background-color: ${(props) => props.theme.themeColors.light};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.spaces.s150};
`;

const ActionProgress = styled(Progress)`
  position: relative;
  height: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.color};

  .progress-bar {
    background-color: ${(props) => props.theme.graphColors.green090};
    color: ${(props) => props.theme.themeColors.black};
  }
`;
function ActionStatus(props) {
  const { identifier: statusIdentifier, name: statusName, completion, ...rest } = props;
  const theme = useTheme();
  const statusColor = getStatusColor(statusIdentifier, theme);

  return (
    <Status {...rest}>
      <ActionProgress
        value={completion}
        color={statusColor}
        aria-hidden
      />
      <StatusTitle>
        { statusName }
      </StatusTitle>
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
    'undefined',
    null,
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
