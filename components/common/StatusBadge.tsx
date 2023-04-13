import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'common/theme';

import { getStatusColorForAction } from 'common/ActionStatusSummary';

const StatusBar = styled.div`

background-color: ${(props) => props.theme.themeColors.light};

.color-bar {
  height: 8px;
  background-color: ${(props) => props.statusColor};
}

.label {
  padding: 3px 6px;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
}
`;

const StatusBadge = (props) => {
  const { statusSummary, statusName, plan } = props;
  const theme = useTheme();

  return (
    <StatusBar statusColor={getStatusColorForAction({statusSummary}, plan, theme)}>
      <div className="color-bar" />
      <div className="label">{ statusName }</div>
    </StatusBar>
  );
};

export default StatusBadge;
