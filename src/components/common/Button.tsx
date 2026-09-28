import React from 'react';

import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { readableColor, shade, transparentize } from 'polished';

import { transientOptions } from '@common/themes/styles/styled';

type ButtonColor = 'primary' | 'secondary' | 'light' | 'dark' | 'black';

/**
 * `link` renders a text button styled like a link; `text` renders a plain
 * button in the surrounding text colour.
 */
type ButtonVariant = 'contained' | 'outlined' | 'link' | 'text';

export type ButtonProps = Omit<MuiButtonProps, 'color' | 'variant'> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
};

function getButtonColor(theme: Theme, color: ButtonColor, variant: ButtonVariant) {
  switch (color) {
    case 'primary':
      return variant === 'contained' ? theme.brandDark : theme.linkColor;
    case 'secondary':
      return theme.brandLight;
    case 'light':
      return theme.themeColors.light;
    case 'dark':
      return theme.themeColors.dark;
    case 'black':
      return theme.themeColors.black;
  }
}

const variantStyles = ({
  theme,
  $color,
  $variant,
}: {
  theme: Theme;
  $color: ButtonColor;
  $variant: ButtonVariant;
}) => {
  if ($variant === 'text') {
    return css`
      color: inherit;

      &:hover {
        background-color: transparent;
      }
    `;
  }

  if ($variant === 'link') {
    return css`
      color: ${theme.linkColor};
      text-decoration: underline;

      &:hover {
        text-decoration: none;
        background-color: ${transparentize(0.9, theme.linkColor)};
      }

      &:active {
        background-color: ${transparentize(0.8, theme.linkColor)};
      }
    `;
  }

  const color = getButtonColor(theme, $color, $variant);

  if ($variant === 'outlined') {
    return css`
      color: ${color};
      border-color: ${color};

      svg {
        fill: ${color};
      }

      &:hover {
        border-color: ${color};
        background-color: ${transparentize(0.9, color)};
      }

      &:active {
        background-color: ${transparentize(0.8, color)};
      }

      &.Mui-disabled {
        color: ${color};
        border-color: ${color};
      }
    `;
  }

  const textColor = readableColor(color, theme.themeColors.black, theme.themeColors.white);
  return css`
    color: ${textColor};
    background-color: ${color};
    border-color: ${color};

    &:hover {
      background-color: ${shade(0.05, color)};
      border-color: ${shade(0.05, color)};
    }

    &:active {
      background-color: ${shade(0.075, color)};
      border-color: ${shade(0.075, color)};
    }

    &.Mui-disabled {
      color: ${textColor};
      background-color: ${color};
      border-color: ${color};
    }
  `;
};

const StyledButton = styled(MuiButton, transientOptions)<{
  $color: ButtonColor;
  $variant: ButtonVariant;
}>`
  display: inline-block;
  min-width: 0;
  text-align: center;
  vertical-align: middle;
  border: ${({ theme }) => theme.btnBorderWidth} solid transparent;
  font-size: ${({ theme }) => theme.fontSizeBase};
  line-height: ${({ theme }) => theme.lineHeightBase};
  letter-spacing: normal;
  text-decoration: none;

  &.MuiButton-sizeSmall {
    font-size: 0.75rem;
  }

  &.MuiButton-sizeLarge {
    font-size: ${({ theme }) => theme.fontSizeMd};
  }

  &.Mui-disabled {
    opacity: 0.65;
  }

  ${variantStyles}
`;

/**
 * A button in the plan theme's colours. Renders MUI's `Button`, with the
 * variant and colour mapped to the theme's brand and link colours.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'contained', color = 'primary', ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      variant={variant === 'link' ? 'text' : variant}
      color="inherit"
      $color={color}
      $variant={variant}
      {...props}
    />
  );
});

export default Button;
