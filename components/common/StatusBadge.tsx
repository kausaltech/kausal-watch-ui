import React from 'react';
import { setLightness } from 'polished';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import type { PlanContextType } from 'context/plan';

import {
  ActionWithStatusSummary,
  getStatusColorForAction,
} from 'common/ActionStatusSummary';

interface StatusProps {
  $statusColor: string;
}

const StyledStatusBar = styled.div<StatusProps>`
  background-color: ${(props) => props.theme.themeColors.light};

  .color-bar {
    height: 8px;
    background-color: ${(props) => props.$statusColor};
  }

  .label {
    padding: 3px 6px;
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => props.theme.fontFamilyTiny};
  }
`;

const StyledStatusBadge = styled.div<StatusProps>`
  border: 2px solid ${({ $statusColor }) => $statusColor};
  background: ${({ $statusColor }) => setLightness(0.95, $statusColor)};
  border-radius: ${({ theme }) => theme.badgeBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
`;

const StyledStatusBadgeWithReason = styled(StyledStatusBadge)`
  padding: ${({ theme }) => theme.spaces.s100};
`;

const StyledStatusIndicator = styled.div<StatusProps>`
  background: ${({ $statusColor }) => $statusColor};
  border-radius: 10px;
  width: 10px;
  height: 10px;
`;

const StyledStatusLabel = styled.div<{ $emphasize?: boolean }>`
  color: ${({ theme }) => theme.textColor.primary};
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightSm};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

const StyledStatusWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.s050};
  align-items: center;
`;

const StyledReason = styled.p`
  color: ${({ theme }) => theme.textColor.primary};
  margin-top: ${({ theme }) => theme.spaces.s100};
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightMd};
`;

interface StatusBadgeProps {
  action: ActionWithStatusSummary;
  statusName?: string;
  plan: PlanContextType;
  // Render the status as a horizontal bar or badge with a colored dot
  asBar?: boolean;
  reason?: string;
}

const StatusBadge = ({
  action,
  statusName,
  plan,
  asBar = true,
  reason,
}: StatusBadgeProps) => {
  const { statusSummary } = action;
  const theme = useTheme();
  const statusColor = getStatusColorForAction(action, plan, theme);
  const label = statusName ?? statusSummary?.label;

  if (!label) {
    return null;
  }

  if (asBar) {
    return (
      <StyledStatusBar $statusColor={statusColor}>
        <div className="color-bar" />
        <div className="label">{label ?? ''}</div>
      </StyledStatusBar>
    );
  }

  if (!reason) {
    return (
      <StyledStatusBadge $statusColor={statusColor}>
        <StyledStatusWrapper>
          <StyledStatusIndicator $statusColor={statusColor} />
          <StyledStatusLabel>{label}</StyledStatusLabel>
        </StyledStatusWrapper>
      </StyledStatusBadge>
    );
  }

  return (
    <StyledStatusBadgeWithReason $statusColor={statusColor}>
      <StyledStatusWrapper>
        <StyledStatusIndicator $statusColor={statusColor} />
        <StyledStatusLabel $emphasize>{label}</StyledStatusLabel>
      </StyledStatusWrapper>
      <StyledReason>{reason}</StyledReason>
    </StyledStatusBadgeWithReason>
  );
};

export default StatusBadge;
