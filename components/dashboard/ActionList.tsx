import React, { useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Row, Col, Nav, NavItem, Alert
} from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { constructOrgHierarchy, mapResponsibleParties, Organization, OrganizationHierarchyMember, orgHasActions, OrgMappedAction } from 'common/organizations';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext, { usePlan } from 'context/plan';
import RichText from 'components/common/RichText';
import ActionListFilters, { ActionListFilterSection } from 'components/actions/ActionListFilters';
import ActionCardList from 'components/actions/ActionCardList';
import ActionStatusGraphs from './ActionStatusGraphs';
import { ActionListFilterFragment, ActionListPageFiltersFragment, DashboardActionListQuery, GetActionListPageQuery } from 'common/__generated__/graphql';
import { ObjectHierarchyMember } from 'common/categories';

const DynamicActionStatusTable = dynamic(() => import('./ActionStatusTable'));

const ActionListSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.themeColors.black, props.theme.themeColors.white)
    };
`;

const ActionListHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.headingsColor, props.theme.themeColors.white)
    };

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

const IndicatorsTabs = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Tab = styled.button`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  display: inline-block;
  border: none;
  margin: 0;
  padding: ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s150} ${(props) => props.theme.spaces.s100};
  text-decoration: none;
  cursor: pointer;
  text-align: center;

  &:hover, &:focus {
    color: ${(props) => props.theme.brandLight};
  }
  &.active {
    color: ${(props) => props.theme.brandDark};
    background: ${(props) => props.theme.themeColors.white};
    &:hover {
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

export const GET_ACTION_LIST = gql`
  query DashboardActionList($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes(usableForActions: true) {
        id
        identifier
        name
        usableForActions
        common {
          identifier
          name
        }
        categories {
          id
          identifier
          order
          name
          parent {
            id
          }
          color
          iconSvgUrl
          categoryPage {
            id
            live
          }
        }
      }
      primaryOrgs {
        id
        abbreviation
        name
      }
    }
    planActions(plan: $plan) {
      id
      identifier
      name(hyphenated: true)
      officialName
      completion
      updatedAt
      scheduleContinuous
      startDate
      endDate
      order
      plan {
        id
      }
      schedule {
        id
      }
      status {
        id
        identifier
        name
      }
      implementationPhase {
        id
        identifier
        name
        order
      }
      impact {
        id
        identifier
      }
      categories {
        id
      }
      attributes {
        __typename
        id
        key
        keyIdentifier
        ...on AttributeChoice {
          value
          valueIdentifier
          type {
            identifier
            name
          }
          choice {
            id
            identifier
            name
          }
        }
      }
      responsibleParties {
        id
        organization {
          id
          abbreviation
          name
        }
      }
      primaryOrg {
        id
        abbreviation
        name
        logo {
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      }
      contactPersons {
        id
        person {
          organization {
            id
          }
        }
      }
      tasks {
        id
        state
        dueAt
      }
      mergedWith {
        id
        identifier
        plan {
          id
          shortName
          viewUrl
        }
      }
      indicators {
        id
        goals {
          id
        }
      }
      relatedIndicators {
        id
        indicatesActionProgress
        indicator {
          id
          goals {
            id
          }
        }
      }
    }
    planOrganizations(plan: $plan, withAncestors: true, forContactPersons: true, forResponsibleParties: true) {
      id
      abbreviation
      name
      contactPersonCount
      actionCount
      classification {
        name
      }
      parent {
        id
      }
    }
  }
`;

const ACTION_LIST_FILTER = gql`
fragment ActionListFilter on StreamFieldInterface {
  __typename
  field
  id
  ... on CategoryTypeFilterBlock {
    categoryType {
      id
      identifier
      name
      hideCategoryIdentifiers
      categories {
        id
        identifier
        name
        order
        parent {
          id
        }
      }
    }
  }
  ... on ActionAttributeTypeFilterBlock {
    attributeType {
      id
      identifier
      format
      name
      choiceOptions {
        id
        identifier
        name
      }
    }
  }
}
`;

const ALL_ACTION_LIST_FILTERS = gql`
fragment ActionListPageFilters on ActionListPage {
  primaryFilters {
    ...ActionListFilter
  }
  mainFilters {
    ...ActionListFilter
  }
  advancedFilters {
    ...ActionListFilter
  }
}
${ACTION_LIST_FILTER}
`;

export type ActiveFilters = {
  [key: string]: string | undefined,
}

type FilterChangeCallback = (newFilters: ActiveFilters) => void;

export type ActionListPrimaryOrg = DashboardActionListQuery['plan']['primaryOrgs'][0];

type ActionListProps = {
  actions: DashboardActionListQuery['planActions'],
  organizations: DashboardActionListQuery['planOrganizations'],
  availableFilters: ActionListPageFiltersFragment,
  activeFilters: ActiveFilters,
  onFilterChange: FilterChangeCallback,
  title: string,
  leadContent: string,
  primaryOrgs: ActionListPrimaryOrg[],
}

type OrganizationInput = DashboardActionListQuery['planOrganizations'][0];
export type ActionListOrganization = OrganizationInput & OrganizationHierarchyMember<OrganizationInput>;
export type ActionListAction = DashboardActionListQuery['planActions'][0] & OrgMappedAction<ActionListOrganization>;

export type ActionListCategoryTypeFilterBlock = ActionListFilterFragment & {__typename?: 'CategoryTypeFilterBlock'};
type CategoryInput = ActionListCategoryTypeFilterBlock['categoryType']['categories'][0];
export type ActionListCategory = CategoryInput & ObjectHierarchyMember<CategoryInput>;

const ActionList = (props: ActionListProps) => {
  const {
    actions,
    availableFilters,
    organizations,
    activeFilters,
    onFilterChange,
    title,
    leadContent,
    primaryOrgs } = props;
  const { t } = useTranslation('common');
  const plan = usePlan();
  const primaryCatType = plan.primaryActionClassification;
  const displayDashboard = activeFilters.view === 'dashboard';
  const orgs: ActionListOrganization[] = useMemo(() => {
    return constructOrgHierarchy<ActionListOrganization>(organizations).filter(orgHasActions);
  }, [organizations]);

  const filterSections: ActionListFilterSection[] = useMemo(() => (
    ActionListFilters.constructFilters(availableFilters, plan, orgs, primaryOrgs)
  ), [availableFilters, plan, orgs, primaryOrgs]);

  const handleChange = useCallback(
    (filterType: string, val: string|undefined) => {
      const newFilters = { ...activeFilters };
      newFilters[filterType] = val;
      onFilterChange(newFilters);
    },
    [onFilterChange, activeFilters],
  );

  const mappedActions: ActionListAction[] =
    mapResponsibleParties<ActionListAction, ActionListOrganization>(actions, orgs);

  const enabledFilters = filterSections
    .map(section => section.filters.filter(filter => activeFilters[filter.id])).flat();

  let filteredActions = mappedActions;
  enabledFilters.forEach(filter => {
    filteredActions = filteredActions.filter((action) => filter.filterAction(activeFilters[filter.id], action));
  });
  console.log(filteredActions);

  /*
  const catById = {};
  const catTypes = categoryTypes.map((ct) => {
    const categoriesById = {};
    const categories = ct.categories.map((cat) => {
      const out = { ...cat };
      categoriesById[out.id] = out;
      return out;
    });
    let rootCategories = [];

    categories.forEach((cat) => {
      cat.type = ct;
      if (cat.parent) {
        cat.parent = categoriesById[cat.parent.id];
      } else {
        rootCategories.push(cat);
      }
      catById[cat.id] = cat;
    });
    rootCategories = rootCategories.sort((a, b) => a.name.localeCompare(b.name));
    return {
      categories,
      categoriesById,
      rootCategories,
      ...ct,
    };
  });
  const actions = planActions.map((action) => {
    const act = { ...action };
    const rps = act.responsibleParties.map((rp) => ({ ...rp }));

    act.rootCategory = null;
    act.categories = act.categories.map((cat) => {
      const out = catById[cat.id];
      if (out.type.identifier === plan.primaryActionClassification?.identifier) {
        let root = out;
        while (root.parent != null) root = root.parent;
        act.rootCategory = root;
      }
      return out;
    });

    return { ...act, responsibleParties: rps };
  });
  */

  /*
  function filterAction(item) {
    if (filters.primaryOrg && item.primaryOrg.id !== filters.primaryOrg) return false;
    if (filters.organization) {
      let found = false;
      item.responsibleParties.forEach((rp) => {
        let org = rp.organization;
        while (org) {
          if (org.id === filters.organization) {
            found = true;
            break;
          }
          org = org.parent;
        }
      });
      if (!found) return false;
    }
    if (filters.impact && (!item.impact || (item.impact.id !== filters.impact))) return false;
    if (filters.implementationPhase && (!item.implementationPhase || (item.implementationPhase.id !== filters.implementationPhase))) return false;
    if (filters.schedule && (!item.schedule || !(item.schedule.find((sched) => sched.id === filters.schedule)))) return false;
    if (filters.text) {
      const searchStr = filters.text.toLowerCase();
      if (item.identifier.toLowerCase().startsWith(searchStr)) return true;
      if (item.name.replace(/\u00AD/g, '').toLowerCase().search(searchStr) !== -1) return true;
      return false;
    }
    const allCatsFound = catTypes.every((ct) => {
      const key = `category_${ct.identifier}`;
      const val = filters[key];

      if (!val) return true;
      if (!item.categories) return false;

      const catTypeFound = item.categories.some((cat) => {
        if (cat.id === val) return true;
        while (cat.parent) {
          cat = cat.parent;
          if (cat.id === val) return true;
        }
        return false;
      });
      return catTypeFound;
    });
    if (!allCatsFound) return false;
    const allAttrsFound = attributeTypes.every((at) => {
      const key = `attr_${at.identifier}`;
      const val = filters[key];

      if (!val) return true;
      if (!item.attributes) return false;

      const attrTypeFound = item.attributes.some((att) => {
        if (att.keyIdentifier === at.identifier && att?.choice?.id === val) return true;
        return false;
      });
      return attrTypeFound;
    });
    if (!allAttrsFound) return false;
    return true;
  }
  */
  const impacts = plan.actionImpacts;
  const phases = plan.actionImplementationPhases;
  const schedules = plan.actionSchedules;

  const groupBy = (primaryOrgs.length && filters.category_action) ? 'primaryOrg' : 'category';

  return (
    <>
      <ActionListSection id="actions">
        <ActionListHeader>
          <Container>
            <h1>{ title }</h1>
            {leadContent && (
              <Row>
                <Col sm="12" md="8" className="mb-5">
                  <RichText html={leadContent} />
                </Col>
              </Row>
            )}
            <Row>
              <Col sm="12">
                <ActionListFilters
                  filterSections={filterSections}
                  orgs={orgs.filter(orgHasActions)}
                  primaryOrgs={primaryOrgs}
                  impacts={impacts}
                  phases={phases}
                  hasActionPrimaryOrgs={plan.features.hasActionPrimaryOrgs}
                  schedules={schedules}
                  activeFilters={activeFilters}
                  onChange={handleChange}
                  actionCount={filteredActions.length}
                />
              </Col>
            </Row>
          </Container>
        </ActionListHeader>
      </ActionListSection>
      <IndicatorsTabs>
        <Container>
          <div role="tablist">
            <Tab
              className={`nav-link ${!displayDashboard ? 'active' : ''}`}
              onClick={() => handleChange('view', 'list')}
              passHref
              role="tab"
              tabIndex="0"
              aria-selected={!displayDashboard}
              aria-controls="list-view"
              id="list-tab"
            >
              { t('actions-as-list') }
            </Tab>
            <Tab
              className={`nav-link ${displayDashboard ? 'active' : ''}`}
              onClick={() => handleChange('view', 'dashboard')}
              passHref
              role="tab"
              tabIndex="0"
              aria-selected={displayDashboard}
              aria-controls="dashboard-view"
              id="dashboard-tab"
            >
              { t('dashboard') }
            </Tab>
          </div>
        </Container>
      </IndicatorsTabs>
      <Container>
          <div id="list-view" role="tabpanel" tabIndex={0} aria-labelledby="list-tab" hidden={!displayDashboard}>
            { displayDashboard && filteredActions.length > 0 ? (
              <>
                <ActionStatusGraphs actions={filteredActions} />
                <DynamicActionStatusTable actions={filteredActions} orgs={orgs} plan={plan} enableExport={true} />
              </>
            ) : (
              <Alert color="primary">
                {t('search-no-results')}
              </Alert>
            )}
          </div>
          <div id="dashboard-view" role="tabpanel" tabIndex={0} aria-labelledby="dashboard-tab" hidden={displayDashboard}>
            { !displayDashboard && filteredActions.length > 0 ? (
              <ActionCardList
                actions={filteredActions}
                groupBy={groupBy}
              />
            ) : (
              <Alert color="primary">
                {t('search-no-results')}
              </Alert>
            )}
          </div>
      </Container>
    </>
  );
};

ActionList.getFiltersFromQuery = (query) => {
  const {
    organization, text, impact, ...rest
  } = query;
  return {
    organization, text, impact, ...rest,
  };
};

type StatusboardProps = {
  title: string,
  leadContent: string,
  availableFilters: ActionListPageFiltersFragment,
  filters: ActiveFilters,
  onFilterChange: FilterChangeCallback,
};

function ActionListLoader(props: StatusboardProps) {
  const {
    title,
    leadContent,
    filters,
    onFilterChange,
    availableFilters
  } = props;
  const plan = usePlan();
  const { t } = useTranslation('common');
  const { loading, error, data } = useQuery<DashboardActionListQuery>(GET_ACTION_LIST, {
    variables: { plan: plan.identifier },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={t('error-loading-actions', getActionTermContext(plan))} />;

  const { plan: loadedPlan, planOrganizations, planActions } = data;
  const { categoryTypes, primaryOrgs } = loadedPlan;

  return (
    <ActionList
      title={title}
      leadContent={leadContent}
      availableFilters={availableFilters}
      activeFilters={filters}
      onFilterChange={onFilterChange}
      organizations={planOrganizations}
      actions={planActions}
      primaryOrgs={primaryOrgs}
    />
  );
}
ActionListLoader.fragments = {
  listFilters: ALL_ACTION_LIST_FILTERS,
};
ActionListLoader.getFiltersFromQuery = (query) => ActionList.getFiltersFromQuery(query);

export default ActionListLoader;
