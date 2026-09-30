import React from 'react';

import styled from '@emotion/styled';

import {
  Input as BSInput,
  Label as BSLabel,
  FormFeedback,
  FormGroup,
  FormText,
  type InputProps,
} from 'reactstrap';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Input = styled(BSInput)`
  padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  background-color: ${(props) => props.theme.inputBg};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};

  ::placeholder {
    color: ${(props) => props.theme.textColor.tertiary};
  }
`;

type TextInputProps = InputProps & {
  label?: string;
  id: string;
  placeholder?: string;
  formFeedback?: string;
  helpText?: string;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  props: TextInputProps,
  ref
) {
  const { label, id, placeholder, formFeedback, helpText, ...rest } = props;
  const helpTextId = helpText ? `${id}-help` : undefined;
  return (
    <FormGroup>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        placeholder={placeholder}
        aria-describedby={helpTextId}
        {...rest}
        innerRef={ref}
      />
      {helpText && <FormText id={helpTextId}>{helpText}</FormText>}
      {formFeedback && <FormFeedback role="alert">{formFeedback}</FormFeedback>}
    </FormGroup>
  );
});

export default TextInput;
