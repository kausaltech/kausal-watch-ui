import React from "react";
import Select, { components, DropdownIndicatorProps, Theme as SelectTheme } from "react-select";
import Highlighter from "react-highlight-words";
import { FormGroup, Label } from "reactstrap";
import { useTheme, Theme } from "common/theme";
import { data } from "autoprefixer";

function getSelectStyles<Option extends SelectDropdownOption>(theme: Theme, multi: boolean, size: string='') {
	const suffix = size ? `-${size}` : '';
	const multiplicator = multi ? 2 : 1;
  const styles: SelectDropdownProps<Option>['styles'] = {
		control: (provided, { isDisabled, isFocused }) => ({
			...provided,
			backgroundColor: `var(--bs-select${isDisabled ? '-disabled' : ''}-bg)`,
			borderColor: `var(--bs-select${isDisabled ? '-disabled' : (isFocused ? '-focus' : '')}-border-color)`,
			borderWidth: "var(--bs-select-border-width)",
			lineHeight: "var(--bs-select-line-height)",
			fontSize: `var(--bs-select-font-size${suffix})`,
			fontWeight: "var(--bs-select-font-weight)",
			minHeight: `calc((var(--bs-select-line-height)*var(--bs-select-font-size${suffix})) + (var(--bs-select-padding-y${suffix})*2) + (var(--bs-select-border-width)*2))`,
			':hover': {
				borderColor: "var(--bs-select-focus-border-color)",
			},
		}),
		singleValue: ({marginLeft, marginRight, ...provided}, { isDisabled }) => ({
			...provided,
			color: `var(--bs-select${isDisabled ? '-disabled' : ''}-color)`,
		}),
		valueContainer: (provided, state) => ({
			...provided,
			padding: `calc(var(--bs-select-padding-y${suffix})/${multiplicator}) calc(var(--bs-select-padding-x${suffix})/${multiplicator})`,
		}),
		dropdownIndicator: (provided, state) => ({
			height: "100%",
			width: "var(--bs-select-indicator-padding)",
			backgroundImage: "var(--bs-select-indicator)",
			backgroundRepeat: "no-repeat",
			backgroundPosition: `right var(--bs-select-padding-x) center`,
			backgroundSize: "var(--bs-select-bg-size)",
		}),
		input: ({margin, paddingTop, paddingBottom, ...provided}, state) => ({
			...provided
		}),
		option: (provided, state) => {
      const { isSelected, isFocused, data } = state;
      const { indent } = data;
      const ret = {
        ...provided,
        //color: isFocused ? theme.brandLight : theme.neutralDark,
        backgroundColor: isSelected ? theme.brandLight : (isFocused ? theme.neutralLight : theme.themeColors.white),
        margin: `calc(var(--bs-select-padding-y${suffix})/2) calc(var(--bs-select-padding-x${suffix})/2)`,
        //marginLeft: `${indent ?? 0}rem`,
      };
      return ret;
		},
		menu: ({marginTop, ...provided}, state) => ({
			...provided
		}),
		multiValue: (provided, state) => ({
			...provided,
			margin: `calc(var(--bs-select-padding-y${suffix})/2) calc(var(--bs-select-padding-x${suffix})/2)`,
		}),
		clearIndicator: ({padding, ...provided}, state) => ({
			...provided,
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			width: "var(--bs-select-indicator-padding)"
		}),
		multiValueLabel: ({padding, paddingLeft, fontSize, ...provided}, state) => ({
			...provided,
			padding: `0 var(--bs-select-padding-y${suffix})`,
			whiteSpace: "normal"
		})
	};
  return styles;
}

function IndicatorSeparator() {
	return null;
}

function DropdownIndicator(props: DropdownIndicatorProps) {
	return (
		<components.DropdownIndicator {...props}>
			<span></span>
		</components.DropdownIndicator>
	);
}

function getSelectTheme(theme: SelectTheme) {
	const ret: SelectTheme = {
		...theme,
    // @ts-ignore
		borderRadius: "var(--bs-select-border-radius)",
		colors: {
			...theme.colors,
			primary: "var(--bs-light)",
			danger: "var(--bs-danger)",
		}
	}
  return ret;
}

export interface SelectDropdownOption {
  id: string,
  label: string,
  indent?: number,
}

type SelectDropdownProps<Option extends SelectDropdownOption> = Parameters<typeof Select<Option>>[0] & {
  id: string,
  label?: string,
  size?: string,
};

function SelectDropdown<Option extends SelectDropdownOption>(props: SelectDropdownProps<Option>) {
  const { size, components, id, label, onChange, ...rest } = props;
	const extendedComponents = { DropdownIndicator, IndicatorSeparator, ...components };
  const theme = useTheme();
  const styles = getSelectStyles(theme, 'isMulti' in props, size);

  return (
    <FormGroup>
      { label && (
        <Label for={id}>
          { label }
        </Label>
      )}
      <Select
        components={extendedComponents}
        theme={getSelectTheme}
        styles={styles}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.id}
        formatOptionLabel={(option, meta) => {
          const { context, inputValue } = meta;
          const { indent, label } = option;
          const highlighted = (
            <Highlighter highlightTag="b" searchWords={[inputValue]} textToHighlight={label} />
          );
          if (context === 'value' || !indent) return highlighted;
          let spans = [];
          for (let i = 0; i < indent; i++) {
            spans.push(
              <span style={{borderLeft: '1px solid #ccc', paddingLeft: '0.5em'}} />
            );
          }
          return <>
            {spans}
            {highlighted}
          </>;
        }}
        onChange={onChange}
        {...rest}
      />
    </FormGroup>
	);
}
export default SelectDropdown;
