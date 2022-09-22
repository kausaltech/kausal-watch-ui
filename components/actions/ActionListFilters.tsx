import React, { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import {
  Row, Col, Badge, CloseButton, Input, Placeholder,
} from 'reactstrap';
import { debounce } from 'lodash';
import styled from 'styled-components';
import {ButtonGroup, Button as RButton} from 'reactstrap';

import { useTheme } from 'common/theme';
import { getActionTermContext, useTranslation } from 'common/i18n';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import DropDown, { DropDownTypeahead, DropDownTypeaheadOption } from 'components/common/DropDown';
import { PlanContextType, usePlan } from 'context/plan';
import PopoverTip from 'components/common/PopoverTip';
import { ActionListAction, ActionListOrganization, ActionListPrimaryOrg, ActiveFilters, AvailableFilters } from 'components/dashboard/ActionList';
import { ActionCategoryFilterCardBlock, ActionListFilterFragment, ActionListPageFiltersFragment, CategoryTypeFilterBlock, DashboardActionListQuery, ResponsiblePartyFilterBlock } from 'common/__generated__/graphql';
import { I18n, TFunction } from 'next-i18next';

const FiltersList = styled.div`
  margin: ${(props) => props.theme.spaces.s150} 0;
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
  margin: 0 0 ${(props) => props.theme.spaces.s200} 0;
  border-bottom: 1px solid black;
`;

function sortDepthFirst<Type>(
  items: Type[],
  compareItem: (a: Type, b: Type) => number,
  getParent: (item: Type) => Type|null,
  getChildren: (item: Type) => Type[],
) {
  const out = [];

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
  onChange: FilterChangeCallback,
}

function ActionListTextInput({
  id, label, placeholder, currentValue, onChange,
}: ActionListTextInputProps) {
  const [filterValue, setValue] = useState(currentValue);
  const delayedQuery = useCallback(debounce(
    (value) => onChange(id, value), 500,
  ), [id, onChange]);

  const callback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    delayedQuery(event.target.value);
  }, [delayedQuery, setValue]);

  return (
    <TextInput
      label={label}
      id={`${id}-field`}
      name={id}
      placeholder={placeholder}
      value={filterValue || ''}
      onChange={callback}
    />
  );
}

type ActionListDropdownProps = {
  id: string,
  label: string,
  showAllLabel: string,
  placeholder: string|undefined,
  currentValue: string|undefined,
  onChange: FilterChangeCallback,
  options: DropDownTypeaheadOption[],
}

function ActionListDropdownInput({
  id, label, currentValue, onChange, showAllLabel, options, placeholder
}: ActionListDropdownProps) {
  const callback = useCallback((option: DropDownTypeaheadOption|null) => {
    onChange(id, option?.id);
  }, [id, onChange]);

  const selectedOption = currentValue ? options.find((opt) => opt.id === currentValue) : null;

  return (
    <DropDownTypeahead
      label={label}
      id={`${id}-field`}
      name={id}
      placeholder={showAllLabel}
      options={options}
      selectedOption={selectedOption}
      onChange={callback}
    />
  );
}


function ActionListMainFilter({
  filter, currentValue, onChange,
}) {
  const [filterValue, setValue] = useState(currentValue);
  const delayedQuery = useCallback(debounce(
    (value) => onChange(filter.identifier, value), 500,
  ), [filter.identifier, onChange]);

  const callback = (newValue) => {
    setValue(newValue);
    delayedQuery(newValue);
  };

  return (
    <MainCategory>
    <MainCategoryLabel id={`label-${filter.identifier}`}>
      {filter.label}
      <PopoverTip
        header="Main Category"
        content="Show actions that are relevant for council or community"
      />
    </MainCategoryLabel>
    <ButtonGroup
      role="radiogroup"
      aria-labelledby={`label-${filter.identifier}`}
    >
      <RButton
        color="black"
        outline
        onClick={() => callback("")}
        active={currentValue === undefined}
        aria-checked={currentValue === undefined}
        role="radio"
      >
        All actions
      </RButton>
      {filter.options.map((opt) => (
      <RButton
        color="black"
        outline
        onClick={() => callback(opt.id)}
        active={currentValue === opt.id}
        aria-checked={currentValue === opt.id}
        key={opt.id}
        role="radio"
      >
        { opt.label || opt.name }
      </RButton>
      ))}
    </ButtonGroup>
    </MainCategory>
  );
}

