import React from 'react';

import MuiCheckbox from '@mui/material/Checkbox';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MuiFormLabel, { type FormLabelProps } from '@mui/material/FormLabel';
import InputBase, { type InputBaseComponentProps } from '@mui/material/InputBase';

import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

/*
 * Form building blocks on MUI with reactstrap's API and Bootstrap's look.
 *
 * The values are Bootstrap's compiled ones, which are the same for every plan.
 * The elements keep Bootstrap's class names (`form-control`, `form-check-input`,
 * `form-label`, …), which parent components use as styling hooks.
 */

const classes = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ');

// Bootstrap's compiled form values
const BORDER_COLOR = '#dee2e6';
const BODY_COLOR = '#212529';
const CHECKED_COLOR = 'rgb(16, 114, 81)';
const FOCUS_BORDER_COLOR = 'rgb(136, 185, 168)';
const FOCUS_SHADOW = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
const INVALID_COLOR = '#dc3545';
const svg = (content: string, viewBox: string) =>
  `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}'%3e${content}%3c/svg%3e")`;
const SELECT_INDICATOR = svg(
  "%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e",
  '0 0 16 16'
);
const CHECK_MARK = svg(
  "%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e",
  '0 0 20 20'
);
const switchKnob = (fill: string) => svg(`%3ccircle r='3' fill='${fill}'/%3e`, '-4 -4 8 8');
const SWITCH_KNOB = switchKnob('rgba%280, 0, 0, 0.25%29');
const SWITCH_KNOB_FOCUS = switchKnob('rgb%2853.137254902%, 72.3529411765%, 65.8823529412%%29');
const SWITCH_KNOB_CHECKED = switchKnob('%23fff');

/* FormGroup */

type FormGroupProps = FormControlProps & {
  check?: boolean;
  switch?: boolean;
};

// Base styles stay single-class so that callers' own styles still override them.
const FieldGroup = styled(FormControl)`
  display: block;
  margin-bottom: 1rem;
`;

const CheckGroup = styled(FormControl, transientOptions)<{ $switch: boolean }>`
  display: block;
  min-height: 1.666rem;
  margin-bottom: 0.125rem;
  padding-left: ${({ $switch }) => ($switch ? '2.5em' : '1.5em')};
`;

export function FormGroup({ check, switch: isSwitch, className, ...props }: FormGroupProps) {
  if (check || isSwitch) {
    return (
      <CheckGroup
        $switch={!!isSwitch}
        className={classes('form-check', isSwitch && 'form-switch', className)}
        {...props}
      />
    );
  }
  return <FieldGroup className={classes('mb-3', className)} {...props} />;
}

/* Label */

type LabelProps = FormLabelProps & {
  /** reactstrap's name for `htmlFor` */
  for?: string;
  /** A checkbox or switch label */
  check?: boolean;
};

const labelBase = `
  display: inline-block;
  font: inherit;
  letter-spacing: normal;
  color: inherit;

  &.Mui-focused,
  &.Mui-error,
  &.Mui-disabled {
    color: inherit;
  }
`;

const FieldLabel = styled(MuiFormLabel)`
  ${labelBase}
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const CheckLabel = styled(MuiFormLabel)`
  ${labelBase}
`;

export function Label({ for: forProp, htmlFor, check, className, ...props }: LabelProps) {
  const Component = check ? CheckLabel : FieldLabel;
  return (
    <Component
      htmlFor={htmlFor ?? forProp}
      className={classes(check ? 'form-check-label' : 'form-label', className)}
      {...props}
    />
  );
}

/* Input */

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'> & {
  value?: string | number | readonly string[] | null;
  type?: string;
  /** Mark the field as invalid */
  invalid?: boolean;
  /** reactstrap's small size */
  bsSize?: 'sm';
  rows?: number | string;
  innerRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  children?: React.ReactNode;
};

// MUI InputBase's root only wraps the native element, which carries the look.
const InputRoot = styled(InputBase)`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  font: inherit;
  letter-spacing: normal;
  color: inherit;

  &:hover,
  &.Mui-focused,
  &.Mui-error {
    border: 0;
    box-shadow: none;
  }
`;

const controlStyles = `
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${BODY_COLOR};
  appearance: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 4px;

  &:focus {
    outline: 0;
    border-color: ${FOCUS_BORDER_COLOR};
  }

  &:disabled {
    background-color: #e9ecef;
  }

  &.Mui-disabled {
    -webkit-text-fill-color: currentColor;
  }

  &.is-invalid {
    border-color: ${INVALID_COLOR};
  }

  &.form-control-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  }
`;

// The native elements replace MUI's styled input through `slots.input`, so
// MUI's input styles don't apply and the caller's styles merge after these.
const NativeInput = styled.input`
  ${controlStyles}

  &:focus {
    box-shadow: ${FOCUS_SHADOW};
  }

  &::placeholder {
    color: rgba(33, 37, 41, 0.75);
    opacity: 1;
  }
`;

const NativeTextarea = styled.textarea`
  ${controlStyles}
  min-height: calc(1.5em + 2px + 1rem);

  &:focus {
    box-shadow: ${FOCUS_SHADOW};
  }
`;

const NativeSelect = styled.select`
  ${controlStyles}
  padding-right: 2.25rem;
  background-image: ${SELECT_INDICATOR};
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(78, 128, 166);
  }
