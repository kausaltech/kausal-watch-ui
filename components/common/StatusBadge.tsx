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
  $subtle?: boolean;
  $statusColor: string;
}

const StyledStatusBadge = styled.div<StatusProps>`
  display: inline-block;
  border: ${({ $subtle, $statusColor }) =>
    $subtle ? 'none' : `2px solid ${$statusColor}`};
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
  flex-shrink: 0;
`;

const StyledStatusLabel = styled.div<{ $subtle?: boolean }>`
  color: ${({ theme }) => theme.textColor.primary};
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightSm};
  font-weight: ${({ $subtle, theme }) =>
    $subtle ? theme.fontWeightNormal : theme.fontWeightBold};
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
  reason?: string;
  // Best used when rendering many badges together, e.g. in a table view
  subtle?: boolean;
}

const StatusBadge = ({
  action,
  statusName,
  plan,
  reason,
  subtle = false,
}: StatusBadgeProps) => {
  const { statusSummary } = action;
  const theme = useTheme();
  const statusColor = getStatusColorForAction(action, plan, theme);
  const label = statusName ?? statusSummary?.label;

  if (!label) {
    return null;
  }

  if (!reason) {
    return (
      <StyledStatusBadge $subtle={subtle} $statusColor={statusColor}>
        <StyledStatusWrapper>
          <StyledStatusIndicator $statusColor={statusColor} />
          <StyledStatusLabel $subtle={subtle}>{label}</StyledStatusLabel>
        </StyledStatusWrapper>
      </StyledStatusBadge>
    );
  }

  return (
    <StyledStatusBadgeWithReason $subtle={subtle} $statusColor={statusColor}>
      <StyledStatusWrapper>
        <StyledStatusIndicator $statusColor={statusColor} />
        <StyledStatusLabel $subtle={subtle}>{label}</StyledStatusLabel>
      </StyledStatusWrapper>
      <StyledReason>{reason}</StyledReason>
    </StyledStatusBadgeWithReason>
  );
};

export default StatusBadge;
