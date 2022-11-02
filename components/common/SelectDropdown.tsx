import React from "react";
import Select, { components, DropdownIndicatorProps, GroupBase, MultiValueProps, Theme as SelectTheme, ValueContainerProps } from "react-select";
import styled from 'styled-components';
import Highlighter from "react-highlight-words";
import { FormGroup, Label as BSLabel } from "reactstrap";
import { useTheme, Theme } from "common/theme";
import { data } from "autoprefixer";
import PopoverTip from 'components/common/PopoverTip';
import { TRUE } from "sass";
import { useTranslation } from "common/i18n";


const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;


function getSelectStyles<Option extends SelectDropdownOption>(
  theme: Theme,
  multi: boolean,
  size: string = ""
) {
  const suffix = size ? `-${size}` : "";
  const multiplicator = multi ? 2 : 1;
  const inputHeight =
    `calc((${theme.inputLineHeight}*${theme.fontSizeBase}) +`
    + ` (${theme.inputPaddingY}*2) + (${theme.inputBorderWidth}*2))`;

  const styles: SelectDropdownProps<Option>["styles"] = {
    control: (provided, { isDisabled, isFocused }) => ({
      ...provided,
      backgroundColor: `var(--bs-select${isDisabled ? "-disabled" : ""}-bg)`,
      borderColor: isDisabled
        ? theme.graphColors.grey050 : isFocused
        ? theme.inputBtnFocusColor : theme.themeColors.dark,
      borderWidth: theme.inputBorderWidth,
      borderRadius: theme.inputBorderRadius,
      lineHeight: theme.inputLineHeight,
      fontSize: `var(--bs-select-font-size${suffix})`,
      fontWeight: "var(--bs-select-font-weight)",
      minHeight: inputHeight,
      ":hover": {
        borderColor: theme.themeColors.dark,
      },
      boxShadow: isFocused ? '0 0 0 0.25rem #4e80a6' : 'inherit',
    }),
    singleValue: (
      { marginLeft, marginRight, ...provided },
      { isDisabled }
    ) => ({
      ...provided,
      color: `var(--bs-select${isDisabled ? "-disabled" : ""}-color)`,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: `calc(var(--bs-select-padding-y${suffix})/${multiplicator}) `
        + `calc(var(--bs-select-padding-x${suffix})/${multiplicator})`,
    }),
    dropdownIndicator: (provided, state) => ({
      height: "100%",
      width: "var(--bs-select-indicator-padding)",
      backgroundImage: "var(--bs-select-indicator)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: `right var(--bs-select-padding-x) center`,
      backgroundSize: "var(--bs-select-bg-size)",
    }),
    input: ({ margin, paddingTop, paddingBottom, ...provided }, state) => ({
      ...provided,
    }),
    option: (provided, state) => {
      const { isSelected, isFocused, data } = state;
      const { indent } = data;
      const ret = {
        ...provided,
        color: theme.themeColors.black,
        backgroundColor: isSelected
          ? theme.graphColors.grey020
          : isFocused
          ? theme.graphColors.grey005
          : theme.graphColors.white,
        margin: 0,
        //marginLeft: `${indent ?? 0}rem`,
      };
      return ret;
    },
    menu: ({ marginTop, ...provided }, state) => ({
      ...provided,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      margin: `calc(var(--bs-select-padding-y${suffix})/2) calc(var(--bs-select-padding-x${suffix})/2)`,
    }),
    clearIndicator: ({ padding, ...provided }, state) => ({
      ...provided,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "var(--bs-select-indicator-padding)",
    }),
    multiValueLabel: (
      { padding, paddingLeft, fontSize, ...provided },
      state
    ) => ({
      ...provided,
      padding: `0 var(--bs-select-padding-y${suffix})`,
      whiteSpace: "normal",
    }),
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
                colors: {
                        ...theme.colors,
                        primary: "var(--bs-light)",
                        danger: "var(--bs-danger)",
                }
        }
  return ret;
}

const CountContainer = styled.span`
  margin-left: 0.2em;
`

const ValueContainer = (props: ValueContainerProps) => {
  const { children, ...rest } = props;
  const [firstChild, ...remainingChildren] = children;
  const realChildren = ((firstChild?.length ?? 0) > 1) ? [firstChild[0], ...remainingChildren] : children;
  return <components.ValueContainer {...rest} >{realChildren}</components.ValueContainer>
};

const SingleValue = (props) => {
  const { t } = useTranslation();
  const {children, ...rest} = props;

  return <components.SingleValue {...rest}>
    { props.data.label }
    <CountContainer>{ props.data.count > 1 && ` + ${props.data.count - 1}` }</CountContainer>
  </components.SingleValue>;
}


const MultiValue = (props: MultiValueProps) => {
  const { getValue, data, children, ...rest } = props;
  const newData = {
    id: '__combined__',
    label: getValue()[0].label,
    count: (getValue().length),
    indent: Math.min(...getValue().map(v => v.indent))};
  return <SingleValue data={newData} {...rest}></SingleValue>;
}

const getCustomComponents = (isMulti: boolean) => Object.assign(
  { DropdownIndicator, IndicatorSeparator },
  isMulti ? { ValueContainer, MultiValue } : {}
);

export interface SelectDropdownOption {
  id: string,
  label: string,
  indent?: number,
}

type SelectDropdownProps<Option extends SelectDropdownOption> = Parameters<typeof Select<Option>>[0] & {
  id: string,
  label?: string,
  size?: string,
  helpText?: string,
  invert?: boolean,
  isMulti: boolean,
  value: SelectDropdownOption[]|SelectDropdownOption|null,
  onChange: (option:SelectDropdownOption[]|SelectDropdownOption|null)=>void
};

function SelectDropdown<Option extends SelectDropdownOption, IsMulti extends boolean = false>(
    props: SelectDropdownProps<Option>
) {
  const { size, id, label, value, onChange, helpText, invert, isMulti, ...rest } = props;
  const theme = useTheme();
  const styles = getSelectStyles(theme, 'isMulti' in props, size);
  return (
    <FormGroup>
      { label && (
        <Label for={id}>
          { label }
          {helpText && (
            <PopoverTip
              content={helpText}
              identifier={id}
              invert={invert}
            />
          )}
        </Label>
      )}
      <Select<SelectDropdownOption, IsMulti>
        isMulti={isMulti}
        components={getCustomComponents(isMulti)}
        theme={getSelectTheme}
        value={value}
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
          let spans : JSX.Element[] = [];
          for (let i = 0; i < indent; i++) {
            spans.push(
              <span key={`span-${i}`} style={{borderLeft: '1px solid #ccc', paddingLeft: '0.5em'}} />
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
