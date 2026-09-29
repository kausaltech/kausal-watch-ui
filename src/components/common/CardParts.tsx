import React from 'react';

import MuiCard, { type CardProps as MuiCardProps } from '@mui/material/Card';

import styled from '@emotion/styled';

/*
 * Card building blocks, with the card itself on MUI, laid out like Bootstrap's
 * card so the look stays the same. They keep Bootstrap's class names (`card`,
 * `card-body`, …), which parent components use as styling hooks.
 */

const withClass = (base: string, className?: string) => (className ? `${base} ${className}` : base);

const StyledCard = styled(MuiCard)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: visible;
  overflow-wrap: break-word;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 0.5rem;
`;

export const Card = React.forwardRef<HTMLDivElement, MuiCardProps>(function Card(
  { className, ...props },
  ref
) {
  return <StyledCard ref={ref} className={withClass('card', className)} {...props} />;
});

// A plain div rather than MUI's CardContent: its last-child padding rule would
// override the padding that parent components set on `.card-body`.
const StyledCardBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem;
`;

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <StyledCardBody ref={ref} className={withClass('card-body', className)} {...props} />;
  }
);

const StyledCardTitle = styled.div`
  margin-bottom: 0.5rem;
`;

type CardTitleProps = React.HTMLAttributes<HTMLElement> & {
  /** The element to render, a `div` by default. */
  as?: React.ElementType;
};

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <StyledCardTitle className={withClass('card-title', className)} {...props} />;
}

const StyledCardFooter = styled.div`
  padding: 0.5rem 1rem;
  background-color: rgba(33, 37, 41, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.175);

  &:last-child {
    border-radius: 0 0 calc(0.5rem - 1px) calc(0.5rem - 1px);
  }
`;

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <StyledCardFooter className={withClass('card-footer', className)} {...props} />;
}

const StyledCardImgOverlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 1rem;
  border-radius: calc(0.5rem - 1px);
`;

export function CardImgOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <StyledCardImgOverlay className={withClass('card-img-overlay', className)} {...props} />;
}