function ActionListFilterBadges({
  plan, filters, activeFilters, actionCount, onReset,
}) {
  const { t } = useTranslation();
  const badges = filters.filter((item) => activeFilters[item.identifier]).map((item, index) => {
    let name;
    if (item.type !== 'text') {
      const activeOption = item.options.find((opt) => opt.id === activeFilters[item.identifier]);
      name = activeOption?.label || activeOption?.name;
    } else {
      name = activeFilters[item.identifier];
    }
    return {
      id: index,
      identifier: item.identifier,
      name,
    };
  });

  function makeCallback(identifier) {
    return () => onReset(identifier);
  }

  return (
    <FiltersList aria-live="assertive">
      <span className="count">
        { `${actionCount} ${t('filter-result-actions', getActionTermContext(plan))}` /* FIXME: Translation should take number into account */}
      </span>
      { badges.length > 0 && <span className="visually-hidden">{t('active-filters')}</span>}
      {/* TODO: animate transition */}
        {badges.map((item) => (
          <StyledBadge
            key={item.id}
            className="me-3"
            color="primary"
          >
            <CloseButton
              variant="white"
              size="sm"
              onClick={makeCallback(item.identifier)}
              aria-label={t('remove-filter')}
            />
            { item.name?.trim() }
          </StyledBadge>
        ))}
    </FiltersList>
  );
}

type FilterChangeCallback = (filterType: string, val: string|undefined) => void;


type ActionListFilterOption = {
  id: string,
  label: string,
};

export interface ActionListFilter {
  id: string,
  filterAction: (activeFilters: ActiveFilters, action: ActionListAction) => boolean,
  getLabel: (t: TFunction) => string,
  getShowAllLabel: (t: TFunction) => string,
  sm: number|undefined,
  md: number,
  lg: number,
  options?: ActionListFilterOption[],
  render: (activeFilters: ActiveFilters, onChange: FilterChangeCallback, t: TFunction) => JSX.Element,
};

abstract class DefaultFilter implements ActionListFilter {
  id: string|undefined = undefined;
  sm = undefined;
  md = 6;
  lg = 4;
  abstract options?: ActionListFilter['options'];

  abstract getLabel(t: TFunction): string;
  abstract filterAction(activeFilters: ActiveFilters, action: ActionListAction): boolean;

  getShowAllLabel(t: TFunction) {
    return t('filter-all-categories')
  };

  render(activeFilters: ActiveFilters, onChange: FilterChangeCallback, t: TFunction) {
    return (
      <Col
        sm={this.sm}
        md={this.md}
        lg={this.lg}
        key={this.id}
      >
        <ActionListDropdownInput
          id={this.id}
          label={this.getLabel(t)}
          showAllLabel={this.getShowAllLabel(t)}
          currentValue={activeFilters[this.id]}
          onChange={onChange}
          options={this.options}
        />
      </Col>
    );
  }
};

class ResponsiblePartyFilter extends DefaultFilter {
  id = 'responsible_party';
  options: ActionListFilterOption[]

  constructor(orgs: ActionListOrganization[]) {
    super();
    const sortedOrgs = sortDepthFirst(
      orgs,
      (a, b) => a.name.localeCompare(b.name),
      (org) => org.parent,
      (org) => org.children
    );
    this.options = sortedOrgs.map((org) => ({id: org.id, label: org.name, indent: org.depth}));
  }
  filterAction(activeFilters: ActiveFilters, action: ActionListAction) {
    const value = activeFilters[this.id];
    if (!value) return true;
    return action.responsibleParties.some((rp) => rp.organization.id === value);
  }
  getLabel(t: TFunction) {
    return t('filter-organization');
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-all-organizations');
  }
}

