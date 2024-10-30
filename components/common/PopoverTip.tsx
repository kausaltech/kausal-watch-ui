import React, { useState } from 'react';

//import { Button } from 'reactstrap';
import { useTranslations } from 'next-intl';
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from 'react-aria-components';
import styled from 'styled-components';

const InfoTooltip = styled(Tooltip)`
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 4px;
  background: ${({ theme }) => theme.themeColors.black};
  color: ${({ theme }) => theme.themeColors.white};
  forced-color-adjust: none;
  outline: none;
  padding: 2px 8px;
  max-width: 150px;
  /* fixes FF gap */
  transform: translate3d(0, 0, 0);

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
const InfoButton = styled(Button)`
  padding: 0 0.25rem 0.1rem;
  line-height: 0.5rem;
  opacity: 0.75;
  background-color: transparent;
  border: none;

  svg {
    fill: ${(props) =>
      props.$invert === 'true'
        ? props.theme.themeColors.white
        : props.theme.themeColors.black};
  }

  &:hover {
    opacity: 1;
  }
`;

/* TODO: make this accessible */
/* TODO: Use icon from theme */
type PopoverTipProps = {
  content: string;
  identifier: string;
  invert?: boolean;
};

const PopoverTip = (props: PopoverTipProps) => {
  const { content, identifier, invert = false } = props;
  const t = useTranslations();
  const id = `tt-${identifier}`;

  return (
    <>
      <TooltipTrigger>
        <InfoButton
          invert={invert.toString()}
          id={id}
          aria-describedby={
            tooltipOpen ? `tt-content-${identifier}` : undefined
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
          >
            <title>{t('definition')}</title>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </InfoButton>
        <InfoTooltip>
          <OverlayArrow>
            <svg width={8} height={8} viewBox="0 0 8 8">
              <path d="M0 0 L4 4 L8 0" />
            </svg>
          </OverlayArrow>
          {content}
        </InfoTooltip>
      </TooltipTrigger>
    </>
  );
};

export default PopoverTip;
