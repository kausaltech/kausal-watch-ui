import React from 'react';
import {
  Input as BSInput,
  FormGroup,
  Label as BSLabel,
} from 'reactstrap';

import styled from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: 700;
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Input = styled(BSInput)`
  padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  background-color: ${(props) => props.theme.inputBg};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
`;

function TextInput(props) {
  const {
    label,
    id,
    placeholder,
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
        name="search"
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </FormGroup>
  );
}

export default TextInput;