class CategoryFilter extends DefaultFilter {
  id: string;
  ct: CategoryTypeFilterBlock['categoryType'];

  constructor(config: CategoryTypeFilterBlock) {
    super();
    this.ct = config.categoryType;
    this.id = `${this.ct.id}`;
    this.options = config.categoryType()
  }
  filterAction(activeFilters: ActiveFilters, action: ActionListAction) {
    const value = activeFilters[this.id];
    if (!value) return true;
    return action.responsibleParties.some((rp) => rp.organization.id === value);
  }
  getLabel(t: TFunction) {
    return t('filter-organization');
  }
  getShowAllLabel(t: TFunction) {
    return t('filter-all-organizations');
  }
}

export type ActionListFilterSection = {
  id: string,
  hidden?: boolean,
  filters: ActionListFilter[],
}


type ActionListFiltersProps = {
  activeFilters: ActiveFilters,
  orgs: ActionListOrganization[],
  primaryOrgs: DashboardActionListQuery['plan']['primaryOrgs'],
  filterSections: ActionListFilterSection[],
  impacts: PlanContextType['actionImpacts'],
  actionCount: number,
  onChange: (filterType: string, val: string|undefined) => void,
  phases: PlanContextType['actionImplementationPhases'],
  schedules: PlanContextType['actionSchedules'],
  hasActionPrimaryOrgs: boolean,
}

function ActionListFilters(props: ActionListFiltersProps) {
  const {
    activeFilters, filterSections, orgs, primaryOrgs, impacts, actionCount, onChange, phases, schedules,
    hasActionPrimaryOrgs
  } = props;
  const { t } = useTranslation();
  const plan = usePlan();
  const theme = useTheme();
  const allFilters: ActionListFilter[] = filterSections[0].filters;

  /*
  if (primaryOrgs.length) allFilters.push(
    {
      label: t('filter-primary-organization'),
      showAllLabel: t('filter-all-organizations'),
      md: 6,
      lg: 4,
      identifier: 'primaryOrg',
      options: primaryOrgs.map((org) => ({
        id: org.id,
        label: org.abbreviation || org.name,
      })),
    },
  );
  if (!hasActionPrimaryOrgs) {
    allFilters.push({
      label: t('filter-organization'),
      showAllLabel: t('filter-all-organizations'),
      md: 6,
      lg: 4,
      identifier: 'organization',
      options: sortedOrgs.map((org) => ({
        id: org.id,
        label: ' '.repeat(org.depth * 4) + org.name,
      })),
    });
  }

  if (impacts.length > 0) {
    allFilters.push({
      label: t('filter-impact'),
      showAllLabel: t('filter-all-impacts'),
      md: 6,
      lg: 4,
      identifier: 'impact',
      options: impacts,
    });
  }

  if (phases.length > 0) {
    allFilters.push({
      label: t('filter-phase'),
      showAllLabel: t('filter-all-phases'),
      md: 6,
      lg: 4,
      identifier: 'implementationPhase',
      options: phases,
    });
  }

  if (schedules.length > 0) {
    allFilters.push({
      label: t('filter-schedule'),
      showAllLabel: t('filter-all-schedules'),
      md: 6,
      lg: 4,
      identifier: 'schedule',
      options: schedules,
    });
  }

  // Find categories with no parents, if there is only one root category return the next level
  const getRootCategories = (categoryType) => {
    const allCategories = categoryType.categories;
    const activeFilter = filters[`category_${categoryType.identifier}`];
    // If we have an active subcategory filter, make sure it gets added to the list also
    const mainCategories = allCategories.filter((cat) => cat.parent === null|| cat.id === activeFilter);
    if (mainCategories.length === 1) return allCategories.filter((cat) => cat.parent?.id === mainCategories[0].id || cat.id === activeFilter);
    return mainCategories;
  };

  const highlightedCategoryType = plan.secondaryActionClassification?.identifier;

  categoryTypes.forEach((ct) => {
    allFilters.push({
      main: highlightedCategoryType != null && ct?.common?.identifier === highlightedCategoryType,
      label: ct.name,
      showAllLabel: t('filter-all-categories'),
      md: 6,
      lg: 4,
      identifier: `category_${ct.identifier}`,
      options: getRootCategories(ct).map((topCat) => ({
        id: topCat.id,
        label: `${theme.settings.categories.showIdentifiers ? `${topCat.identifier}. ` : ''}${topCat.name}`,
      })),
    });
  });

  attributeTypes.forEach((attrType) => {
    allFilters.push({
      label: attrType.name,
      showAllLabel: t('filter-all-categories'),
      md: 6,
      lg: 4,
      identifier: `attr_${attrType.identifier}`,
      options: attrType.choiceOptions.map((choice) => ({
        id: choice.id,
        label: choice.name,
      })),
    })
  })

  allFilters[allFilters.length - 1].isLast = true;

  allFilters.push({
    label: t('filter-text'),
    placeholder: t('filter-text-default'),
    sm: 9,
    md: 9,
    lg: 6,
    identifier: 'text',
    type: 'text',
  });
  */
  console.log(allFilters);
  const filterComponents = allFilters.map((filter) => filter.render(activeFilters, onChange, t));
  console.log(filterComponents);
  return (
    <div className="filters mb-2 text-left">
      <form
        onSubmit={(event) => { event.preventDefault(); }}
        role="search"
        aria-label={t('form-action-filters')}
      >
        {filterComponents}
      </form>
    </div>
  );
}