`;

const CheckRoot = styled(MuiCheckbox)`
  padding: 0;
  margin-top: 0.333em;
  vertical-align: top;
  border-radius: 0;
  font-size: inherit;

  .form-check > & {
    float: left;
    margin-left: -1.5em;
  }

  .form-switch > & {
    margin-left: -2.5em;
  }

  &.Mui-focusVisible {
    box-shadow: none;

    .form-check-input {
      border-color: ${FOCUS_BORDER_COLOR};
      box-shadow: ${FOCUS_SHADOW};
    }

    .form-check-input.switch:not(.checked) {
      background-image: ${SWITCH_KNOB_FOCUS};
    }
  }

  &.Mui-disabled {
    opacity: 0.5;
  }

  &.Mui-disabled ~ .form-check-label {
    opacity: 0.5;
    cursor: default;
  }
`;

const CheckBox = styled('span', transientOptions)<{ $switch: boolean; $checked: boolean }>`
  display: block;
  float: none;
  flex-shrink: 0;
  width: ${({ $switch }) => ($switch ? '2em' : '1em')};
  height: 1em;
  margin: 0;
  background-color: ${({ $checked }) => ($checked ? CHECKED_COLOR : '#fff')};
  background-image: ${({ $switch, $checked }) =>
    $switch ? ($checked ? SWITCH_KNOB_CHECKED : SWITCH_KNOB) : $checked ? CHECK_MARK : 'none'};
  background-position: ${({ $switch, $checked }) =>
    $switch ? ($checked ? '100% center' : '0 center') : 'center'};
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid ${({ $checked }) => ($checked ? CHECKED_COLOR : BORDER_COLOR)};
  border-radius: ${({ $switch }) => ($switch ? '2em' : '0.25em')};
  print-color-adjust: exact;
`;

function CheckIcon({ isSwitch, checked }: { isSwitch: boolean; checked: boolean }) {
  return (
    <CheckBox
      className={classes('form-check-input', isSwitch && 'switch', checked && 'checked')}
      $switch={isSwitch}
      $checked={checked}
    />
  );
}

/**
 * reactstrap's `Input`: a text field, textarea, select, checkbox or switch,
 * depending on `type`.
 */
export const Input = React.forwardRef<HTMLElement, InputProps>(function Input(
  { type = 'text', invalid, bsSize, innerRef, className, style, children, rows, ...props },
  ref
) {
  const inputRef = innerRef ?? ref;

  if (type === 'checkbox' || type === 'switch') {
    const { checked, defaultChecked, onChange, id, name, value, disabled, role, ...rest } = props;
    const isSwitch = type === 'switch';
    return (
      <CheckRoot
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        className={className}
        style={style}
        icon={<CheckIcon isSwitch={isSwitch} checked={false} />}
        checkedIcon={<CheckIcon isSwitch={isSwitch} checked={true} />}
        slotProps={{
          input: {
            ref: inputRef as React.Ref<HTMLInputElement>,
            role: role ?? (isSwitch ? 'switch' : undefined),
            ...rest,
          },
        }}
      />
    );
  }

  const isSelect = type === 'select';
  const isTextarea = type === 'textarea';
  const bootstrapClass = classes(
    isSelect ? 'form-select' : 'form-control',
    bsSize && (isSelect ? `form-select-${bsSize}` : `form-control-${bsSize}`),
    invalid && 'is-invalid'
  );
  const {
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    id,
    name,
    placeholder,
    disabled,
    ...rest
  } = props;

  return (
    <InputRoot
      slots={{ input: isSelect ? NativeSelect : isTextarea ? NativeTextarea : NativeInput }}
      inputComponent={
        (isSelect
          ? 'select'
          : isTextarea
            ? 'textarea'
            : 'input') as React.ElementType<InputBaseComponentProps>
      }
      type={isSelect || isTextarea ? undefined : type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      error={invalid}
      inputRef={inputRef}
      inputProps={{ className: classes(bootstrapClass, className), style, children, rows, ...rest }}
    />
  );
});

/* FormFeedback */

type FormFeedbackProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** Show as a tooltip below the field, as in an InputGroup */
  tooltip?: boolean;
};

const StyledFeedback = styled(FormHelperText)`
  width: 100%;
  margin: 0.25rem 0 0;
  font: inherit;
  font-size: 0.875em;
  letter-spacing: normal;

  &,
  &.Mui-error {
    color: ${INVALID_COLOR};
  }

  &.invalid-tooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    width: auto;
    max-width: 100%;
    margin-top: 0.1rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.375rem;

    &,
    &.Mui-error {
      color: #fff;
      background-color: #a73939;
    }
  }
`;

/**
 * A validation message for the field before it. Renders nothing without
 * content.
 */
export function FormFeedback({ tooltip, className, children, ...props }: FormFeedbackProps) {
  if (!children) return null;
  return (
    <StyledFeedback
      error
      className={classes(tooltip ? 'invalid-tooltip' : 'invalid-feedback', className)}
      {...props}
    >
      {children}
    </StyledFeedback>
  );
}

/* InputGroup and Form */

const StyledInputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  > .MuiInputBase-root {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }

  > :not(:first-child):not(.invalid-tooltip):not(.invalid-feedback) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <StyledInputGroup className={classes('input-group', className)} {...props} />;
}

export function Form(props: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} />;
}
