import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import type { Theme } from '@kausal/themes/types';
import type { PlanContextType } from 'context/plan';
import type { ActionStatusSummary } from 'common/__generated__/graphql';

import {
  MinimalActionStatusSummary,
  getStatusColorForAction,
} from 'common/ActionStatusSummary';

interface StatusBarProps {
  theme: Theme;
  statusColor: string;
}

const StyledStatusBar = styled.div<StatusBarProps>`
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

const StatusBar = (props: PropsWithChildren<StatusBarProps>) => {
  const { theme, statusColor, children } = props;
  return (
    <StyledStatusBar theme={theme} statusColor={statusColor}>
      {children}
    </StyledStatusBar>
  );
};

interface StatusBadgeProps {
  statusSummary: ActionStatusSummary;
  statusName?: string;
  plan: PlanContextType;
}

const StatusBadge = (props: StatusBadgeProps) => {
  const { statusSummary, statusName, plan } = props;
  const theme = useTheme();
  const statusColor = getStatusColorForAction({ statusSummary }, plan, theme);
  return (
    <StatusBar statusColor={statusColor} theme={theme}>
      <div className="color-bar" />
      <div className="label">{statusName ?? statusSummary.label}</div>
    </StatusBar>
  );
};

export default StatusBadge;
