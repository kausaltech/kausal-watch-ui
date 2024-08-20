import React from 'react';
import {
  Input as BSInput,
  FormGroup,
  Label as BSLabel,
  FormFeedback,
  InputProps,
} from 'reactstrap';
import styled from 'styled-components';

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  function CheckboxInput(props: CheckboxInputProps, ref) {
    const {
      heading,
      options,
      id,
      formFeedback,
      value = [],
      onChange,
      ...rest
    } = props;

    const handleChange =
      (optionValue: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked
          ? [...value, optionValue]
          : value.filter((v) => v !== optionValue);

        const event = {
          target: { value: newValue },
        };

        onChange(event as React.ChangeEvent<HTMLInputElement>);
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
              innerRef={index === 0 ? ref : undefined}
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
  }
);

export default CheckboxInput;
