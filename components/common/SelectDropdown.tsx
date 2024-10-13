import React, { useEffect, useState } from 'react';

import PopoverTip from 'components/common/PopoverTip';
import Highlighter from 'react-highlight-words';
import Select, {
  components,
  DropdownIndicatorProps,
  MultiValueProps,
  OptionProps,
  Theme as SelectTheme,
  ValueContainerProps,
} from 'react-select';
import { FormGroup, Label as BSLabel } from 'reactstrap';
import styled, { DefaultTheme, useTheme } from 'styled-components';

const Label = styled(BSLabel)`
  font-weight: ${(props) => props.theme.formLabelFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const TooltipWrapper = styled.span`
  white-space: nowrap; // Prevents the tooltip from wrapping
`;

const DropdownItem = styled.div`
  display: flex;
  margin-left: 0.5rem;

  .search-found {
    padding: 0;
    background-color: transparent;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

const DropdownIndent = styled.div`
  border-left: 2px solid ${({ theme }) => theme.graphColors.grey030};
  margin: 0 0.75rem 0 0;
`;

const DropdownLabel = styled.div<{ $primary: boolean }>`
  margin: 0.75rem 0;
  font-size: ${({ $primary, theme }) =>
    $primary ? theme.fontSizeMd : theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

function getSelectStyles<Option extends SelectDropdownOption>(
  theme: DefaultTheme,
  multi: boolean,
  size: string = ''
) {
  const suffix = size ? `-${size}` : '';
  const inputHeight =
    `calc((${theme.inputLineHeight}*${theme.fontSizeBase}) +` +
    ` (${theme.inputPaddingY}*2) + (${theme.inputBorderWidth}*2))`;

  const styles: SelectDropdownProps<Option>['styles'] = {
    control: (provided, { isDisabled, isFocused }) => ({
      ...provided,
      backgroundColor: `var(--bs-select${isDisabled ? '-disabled' : ''}-bg)`,
      borderColor: isDisabled
        ? theme.graphColors.grey050
        : isFocused
        ? theme.inputBtnFocusColor
        : theme.themeColors.dark,
      borderWidth: theme.inputBorderWidth,
      borderRadius: theme.inputBorderRadius,
      lineHeight: theme.inputLineHeight,
      fontSize: `var(--bs-select-font-size${suffix})`,
      fontWeight: 'var(--bs-select-font-weight)',
      minHeight: inputHeight,
      ':hover': {
        borderColor: theme.themeColors.dark,
      },
      boxShadow: isFocused ? '0 0 0 0.25rem #4e80a6' : 'inherit',
    }),
    singleValue: (
      { marginLeft, marginRight, ...provided },
      { isDisabled }
    ) => ({
      ...provided,
      maxWidth: `${multi ? '80%' : '100%'}`,
      color: `var(--bs-select${isDisabled ? '-disabled' : ''}-color)`,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding:
        `calc(var(--bs-select-padding-y${suffix})) ` +
        `calc(var(--bs-select-padding-x${suffix}))`,
    }),
    dropdownIndicator: (provided, state) => ({
      height: '100%',
      width: 'var(--bs-select-indicator-padding)',
      backgroundImage: 'var(--bs-select-indicator)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right var(--bs-select-padding-x) center`,
      backgroundSize: 'var(--bs-select-bg-size)',
    }),
    input: ({ margin, paddingTop, paddingBottom, ...provided }, state) => ({
      ...provided,
    }),
    option: (provided, state) => {
      const { isSelected, isFocused, data } = state;
      const ret = {
        ...provided,
        color: isSelected
          ? theme.themeColors.white
          : isFocused
          ? theme.themeColors.black
          : theme.themeColors.black,
        backgroundColor: isSelected
          ? theme.graphColors.grey080
          : isFocused
          ? theme.graphColors.grey010
          : theme.inputBg,
        margin: 0,
        padding: 0,
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
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: 'var(--bs-select-indicator-padding)',
    }),
    multiValueLabel: (
      { padding, paddingLeft, fontSize, ...provided },
      state
    ) => ({
      ...provided,
      padding: `0 var(--bs-select-padding-y${suffix})`,
      whiteSpace: 'normal',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: theme.graphColors.grey070,
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
      primary: 'var(--bs-light)',
      danger: 'var(--bs-danger)',
    },
  };
  return ret;
}

