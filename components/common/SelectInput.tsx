import React from 'react';
import {
  Input as BSInput,
  FormGroup,
  Label as BSLabel,
  FormFeedback,
  InputProps,
} from 'reactstrap';
import styled from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Select = styled(BSInput)`
  padding: ${(props) => props.theme.inputPaddingY}
    ${(props) => props.theme.inputPaddingX};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em +
      ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  background-color: ${(props) => props.theme.inputBg};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};
`;

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = InputProps & {
  label?: string;
  id: string;
  options: Option[];
  formFeedback?: string;
};

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  function SelectInput(props: SelectInputProps, ref) {
    const { label, id, options, formFeedback, ...rest } = props;
    return (
      <FormGroup>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Select id={id} type="select" {...rest} innerRef={ref}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {formFeedback && (
          <FormFeedback role="alert">{formFeedback}</FormFeedback>
        )}
      </FormGroup>
    );
  }
);

export default SelectInput;
