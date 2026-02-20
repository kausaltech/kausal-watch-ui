import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Progress } from 'reactstrap';

import { getStatusSummary } from '@/common/ActionStatusSummary';
import type { ActionStatusSummaryIdentifier } from '@/common/__generated__/graphql';
import type { PlanContextType } from '@/context/plan';

const Status = styled.div`
  color: ${(props) => props.theme.themeColors.black};
`;

const StatusTitle = styled.div`
  padding: 3px 6px;
  text-align: left;
  background-color: ${(props) => props.theme.themeColors.light};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.spaces.s150};
`;

const ActionProgress = styled(Progress)<{ color: string }>`
  position: relative;
  height: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.color};

  .progress-bar {
    background-color: ${(props) => props.theme.graphColors.green090};
    color: ${(props) => props.theme.themeColors.black};
  }
`;

interface ActionStatusProps {
  plan: PlanContextType;
  statusSummary: {
    identifier: ActionStatusSummaryIdentifier;
  };
  completion?: number | null;
  text?: string;
}

function ActionStatus(props: ActionStatusProps) {
  const { plan, statusSummary, completion = 0, text } = props;
  const theme = useTheme();
  const enrichedStatusSummary = getStatusSummary(plan, statusSummary);
  const statusColor = enrichedStatusSummary.color;
  const statusName = text ?? enrichedStatusSummary.label;

  return (
    <Status theme={theme}>
      {completion && <ActionProgress value={completion} color={statusColor} aria-hidden />}
      <StatusTitle>{statusName}</StatusTitle>
    </Status>
  );
}

export default ActionStatus;
