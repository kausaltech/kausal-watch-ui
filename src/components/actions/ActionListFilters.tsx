import type { Ref } from 'react';
import React, { type JSX, createRef, useCallback, useMemo, useState } from 'react';

import escapeStringRegexp from 'escape-string-regexp';
import { debounce } from 'lodash';
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
import styled, { useTheme } from 'styled-components';

import type {
  ActionListFilterFragment,
  ActionListPageFiltersFragment,
} from '@/common/__generated__/graphql';
import {
  ActionResponsiblePartyRole,
  CategoryTypeSelectWidget,
} from '@/common/__generated__/graphql';
import type { CategoryHierarchyMember, CategoryTypeHierarchy } from '@/common/categories';
import { constructCatHierarchy, getCategoryString } from '@/common/categories';
import type { TFunction } from '@/common/i18n';
import { getActionTermContext } from '@/common/i18n';
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

const StyledBadge = styled(BadgeComponent)<{ $color?: string }>`
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
          (option as SelectDropdownOption[])?.map((o) => o.id)
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

type ActionListFilterBadgesProps = {
  plan: PlanContextType;
  allFilters: ActionListFilter[];
  activeFilters: Filters;
  actionCount: number;
  actionCountLabel?: string;
  onReset: (id: string, value: SingleFilterValue) => void;
  buttonColor?: string;
};

type Badge = {
  key: string;
  id: string;
  value: SingleFilterValue;
  label: string;
  onReset: () => void;
};

function ActionListFilterBadges({
  plan,
  allFilters,
  activeFilters,
  actionCount,
  actionCountLabel,
  onReset,
  buttonColor,
}: ActionListFilterBadgesProps) {
  const t = useTranslations();

  const enabled = allFilters.filter((item) => activeFilters[item.id]);

  function createBadge(item: ActionListFilter, value: SingleFilterValue): Badge | null {
    let label: string;

    if (item.id === 'primary_responsible_party') {
      if (!value || !activeFilters['responsible_party']) return null;
      label = item.getLabel(t);
    } else if (item.id === 'name') {
      if (!value || typeof value !== 'string' || value.trim() === '') {
        return null;
      }
      label = value;
    } else if (item.options) {
      const matchingFilters = enabled.filter((i) => i.id === item.id);
      let activeOption: ActionListFilterOption | undefined;

      for (const filter of matchingFilters) {
        activeOption = filter.options?.find((opt) => opt.id === value);
        if (activeOption) break;
      }

      if (!activeOption) {
        return null;
      }
      label = activeOption.label;
      // Handle boolean type filters
    } else if (typeof value === 'boolean') {
      label = item.getLabel(t);
    } else {
      return null;
    }
    return {
      key: item.id,
      id: item.id,
      value,
      label,
      onReset: () => {
        onReset(item.id, value);
      },
    };
  }

  const seenFilterKeyValues = new Set();
  const badgesToCreate = enabled.filter((item: ActionListFilter) => {
    const uniqueKey = `${item.id}-${activeFilters[item.id]}`;
    if (seenFilterKeyValues.has(uniqueKey)) return false;
    seenFilterKeyValues.add(uniqueKey);
    return true;
  });
  if (
    activeFilters['primary_responsible_party'] &&
    activeFilters['responsible_party'] &&
    !badgesToCreate.some((b) => b.id === 'primary_responsible_party')
  ) {
    badgesToCreate.push({
      id: 'primary_responsible_party',
      getLabel: (t: TFunction) => t('filter-primary-responsible-party'),
    } as ActionListFilter);
  }
  const badges = badgesToCreate
    .map((item: ActionListFilter) => {
      const value = activeFilters[item.id];
      return (isSingleFilterValue(value) ? [value] : value).map((v) => createBadge(item, v));
    })
    .flat()
    .filter((item): item is Badge => item != null);

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
      {badges.length > 0 && <span className="visually-hidden">{t('active-filters')}</span>}
      {/* TODO: animate transition */}
      {badges.map((item) => (
        <StyledBadge key={`${item.id}-${item.value}`} className="me-3" $color={buttonColor}>
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
  filterAction: (value: Value, action: ActionListAction) => boolean;
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
  abstract filterAction(value: Value, action: ActionListAction): boolean;

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
  filterAction: (value: FilterValue, action: ActionListAction) => boolean;
  label: string;
  helpText?: string;
  showAllLabel: string;
};

class GenericSelectFilter extends DefaultFilter<string | undefined> {
  options: ActionListFilterOption[];
  label: string;
  helpText: string | undefined;
  showAllLabel: string;
  filterAction: (value: string | undefined, action: ActionListAction) => boolean;

  constructor(opts: GenericSelectFilterOpts) {
    const { id, options, label, helpText, showAllLabel, filterAction } = opts;
    super();
    this.id = id;
    this.options = options;
    this.label = label;
    this.helpText = helpText;
    this.showAllLabel = showAllLabel;
    this.filterAction = filterAction;
  }
  getLabel() {
    return this.label;
  }
  getHelpText() {
    return this.helpText;
  }
  getShowAllLabel() {
    return this.showAllLabel;
  }
}

class ResponsiblePartyFilter extends DefaultFilter<string | undefined> {
  id = 'responsible_party';
  options: ActionListFilterOption[];
  orgById: Map<string, ActionListOrganization>;

  constructor(
    orgs: ActionListOrganization[],
    private plan: PlanContextType
  ) {
    super();
    const sortedOrgs = sortDepthFirst(
      orgs,
      (a, b) => a.name.localeCompare(b.name),
      (org) => org.parent,
      (org) => org.children
    );
    this.orgById = new Map(orgs.map((org) => [org.id, org]));
    this.options = sortedOrgs.map((org) => ({
      id: org.id,
      label: org.name,
      indent: org.depth,
    }));
  }
  filterAction(value: string | undefined, action: ActionListAction) {
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
  }

  render(
    value: string | undefined,
    onChange: FilterChangeCallback<string | undefined>,
    t: TFunction,
    primaryValue?: string
  ) {
    return (
      <FilterColumn sm={this.sm} md={this.md} lg={this.lg} key={this.id}>
        <ActionListDropdownInput
          isMulti={false}
          id={this.id}
          label={this.getLabel(t)}
          helpText={this.getHelpText(t)}
          showAllLabel={this.getShowAllLabel(t)}
          currentValue={value}
          onChange={onChange}
          options={this.options}
        />
        {value && (
          <FormGroup switch>
            <Input
              type="switch"
              role="switch"
              id="primary_responsible_party"
              checked={primaryValue === value}
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
  private getOrgTermContext() {
    return { context: this.plan.generalContent.organizationTerm };
  }
  getLabel(t: TFunction) {
    return t('filter-organization', this.getOrgTermContext());
  }
  getHelpText(t: TFunction) {
    return t('filter-organization-help', this.getOrgTermContext());
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-all-organizations', this.getOrgTermContext());
  }
}

class PrimaryResponsiblePartyFilter extends React.Component<{
  responsibleParty: string;
  value: string | undefined;
  onChange: FilterChangeCallback<string | undefined>;
  t: TFunction;
}> {
  id = 'primary_responsible_party';
  useValueFilterId = 'responsible_party';
  options: ActionListFilterOption[] = [];

  filterAction(value: string | undefined, action: ActionListAction) {
    if (!value) return true;
    return (
      action.primaryOrg?.id === value ||
      action.responsibleParties.some(
        (rp) => rp.role === ActionResponsiblePartyRole.Primary && rp.organization.id === value
      )
    );
  }

  getLabel(t: TFunction) {
    return t('filter-primary-responsible-party');
  }

  render() {
    if (!this.props || !this.props.responsibleParty) return null;
    const { responsibleParty, onChange, t } = this.props;
    return (
      <FilterColumn>
        <FormGroup switch className="mb-4">
          <Input
            type="switch"
            role="switch"
            id={this.id}
            checked={this.props.value === this.props.responsibleParty}
            onChange={(e) => onChange(this.id, e.target.checked ? responsibleParty : undefined)}
          />
          <label htmlFor={this.id}>{this.getLabel(t)}</label>
        </FormGroup>
      </FilterColumn>
    );
  }
}

type QueryFilterCategoryType = ActionListCategoryTypeFilterBlock['categoryType'];
type QueryFilterCategory = NonNullable<QueryFilterCategoryType>['categories'][0];
type FilterCategoryType = QueryFilterCategoryType & CategoryTypeHierarchy<FilterCategory>;
type FilterCategory = QueryFilterCategory & CategoryHierarchyMember<FilterCategoryType>;

class CategoryFilter extends DefaultFilter<FilterValue> {
  id: string;
  ct: NonNullable<ActionListCategoryTypeFilterBlock['categoryType']>;
  options: ActionListFilterOption[];
  style: 'dropdown' | 'buttons';
  showAllLabel: string | undefined | null;
  filterByCommonCategory: boolean;
  catById: Map<string, FilterCategory>;
  hasMultipleValues: boolean;
  depth: number;
  private actionTermContext?: { context: string };

  constructor(
    config: ActionListCategoryTypeFilterBlock,
    filterByCommonCategory: boolean,
    plan: PlanContextType
  ) {
    super();
    this.ct = config.categoryType!;
    this.id = getCategoryString(this.ct.identifier);
    this.showAllLabel = config.showAllLabel;
    this.hasMultipleValues = this.ct.selectionType === CategoryTypeSelectWidget.Multiple;
    this.filterByCommonCategory = filterByCommonCategory;
    this.actionTermContext = getActionTermContext(plan);
    const style = config.style === 'dropdown' ? 'dropdown' : 'buttons';
    this.style = style;
    this.depth = config.depth ?? (this.style === 'dropdown' ? 2 : 1);
    const hierarchyCt = constructCatHierarchy<FilterCategory, FilterCategoryType>([this.ct])[0];
    const sortedCats = sortDepthFirst(
      hierarchyCt.categories,
      (a, b) => a.order - b.order,
      (cat) => cat.parent,
      (cat) => cat.children
    );
    this.catById = this.filterByCommonCategory
      ? new Map(sortedCats.map((c) => [c.common.id, c]))
      : new Map(sortedCats.map((c) => [c.id, c]));
    const getLabel = (cat: ActionListCategory) =>
      this.ct.hideCategoryIdentifiers ? cat.name : `${cat.identifier}. ${cat.name}`;
    this.options = sortedCats
      .filter((cat) => cat.depth < this.depth)
      .map((cat) => ({ id: cat.id, label: getLabel(cat), indent: cat.depth }));
  }
  filterSingleCategory(action: ActionListAction, categoryId: string | undefined) {
    return action.categories.some((actCat) => {
      let cat = this.catById.get(actCat.id);
      while (cat) {
        if (cat.id === categoryId) return true;
        cat = cat.parent ?? undefined;
      }
      return false;
    });
  }
  filterAction(value: FilterValue, action: ActionListAction) {
    if (isSingleFilterValue(value)) {
      return this.filterSingleCategory(action, value);
    }
    return value.every((v) => this.filterSingleCategory(action, v));
  }
  render(value: FilterValue, onChange: FilterChangeCallback<FilterValue>, t: TFunction) {
    if (this.style === 'dropdown') {
      return super.render(value, onChange, t, this.hasMultipleValues);
    }
    const seeAll: string = t('see-all-actions', this.actionTermContext || {});
    return (
      <Col sm={12} md={12} lg={12} key={this.id}>
        <MainCategory>
          <MainCategoryLabel id={`label-${this.id}`}>
            {this.getLabel(t)}
            {this.ct.helpText && <PopoverTip header="Main Category" content={this.ct.helpText} />}
          </MainCategoryLabel>
          <ButtonGroup role="radiogroup" aria-labelledby={`label-${this.id}`}>
            <RButton
              color="black"
              outline
              onClick={() => onChange(this.id, undefined)}
              active={value === undefined}
              aria-checked={value === undefined}
              role="radio"
            >
              {seeAll}
            </RButton>
            {this.options.map((opt) => (
              <RButton
                color="black"
                outline
                onClick={() => onChange(this.id, opt.id)}
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
  }
  getLabel() {
    return this.ct.name;
  }
  getHelpText() {
    return this.ct.helpText;
  }
  getShowAllLabel(t: TFunction) {
    return this.showAllLabel || t('filter-all-categories');
  }
}

type AttributeTypeChoice = NonNullable<
  ActionListActionAttributeTypeFilterBlock['attributeType']
>['choiceOptions'][0];

class AttributeTypeFilter extends DefaultFilter<string | undefined> {
  id: string;
  att: NonNullable<ActionListActionAttributeTypeFilterBlock['attributeType']>;
  options: ActionListFilterOption[];
  showAllLabel: string | undefined | null;
  choiceById: Map<string, AttributeTypeChoice>;

  constructor(config: ActionListActionAttributeTypeFilterBlock) {
    super();
    this.att = config.attributeType!;
    this.showAllLabel = config.showAllLabel;
    this.id = `att-${this.att.identifier}`;
    const choices = this.att.choiceOptions;
    this.choiceById = new Map(choices.map((choice) => [choice.id, choice]));
    const getLabel = (choice: AttributeTypeChoice) => choice.name;
    this.options = choices.map((choice) => ({
      id: choice.id,
      label: getLabel(choice),
    }));
  }
  filterAction(value: string | undefined, action: ActionListAction) {
    return action.attributes.some((actAtt) => {
      if (actAtt.__typename !== 'AttributeChoice') return false;
      const { choice } = actAtt;
      if (!choice) return false;
      if (choice.id === value) return true;
      return false;
    });
  }
  getLabel() {
    return this.att.name;
  }
  getHelpText() {
    return this.att.helpText;
  }
  getShowAllLabel(t: TFunction) {
    return this.showAllLabel || t('filter-all-categories');
  }
}

class ActionNameFilter implements ActionListFilter<string | undefined> {
  id = 'name';
  sm = 9;
  md = 9;
  lg = 6;
  debounce = 150;

  private actionTermContext?: { context: string };
  hasActionIdentifiers: boolean;
  ref: Ref<HTMLInputElement>;

  constructor(plan: PlanContextType, actionTerm?: string) {
    this.hasActionIdentifiers = plan.features.hasActionIdentifiers;
    this.actionTermContext = getActionTermContext(plan, actionTerm);
    this.ref = createRef();
  }
  useValueFilterId: string | undefined;
  options?: ActionListFilterOption[] | undefined;

  filterAction(value: string, action: ActionListAction) {
    const searchStr = escapeStringRegexp(value.toLowerCase());
    let searchTarget = action.name.replace(/\u00AD/g, '').toLowerCase();
    if (this.hasActionIdentifiers) {
      searchTarget = `${action.identifier.toLowerCase()} ${searchTarget}`;
    }
    return searchTarget.search(searchStr) !== -1;
  }
  getLabel(t: TFunction) {
    return t('filter-text', this.actionTermContext);
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-text-default');
  }
  getHelpText() {
    return undefined;
  }
  render(
    value: string | undefined,
    onChange: FilterChangeCallback<string | undefined>,
    t: TFunction,
    _primaryValue?: string
  ) {
    return (
      <FilterColumn m={this.sm} md={this.md} lg={this.lg} key={this.id}>
        <ActionListTextInput
          id={this.id}
          label={this.getLabel(t)}
          placeholder={this.getShowAllLabel(t)}
          onChange={onChange}
          currentValue={value}
          inputRef={this.ref}
        />
      </FilterColumn>
    );
  }
}

class ContinuousActionFilter implements ActionListFilter<string | undefined> {
  id = 'continuous';
  sm = undefined;
  md = 6;
  lg = 4;
  label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }
  useValueFilterId: string | undefined;
  options?: ActionListFilterOption[] | undefined;
  debounce?: number | undefined;
  getLabel(t: TFunction) {
    return t('actions-show-continuous', getActionTermContext(usePlan()));
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-text-default');
  }
  getHelpText() {
    return undefined;
  }
  filterAction(value: FilterValue, action: ActionListAction) {
    return action?.scheduleContinuous === !!value;
  }
  render(value: string | undefined, onChange: FilterChangeCallback<string | undefined>) {
    return (
      <FilterColumn sm={this.sm} md={this.md} lg={this.lg} key={this.id}>
        <FormGroup switch className="mb-4">
          <Input
            type="switch"
            role="switch"
            id={this.id}
            checked={value === '1'}
            onChange={(e) => onChange(this.id, e.target.checked ? '1' : '')}
          />
          <label htmlFor={this.id}>{this.label}</label>
        </FormGroup>
      </FilterColumn>
    );
  }
}

export type ActionListFilterSection = {
  id: string;
  hidden?: boolean;
  filters: ActionListFilter[];
};

type FilterColProps = {
  filter: ActionListFilter;
  onFilterChange: (id: string, val: FilterValue, debounce: number) => void;
  state: FilterValue;
  primaryResponsibleParty?: string | undefined;
};
const FilterCol = React.memo(function FilterCol({
  filter,
  onFilterChange,
  state,
  primaryResponsibleParty,
}: FilterColProps) {
  const t = useTranslations();

  if (filter.id === 'responsible_party') {
    return (filter as ResponsiblePartyFilter).render(
      state as string | undefined,
      onFilterChange,
      t,
      primaryResponsibleParty
    );
  }

  return filter.render(state, onFilterChange, t);
});

type ActionListFiltersProps = {
  activeFilters: Filters;
  filterSections: ActionListFilterSection[];
  actionCount: number;
  actionCountLabel?: string;
  onChange: (filterType: string, val: FilterValue) => void;
};

function ActionListFilters(props: ActionListFiltersProps) {
  const { activeFilters, filterSections, actionCount, onChange, actionCountLabel } = props;

  const [filterState, setFilterState] = useState(activeFilters);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();
  const theme = useTheme();
  // theme.neutralLight is the background color of the action list filters
  // Let's make sure that the button color is readable on this background
  const buttonColorName = theme.neutralLight === theme.brandDark ? 'secondary' : 'primary';
  const plan = usePlan();

  const allFilters: ActionListFilter[] = useMemo(
    () => filterSections.map((section) => section.filters).flat(),
    [filterSections]
  );

  const debouncedFilterChange = useMemo(() => debounce(onChange, 150), [onChange]);

  const onFilterChange = useCallback(
    (id: string, val: FilterValue, debounce: number = 0) => {
      setFilterState((state) => {
        const newState = { ...state, [id]: val };

        if (id === 'responsible_party') {
          newState['primary_responsible_party'] = undefined;
        }

        return newState;
      });

      if (debounce) {
        debouncedFilterChange(id, val);
      } else {
        onChange(id, val);
      }
    },
    [setFilterState, onChange, debouncedFilterChange]
  );

  const deleteFilterValues = useCallback(
    (id: string, value: SingleFilterValue) => {
      const filterVal = filterState[id];
      if (Array.isArray(filterVal)) {
        return filterVal.filter((valueId) => value !== valueId);
      }
      return undefined;
    },
    [filterState]
  );

  const onReset = useCallback(
    (id: string, value: SingleFilterValue) => {
      if (id === 'responsible_party') {
        onFilterChange('primary_responsible_party', undefined);
      }
      onFilterChange(id, deleteFilterValues(id, value));
    },
    [onFilterChange, deleteFilterValues]
  );

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
                  <FilterCol
                    key={filter.id}
                    filter={filter}
                    onFilterChange={onFilterChange}
                    state={filterState[filter.id]}
                    primaryResponsibleParty={filterState['primary_responsible_party']}
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
              onReset={onReset}
              actionCount={actionCount}
              actionCountLabel={actionCountLabel}
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
  mainConfig: ActionListPageFiltersFragment;
  plan: PlanContextType;
  t: TFunction;
  orgs: ActionListOrganization[];
  primaryOrgs: ActionListPrimaryOrg[];
  filterByCommonCategory: boolean;
  actionTerm?: string;
};

ActionListFilters.constructFilters = (opts: ConstructFiltersOpts) => {
  const { mainConfig, plan, t, orgs, primaryOrgs, filterByCommonCategory, actionTerm } = opts;
  const { primaryFilters, mainFilters, advancedFilters } = mainConfig;

  function makeSection(id: string, hidden: boolean, blocks: ActionListFilterFragment[]) {
    const filters: ActionListFilter[] = [];
    let primaryResponsiblePartyFilter: PrimaryResponsiblePartyFilter | null = null;

    blocks.forEach((block) => {
      switch (block.__typename) {
        case 'ResponsiblePartyFilterBlock':
          filters.push(new ResponsiblePartyFilter(orgs, plan));
          primaryResponsiblePartyFilter = new PrimaryResponsiblePartyFilter();
          break;
        case 'CategoryTypeFilterBlock':
          filters.push(new CategoryFilter(block, filterByCommonCategory, plan));
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
          filters.push(new AttributeTypeFilter(block));
          break;
        case 'ActionImplementationPhaseFilterBlock':
          if (!plan.actionImplementationPhases.length) break;
          const phaseOpts = {
            id: 'phase',
            options: plan.actionImplementationPhases.map((obj) => ({
              id: obj.id,
              label: obj.name,
            })),
            label: t('filter-phase'),
            helpText: t('filter-phase-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-phases'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.implementationPhase?.id === val) return true;
              return false;
            },
          };
          filters.push(new GenericSelectFilter(phaseOpts));
          break;
        case 'ActionStatusFilterBlock':
          if (!plan.actionStatuses.length) break;
          const statusOpts = {
            id: 'status',
            options: plan.actionStatuses.map((obj) => ({
              id: obj.id,
              label: obj.name,
            })),
            label: t('filter-status'),
            helpText: t('filter-status-help', getActionTermContext(plan)) || '',
            showAllLabel: t('filter-all-statuses'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.status?.id === val) return true;
              return false;
            },
          };
          filters.push(new GenericSelectFilter(statusOpts));
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
          filters.push(new GenericSelectFilter(primaryOrgOpts));
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
          filters.push(new GenericSelectFilter(scheduleOpts));
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
          filters.push(new GenericSelectFilter(planOpts));
          break;
        case 'ContinuousActionFilterBlock':
          filters.push(
            new ContinuousActionFilter(
              'continuous',
              t('actions-show-continuous', getActionTermContext(plan))
            )
          );
          break;
      }
    });
    if (primaryResponsiblePartyFilter) {
      filters.push(primaryResponsiblePartyFilter);
    }

    if (id === 'main') {
      if (plan.actionImpacts.length) {
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
        filters.push(new GenericSelectFilter(opts));
      }
      filters.push(new ActionNameFilter(plan, actionTerm));
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
  if (mainFilters?.length) sections.push(makeSection('main', false, mainFilters));
  if (advancedFilters?.length) sections.push(makeSection('advanced', true, advancedFilters));

  return sections;
};

export default ActionListFilters;
