import MuiTooltip, { type TooltipProps } from '@mui/material/Tooltip';

import styled from '@emotion/styled';

/**
 * A themed wrapper around the MUI Tooltip. Wrap the trigger element and pass
 * the tooltip content via the `title` prop:
 *
 *   <Tooltip title="More info"><button>?</button></Tooltip>
 */
const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip placement="top" arrow {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
    border-radius: 4px;
    background: ${({ theme }) => theme.themeColors.black};
    color: ${({ theme }) => theme.themeColors.white};
    font-size: ${({ theme }) => theme.fontSizeSm};
    line-height: ${({ theme }) => theme.lineHeightSm};
    padding: 10px 8px;
    max-width: 250px;
  }

  & .MuiTooltip-arrow {
    color: ${({ theme }) => theme.themeColors.black};
  }
`;

export default Tooltip;
