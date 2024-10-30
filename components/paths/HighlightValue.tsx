import React, { useState } from 'react';

import styled from 'styled-components';

const TotalValue = styled.div<{ $size?: string; $muted?: boolean }>`
  padding: 0.5rem;
  line-height: 1.2;
  font-weight: 700;
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '1.25rem';
      case 'lg':
        return '2.25rem';
      case 'md':
      default:
        return '1.5rem';
    }
  }};
  background-color: ${({ $muted, theme }) =>
    $muted ? theme.cardBackground.secondary : theme.themeColors.white};
  color: ${({ $muted, theme }) =>
    $muted ? theme.textColor.tertiary : theme.textColor.primary};

  &:hover {
    color: ${({ theme }) => theme.textColor.secondary};

    > div {
      color: ${({ theme }) => theme.textColor.secondary};
    }

    svg {
      fill: ${({ theme }) => theme.textColor.secondary};
    }
  }
`;

const TotalUnit = styled.span<{ $size?: string }>`
  margin-left: 0.25rem;
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '0.6rem';
      case 'lg':
        return '1rem';
      case 'md':
      default:
        return '0.75rem';
    }
  }};
`;

const YearRange = styled.div<{ $size?: string }>`
  display: flex;
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '0.6rem';
      case 'lg':
        return '1rem';
      case 'md':
      default:
        return '0.75rem';
    }
  }};
  color: ${({ theme }) => theme.textColor.secondary};
`;

const MutedReason = styled.div`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.themeColors.dark};
  color: ${({ theme }) => theme.themeColors.white};
  margin-bottom: 0.25rem;
`;

type HighlightValueProps = {
  displayValue: string;
  header: string;
  unit: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
  mutedReason?: string;
};

const HighlightValue = (props: HighlightValueProps) => {
  const {
    displayValue,
    header,
    unit,
    className,
    size = 'md',
    muted,
    mutedReason,
  } = props;

  const id = `tt-${displayValue}`.replace(/\W/g, '_');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      {mutedReason ? <MutedReason>{mutedReason}</MutedReason> : null}
      <TotalValue className={className} $size={size} $muted={muted} id={id}>
        <YearRange $size={size}>
          <span dangerouslySetInnerHTML={{ __html: header }} />
        </YearRange>
        {displayValue}
        <TotalUnit dangerouslySetInnerHTML={{ __html: unit }} $size={size} />
      </TotalValue>
    </>
  );
};

export default HighlightValue;
