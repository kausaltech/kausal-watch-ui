import React, { createRef, Ref, useCallback, useMemo, useState } from 'react';
import { Row, Col, Badge, CloseButton } from 'reactstrap';
import { debounce, } from 'lodash';
import styled from 'styled-components';
import { readableColor } from 'polished';
import {ButtonGroup, Button as RButton, Collapse} from 'reactstrap';

import { getActionTermContext, useTranslation } from 'common/i18n';
import { useTheme } from 'common/theme';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import { PlanContextType, usePlan } from 'context/plan';
import PopoverTip from 'components/common/PopoverTip';
import {
  ActionListAction, ActionListActionAttributeTypeFilterBlock, ActionListCategory, ActionListCategoryTypeFilterBlock,
  ActionListOrganization, ActionListPrimaryOrg,
} from 'components/dashboard/ActionList';
import {
  ActionListFilterFragment, ActionListPageFiltersFragment, CategoryTypeSelectWidget,
} from 'common/__generated__/graphql';
import { TFunction } from 'next-i18next';
import SelectDropdown, { SelectDropdownOption } from 'components/common/SelectDropdown';
import {
  CategoryHierarchyMember, CategoryTypeHierarchy, constructCatHierarchy
} from 'common/categories';
import Icon from 'components/common/Icon';
import { createFilter } from 'react-select';


type MultipleFilterValue = string[];
type SingleFilterValue = string|undefined;

export type FilterValue = MultipleFilterValue | SingleFilterValue;
function isMultipleFilterValue(value: FilterValue): value is MultipleFilterValue {
  return Array.isArray(value);
}
function isSingleFilterValue(value: FilterValue): value is SingleFilterValue {
  return !isMultipleFilterValue(value);
}
export type Filters<Value extends FilterValue = FilterValue> = {
  [key: string]: Value;
}

const FiltersList = styled.div`
  margin: 0 0 ${(props) => props.theme.spaces.s150} 0;
  padding: ${(props) => props.theme.spaces.s100} 0;
  font-size: ${(props) => props.theme.fontSizeLg};
  line-height: ${(props) => props.theme.lineHeightBase};
  border-color: ${(props) => props.theme.themeColors.dark};
  border-top: 1px solid;
  border-bottom: 1px solid;

  .count {
    margin: ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100}
      0;
    padding-bottom: ${(props) => props.theme.spaces.s100};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  .close {
    color: ${(props) => props.theme.themeColors.white};
    margin-left: .75em;
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

const FilterSection = styled(Row)`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const FilterSectionDivider = styled.div`
  border-bottom: 1px solid #333;
`;

const StyledBadge = styled(Badge)`
  display: inline-flex;
  max-width: 100%;
  white-space: normal;
  margin-bottom: ${(props) => props.theme.spaces.s050};
  margin-right: ${(props) => props.theme.spaces.s050};
  padding-left: 0;
  background-color: ${(props) => props.theme.brandDark} !important;
  color: ${(props) => props.theme.themeColors.light};
  line-height: 1.25;
  text-align: left;

  .btn-close {
    margin: 0 .5rem;
    width: 0.75rem;
    height: 0.75rem;
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
`;

function sortDepthFirst<Type>(
  items: Type[],
  compareItem: (a: Type, b: Type) => number,
  getParent: (item: Type) => Type|null,
  getChildren: (item: Type) => Type[],
) {
  const out: Type[] = [];

  function walkTree(objs: Type[]) {
    const sorted = [...objs];
    sorted.sort((a, b) => compareItem(a, b));
    sorted.forEach(obj => {
      out.push(obj);
      const children = getChildren(obj);
      walkTree(children);
    });
  }

  const roots = items.filter(item => !getParent(item));
  walkTree(roots);
  return out;
}

type ActionListTextInputProps = {
  id: string,
  label: string,
  placeholder: string,
  currentValue: string|undefined,
  onChange: FilterChangeCallback<string|undefined>,
  inputRef?: Ref<HTMLInputElement>
}

