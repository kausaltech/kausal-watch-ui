import React from 'react';
import {
  Input as BSInput, FormGroup, Label as BSLabel, FormFeedback, InputProps,
} from 'reactstrap';

import styled from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Input = styled(BSInput)`
  padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  background-color: ${(props) => props.theme.inputBg};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};

  ::placeholder {
    color: ${(props) => props.theme.graphColors.grey070};
  }
`;


type TextInputProps = InputProps & {
  label?: string,
  id: string,
  placeholder?: string,
  formFeedback?: string,
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props: TextInputProps, ref) {
  const {
    label,
    id,
    placeholder,
    formFeedback,
    ...rest
  } = props;
  return (
    <FormGroup>
      { label && (
        <Label for={id}>
          { label }
        </Label>
      )}
      <Input
        id={id}
        placeholder={placeholder}
        {...rest}
        innerRef={ref}
      />
      {formFeedback ?? (<FormFeedback role="alert">{formFeedback}</FormFeedback>)}
    </FormGroup>
  );
});

export default TextInput;
