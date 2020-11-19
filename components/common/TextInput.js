import React from 'react';
import {
  Input as BSInput,
  FormGroup,
  Label as BSLabel,
  FormFeedback,
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
`;

const TextInput = (props) => {
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
      />
      <FormFeedback role="alert">{formFeedback}</FormFeedback>
    </FormGroup>
  );
};

export default TextInput;
