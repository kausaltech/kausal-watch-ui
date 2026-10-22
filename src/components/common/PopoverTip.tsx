'use client';

import type React from 'react';
import { useState } from 'react';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import Tooltip from './Tooltip';

/** WCAG 2.5.8: pointer targets of at least 24×24 px */
const TARGET_SIZE = 24;
const ICON_SIZE = 14;

const InfoButton = styled.button<{ $invert: string; $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  min-width: ${TARGET_SIZE}px;
  min-height: ${TARGET_SIZE}px;
  padding: 0;
  /* The negative margins keep the larger target from growing the line */
  margin: ${-(TARGET_SIZE - ICON_SIZE) / 2}px
    ${(p) => (p.$compact ? -(TARGET_SIZE - ICON_SIZE) / 2 : -(TARGET_SIZE - ICON_SIZE) / 2 + 4)}px;
  line-height: 1;
  background-color: transparent;
  border: none;

  svg {
    fill: ${(props) =>
      props.$invert === 'true' ? props.theme.themeColors.white : props.theme.themeColors.black};
  }

  @media print {
    display: none;
  }
`;

/* TODO: Use icon from theme */
type PopoverTipProps = {
  content: React.ReactNode;
  identifier: string;
  invert?: boolean;
  compact?: boolean;
};

/**
 * An info button with a toggletip. Hovering or focusing it shows the content;
 * pressing it pins the content open and announces it to screen readers.
 * Escape or moving focus away closes it.
 */
const PopoverTip = (props: PopoverTipProps) => {
  const { content, identifier, invert = false, compact = false } = props;
  const t = useTranslations();
  const id = `tt-${identifier}`;
  // Opened by hovering or keyboard focus, as MUI's tooltip decides
  const [autoOpen, setAutoOpen] = useState(false);
  // Opened by pressing the button
  const [pinned, setPinned] = useState(false);

  return (
    <>
      <Tooltip
        title={content}
        describeChild
        open={autoOpen || pinned}
        onOpen={() => setAutoOpen(true)}
        onClose={() => setAutoOpen(false)}
      >
        <InfoButton
          type="button"
          $invert={invert.toString()}
          $compact={compact}
          id={id}
          aria-label={t('definition')}
          onClick={() => setPinned((value) => !value)}
          onBlur={() => setPinned(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setPinned(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill="currentColor"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </InfoButton>
      </Tooltip>
      {/* Announces the content when the button is pressed */}
      <span role="status" className="visually-hidden">
        {pinned ? content : null}
      </span>
    </>
  );
};

export default PopoverTip;
