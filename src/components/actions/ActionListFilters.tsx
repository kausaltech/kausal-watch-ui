import type { Ref } from 'react';
import React, { type JSX, createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import escapeStringRegexp from 'escape-string-regexp';
import { debounce } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { createFilter } from 'react-select';
import {
  Badge as BadgeComponent,
  ButtonGroup,
  CloseButton,
  Col,
  Collapse,
  FormGroup,
  Input,
  Button as RButton,
  Row,
} from 'reactstrap';

import { transientOptions } from '@common/themes/styles/styled';

import {
  type ActionListFilterFragment,
  type ActionListPageFiltersFragment,
  type IndicatorListFilterFragment,
  type IndicatorListPageFiltersFragment,
} from '@/common/__generated__/graphql';
import {
  ActionResponsiblePartyRole,
  CategoryTypeSelectWidget,
} from '@/common/__generated__/graphql';
import type { CategoryHierarchyMember, CategoryTypeHierarchy } from '@/common/categories';
import { constructCatHierarchy, getCategoryString } from '@/common/categories';
import type { TFunction } from '@/common/i18n';
import { getActionTermContext, getIndicatorTermContext } from '@/common/i18n';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import PopoverTip from '@/components/common/PopoverTip';
import type { SelectDropdownOption } from '@/components/common/SelectDropdown';
import SelectDropdown from '@/components/common/SelectDropdown';
import TextInput from '@/components/common/TextInput';
import type {
  ActionListAction,
  ActionListActionAttributeTypeFilterBlock,
  ActionListCategory,
  ActionListCategoryTypeFilterBlock,
  ActionListOrganization,
  ActionListPrimaryOrg,
} from '@/components/dashboard/ActionList';
import type { PlanContextType } from '@/context/plan';
import { usePlan } from '@/context/plan';

import type { IndicatorListIndicator } from '../indicators/IndicatorList';

type MultipleFilterValue = string[];
type SingleFilterValue = string | undefined;

export type FilterValue = MultipleFilterValue | SingleFilterValue;
function isMultipleFilterValue(value: FilterValue): value is MultipleFilterValue {
  return Array.isArray(value);
}
function isSingleFilterValue(value: FilterValue): value is SingleFilterValue {
  return !isMultipleFilterValue(value);
}
export type Filters<Value extends FilterValue = FilterValue> = {
  [key: string]: Value;
};

const FiltersList = styled.div`
  margin: 0 0 ${(props) => props.theme.spaces.s150} 0;
  padding: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeLg};
  line-height: ${(props) => props.theme.lineHeightBase};
  border-color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.headingsColor,
      props.theme.themeColors.white
    )};
  border-top: 1px solid;
  border-bottom: 1px solid;

  .count {
    margin: ${(props) => props.theme.spaces.s100} ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100} 0;
    padding-bottom: ${(props) => props.theme.spaces.s100};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  .close {
    color: ${(props) => props.theme.themeColors.white};
    margin-left: 0.75em;
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

const FiltersHeader = styled.h2`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeMd};
  font-family: ${(props) => `${props.theme.fontFamily}, ${props.theme.fontFamilyFallback}`};
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.headingsColor,
      props.theme.themeColors.white
    )};
`;

const FilterSection = styled(Row)`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const FilterSectionDivider = styled.div`
  border-bottom: 1px solid #333;
`;

const StyledBadge = styled('span', transientOptions)<{ $color?: string }>`
  display: inline-flex;
  max-width: 100%;
  white-space: normal;
  margin-bottom: ${(props) => props.theme.spaces.s050};
  margin-right: ${(props) => props.theme.spaces.s050};
  padding-left: 0;
  background-color: ${(props) => props.$color || props.theme.brandDark} !important;
  color: ${(props) =>
    readableColor(
      props.$color || props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  line-height: 1.25;
  text-align: left;

  .btn-close {
    margin: 0 0.5rem;
    width: 0.75rem;
    height: 0.75rem;
  }
`;

const ToggleButton = styled(RButton)`
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spaces.s100} 0;
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.headingsColor,
      props.theme.themeColors.white
    )};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
    background-color: transparent;
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.headingsColor,
        props.theme.themeColors.white
      )};
  }

  &.open {
    color: ${(props) => props.theme.textColor.tertiary};
  }
`;

const MainCategoryLabel = styled.p`
  font-weight: 400;
  line-height: 1;
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const MainCategory = styled.div`
  padding: 0 0 ${(props) => props.theme.spaces.s200} 0;
  margin: 0;

  button {
    line-height: 1;
    padding: ${(props) => `${props.theme.spaces.s150} ${props.theme.spaces.s100}`};
  }
