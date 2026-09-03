import { type ChangeEventHandler, type ReactNode, useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { Menu, MenuItem, Typeahead } from 'react-bootstrap-typeahead';
import type { RenderMenuProps } from 'react-bootstrap-typeahead/types/components/Typeahead/Typeahead';
import type { Option } from 'react-bootstrap-typeahead/types/types';
import { Input as BSCustomInput, Label as BSLabel, FormGroup } from 'reactstrap';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const CustomInput = styled(BSCustomInput)`
  padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width: ${(props) => props.theme.inputBorderWidth};
  border-color: ${(props) => props.theme.themeColors.dark};
  background: no-repeat right 0.75rem center/10px 10px;
  background-color: ${(props) => props.theme.inputBg};
  background-image: ${(props) => props.theme.customSelectIndicator};
`;

type DropDownProps = {
  children: ReactNode;
  disabled?: boolean;
  id: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: number | readonly string[] | string;
};

function DropDown(props: DropDownProps) {
  const { label, id, name, value, onChange, children, disabled } = props;
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

const isDropDownTypeaheadOption = (option: Option): option is DropDownTypeaheadOption =>
  typeof option !== 'string' && typeof option.id === 'string' && typeof option.label === 'string';

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
  const { label, id, placeholder, selectedOption, onChange, options } = props;
  const [selection, setSelection] = useState(selectedOption ? [selectedOption] : []);
  const typeaheadOnChange = useCallback(
    (selected: Option[]) => {
      const typedSelection = selected.filter(isDropDownTypeaheadOption);
      setSelection(typedSelection);
      onChange(typedSelection[0] ?? null);
    },
    [setSelection, onChange]
  );

  const renderMenu = (results: Option[], menuProps: RenderMenuProps) => (
    <Menu {...menuProps}>
      {results.filter(isDropDownTypeaheadOption).map((result, index) => (
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
