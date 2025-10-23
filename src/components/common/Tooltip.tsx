import React from 'react';

import { Tooltip as AriaTooltip, OverlayArrow, TooltipTrigger } from 'react-aria-components';
import styled from 'styled-components';

const StyledTooltip = styled(AriaTooltip)`
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 4px;
  background: ${({ theme }) => theme.themeColors.black};
  color: ${({ theme }) => theme.themeColors.white};
  font-size: ${({ theme }) => theme.fontSizeSm};
  forced-color-adjust: none;
  outline: none;
  padding: 10px 8px;
  max-width: 250px;
  /* fixes FF gap */
  transform: translate3d(0, 0, 0);
  line-height: ${({ theme }) => theme.lineHeightSm};

  &[data-placement='top'] {
    margin-bottom: 8px;
    --origin: translateY(4px);
  }

  &[data-placement='bottom'] {
    margin-top: 8px;
    --origin: translateY(-4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(180deg);
    }
  }

  &[data-placement='right'] {
    margin-left: 8px;
    --origin: translateX(-4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(90deg);
    }
  }

  &[data-placement='left'] {
    margin-right: 8px;
    --origin: translateX(4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(-90deg);
    }
  }

  & .react-aria-OverlayArrow svg {
    display: block;
    fill: var(--highlight-background);
  }

  &[data-entering] {
    animation: slide 200ms;
  }

  &[data-exiting] {
    animation: slide 200ms reverse ease-in;
  }

  @keyframes slide {
    from {
      transform: var(--origin);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

type TooltipProps = {
  children: React.ReactNode;
};
const Tooltip = (props: TooltipProps) => {
  const { children } = props;
  return (
    <StyledTooltip>
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </StyledTooltip>
  );
};

export { TooltipTrigger };
export default Tooltip;