`;

const FilterColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function sortDepthFirst<Type>(
  items: Type[],
  compareItem: (a: Type, b: Type) => number,
  getParent: (item: Type) => Type | null,
  getChildren: (item: Type) => Type[]
) {
  const out: Type[] = [];

  function walkTree(objs: Type[]) {
    const sorted = [...objs];
    sorted.sort((a, b) => compareItem(a, b));
    sorted.forEach((obj) => {
      out.push(obj);
      const children = getChildren(obj);
      walkTree(children);
    });
  }

  const roots = items.filter((item) => !getParent(item));
  walkTree(roots);
  return out;
}

function asNonEmptyString(value?: string | null) {
  return value && value.trim() ? value : undefined;
}

type ActionListTextInputProps = {
  id: string;
  label: string;
  placeholder: string;
  currentValue: string | undefined;
  onChange: FilterChangeCallback<string | undefined>;
  inputRef?: Ref<HTMLInputElement>;
};

function ActionListTextInput({
  id,
  label,
  placeholder,
  currentValue,
  onChange,
  inputRef,
}: ActionListTextInputProps) {
  const callback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(id, value, 150);
    },
    [id, onChange]
  );

  return (
    <TextInput
      label={label}
      id={`${id}-field`}
      name={id}
      placeholder={placeholder}
      onChange={callback}
      value={currentValue || ''}
      ref={inputRef}
    />
  );
}

type ActionListDropdownProps<Value extends FilterValue> = {
  id: string;
  label: string;
  helpText?: string;
  showAllLabel?: string;
  currentValue: Value;
  onChange: FilterChangeCallback<Value>;
  options: SelectDropdownOption[];
  isMulti: Value extends MultipleFilterValue ? boolean : false;
};

const filterOption = createFilter({
  ignoreCase: true,
  ignoreAccents: true,
  matchFrom: 'any',
  stringify: (option) => option.label,
  trim: true,
});

function ActionListDropdownInput<Value extends FilterValue>(props: ActionListDropdownProps<Value>) {
  const { id, label, helpText, currentValue, onChange, showAllLabel, options, isMulti } = props;
  // check if we need to inverse component colors depending on section bg
  const theme = useTheme();
  const invert =
    readableColor(theme.neutralLight, theme.themeColors.black, theme.themeColors.white) ===
    theme.themeColors.white;
  const callback = useCallback(
    (
      option: Value extends MultipleFilterValue
        ? SelectDropdownOption[]
        : SelectDropdownOption | null
    ) => {
      // Found no way to automatically narrow the type of option (or currentValue)
      if (isMulti) {
        (onChange as FilterChangeCallback<MultipleFilterValue>)(
          id,
          ((option as SelectDropdownOption[] | null) ?? []).map((o) => o.id)
        );
        return;
      } else {
        (onChange as FilterChangeCallback<SingleFilterValue>)(
          id,
          (option as SelectDropdownOption | null)?.id
        );
        return;
      }
    },
    [id, onChange, isMulti]
  );

  let selectedOption: SelectDropdownOption[] | SelectDropdownOption | null;
  if (isSingleFilterValue(currentValue)) {
    selectedOption = currentValue ? (options.find((opt) => opt.id === currentValue) ?? null) : null;
  } else {
    selectedOption =
      currentValue.length === 0
        ? []
        : options.filter((opt) => currentValue.find((v) => opt.id === v));
  }

  return (
    <SelectDropdown<SelectDropdownOption, Value extends MultipleFilterValue ? true : false>
      label={label}
      id={`${id}-field`}
      name={id}
      isMulti={isMulti}
      placeholder={showAllLabel}
      options={options}
      value={selectedOption}
      onChange={callback}
      isClearable={true}
      menuShouldScrollIntoView={true}
      filterOption={filterOption}
      helpText={helpText}
      invert={invert}
    />
  );
}

export type AdditionalFilterBadge = {
  key: string;
  id: string;
  value: string;
  label: string;
  onReset: () => void;
};

type ActionListFilterBadgesProps = {
  plan: PlanContextType;
  allFilters: ActionListFilter[];
  activeFilters: Filters;
  actionCount: number;
  actionCountLabel?: string;
  onReset: (id: string, value: SingleFilterValue) => void;
  buttonColor?: string;
  additionalFilterBadges?: AdditionalFilterBadge[];
};

type Badge = {
  key: string;
  id: string;
  value: SingleFilterValue;
  label: string;
  onReset: () => void;
};

function getBadgeLabel(
  filter: ActionListFilter,
  value: SingleFilterValue,
  activeFilters: Filters,
  t: TFunction
): string | null {
  if (!value) return null;

  if (filter.id === 'primary_responsible_party') {
    return activeFilters['responsible_party'] ? filter.getLabel(t) : null;
  }

  if (filter.id === 'name') {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  if (filter.options) {
    return filter.options.find((opt) => opt.id === value)?.label ?? null;
  }

  if (typeof value === 'boolean') {
    return filter.getLabel(t);
  }

  return null;
}

function buildBadges(
  allFilters: ActionListFilter[],
  activeFilters: Filters,
  onReset: (id: string, value: SingleFilterValue) => void,
  t: TFunction
): Badge[] {
  const enabled = allFilters.filter((item) => activeFilters[item.id]);

  const seenFilterKeyValues = new Set<string>();
  const uniqueFilters = enabled.filter((item) => {
    const uniqueKey = `${item.id}-${activeFilters[item.id]}`;
    if (seenFilterKeyValues.has(uniqueKey)) return false;
    seenFilterKeyValues.add(uniqueKey);
    return true;
  });

  if (
    activeFilters['primary_responsible_party'] &&
    activeFilters['responsible_party'] &&
    !uniqueFilters.some((item) => item.id === 'primary_responsible_party')
  ) {
    uniqueFilters.push({
      id: 'primary_responsible_party',
      useValueFilterId: 'responsible_party',
      filterAction: () => true,
      getLabel: (t: TFunction) => t('filter-primary-responsible-party'),
      getHelpText: () => undefined,
      getShowAllLabel: () => '',
      sm: undefined,
      md: 6,
      lg: 4,
      render: () => null,
    } as ActionListFilter);
  }

  return uniqueFilters
    .map((filter) => {
      const rawValue = activeFilters[filter.id];
      const values = isSingleFilterValue(rawValue) ? [rawValue] : rawValue;

      return values.map((value) => {
        const label = getBadgeLabel(filter, value, activeFilters, t);
        if (!label) return null;

        return {
          key: `${filter.id}-${value}`,
          id: filter.id,
          value,
          label,
          onReset: () => onReset(filter.id, value),
        };
      });
    })
    .flat()
    .filter((item): item is Badge => item != null);
}

function ActionListFilterBadges({
  plan,
  allFilters,
  activeFilters,
  actionCount,
  actionCountLabel,
  onReset,
  buttonColor,
  additionalFilterBadges = [],
}: ActionListFilterBadgesProps) {
  const t = useTranslations();

  const badges = useMemo(
    () => buildBadges(allFilters, activeFilters, onReset, t),
    [allFilters, activeFilters, onReset, t]
  );

  const allBadges = [...badges, ...additionalFilterBadges];

  return (
    <FiltersList aria-live="assertive">
      <span className="count">
        {
          /* FIXME: Translation should take number into account */
          `${actionCount} ${
            actionCountLabel
              ? actionCountLabel
              : t('filter-result-actions', getActionTermContext(plan))
          }`
        }
      </span>
      {allBadges.length > 0 && <span className="visually-hidden">{t('active-filters')}</span>}
      {/* TODO: animate transition */}
      {allBadges.map((item) => (
        <StyledBadge key={`${item.id}-${item.value}`} className="badge me-3" $color={buttonColor}>
          <CloseButton
            variant={readableColor(buttonColor || '#000') === '#000' ? 'black' : 'white'}
            className="btn-sm"
            onClick={item.onReset}
            aria-label={t('remove-filter')}
          />
          {item.label.trim()}
        </StyledBadge>
      ))}
    </FiltersList>
  );
}

type FilterChangeCallback<Value> = (filterId: string, val: Value, debounce?: number) => void;

type ActionListFilterOption = {
  id: string;
  label: string;
};

export interface ActionListFilter<Value extends FilterValue = FilterValue> {
  id: string;
  useValueFilterId: string | undefined;
  filterAction: (value: Value, action: ActionListAction | IndicatorListIndicator) => boolean;
  getLabel: (t: TFunction) => string;
  getHelpText: (t: TFunction) => string | undefined;
  getShowAllLabel: (t: TFunction) => string;
  sm: number | undefined;
  md: number;
  lg: number;
  options?: ActionListFilterOption[];
  debounce?: number | undefined;
  render: (value: Value, onChange: FilterChangeCallback<Value>, t: TFunction) => JSX.Element;
}

abstract class DefaultFilter<Value extends FilterValue> implements ActionListFilter<Value> {
  id: string;
  useValueFilterId: string | undefined;
  sm = undefined;
  md = 6;
  lg = 4;
  abstract options: NonNullable<ActionListFilter['options']>;

  abstract getLabel(t: TFunction): string;
  abstract getHelpText(t: TFunction): string | undefined;
  abstract filterAction(value: Value, action: ActionListAction | IndicatorListIndicator): boolean;

  getShowAllLabel(t: TFunction) {
    return t('filter-all-categories');
  }

  render(
    value: Value,
    onChange: FilterChangeCallback<Value>,
    t: TFunction,
    isMulti?: Value extends MultipleFilterValue ? boolean : false
  ) {
    const _isMulti = isMulti ?? false;
    return (
      <FilterColumn sm={this.sm} md={this.md} lg={this.lg} key={this.id}>
        <ActionListDropdownInput
          isMulti={_isMulti}
          id={this.id}
          label={this.getLabel(t)}
          helpText={this.getHelpText(t)}
          showAllLabel={this.getShowAllLabel(t)}
          currentValue={value}
          onChange={onChange}
          options={this.options}
        />
      </FilterColumn>
    );
  }
}

type GenericSelectFilterOpts = {
  id: string;
  options: ActionListFilterOption[];
  filterAction: (value: FilterValue, action: ActionListAction | IndicatorListIndicator) => boolean;
  label: string;
  helpText?: string;
  showAllLabel: string;
};

type FilterItem = ActionListAction | IndicatorListIndicator;

function createSelectFilter(opts: {
  id: string;
  label: string;
  helpText?: string;
  showAllLabel: string;
  options: ActionListFilterOption[];
  isMulti?: boolean;
  sm?: number;
  md?: number;
  lg?: number;
  useValueFilterId?: string;
  matchesSingle: (value: string, item: FilterItem) => boolean;
}): ActionListFilter {
  const {
    id,
    label,
    helpText,
    showAllLabel,
    options,
    isMulti = false,
    sm,
    md = 6,
    lg = 4,
    useValueFilterId,
    matchesSingle,
  } = opts;

  return {
    id,
    useValueFilterId,
    sm,
    md,
    lg,
    options,
    getLabel: () => label,
    getHelpText: () => helpText,
    getShowAllLabel: () => showAllLabel,
    filterAction: (value, item) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return true;
        return value.some((v) => matchesSingle(v, item));
      }

      if (!value) return true;
      return matchesSingle(value, item);
    },
    render: (value, onChange, t) => (
      <FilterColumn sm={sm} md={md} lg={lg} key={id}>
        <ActionListDropdownInput
          isMulti={isMulti as false}
          id={id}
          label={label}
          helpText={helpText}
          showAllLabel={showAllLabel}
          currentValue={value}
          onChange={onChange}
          options={options}
        />
      </FilterColumn>
    ),
  };
}

function createActionNameFilter(
  plan: PlanContextType,
  t: TFunction,
  actionTerm?: string
): ActionListFilter<string | undefined> {
  const hasActionIdentifiers = plan.features.hasActionIdentifiers;
  const actionTermContext =
    actionTerm === 'INDICATOR' ? getIndicatorTermContext(plan) : getActionTermContext(plan);
  const ref = createRef<HTMLInputElement>();

  return {
    id: 'name',
    useValueFilterId: undefined,
    sm: 9,
    md: 9,
    lg: 6,
    debounce: 150,
    getLabel: () => t('filter-text', actionTermContext),
    getHelpText: () => undefined,
    getShowAllLabel: () => t('filter-text-default'),
    filterAction: (value, action) => {
      if (!value) return true;

      const searchStr = escapeStringRegexp(value.toLowerCase());
      let searchTarget = action.name.replace(/\u00AD/g, '').toLowerCase();

      if (hasActionIdentifiers && 'identifier' in action) {
        searchTarget = `${action.identifier.toLowerCase()} ${searchTarget}`;
      }

      return searchTarget.search(searchStr) !== -1;
    },
    render: (value, onChange, t) => (
      <FilterColumn sm={9} md={9} lg={6} key="name">
        <ActionListTextInput
          id="name"
          label={t('filter-text', actionTermContext)}
          placeholder={t('filter-text-default')}
          onChange={onChange}
          currentValue={value}
          inputRef={ref}
        />
      </FilterColumn>
    ),
  };
}

function createContinuousActionFilter(opts: {
  label: string;
  showAllLabel: string;
  options: ActionListFilterOption[];
  helpText?: string;
}): ActionListFilter<string | undefined> {
  const { label, showAllLabel, options, helpText } = opts;

  return {
    id: 'action_type',
    useValueFilterId: undefined,
    sm: undefined,
    md: 6,
    lg: 4,
    options,
    getLabel: () => label,
    getHelpText: () => helpText,
    getShowAllLabel: () => showAllLabel,
    filterAction: (value, action) => {
      if (!value) return true;
      if (value === 'continuous') return action.scheduleContinuous === true;
      if (value === 'non_continuous') return action.scheduleContinuous === false;
      return true;
    },
    render: (value, onChange, t) => (
      <FilterColumn md={6} lg={4} key="action_type">
        <ActionListDropdownInput
          isMulti={false}
          id="action_type"
          label={label}
          helpText={helpText}
          showAllLabel={showAllLabel}
          currentValue={value}
          onChange={onChange}
          options={options}
        />
      </FilterColumn>
    ),
  };
}

function createAttributeTypeFilter(
  config: ActionListActionAttributeTypeFilterBlock,
  t: TFunction
): ActionListFilter<string | undefined> {
  const att = config.attributeType!;
  const options = att.choiceOptions.map((choice) => ({
    id: choice.id,
    label: choice.name,
  }));

  return {
    id: `att-${att.identifier}`,
    useValueFilterId: undefined,
    sm: undefined,
    md: 6,
    lg: 4,
    options,
    getLabel: () => att.name,
    getHelpText: () => att.helpText ?? undefined,
    getShowAllLabel: () => config.showAllLabel || t('filter-all-categories'),
    filterAction: (value, action) => {
      if (!value) return true;

      return action.attributes.some((actAtt) => {
        if (actAtt.__typename !== 'AttributeChoice') return false;
        return actAtt.choice?.id === value;
      });
    },
    render: (value, onChange, t) => (
      <FilterColumn md={6} lg={4} key={`att-${att.identifier}`}>
        <ActionListDropdownInput
          isMulti={false}
          id={`att-${att.identifier}`}
          label={att.name}
          helpText={att.helpText ?? undefined}
          showAllLabel={config.showAllLabel || t('filter-all-categories')}
          currentValue={value}
          onChange={onChange}
          options={options}
        />
      </FilterColumn>
    ),
  };
}

function createCategoryFilter(
  config: ActionListCategoryTypeFilterBlock,
  filterByCommonCategory: boolean,
  plan: PlanContextType,
  t: TFunction
): ActionListFilter<FilterValue> {
  const ct = config.categoryType!;
  const style = config.style === 'dropdown' ? 'dropdown' : 'buttons';
  const depth = config.depth ?? (style === 'dropdown' ? 2 : 1);

  const hierarchyCt = constructCatHierarchy<FilterCategory, FilterCategoryType>([ct])[0];
  const sortedCats = sortDepthFirst(
    hierarchyCt.categories,
    (a, b) => a.order - b.order,
    (cat) => cat.parent,
    (cat) => cat.children
  );

  const catById = filterByCommonCategory
    ? new Map(
        sortedCats.flatMap((c) => {
          const entries: [string, FilterCategory][] = [];
          if (c.common?.id) entries.push([c.common.id, c]);
          entries.push([c.id, c]);
          return entries;
        })
      )
    : new Map(sortedCats.map((c) => [c.id, c]));

  const options = sortedCats
    .filter((cat) => cat.depth < depth)
    .flatMap((cat) => {
      const id = filterByCommonCategory ? cat.common?.id : cat.id;
      if (!id) return [];
      const label = ct.hideCategoryIdentifiers ? cat.name : `${cat.identifier}. ${cat.name}`;
      return [{ id, label, indent: cat.depth }];
    });

  function filterSingleCategory(
    action: ActionListAction | IndicatorListIndicator,
    categoryId: string | undefined
  ) {
    if (!categoryId) return true;

    return action.categories.some((actCat) => {
      const actCatKey = filterByCommonCategory ? ((actCat as any).common?.id ?? actCat.id) : actCat.id;
      let cat = actCatKey ? catById.get(actCatKey) : undefined;

      while (cat) {
        const catKey = filterByCommonCategory ? (cat.common?.id ?? cat.id) : cat.id;
        if (catKey && catKey === categoryId) return true;
        cat = cat.parent ?? undefined;
      }

      return false;
    });
  }

  const filterId = getCategoryString(ct.identifier);
  const showAllLabel =
    config.showAllLabel ||
    (style === 'dropdown'
      ? t('filter-all-categories')
      : t('see-all-actions', getActionTermContext(plan)));

  return {
    id: filterId,
    useValueFilterId: undefined,
    sm: undefined,
    md: style === 'dropdown' ? 6 : 12,
    lg: style === 'dropdown' ? 4 : 12,
    options,
    getLabel: () => ct.name,
    getHelpText: () => ct.helpText ?? undefined,
    getShowAllLabel: () => showAllLabel,
    filterAction: (value, action) => {
      if (isSingleFilterValue(value)) {
        return filterSingleCategory(action, value);
      }
      return value.every((v) => filterSingleCategory(action, v));
    },
    render: (value, onChange, t) => {
      if (style === 'dropdown') {
        return (
          <FilterColumn md={6} lg={4} key={filterId}>
            <ActionListDropdownInput
              isMulti={ct.selectionType === CategoryTypeSelectWidget.Multiple}
              id={filterId}
              label={ct.name}
              helpText={ct.helpText ?? undefined}
              showAllLabel={showAllLabel}
              currentValue={value}
              onChange={onChange}
              options={options}
            />
          </FilterColumn>
        );
      }

      return (
        <Col sm={12} md={12} lg={12} key={filterId}>
          <MainCategory>
            <MainCategoryLabel id={`label-${filterId}`}>
              {ct.name}
              {ct.helpText && <PopoverTip header="Main Category" content={ct.helpText} />}
            </MainCategoryLabel>
            <ButtonGroup role="radiogroup" aria-labelledby={`label-${filterId}`}>
              <RButton
                color="black"
                outline
                onClick={() => onChange(filterId, undefined)}
                active={value === undefined}
                aria-checked={value === undefined}
                role="radio"
              >
                {showAllLabel}
              </RButton>
              {options.map((opt) => (
                <RButton
                  color="black"
                  outline
                  onClick={() => onChange(filterId, opt.id)}
                  active={value === opt.id}
                  aria-checked={value === opt.id}
                  key={opt.id}
                  role="radio"
                >
                  {opt.label}
                </RButton>
              ))}
            </ButtonGroup>
          </MainCategory>
        </Col>
      );
    },
  };
}

function createResponsiblePartyFilter(
  orgs: ActionListOrganization[],
  plan: PlanContextType,
  t: TFunction,
  overrides?: {
    fieldLabel?: string | null;
    fieldHelpText?: string | null;
    showAllLabel?: string | null;
  }
): ActionListFilter<string | undefined> {
  const orgTermContext = { context: plan.generalContent.organizationTerm };

  const sortedOrgs = sortDepthFirst(
    orgs,
    (a, b) => a.name.localeCompare(b.name),
    (org) => org.parent,
    (org) => org.children
  );

  const options = sortedOrgs.map((org) => ({
    id: org.id,
    label: org.name,
    indent: org.depth,
  }));

  const label = asNonEmptyString(overrides?.fieldLabel) ?? t('filter-organization', orgTermContext);
  const helpText =
    asNonEmptyString(overrides?.fieldHelpText) ?? t('filter-organization-help', orgTermContext);
  const showAllLabel =
    asNonEmptyString(overrides?.showAllLabel) ?? t('filter-all-organizations', orgTermContext);

  return {
    id: 'responsible_party',
    useValueFilterId: undefined,
    sm: undefined,
    md: 6,
    lg: 4,
    options,
    getLabel: () => label,
    getHelpText: () => helpText,
    getShowAllLabel: () => showAllLabel,
    filterAction: (value, action) => {
      if (!value) return true;
      if (action.primaryOrg?.id === value) return true;

      return action.responsibleParties.some((rp) => {
        let org: ActionListOrganization | null = rp.organization as ActionListOrganization;
        while (org) {
          if (org.id === value) return true;
          org = org.parent;
        }
        return false;
      });
    },
    render: (value, onChange, t) => (
      <FilterColumn md={6} lg={4} key="responsible_party">
        <ActionListDropdownInput
          isMulti={false}
          id="responsible_party"
          label={label}
          helpText={helpText}
          showAllLabel={showAllLabel}
          currentValue={value}
          onChange={onChange}
          options={options}
        />
      </FilterColumn>
    ),
  };
}

function createPrimaryResponsiblePartyFilter(t: TFunction): ActionListFilter<string | undefined> {
  return {
    id: 'primary_responsible_party',
    useValueFilterId: 'responsible_party',
    sm: undefined,
    md: 6,
    lg: 4,
    options: [],
    getLabel: () => t('filter-primary-responsible-party'),
    getHelpText: () => undefined,
    getShowAllLabel: () => '',
    filterAction: (value, action) => {
      if (!value) return true;

      return (
        action.primaryOrg?.id === value ||
        action.responsibleParties.some(
          (rp) => rp.role === ActionResponsiblePartyRole.Primary && rp.organization.id === value
        )
      );
    },
    render: () => null,
  };
}

type QueryFilterCategoryType = ActionListCategoryTypeFilterBlock['categoryType'];
type QueryFilterCategory = NonNullable<QueryFilterCategoryType>['categories'][0];
type FilterCategoryType = QueryFilterCategoryType & CategoryTypeHierarchy<FilterCategory>;
type FilterCategory = QueryFilterCategory & CategoryHierarchyMember<FilterCategoryType>;

export type ActionListFilterSection = {
  id: string;
  hidden?: boolean;
  filters: ActionListFilter[];
};

type FilterFieldProps = {
  filter: ActionListFilter;
  value: FilterValue;
  onChange: (id: string, val: FilterValue, debounce?: number) => void;
  primaryResponsibleParty?: string;
};

const FilterField = React.memo(function FilterField({
  filter,
  value,
  onChange,
  primaryResponsibleParty,
}: FilterFieldProps) {
  const t = useTranslations();

  if (filter.id === 'responsible_party') {
    return (
      <FilterColumn sm={filter.sm} md={filter.md} lg={filter.lg} key={filter.id}>
        <ActionListDropdownInput
          isMulti={false}
          id={filter.id}
          label={filter.getLabel(t)}
          helpText={filter.getHelpText(t)}
          showAllLabel={filter.getShowAllLabel(t)}
          currentValue={value as string | undefined}
          onChange={onChange as FilterChangeCallback<string | undefined>}
          options={filter.options ?? []}
        />
        {value && (
          <FormGroup switch>
            <Input
              type="switch"
              role="switch"
              id="primary_responsible_party"
              checked={primaryResponsibleParty === value}
              onChange={(e) =>
                onChange('primary_responsible_party', e.target.checked ? value : undefined)
              }
            />
            <label htmlFor="primary_responsible_party">
              {t('filter-primary-responsible-party')}
            </label>
          </FormGroup>
        )}
      </FilterColumn>
    );
  }

  return filter.render(value, onChange, t);
});

type ActionListFiltersProps = {
  activeFilters: Filters;
  filterSections: ActionListFilterSection[];
  actionCount: number;
  actionCountLabel?: string;
  onChange: (filterType: string, val: FilterValue) => void;
  additionalFilterBadges?: AdditionalFilterBadge[];
};

function useFilterState(
  activeFilters: Filters,
  onChange: (filterType: string, val: FilterValue) => void
) {
  const [filterState, setFilterState] = useState(activeFilters);

  useEffect(() => {
    setFilterState(activeFilters);
  }, [activeFilters]);

  const debouncedFilterChange = useMemo(() => debounce(onChange, 150), [onChange]);

  useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);

  const updateFilter = useCallback(
    (id: string, val: FilterValue, debounceMs = 0) => {
      setFilterState((state) => {
        const next = { ...state, [id]: val };

        if (id === 'responsible_party') {
          next['primary_responsible_party'] = undefined;
        }

        return next;
      });

      if (debounceMs) {
        debouncedFilterChange(id, val);
      } else {
        onChange(id, val);
      }
    },
    [debouncedFilterChange, onChange]
  );

  const deleteFilterValue = useCallback(
    (id: string, value: SingleFilterValue) => {
      const current = filterState[id];
      if (Array.isArray(current)) {
        return current.filter((item) => item !== value);
      }
      return undefined;
    },
    [filterState]
  );

  const resetFilterValue = useCallback(
    (id: string, value: SingleFilterValue) => {
      if (id === 'responsible_party') {
        updateFilter('primary_responsible_party', undefined);
      }
      updateFilter(id, deleteFilterValue(id, value));
    },
    [deleteFilterValue, updateFilter]
  );

  return {
    filterState,
    updateFilter,
    resetFilterValue,
  };
}

function ActionListFilters(props: ActionListFiltersProps) {
  const {
    activeFilters,
    filterSections,
    actionCount,
    onChange,
    actionCountLabel,
    additionalFilterBadges = [],
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();
  const theme = useTheme();
  // theme.neutralLight is the background color of the action list filters
  // Let's make sure that the button color is readable on this background
  const buttonColorName = theme.neutralLight === theme.brandDark ? 'secondary' : 'primary';
  const plan = usePlan();

  const allFilters: ActionListFilter[] = useMemo(
    () => filterSections.flatMap((section) => section.filters),
    [filterSections]
  );

  const { filterState, updateFilter, resetFilterValue } = useFilterState(activeFilters, onChange);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="filters mb-2 text-left">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        role="search"
        autoComplete="off"
        aria-label={t('form-action-filters', getActionTermContext(plan))}
      >
        <FiltersHeader>{t('actions-filter-by')}</FiltersHeader>
        {filterSections.map((section) => (
          <React.Fragment key={section.id}>
            {section.hidden ? (
              <ToggleButton color="link" onClick={toggle}>
                {t('additional-filters')}
                <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
              </ToggleButton>
            ) : null}
            <Collapse isOpen={section.hidden ? isOpen : true}>
              <FilterSection key={section.id}>
                {section.filters.map((filter) => (
                  <FilterField
                    key={filter.id}
                    filter={filter}
                    onChange={updateFilter}
                    value={filterState[filter.id]}
                    primaryResponsibleParty={
                      filterState['primary_responsible_party'] as string | undefined
                    }
                  />
                ))}
                {section.id === 'main' && (
                  <Col
                    xs={6}
                    sm={3}
                    md={3}
                    lg={2}
                    xl={2}
                    className="d-flex flex-column justify-content-end"
                  >
                    <Button type="submit" color={buttonColorName} className="mb-3" block>
                      {t('search')}
                    </Button>
                  </Col>
                )}
                {section.id == 'primary' && (
                  <Col xs={12}>
                    <FilterSectionDivider />
                  </Col>
                )}
              </FilterSection>
            </Collapse>
          </React.Fragment>
        ))}
        <Row>
          <Col>
            <ActionListFilterBadges
              plan={plan}
              allFilters={allFilters}
              activeFilters={filterState}
              onReset={resetFilterValue}
              actionCount={actionCount}
              actionCountLabel={actionCountLabel}
              additionalFilterBadges={additionalFilterBadges}
              buttonColor={
                theme.neutralLight === theme.brandDark ? theme.brandLight : theme.brandDark
              }
            />
          </Col>
        </Row>
      </form>
    </div>
  );
}

type ConstructFiltersOpts = {
  mainConfig: ActionListPageFiltersFragment | IndicatorListPageFiltersFragment;
  plan: PlanContextType;
  t: TFunction;
  orgs: ActionListOrganization[];
  primaryOrgs: ActionListPrimaryOrg[];
  filterByCommonCategory: boolean;
  actionTerm?: string;
  isIndicatorList?: boolean;
};
ActionListFilters.constructFilters = (opts: ConstructFiltersOpts) => {
  const {
    mainConfig,
    plan,
    t,
    orgs,
    primaryOrgs,
    filterByCommonCategory,
    actionTerm,
    isIndicatorList = false,
  } = opts;
  const { primaryFilters, mainFilters, advancedFilters } = mainConfig;

  function makeSection(
    id: string,
    hidden: boolean,
    blocks: (ActionListFilterFragment | IndicatorListFilterFragment)[] | null
  ) {
    const filters: ActionListFilter[] = [];
    let primaryResponsiblePartyFilter: ActionListFilter | null = null;

    blocks?.forEach((block) => {
      switch (block.__typename) {
        case 'ResponsiblePartyFilterBlock': {
          const rpBlock = block as typeof block & {
            fieldLabel?: string | null;
            fieldHelpText?: string | null;
            showAllLabel?: string | null;
          };
          filters.push(
            createResponsiblePartyFilter(orgs, plan, t, {
              fieldLabel: rpBlock.fieldLabel,
              fieldHelpText: rpBlock.fieldHelpText,
              showAllLabel: rpBlock.showAllLabel,
            })
          );
          primaryResponsiblePartyFilter = createPrimaryResponsiblePartyFilter(t);
          break;
        }
        case 'CategoryTypeFilterBlock':
          if (!block.showAllLabel)
            block.showAllLabel =
              block.style === 'dropdown'
                ? t('filter-all-categories')
                : t('see-all-actions', getActionTermContext(plan));
          filters.push(createCategoryFilter(block, filterByCommonCategory, plan, t));
          break;
        case 'ActionAttributeTypeFilterBlock':
          const allowedFormats = ['ORDERED_CHOICE', 'UNORDERED_CHOICE', 'OPTIONAL_CHOICE'];
          if (!allowedFormats.includes(block.attributeType.format)) {
            console.error(
              'Invalid format for ActionAttributeTypeFilterBlock: ',
              block.attributeType.format
            );
            break;
          }
          filters.push(createAttributeTypeFilter(block, t));
          break;
        case 'ActionImplementationPhaseFilterBlock':
          if (!plan.actionImplementationPhases.length) break;
          const phaseOpts = {
            id: 'phase',
            options: plan.actionImplementationPhases.map((obj) => ({
              id: obj.identifier,
              label: obj.name,
            })),
            label: t('filter-phase'),
            helpText: t('filter-phase-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-phases'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.implementationPhase?.identifier === val) return true;
              return false;
            },
          };
          filters.push(
            createSelectFilter({
              ...phaseOpts,
              isMulti: true,
              matchesSingle: phaseOpts.filterAction as (value: string, item: FilterItem) => boolean,
            })
          );
          break;
        case 'ActionStatusFilterBlock':
          if (!plan.actionStatuses.length) break;
          const statusOpts = {
            id: 'status',
            options: plan.actionStatuses.map((obj) => ({
              id: obj.identifier,
              label: obj.name,
            })),
            label: t('filter-status'),
            helpText: t('filter-status-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-statuses'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.status?.identifier === val) return true;
              return false;
            },
          };
          filters.push(
            createSelectFilter({
              ...statusOpts,
              isMulti: true,
              matchesSingle: statusOpts.filterAction as (
                value: string,
                item: FilterItem
              ) => boolean,
            })
          );
          break;
        case 'PrimaryOrganizationFilterBlock':
          const primaryOrgOpts = {
            id: 'primary_org',
            options: primaryOrgs.map((obj) => ({
              id: obj.id,
              label: obj.abbreviation || obj.name,
            })),
            label: t('filter-primary-organization', { context: 'other' }),
            helpText: t('filter-primary-organization-help', { context: 'other' }),
            showAllLabel: t('filter-all-organizations', { context: 'other' }),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.primaryOrg?.id === val) return true;
              return false;
            },
          };
          filters.push(
            createSelectFilter({
              ...primaryOrgOpts,
              isMulti: true,
              matchesSingle: primaryOrgOpts.filterAction as (
                value: string,
                item: FilterItem
              ) => boolean,
            })
          );
          break;
        case 'ActionScheduleFilterBlock':
          if (!plan.actionSchedules.length) break;
          const scheduleOpts = {
            id: 'schedule',
            options: plan.actionSchedules.map((obj) => ({
              id: obj.id,
              label: obj.name,
            })),
            label: t('filter-schedule'),
            helpText: t('filter-schedule-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-schedules'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.schedule.some((sch) => sch.id === val)) return true;
              return false;
            },
          };
          filters.push(
            createSelectFilter({
              ...scheduleOpts,
              isMulti: true,
              matchesSingle: scheduleOpts.filterAction as (
                value: string,
                item: FilterItem
              ) => boolean,
            })
          );
          break;
        case 'PlanFilterBlock':
          const relatedPlans = plan.allRelatedPlans;
          if (relatedPlans == null || relatedPlans.length === 0) break;
          const planOpts = {
            id: 'plan',
            options: relatedPlans.map((p) => ({ id: p.id, label: p.name })),
            label: t('filter-plan'),
            helpText: t('filter-plan-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-plans'),
            filterAction: (val: string, act: ActionListAction) => act.plan?.id === val,
          };
          filters.push(
            createSelectFilter({
              ...planOpts,
              isMulti: true,
              matchesSingle: planOpts.filterAction as (value: string, item: FilterItem) => boolean,
            })
          );
          break;
        case 'ContinuousActionFilterBlock': {
          const fieldLabel = 'fieldLabel' in block ? asNonEmptyString(block.fieldLabel) : undefined;
          const fieldHelpText =
            'fieldHelpText' in block ? asNonEmptyString(block.fieldHelpText) : undefined;
          const showAllLabelOverride =
            'showAllLabel' in block ? asNonEmptyString(block.showAllLabel) : undefined;
          const label = fieldLabel ?? t('filter-action-type');
          const showAllLabel = showAllLabelOverride ?? t('see-all-actions');
          const options: ActionListFilterOption[] = [
            { id: 'continuous', label: t('actions-continuous') },
            { id: 'non_continuous', label: t('actions-non-continuous') },
          ];
          filters.push(
            createContinuousActionFilter({
              label,
              showAllLabel,
              options,
              helpText: fieldHelpText,
            })
          );
          break;
        }
        // Indicator filters
        case 'IndicatorFilterBlock':
          if (block.__typename === 'IndicatorFilterBlock') {
            switch (block.field) {
              case 'level':
                const indicatorLevels = [
                  { id: 'operational', label: t('operational-indicator') },
                  { id: 'strategic', label: t('strategic-indicator') },
                  { id: 'tactical', label: t('tactical-indicator') },
                ];
                const levelOpts = {
                  id: 'indicator-level',
                  options: indicatorLevels,
                  label:
                    asNonEmptyString('fieldLabel' in block ? block.fieldLabel : null) ?? t('type'),
                  helpText: ('fieldHelpText' in block ? block.fieldHelpText : null) ?? '',
                  showAllLabel:
                    ('showAllLabel' in block ? block.showAllLabel : null) ?? 'All levels',
                  filterAction: (val: string, act: IndicatorListIndicator) => {
                    if (act.level === val) return true;
                    return false;
                  },
                };
                filters.push(
                  createSelectFilter({
                    ...levelOpts,
                    isMulti: true,
                    matchesSingle: levelOpts.filterAction as (
                      value: string,
                      item: FilterItem
                    ) => boolean,
                  })
                );
                break;
              case 'organization':
                const organizationOpts = {
                  id: 'indicator-organization',
                  options: [],
                  label: ('fieldLabel' in block ? block.fieldLabel : null) ?? t('organization'),
                  showAllLabel: 'This filter is not currently supported',
                  filterAction: () => {
                    return false;
                  },
                };
                filters.push(
                  createSelectFilter({
                    ...organizationOpts,
                    isMulti: true,
                    matchesSingle: organizationOpts.filterAction as (
                      value: string,
                      item: FilterItem
                    ) => boolean,
                  })
                );
                break;
            }
          }
          break;
      }
    });
    if (primaryResponsiblePartyFilter) {
      filters.push(primaryResponsiblePartyFilter);
    }

    if (id === 'main') {
      if (!isIndicatorList && plan.actionImpacts.length) {
        // FIXME: Migrate to AttributeType
        const opts = {
          id: 'impact',
          options: plan.actionImpacts.map((obj) => ({
            id: obj.id,
            label: obj.name,
          })),
          label: t('filter-impact'),
          helpText: t('filter-impact-help', getActionTermContext(plan)) || '',
          showAllLabel: t('filter-all-impacts'),
          filterAction: (val: string, act: ActionListAction) => {
            if (act.impact?.id === val) return true;
            return false;
          },
        };
        filters.push(
          createSelectFilter({
            ...opts,
            isMulti: true,
            matchesSingle: opts.filterAction as (value: string, item: FilterItem) => boolean,
          })
        );
      }
      filters.push(createActionNameFilter(plan, t, actionTerm));
    }

    const ret: ActionListFilterSection = {
      id,
      hidden,
      filters,
    };
    return ret;
  }

  const sections: ActionListFilterSection[] = [];
  if (primaryFilters?.length) sections.push(makeSection('primary', false, primaryFilters));
  sections.push(makeSection('main', false, mainFilters));
  if (advancedFilters?.length) sections.push(makeSection('advanced', true, advancedFilters));

  return sections;
};

export default ActionListFilters;
