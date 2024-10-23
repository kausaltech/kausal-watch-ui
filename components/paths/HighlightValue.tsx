import React, { useState } from 'react';

import styled from 'styled-components';

const TotalValue = styled.div<{ $size?: string; $muted?: boolean }>`
  padding: 0;
  line-height: 1.2;
  font-weight: 700;
  font-size: ${({ $size }) => ($size === 'sm' ? '1.25' : '1.5')}rem;
  color: ${({ $muted, theme }) =>
    $muted ? theme.textColor.tertiary : theme.textColor.secondary};

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
  font-size: ${({ $size }) => ($size === 'sm' ? '0.6' : '0.75')}rem;
`;

const YearRange = styled.div<{ $size?: string }>`
  display: flex;
  font-size: ${({ $size }) => ($size === 'sm' ? '0.6' : '0.75')}rem;
  color: ${({ theme }) => theme.textColor.secondary};
`;

type HighlightValueProps = {
  displayValue: string;
  header: string;
  unit: string;
  className?: string;
  size?: string;
  muted?: boolean;
};

const HighlightValue = (props: HighlightValueProps) => {
  const { displayValue, header, unit, className, size, muted } = props;

  const id = `tt-${displayValue}`.replace(/\W/g, '_');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <TotalValue className={className} $size={size} $muted={muted} id={id}>
      <YearRange $size={size}>
        <span dangerouslySetInnerHTML={{ __html: header }} />
      </YearRange>
      {displayValue}
      <TotalUnit dangerouslySetInnerHTML={{ __html: unit }} $size={size} />
    </TotalValue>
  );
};

export default HighlightValue;