function ActionListTextInput({
  id, label, placeholder, currentValue, onChange, inputRef,
}: ActionListTextInputProps) {
  const callback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(id, value, 150);
  }, [id, onChange]);

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
  id: string,
  label: string,
  helpText?: string,
  showAllLabel?: string,
  currentValue: Value,
  onChange: FilterChangeCallback<Value>,
  options: SelectDropdownOption[],
  isMulti: Value extends MultipleFilterValue ? boolean : false
}

const filterOption = createFilter({
  ignoreCase: true,
  ignoreAccents: true,
  matchFrom: 'any',
  stringify: option => option.label,
  trim: true,
});

function ActionListDropdownInput<Value extends FilterValue>(props: ActionListDropdownProps<Value>) {
  const {
    id, label, helpText, currentValue, onChange, showAllLabel, options, isMulti
  } = props;
  // check if we need to inverse component colors depending on section bg
  const theme = useTheme();
  const invert = readableColor(
    theme.neutralLight,
    theme.themeColors.black,
    theme.themeColors.white) === theme.themeColors.white;
  const callback = useCallback((option: (
    Value extends MultipleFilterValue ? SelectDropdownOption[] : SelectDropdownOption|null
  )) => {
    // Found no way to automatically narrow the type of option (or currentValue)
    if (isMulti) {
      (onChange as FilterChangeCallback<MultipleFilterValue>)(id, (option as SelectDropdownOption[])?.map(o => o.id));
      return;
    }
    else {
      (onChange as FilterChangeCallback<SingleFilterValue>)(id, (option as SelectDropdownOption | null)?.id);
      return;
    }

  }, [id, onChange]);

  let selectedOption: SelectDropdownOption[] | SelectDropdownOption | null;
  if (isSingleFilterValue(currentValue)) {
    selectedOption = currentValue ? options.find((opt) => opt.id === currentValue) ?? null : null;
  }
  else {
    selectedOption = currentValue.length === 0 ? [] : options.filter(opt => currentValue.find(v => opt.id === v));
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
  plan: PlanContextType,
  allFilters: ActionListFilter[],
  activeFilters: Filters,
  actionCount: number,
  onReset: (id: string, value: SingleFilterValue) => void,
}

function ActionListFilterBadges({
  plan, allFilters, activeFilters, actionCount, onReset,
}: ActionListFilterBadgesProps) {
  const { t } = useTranslation();
  const enabled = allFilters.filter((item) => activeFilters[item.id]);

  const createBadge = (item: ActionListFilter, value: SingleFilterValue) => {
    let label: string;
    if (item.id === 'name') {
      label = value ?? '';
    } if (item.options) {
      const activeOption = item.options.find((opt) => opt.id === value) as ActionListFilterOption;
      label = activeOption.label
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
  const badges = enabled.map((item: ActionListFilter) => {
    const value = activeFilters[item.id];
    return (isSingleFilterValue(value) ? [value] : value).map(v => createBadge(item, v));
  }).flat().filter(item => item != null);

  return (
    <FiltersList aria-live="assertive">
      <span className="count">
        {
          /* FIXME: Translation should take number into account */
          `${actionCount} ${t('filter-result-actions', getActionTermContext(plan))}`
        }
      </span>
      { badges.length > 0 && <span className="visually-hidden">{t('active-filters')}</span>}
      {/* TODO: animate transition */}
        {badges.map((item) => (
          <StyledBadge
            key={`${item.id}-${item.value}`}
            className="me-3"
            color="primary"
          >
            <CloseButton
              variant="white"
              className="btn-sm"
              onClick={item.onReset}
              aria-label={t('remove-filter')}
            />
            { item.label.trim() }
          </StyledBadge>
        ))}
    </FiltersList>
  );
}

type FilterChangeCallback<Value> = (filterId: string, val: Value, debounce?: number) => void;


type ActionListFilterOption = {
  id: string,
  label: string,
};

export interface ActionListFilter<Value extends FilterValue = FilterValue> {
  id: string,
  filterAction: (value: Value, action: ActionListAction) => boolean,
  getLabel: (t: TFunction) => string,
  getHelpText: (t: TFunction) => string|undefined,
  getShowAllLabel: (t: TFunction) => string,
  sm: number|undefined,
  md: number,
  lg: number,
  options?: ActionListFilterOption[],
  debounce?: number|undefined,
  render: (value: Value, onChange: FilterChangeCallback<Value>, t: TFunction) => JSX.Element,
};

abstract class DefaultFilter<Value extends FilterValue> implements ActionListFilter<Value> {
  id: string;
  sm = undefined;
  md = 6;
  lg = 4;
  abstract options: NonNullable<ActionListFilter['options']>;

  abstract getLabel(t: TFunction): string;
  abstract getHelpText(t: TFunction): string|undefined;
  abstract filterAction(value: Value, action: ActionListAction): boolean;

  getShowAllLabel(t: TFunction) {
    return t('filter-all-categories')
  };

  render(value: Value, onChange: FilterChangeCallback<Value>, t: TFunction, isMulti?: Value extends MultipleFilterValue ? boolean : false) {
    const _isMulti = isMulti ?? false;
    return (
      <Col
        sm={this.sm}
        md={this.md}
        lg={this.lg}
        key={this.id}
      >
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
      </Col>
    );
  }
};


type GenericSelectFilterOpts = {
  id: string,
  options: ActionListFilterOption[],
  filterAction: (value: FilterValue, action: ActionListAction) => boolean,
  label: string,
  helpText?: string,
  showAllLabel: string,
}

class GenericSelectFilter extends DefaultFilter<string|undefined> {
  options: ActionListFilterOption[];
  label: string;
  helpText: string|undefined;
  showAllLabel: string;
  filterAction: (value: string|undefined, action: ActionListAction) => boolean;

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
  getLabel(t: TFunction) {
    return this.label;
  }
  getHelpText(t: TFunction) {
    return this.helpText;
  }
  getShowAllLabel(t: TFunction) {
    return this.showAllLabel;
  }
}


class ResponsiblePartyFilter extends DefaultFilter<string|undefined> {
  id = 'responsible_party';
  options: ActionListFilterOption[];
  orgById: Map<string, ActionListOrganization>

  constructor(orgs: ActionListOrganization[]) {
    super();
    const sortedOrgs = sortDepthFirst(
      orgs,
      (a, b) => a.name.localeCompare(b.name),
      (org) => org.parent,
      (org) => org.children
    );
    this.orgById = new Map(orgs.map(org => [org.id, org]));
    this.options = sortedOrgs.map((org) => ({id: org.id, label: org.name, indent: org.depth}));
  }
  filterAction(value: string|undefined, action: ActionListAction) {
    return action.responsibleParties.some((rp) => {
      // @ts-ignore
      let org: ActionListOrganization = rp.organization;
      while (org) {
        if (org.id === value) return true;
        org = org.parent;
      }
      return false;
    });
  }
  render(value: string|undefined, onChange: FilterChangeCallback<string|undefined>, t: TFunction) {
    return super.render(value, onChange, t);
  }
  getLabel(t: TFunction) {
    return t('filter-organization');
  }
  getHelpText(t: TFunction) {
    return t('filter-organization-help', '');
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-all-organizations');
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
  style: 'dropdown'|'buttons';
  showAllLabel: string|undefined|null;
  catById: Map<string, FilterCategory>
  hasMultipleValues: boolean;

  constructor(config: ActionListCategoryTypeFilterBlock) {
    super();
    this.ct = config.categoryType!;
    this.id = `cat-${this.ct!.identifier}`;
    this.showAllLabel = config.showAllLabel;
    this.hasMultipleValues = this.ct!.selectionType === CategoryTypeSelectWidget.Multiple;
    //@ts-ignore
    const style = config.style === 'dropdown' ? 'dropdown' : 'buttons';
    this.style = style;
    const hierarchyCt = constructCatHierarchy<FilterCategory, FilterCategoryType>([this.ct])[0];
    const sortedCats = sortDepthFirst(
      hierarchyCt.categories,
      (a, b) => a.order - b.order,
      (cat) => cat.parent,
      (cat) => cat.children
    );
    this.catById = new Map(sortedCats.map(org => [org.id, org]));
    const getLabel = (cat: ActionListCategory) => (
      this.ct.hideCategoryIdentifiers ? cat.name : `${cat.identifier}. ${cat.name}`
    );
    this.options = sortedCats.map((cat) => ({id: cat.id, label: getLabel(cat), indent: cat.depth}));
  }
  filterSingleCategory(action: ActionListAction, categoryId: string|undefined) {
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
    return value.every(v => this.filterSingleCategory(action, v));
  }
  render(value: FilterValue, onChange: FilterChangeCallback<FilterValue>, t: TFunction) {
    if (this.style === 'dropdown') {
      return super.render(value, onChange, t, this.hasMultipleValues);
    }
    const seeAll: string = t('see-all-actions');
    return (
      <Col
        sm={this.sm}
        md={this.md}
        lg={this.lg}
        key={this.id}
      >
        <MainCategory>
          <MainCategoryLabel id={`label-${this.id}`}>
            {this.getLabel(t)}
            {this.ct.helpText && (
              <PopoverTip
                header="Main Category"
                content={this.ct.helpText}
              />
            )}
          </MainCategoryLabel>
          <ButtonGroup
            role="radiogroup"
            aria-labelledby={`label-${this.id}`}
          >
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
              { opt.label }
            </RButton>
            ))}
          </ButtonGroup>
        </MainCategory>
      </Col>
    )}
  getLabel(t: TFunction) {
    return this.ct.name;
  }
  getHelpText(t: TFunction) {
    return this.ct.helpText;
  }
  getShowAllLabel(t: TFunction) {
    return this.showAllLabel || t('filter-all-categories')!;
  }
}


type AttributeTypeChoice = NonNullable<
  ActionListActionAttributeTypeFilterBlock['attributeType']
>['choiceOptions'][0]

class AttributeTypeFilter extends DefaultFilter<string|undefined> {
  id: string;
  att: NonNullable<ActionListActionAttributeTypeFilterBlock['attributeType']>;
  options: ActionListFilterOption[];
  showAllLabel: string|undefined|null;
  choiceById: Map<string, AttributeTypeChoice>

  constructor(config: ActionListActionAttributeTypeFilterBlock) {
    super();
    this.att = config.attributeType!;
    this.showAllLabel = config.showAllLabel;
    this.id = `att-${this.att.identifier}`;
    const choices = this.att.choiceOptions;
    this.choiceById = new Map(choices.map(choice => [choice.id, choice]));
    const getLabel = (choice: AttributeTypeChoice) => choice.name;
    this.options = choices.map((choice) => ({id: choice.id, label: getLabel(choice)}));
  }
  filterAction(value: string|undefined, action: ActionListAction) {
    return action.attributes.some((actAtt) => {
      if (actAtt.__typename !== 'AttributeChoice') return false;
      const { choice } = actAtt;
      if (!choice) return false;
      if (choice.id === value) return true;
      return false;
    });
  }
  getLabel(t: TFunction) {
    return this.att.name;
  }
  getHelpText(t: TFunction) {
    return this.att.helpText;
  }
  getShowAllLabel(t: TFunction) {
    return this.showAllLabel || t('filter-all-categories')!;
  }
}


class ActionNameFilter implements ActionListFilter<string|undefined> {
  id = 'name';
  sm = 9;
  md = 9;
  lg = 6;
  debounce = 150;

  hasActionIdentifiers: boolean;
  ref: Ref<HTMLInputElement>;

  constructor(plan: PlanContextType) {
    this.hasActionIdentifiers = plan.features.hasActionIdentifiers;
    this.ref = createRef();
  }

  filterAction(value: string, action: ActionListAction) {
    const searchStr = value.toLowerCase();
    if (this.hasActionIdentifiers) {
      if (action.identifier.toLowerCase().startsWith(searchStr)) return true;
    }
    if (action.name.replace(/\u00AD/g, '').toLowerCase().search(searchStr) !== -1) return true;
    return false;
  }
  getLabel(t: TFunction) {
    return t('filter-text');
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-text-default');
  }
  getHelpText(t: TFunction) {
    return undefined;
  }
  render(value: string|undefined, onChange: FilterChangeCallback<string|undefined>, t: TFunction) {
    return (
      <Col m={this.sm} md={this.md} lg={this.lg} key={this.id}>
        <ActionListTextInput
          id={this.id}
          label={this.getLabel(t)}
          placeholder={this.getShowAllLabel(t)}
          onChange={onChange}
          currentValue={value}
          inputRef={this.ref}
        />
      </Col>
    );
  }
}


export type ActionListFilterSection = {
  id: string,
  hidden?: boolean,
  filters: ActionListFilter[],
}


type FilterColProps = {
  filter: ActionListFilter,
  onFilterChange: (id: string, val: FilterValue, debounce: number) => void,
  state: FilterValue,
}
const FilterCol = React.memo(function FilterCol({ filter, onFilterChange, state }: FilterColProps) {
  const { t } = useTranslation();

  // eslint-disable-next-line react/prop-types
  return filter.render(state, onFilterChange, t);
});


type ActionListFiltersProps = {
  activeFilters: Filters,
  filterSections: ActionListFilterSection[],
  actionCount: number,
  onChange: (filterType: string, val: FilterValue) => void,
}

function ActionListFilters(props: ActionListFiltersProps) {
  const {
    activeFilters, filterSections, actionCount, onChange
  } = props;

  const [filterState, setFilterState] = useState(activeFilters);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();
  const plan = usePlan();

  const allFilters: ActionListFilter[] = useMemo(
    () => filterSections.map(section => section.filters).flat(),
    [filterSections]
  );

  const debouncedFilterChange = useMemo(
    () => debounce(onChange, 150),
    [onChange]
  )

  const onFilterChange = useCallback((id: string, val: FilterValue, debounce: number = 0) => {
    setFilterState(state => {
      return {
        ...state,
        [id]: val,
      };
    });
    if (debounce) {
      debouncedFilterChange(id, val);
    } else {
      onChange(id, val)
    }
  }, [setFilterState, onChange, debouncedFilterChange]);

  const deleteFilterValues = (id: string, value: SingleFilterValue) => {
    const filterVal = filterState[id];
    if (Array.isArray(filterVal)) {
      return filterVal.filter(valueId => value !== valueId);
    }
    return undefined;
  }

  const onReset = useCallback((id: string, value: SingleFilterValue) => {
    onFilterChange(id, deleteFilterValues(id, value))
  }, [onFilterChange, deleteFilterValues]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="filters mb-2 text-left">
      <form
        onSubmit={(event) => { event.preventDefault(); }}
        role="search"
        autoComplete="off"
        aria-label={t('form-action-filters')}
      >
        {filterSections.map(section => (
          <>
          { section.hidden ? (
            <Button
              color="link"
              style={{
                padding: '0',
                marginBottom: '1.5rem',
                fontWeight: '400',
              }}
              onClick={toggle}
            >
              Advanced filters
              <Icon name={isOpen ? 'angle-up' : 'angle-down'} />
            </Button> ) : null }
          <Collapse isOpen={section.hidden ? isOpen : true} >
          <FilterSection key={section.id}>
            {section.filters.map((filter) => (
              <FilterCol
                key={filter.id}
                filter={filter}
                onFilterChange={onFilterChange}
                state={filterState[filter.id]}
              />
            ))}
            {section.id === 'main' && (
              <Col xs={6} sm={3} md={3} lg={2} xl={2} className="d-flex flex-column justify-content-end">
                <Button type="submit" color="primary" className="mb-3" block>{ t('search') }</Button>
              </Col>
            )}
            {section.id == 'primary' &&
              <Col xs={12}>
                <FilterSectionDivider />
              </Col>
            }
          </FilterSection>
          </Collapse>
          </>
        ))}
        <Row>
          <Col>
            <ActionListFilterBadges
              plan={plan}
              allFilters={allFilters}
              activeFilters={filterState}
              onReset={onReset}
              actionCount={actionCount}
            />
          </Col>
        </Row>
      </form>
    </div>
  );
}


type ConstructFiltersOpts = {
  mainConfig: ActionListPageFiltersFragment,
  plan: PlanContextType,
  t: TFunction,
  orgs: ActionListOrganization[],
  primaryOrgs: ActionListPrimaryOrg[]
}

ActionListFilters.constructFilters = (opts: ConstructFiltersOpts) => {
  const { mainConfig, plan, t, orgs, primaryOrgs } = opts;
  const { primaryFilters, mainFilters, advancedFilters } = mainConfig;

  function makeSection(id: string, hidden: boolean, blocks: ActionListFilterFragment[]) {
    const filters: ActionListFilter[] = [];
    blocks.forEach((block) => {
      switch (block.__typename) {
        case 'ResponsiblePartyFilterBlock':
          filters.push(new ResponsiblePartyFilter(orgs))
          break
        case 'CategoryTypeFilterBlock':
          filters.push(new CategoryFilter(block))
          break
        case 'ActionAttributeTypeFilterBlock':
          const allowedFormats = ['ORDERED_CHOICE', 'OPTIONAL_CHOICE'];
          if (!allowedFormats.includes(block.attributeType.format)) {
            console.error("Invalid format for ActionAttributeTypeFilterBlock: ", block.attributeType.format);
            break
          }
          filters.push(new AttributeTypeFilter(block))
          break
        case 'ActionImplementationPhaseFilterBlock':
          if (!plan.actionImplementationPhases.length) break;
          const phaseOpts = {
            id: 'phase',
            options: plan.actionImplementationPhases.map((obj) => ({id: obj.id, label: obj.name})),
            label: t('filter-phase'),
            helpText: t('filter-phase-help', ''),
            showAllLabel: t('filter-all-phases'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.implementationPhase?.id === val) return true;
              return false;
            },
          };
          filters.push(new GenericSelectFilter(phaseOpts))
          break;
        case 'PrimaryOrganizationFilterBlock':
          const primaryOrgOpts = {
            id: 'primary_org',
            options: primaryOrgs.map((obj) => ({id: obj.id, label: obj.abbreviation || obj.name})),
            label: t('filter-primary-organization'),
            helpText: t('filter-primary-organization-help', ''),
            showAllLabel: t('filter-all-organizations'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.primaryOrg?.id === val) return true;
              return false;
            },
          };
          filters.push(new GenericSelectFilter(primaryOrgOpts))
          break;
        case 'ActionScheduleFilterBlock':
          if (!plan.actionSchedules.length) break;
          const scheduleOpts = {
            id: 'schedule',
            options: plan.actionSchedules.map((obj) => ({id: obj.id, label: obj.name})),
            label: t('filter-schedule'),
            helpText: t('filter-schedule-help', ''),
            showAllLabel: t('filter-all-schedules'),
            filterAction: (val: string, act: ActionListAction) => {
              if (act.schedule.some((sch) => sch.id === val)) return true;
              return false;
            },
          };
          filters.push(new GenericSelectFilter(scheduleOpts))
          break;

      }
    });

    if (id === 'main') {
      if (plan.actionImpacts.length) {
        // FIXME: Migrate to AttributeType
        const opts = {
          id: 'impact',
          options: plan.actionImpacts.map((obj) => ({id: obj.id, label: obj.name})),
          label: t('filter-impact'),
          helpText: t('filter-impact-help', ''),
          showAllLabel: t('filter-all-impacts'),
          filterAction: (val: string, act: ActionListAction) => {
            if (act.impact?.id === val) return true;
            return false;
          },
        };
        filters.push(new GenericSelectFilter(opts))
      }
      filters.push(new ActionNameFilter(plan));
    }
    const ret: ActionListFilterSection = {
      id,
      hidden,
      filters,
    }
    return ret;
  }

  const sections: ActionListFilterSection[] = [];
  if (primaryFilters?.length) sections.push(makeSection('primary', false, primaryFilters));
  if (mainFilters?.length) sections.push(makeSection('main', false, mainFilters));
  if (advancedFilters?.length) sections.push(makeSection('advanced', true, advancedFilters));
  return sections;
};

export default ActionListFilters;
