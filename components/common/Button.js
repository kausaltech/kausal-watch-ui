import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import { Button as BSButton } from 'reactstrap';

const StyledButton = styled(BSButton)`

  padding: ${(props) => props.theme.inputBtnPaddingY} ${(props) => props.theme.inputBtnPaddingX};
  border-radius: ${(props) => props.theme.btnBorderRadius};
  border-width: ${(props) => props.theme.btnBorderWidth};

  &.btn {
    &:not(:disabled):not(.disabled):active:focus, &:not(:disabled):not(.disabled):focus, &.focus {
      box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
    }
  }

  &.btn-primary {
    background-color: ${(props) => props.theme.brandDark};
    border-color: ${(props) => props.theme.brandDark};

    &:hover {
      background-color: ${(props) => darken(0.05, props.theme.brandDark)};
      border-color: ${(props) => darken(0.05, props.theme.brandDark)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => darken(0.075, props.theme.brandDark)};
      border-color: ${(props) => darken(0.075, props.theme.brandDark)};
    }
  }

  &.btn-secondary {
    background-color: ${(props) => props.theme.brandLight};
    border-color: ${(props) => props.theme.brandLight};

    &:hover {
      background-color: ${(props) => darken(0.05, props.theme.brandLight)};
      border-color: ${(props) => darken(0.1, props.theme.brandLight)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => darken(0.1, props.theme.brandLight)};
      border-color: ${(props) => darken(0.1, props.theme.brandLight)};
    }
  }

  &.btn-outline-primary {
    color: ${(props) => props.theme.brandDark} !important;
    border-color: ${(props) => props.theme.brandDark} !important;

    svg {
      fill: ${(props) => props.theme.brandDark} !important;
    }

    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.brandDark)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.brandDark)};
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

  &.btn-link {
    color: ${(props) => props.theme.brandDark};

    &:hover {
      text-decoration: none;
      background-color: ${(props) => transparentize(0.9, props.theme.brandDark)};
    }

    &:not(:disabled):not(.disabled):active {
      background-color: ${(props) => transparentize(0.8, props.theme.brandDark)};
    }
  }
`;

function Button(props) {
  const { children } = props;

  return (
    <StyledButton {...props}>{ children }</StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
