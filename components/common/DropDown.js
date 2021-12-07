import React from 'react';
import {
  FormGroup,
  Label as BSLabel,
  Input as BSCustomInput,
} from 'reactstrap';

import styled from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CustomInput = styled(BSCustomInput)`
  padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};
  background: no-repeat right 0.75rem center/10px 10px;
  background-color: ${(props) => props.theme.inputBg};
  background-image: ${(props) => props.theme.customSelectIndicator};
`;

function DropDown(props) {
  const {
    label,
    id,
    name,
    value,
    onChange,
    children,
  } = props;

  return (
    <FormGroup>
      { label && (
        <Label for={id}>
          { label }
        </Label>
      )}
      <CustomInput
        type="select"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        { children }
      </CustomInput>
    </FormGroup>
  );
}

export default DropDown;
