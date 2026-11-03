import LinearProgress from '@mui/material/LinearProgress';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

import { getStatusSummary, getThemeColor } from '@/common/ActionStatusSummary';
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

  @media print {
    background-color: #fff;
  }
`;

const ActionProgress = styled(LinearProgress, transientOptions)<{ $color: string | undefined }>`
  position: relative;
  height: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.$color};

  .MuiLinearProgress-bar {
    background-color: ${(props) => props.theme.graphColors.green090};
    color: ${(props) => props.theme.themeColors.black};
    /* The bar and the status colour behind it can be close in contrast, so
       mark where the bar ends with a white line (WCAG 1.4.11) */
    box-shadow: 2px 0 0 ${(props) => props.theme.themeColors.white};
  }
`;

interface ActionStatusProps {
  plan: PlanContextType;
  statusSummary: {
    identifier: ActionStatusSummaryIdentifier;
  };
  color?: string | null;
  completion?: number | null;
  text?: string;
  showProgressBar?: boolean;
}

function ActionStatus(props: ActionStatusProps) {
  const { plan, statusSummary, color, completion = 0, text, showProgressBar = false } = props;
  const theme = useTheme();
  const enrichedStatusSummary = getStatusSummary(plan, statusSummary);
  const statusColor = getThemeColor(color ?? 'grey050', theme);
  const statusName = text ?? enrichedStatusSummary.label;
  const completionNumber =
    typeof completion === 'number' && Number.isFinite(completion) ? completion : null;
  const shouldShowBar = showProgressBar && completionNumber !== null && completionNumber > 0;

  return (
    <Status theme={theme}>
      {shouldShowBar && (
        <ActionProgress
          variant="determinate"
          // Completion can be over 100, which MUI would draw as a bar shifted right
          value={Math.min(100, Math.max(0, completionNumber))}
          $color={statusColor}
          aria-hidden
        />
      )}
      <StatusTitle>{statusName}</StatusTitle>
    </Status>
  );
}

export default ActionStatus;
