import React, { useCallback, useState } from 'react';
import {
  FormGroup,
  Label as BSLabel,
  Input as BSCustomInput,
} from 'reactstrap';
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';

import styled from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CustomInput = styled(BSCustomInput)`
  padding: ${(props) => props.theme.inputPaddingY}
    ${(props) => props.theme.inputPaddingX};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em +
      ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};
  background: no-repeat right 0.75rem center/10px 10px;
  background-color: ${(props) => props.theme.inputBg};
  background-image: ${(props) => props.theme.customSelectIndicator};
`;

function DropDown(props) {
  const { label, id, name, value, onChange, children, disabled } = props;
  const [singleSelections, setSingleSelections] = useState([]);

  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <CustomInput
        type="select"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </CustomInput>
    </FormGroup>
  );
}

export default DropDown;

export type DropDownTypeaheadOption = {
  id: string;
  label: string;
  indent?: number;
};

type DropDownTypeaheadProps = {
  label?: string;
  id: string;
  name: string;
  options: DropDownTypeaheadOption[];
  selectedOption: DropDownTypeaheadOption | null;
  placeholder?: string;
  onChange: (selected: DropDownTypeaheadOption | null) => void;
};

export function DropDownTypeahead(props: DropDownTypeaheadProps) {
  const { label, id, name, placeholder, selectedOption, onChange, options } =
    props;
  const [selection, setSelection] = useState(
    selectedOption ? [selectedOption] : []
  );
  const typeaheadOnChange = useCallback(
    (selected: DropDownTypeaheadOption[]) => {
      setSelection(selected);
      onChange(selected.length ? selected[0] : null);
    },
    [setSelection, onChange]
  );

  const renderMenu = (results, menuProps) => (
    <Menu {...menuProps}>
      {results.map((result: DropDownTypeaheadOption, index) => (
        <MenuItem
          key={result.id}
          style={{
            marginLeft: `${result.indent ?? 0}rem`,
            borderLeft: '1px solid #ccc',
          }}
          option={result}
          position={index}
        >
          {result.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Typeahead
        id={id}
        onChange={typeaheadOnChange}
        options={options}
        placeholder={placeholder}
        selected={selection}
        renderMenu={renderMenu}
      />
      {/* 
        renderMenu={(results, menuProps) => (
        )}
    */}
    </FormGroup>
  );
}