/*
          <Row>
            {allFilters.map((filter) => (
              filter.main && <Col
                sm={12}
                key={filter.identifier}
              >
                <ActionListMainFilter
                  filter={filter}
                  currentValue={filters[filter.identifier]}
                  onChange={onChange}
                />
              </Col>
            ))}
          </Row>
          <Row>
            {allFilters.map((filter) => (
              !filter.main && <Col
                sm={filter.sm}
                md={filter.md}
                lg={filter.lg}
                key={filter.identifier}
              >
                <ActionListFilterInput
                  filter={filter}
                  currentValue={filters[filter.identifier]}
                  onChange={onChange}
                />
              </Col>
            ))}
            <Col xs={6} sm={3} md={3} lg={2} xl={2} className="d-flex flex-column justify-content-end">
              <Button type="submit" color="primary" className="mb-3" block>{ t('search') }</Button>
            </Col>
          </Row>
      </form>
      <Row>
        <Col>
          <ActionListFilterBadges
            plan={plan}
            t={t}
            filters={allFilters}
            activeFilters={filters}
            onReset={onChange}
            actionCount={actionCount}
          />
        </Col>
      </Row>
    </div>
  );
}
*/

ActionListFilters.constructFilters = (
  mainConfig: ActionListPageFiltersFragment, orgs: ActionListOrganization[], primaryOrgs: ActionListPrimaryOrg[]
) => {
  const { primaryFilters, mainFilters, advancedFilters } = mainConfig;

  function makeSection(id: string, hidden: boolean, blocks: ActionListFilterFragment[]) {
    const filters = [];
    blocks.forEach((block) => {
      switch (block.__typename) {
        case 'ResponsiblePartyFilterBlock':
          filters.push(new ResponsiblePartyFilter(orgs))
          break
      }
    });
    const ret: ActionListFilterSection = {
      id,
      hidden,
      filters,
    }
    return ret;
  }

  const sections = [];
  if (primaryFilters?.length) sections.push(makeSection('primary', false, primaryFilters));
  if (mainFilters?.length) sections.push(makeSection('main', false, mainFilters));
  if (advancedFilters?.length) sections.push(makeSection('advanced', true, advancedFilters));
  return sections;
};

export default ActionListFilters;
