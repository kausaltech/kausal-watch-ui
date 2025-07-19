import React from 'react';

import { Progress } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { getStatusSummary } from '@/common/ActionStatusSummary';
import { ActionStatusSummary, Plan } from '@/common/__generated__/graphql';

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

const ActionProgress = styled(Progress)`
  position: relative;
  height: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.color};

  .progress-bar {
    background-color: ${(props) => props.theme.graphColors.green090};
    color: ${(props) => props.theme.themeColors.black};
  }
`;

interface ActionStatusProps {
  plan: Plan;
  statusSummary: ActionStatusSummary;
  completion?: number;
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
