import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { setLightness } from 'polished';

import { ActionWithStatusSummary, getStatusColorForAction } from '@/common/ActionStatusSummary';
import { ActionStatusSummaryIdentifier } from '@/common/__generated__/graphql';
import type { PlanContextType } from '@/context/plan';

type StatusProps = {
  $subtle?: boolean;
  $statusColor: string;
};

const StyledStatusBadge = styled.div<StatusProps>`
  display: inline-block;
  border: ${({ $subtle, $statusColor }) => ($subtle ? 'none' : `2px solid ${$statusColor}`)};
  background: ${({ $statusColor }) => setLightness(0.95, $statusColor)};
  border-radius: ${({ theme }) => theme.badgeBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
`;

const StyledStatusBadgeWithReason = styled(StyledStatusBadge)`
  padding: ${({ theme }) => theme.spaces.s100};
  display: block;
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
  font-weight: ${({ $subtle, theme }) => ($subtle ? theme.fontWeightNormal : theme.fontWeightBold)};
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

const StatusBadge = ({ action, statusName, plan, reason, subtle = false }: StatusBadgeProps) => {
  const { statusSummary, status } = action;
  const t = useTranslations();

  const theme = useTheme();
  let statusColor = status?.color
    ? theme.graphColors[status.color]
    : getStatusColorForAction(action, plan, theme);
  let label = statusName;
  if (label == null) {
    if (
      action.scheduleContinuous &&
      action.statusSummary?.identifier === ActionStatusSummaryIdentifier.Completed
    ) {
      label = t('action-continuous');
      statusColor = theme.actionContinuousColor;
    } else {
      label = statusSummary?.label;
    }
  }
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