const CountContainer = styled.span`
  opacity: 0.5;
  font-style: italic;
  margin: 0 0.4em;
`;

const Counter = ({ count }: { count: number }) => (
  <CountContainer> + {count}</CountContainer>
);

const ValueContainer = (props: ValueContainerProps) => {
  const { children, ...rest } = props;
  const [firstChild, ...remainingChildren] = children;
  const realChildren =
    (firstChild?.length ?? 0) > 1
      ? [
          firstChild[0],
          <Counter count={firstChild.length - 1} />,
          ...remainingChildren,
        ]
      : children;
  return (
    <components.ValueContainer {...rest}>
      {realChildren}
    </components.ValueContainer>
  );
};

const MultiValue = (props: MultiValueProps) => {
  const { data, ...rest } = props;
  const newData = {
    id: '__combined__',
    label: props.getValue()[0].label,
    indent: Math.min(...props.getValue().map((v) => v.indent)),
  };
  return (
    <components.SingleValue data={newData} {...rest}></components.SingleValue>
  );
};

const Option = (props: OptionProps) => {
  const { data, children, options } = props;
  const { indent } = data;
  const isHierarchical: boolean = options.some((o) => o?.indent > 0);
  const indents: JSX.Element[] = [];
  for (let i = 0; i < indent; i++) {
    indents.push(<DropdownIndent key={`indent-${i}`} />);
  }
  return (
    <components.Option {...props}>
      <DropdownItem>
        {indents}
        <DropdownLabel $primary={isHierarchical && indent == 0}>
          {children}
        </DropdownLabel>
      </DropdownItem>
    </components.Option>
  );
};

const getCustomComponents = (isMulti: boolean) =>
  Object.assign(
    { DropdownIndicator, IndicatorSeparator, Option },
    isMulti ? { ValueContainer, MultiValue } : {}
  );

export interface SelectDropdownOption {
  id: string;
  label: string;
  indent?: number;
}

type SelectDropdownProps<Option extends SelectDropdownOption> = Parameters<
  typeof Select<Option>
>[0] & {
  id: string;
  label?: string;
  size?: string;
  helpText?: string;
  invert?: boolean;
  isMulti: boolean;
  value: SelectDropdownOption[] | SelectDropdownOption | null;
  onChange: (
    option: SelectDropdownOption[] | SelectDropdownOption | null
  ) => void;
};

function SelectDropdown<
  Option extends SelectDropdownOption,
  IsMulti extends boolean
>(props: SelectDropdownProps<Option>) {
  const {
    size,
    id,
    label,
    value,
    onChange,
    helpText,
    invert,
    isMulti = false,
    ...rest
  } = props;
  const theme = useTheme();
  const styles = getSelectStyles(theme, props.isMulti === true, size);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /* Do not wrap the tooltip icon on a new line alone */
  /* Join it with the last word of the label instead */
  /* TODO: Make this a part of the label/PopoverTip component */
  const labelLastWord = label?.split(' ').pop();
  const labelText = helpText
    ? label?.slice(0, label.length - (labelLastWord?.length || 0))
    : label;
  const tooltipElement = helpText ? (
    <TooltipWrapper>
      {labelLastWord}
      <PopoverTip content={helpText} identifier={id} invert={invert} />
    </TooltipWrapper>
  ) : null;

  return (
    <FormGroup>
      {label && (
        <Label for={id}>
          {labelText}
          {tooltipElement}
        </Label>
      )}

      {/* Select doesn't support SSR */}
      {isClient && (
        <Select<SelectDropdownOption, IsMulti>
          inputId={id}
          isMulti={isMulti}
          components={getCustomComponents(isMulti)}
          theme={getSelectTheme}
          value={value}
          styles={styles}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
          formatOptionLabel={(option, meta) => {
            const { inputValue } = meta;
            const { label } = option;

            return (
              <Highlighter
                highlightClassName="search-found"
                searchWords={[inputValue]}
                textToHighlight={label}
              />
            );
          }}
          onChange={onChange}
          {...rest}
        />
      )}
    </FormGroup>
  );
}
export default SelectDropdown;
