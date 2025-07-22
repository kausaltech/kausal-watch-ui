import React from 'react';

import { readableColor, shade, transparentize } from 'polished';
import { Button as BSButton, type ButtonProps as BSButtonProps } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(BSButton)`
  padding: ${({ theme }) => `${theme.inputBtnPaddingY} ${theme.inputBtnPaddingX}`};
  border-radius: ${({ theme }) => theme.btnBorderRadius};
  border-width: ${({ theme }) => theme.btnBorderWidth};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &.btn {
    &:not(:disabled):not(.disabled):active:focus,
    &:not(:disabled):not(.disabled):focus,
    &.focus {
      box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
    }
  }

  &.btn-primary {
    background-color: ${(props) => props.theme.brandDark};
    border-color: ${(props) => props.theme.brandDark};
    color: ${(props) =>
      readableColor(
        props.theme.brandDark,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};

    &:hover {
      background-color: ${(props) => shade(0.05, props.theme.brandDark)};
      border-color: ${(props) => shade(0.05, props.theme.brandDark)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => shade(0.075, props.theme.brandDark)};
      border-color: ${(props) => shade(0.075, props.theme.brandDark)};
    }
  }

  &.btn-secondary {
    background-color: ${(props) => props.theme.brandLight};
    border-color: ${(props) => props.theme.brandLight};

    &:hover {
      background-color: ${(props) => shade(0.05, props.theme.brandLight)};
      border-color: ${(props) => shade(0.1, props.theme.brandLight)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => shade(0.1, props.theme.brandLight)};
      border-color: ${(props) => shade(0.1, props.theme.brandLight)};
    }
  }

  &.btn-outline-primary {
    color: ${(props) => props.theme.linkColor} !important;
    border-color: ${(props) => props.theme.linkColor} !important;

    svg {
      fill: ${(props) => props.theme.linkColor} !important;
    }

    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.linkColor)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.linkColor)};
    }
  }

  &.btn-outline-secondary {
    color: ${(props) => props.theme.brandLight} !important;
    border-color: ${(props) => props.theme.brandLight} !important;

    svg {
      fill: ${(props) => props.theme.brandLight} !important;
    }

    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.brandLight)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.brandLight)};
    }
  }

  &.btn-outline-light {
    color: ${(props) => props.theme.themeColors.light} !important;
    border-color: ${(props) => props.theme.themeColors.light} !important;

    svg {
      fill: ${(props) => props.theme.themeColors.light} !important;
    }

    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.themeColors.light)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.themeColors.light)};
    }
  }

  &.btn-outline-dark {
    color: ${(props) => props.theme.themeColors.dark} !important;
    border-color: ${(props) => props.theme.themeColors.dark} !important;

    svg {
      fill: ${(props) => props.theme.themeColors.dark} !important;
    }

    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
    }
  }

  &.btn-link {
    color: ${(props) => props.theme.linkColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
      background-color: ${(props) => transparentize(0.9, props.theme.linkColor)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.linkColor)};
    }
  }
`;

type ButtonProps = BSButtonProps & {
  /**
   * Button rendered as outline
   */
  outline?: boolean;
  /**
   * Button active state
   */
  active?: boolean;
  /**
   * Render as close button
   */
  close?: boolean;
  /**
   * Render as block button
   */
  block?: boolean;
  /**
   * What background color to use
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'lg';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = React.forwardRef<typeof StyledButton, ButtonProps>((props, ref) => {
  const { children } = props;

  // TODO: Do we need a ref here?
  return <StyledButton {...props}>{children}</StyledButton>;
});

Button.displayName = 'Button';

export default Button;
