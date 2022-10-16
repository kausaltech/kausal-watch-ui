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
import { constructOrgHierarchy, mapResponsibleParties, OrganizationHierarchyMember, orgHasActions, OrgMappedAction } from 'common/organizations';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext, { usePlan } from 'context/plan';
import RichText from 'components/common/RichText';
import ActionListFilters, { ActionListFilterSection } from 'components/actions/ActionListFilters';
import ActionCardList from 'components/actions/ActionCardList';
import ActionStatusGraphs from './ActionStatusGraphs';
import { ActionListFilterFragment, ActionListPageFiltersFragment, DashboardActionListQuery, GetActionListPageQuery } from 'common/__generated__/graphql';
import { CategoryTypeInput, CategoryMappedAction, CategoryHierarchyMember, CategoryTypeHierarchy, constructCatHierarchy, mapActionCategories } from 'common/categories';
import { useEffect } from 'react';

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
          iconImage {
            rendition(size:"120x120", crop:false) {
              src
            }
          }
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
      status {
        id
        identifier
        name
      }
      categories {
        id
      }
      implementationPhase {
        id
        identifier
        name
        order
      }
      completion
      officialName
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
      impact {
        id
        identifier
      }
      attributes {
        __typename
        id
        type {
          id
        }
        ...on AttributeChoice {
          choice {
            id
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
    style
    showAllLabel
    categoryType {
      id
      identifier
      name
      hideCategoryIdentifiers
      helpText
      categories {
        id
        identifier
        name
        order
        helpText
        parent {
          id
        }
      }
    }
  }
  ... on ActionAttributeTypeFilterBlock {
    showAllLabel
    attributeType {
      id
      identifier
      format
      name
      helpText
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

type FilterChangeCallback = (id: string, value: string|undefined) => void;

export type ActionListPrimaryOrg = DashboardActionListQuery['plan']['primaryOrgs'][0];

type ActionListProps = {
  actions: DashboardActionListQuery['planActions'],
  categoryTypes: DashboardActionListQuery['plan']['categoryTypes'],
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
type QueryAction = DashboardActionListQuery['planActions'][0]
export type ActionListAction = QueryAction &
  OrgMappedAction<ActionListOrganization> &
  CategoryMappedAction<ActionListCategoryType, ActionListCategory>;

export type ActionListCategoryTypeFilterBlock = ActionListFilterFragment & {__typename?: 'CategoryTypeFilterBlock'};
export type ActionListActionAttributeTypeFilterBlock = ActionListFilterFragment & {__typename?: 'ActionAttributeTypeFilterBlock'};

type QueryCategoryType = DashboardActionListQuery['plan']['categoryTypes'][0];
type CategoryInput = QueryCategoryType['categories'][0];
export type ActionListCategory = CategoryInput & CategoryHierarchyMember<ActionListCategoryType>;
export type ActionListCategoryType = QueryCategoryType & CategoryTypeHierarchy<ActionListCategory>;

const ActionList = (props: ActionListProps) => {
  const {
    actions,
    availableFilters,
    organizations,
    activeFilters,
    onFilterChange,
    title,
    leadContent,
    categoryTypes,
    primaryOrgs } = props;
  const { t } = useTranslation('common');
  const plan = usePlan();
  const displayDashboard = activeFilters.view === 'dashboard';
  const orgs: ActionListOrganization[] = useMemo(() => {
    return constructOrgHierarchy<ActionListOrganization>(organizations).filter(orgHasActions);
  }, [organizations]);
  const cts: ActionListCategoryType[] = useMemo(() => {
    return constructCatHierarchy<ActionListCategory, ActionListCategoryType>(categoryTypes);
  }, [categoryTypes])
  const primaryCatType = cts.find(ct => ct.id == plan.primaryActionClassification.id);

  const filterSections: ActionListFilterSection[] = useMemo(() => {
    const opts = {
      mainConfig: availableFilters,
      plan,
      orgs,
      primaryOrgs,
      t
    };
    return ActionListFilters.constructFilters(opts);
  }, [availableFilters, plan, orgs, primaryOrgs, t]);

  const handleChange = useCallback(
    (id: string, val: string|undefined) => {
      onFilterChange(id, val);
    },
    [onFilterChange],
  );

  const actionsWithRps = mapResponsibleParties<ActionListAction, ActionListOrganization>(actions, orgs);
  const mappedActions: ActionListAction[] =
    mapActionCategories<ActionListCategoryType, ActionListCategory, ActionListAction>(
      actionsWithRps, cts, primaryCatType
    );

  const enabledFilters = filterSections
    .map(section => section.filters.filter(filter => activeFilters[filter.id])).flat();

  let filteredActions = mappedActions;
  enabledFilters.forEach(filter => {
    filteredActions = filteredActions.filter((action) => filter.filterAction(activeFilters[filter.id], action));
  });

  let groupBy = 'category';
  if (plan.features.hasActionPrimaryOrgs && `cat-${primaryCatType.identifier}` in activeFilters) {
    groupBy = 'primaryOrg'
  }

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
              role="tab"
              tabIndex={0}
              aria-selected={!displayDashboard}
              aria-controls="list-view"
              id="list-tab"
            >
              { t('actions-as-list') }
            </Tab>
            <Tab
              className={`nav-link ${displayDashboard ? 'active' : ''}`}
              onClick={() => handleChange('view', 'dashboard')}
              role="tab"
              tabIndex={0}
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
      categoryTypes={categoryTypes}
      primaryOrgs={primaryOrgs}
    />
  );
}
ActionListLoader.fragments = {
  listFilters: ALL_ACTION_LIST_FILTERS,
};
ActionListLoader.getFiltersFromQuery = (query) => ActionList.getFiltersFromQuery(query);

export default ActionListLoader;
