import React from 'react';

import styled from '@emotion/styled';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import {
  Input as BSInput,
  Label as BSLabel,
  FormFeedback,
  FormGroup,
  InputProps,
} from 'reactstrap';

const GroupLabel = styled.div`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: 0.5rem;
`;

const Label = styled(BSLabel)`
  font-weight: normal;
  line-height: ${(props) => props.theme.lineHeightSm};
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const Checkbox = styled(BSInput)`
  margin-right: 0.5rem;
`;

type CheckboxOption = {
  value: string;
  label: string;
};

type CheckboxInputProps = Omit<InputProps, 'type'> & {
  heading: string;
  options: CheckboxOption[];
  id: string;
  formFeedback?: string;
  value?: string[];
  onChange: ControllerRenderProps['onChange'];
};

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(function CheckboxInput(
  props: CheckboxInputProps,
  ref
) {
  const { heading, options, id, formFeedback, value = [], onChange, ...rest } = props;

  const handleChange = (optionValue: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newValue = isChecked ? [...value, optionValue] : value.filter((v) => v !== optionValue);

    onChange(newValue);
  };

  return (
    <FormGroup>
      <GroupLabel>{heading}</GroupLabel>
      {options.map((option, index) => (
        <Label key={option.value} htmlFor={`${id}-${index}`}>
          <Checkbox
            id={`${id}-${index}`}
            type="checkbox"
            value={option.value}
            checked={value.includes(option.value)}
            onChange={handleChange(option.value)}
            {...rest}
          />
          {option.label}
        </Label>
      ))}
      {formFeedback && (
        <FormFeedback role="alert" className="d-block">
          {formFeedback}
        </FormFeedback>
      )}
    </FormGroup>
  );
});

export default CheckboxInput;
