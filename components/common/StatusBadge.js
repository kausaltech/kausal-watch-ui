import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'common/theme';

import { getStatusColor } from 'common/preprocess';

const StatusBar = styled.div`

background-color: ${(props) => props.theme.themeColors.light};

.color-bar {
  height: 8px;
  background-color: ${(props) => props.statusColor};
}

.label {
  padding: 3px 6px;
  font-size: ${(props) => props.theme.fontSizeSm};
}
`;

const StatusBadge = (props) => {
  const { statusIdentifier, statusName } = props;
  const theme = useTheme();

  return (
    <StatusBar statusColor={getStatusColor(statusIdentifier, theme)}>
      <div className="color-bar" />
      <div className="label">{ statusName }</div>
    </StatusBar>
  );
};

export default StatusBadge;
