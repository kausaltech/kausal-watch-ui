import React, { useCallback, useEffect, useMemo } from 'react';

import {
  ActionListPageFiltersFragment,
  ActionListPageView,
  DashboardActionListQuery,
} from '@/common/__generated__/graphql';
import {
  constructCatHierarchy,
  getCategoryString,
  mapActionCategories,
} from '@/common/categories';
import { getActionTermContext } from '@/common/i18n';
import {
  constructOrgHierarchy,
  mapResponsibleParties,
  orgHasActions,
} from '@/common/organizations';
import ActionCardList from '@/components/actions/ActionCardList';
import ActionListFilters, {
  ActionListFilterSection,
  Filters,
  FilterValue,
} from '@/components/actions/ActionListFilters';
import ErrorMessage from '@/components/common/ErrorMessage';
import RichText from '@/components/common/RichText';
import { usePlan } from '@/context/plan';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { readableColor } from 'polished';
import { Alert, Col, Container, Row } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { useWorkflowSelector } from '@/context/workflow-selector';
import {
  ACTION_TABLE_COLUMN_FRAGMENT,
  ALL_ACTION_LIST_FILTERS,
} from '@/fragments/action-list.fragment';
import { mapActionsToExpandDependencies } from '@/utils/actions.utils';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import ActionStatusGraphs from './ActionStatusGraphs';
import {
  ActionListAction,
  ActionListCategory,
  ActionListCategoryType,
  ActionListOrganization,
  ActionListPrimaryOrg,
  ColumnConfig,
} from './dashboard.types';

// Legacy exports preserved after migrating types to dashboard.types
export * from './dashboard.types';

const ActionStatusTable = dynamic(() => import('./ActionStatusTable'));

const ActionListSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  a {
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }
`;

const ActionListHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.headingsColor,
        props.theme.themeColors.white
      )};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }
`;

const IndicatorsTabs = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Tab = styled.button`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  display: inline-block;
  border: none;
  margin: 0;
  padding: ${(props) =>
    `${props.theme.spaces.s050} ${props.theme.spaces.s150} ${props.theme.spaces.s100}`};
  text-decoration: none;
  cursor: pointer;
  text-align: center;

  &:hover,
  &:focus {
    color: ${(props) =>
      readableColor(
        props.theme.brandDark,
        props.theme.themeColors.dark,
        props.theme.themeColors.light
      )};
  }
  &.active {
    color: ${(props) => props.theme.linkColor};
    background: ${(props) => props.theme.themeColors.white};
    &:hover {
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

const commonCategoryFragment = gql`
  fragment CommonCategoryFragment on Category {
    common {
      id
      identifier
      name
      order
    }
  }
`;

const planFragment = gql`
  fragment PlanFragment on Plan {
    id
    categoryTypes(usableForActions: true) {
      id
      identifier
      name
      usableForActions
      hideCategoryIdentifiers
      common {
        identifier
        name
        hideCategoryIdentifiers
      }
      categories {
        id
        identifier
        order
        name
        parent {
          id
        }
        ...CommonCategoryFragment @include(if: $relatedPlanActions)

        color
        iconSvgUrl
        iconImage {
          rendition(size: "120x120", crop: false) {
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
  ${commonCategoryFragment}
`;

const actionFragment = gql`
  fragment ActionFragment on Action {
    id
    identifier
    name(hyphenated: true)
    viewUrl @include(if: $relatedPlanActions)
    color
    manualStatusReason
    dependencyRole {
      id
      name
    }
    allDependencyRelationships {
      preceding {
        id
      }
      dependent {
        id
      }
    }
    status {
      id
      identifier
      name
      color
    }
    categories {
      id
      common {
        id
      }
    }
    implementationPhase {
      id
      identifier
      name
      order
    }
    statusSummary {
      identifier
      label
      color
      isActive
      isCompleted
      sentiment
    }
    timeliness {
      identifier
    }
    completion
    officialName
    updatedAt
    scheduleContinuous
    startDate
    endDate
    order
    plan @include(if: $relatedPlanActions) {
      id
      shortName
      name
      shortIdentifier
      versionName
      viewUrl
      hideActionIdentifiers
      publishedAt
      image {
        rendition(size: "128x128", crop: true) {
          src
        }
      }
      generalContent {
        actionTaskTerm
        organizationTerm
      }
      actionImplementationPhases {
        id
        identifier
        name
        order
        color
      }
    }
    plan @skip(if: $relatedPlanActions) {
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
        identifier
        name
        unit {
          id
          name
          shortName
        }
        format
      }
      ... on AttributeChoice {
        choice {
          id
          name
        }
        text
      }
      ... on AttributeText {
        value
      }
      ... on AttributeRichText {
        value
      }
      ... on AttributeNumericValue {
        numericValue: value
      }
    }
    responsibleParties {
      id
      role
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
      viewUrl
      plan {
        id
        shortName
        viewUrl
      }
    }
    indicatorsCount
    hasIndicatorsWithGoals
  }
`;

const organizationFragment = gql`
  fragment OrganizationFragment on Organization {
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
`;

export const GET_ACTION_LIST = gql`
  query DashboardActionList(
    $plan: ID!
    $relatedPlanActions: Boolean!
    $path: String!
    $workflow: WorkflowState
  ) @workflow(state: $workflow) {
    plan(id: $plan) {
      ...PlanFragment
    }
    planActions(plan: $plan) @skip(if: $relatedPlanActions) {
      ...ActionFragment
    }
    relatedPlanActions(plan: $plan) @include(if: $relatedPlanActions) {
      ...ActionFragment
    }
    planPage(plan: $plan, path: $path) {
      __typename
      ...ActionTableColumnFragment
    }

    planOrganizations(
      plan: $plan
      withAncestors: true
      forContactPersons: true
      forResponsibleParties: true
      includeRelatedPlans: $relatedPlanActions
    ) {
      ...OrganizationFragment
    }
  }
  ${planFragment}
  ${actionFragment}
  ${organizationFragment}
  ${ACTION_TABLE_COLUMN_FRAGMENT}
`;

type FilterChangeCallback = (id: string, value: FilterValue) => void;

type ActionListProps = {
  actions: DashboardActionListQuery['planActions'];
  columns: ColumnConfig[];
  categoryTypes: NonNullable<DashboardActionListQuery['plan']>['categoryTypes'];
  organizations: DashboardActionListQuery['planOrganizations'];
  availableFilters: ActionListPageFiltersFragment;
  activeFilters: Filters;
  onFilterChange: FilterChangeCallback;
  title: string;
  leadContent?: string;
  headingHierarchyDepth: number;
  includeRelatedPlans: boolean;
  defaultView: ActionListPageView;
  primaryOrgs: ActionListPrimaryOrg[];
};

const ActionList = (props: ActionListProps) => {
  const {
    actions,
    categoryTypes,
    organizations,
    availableFilters,
    activeFilters,
    onFilterChange,
    title,
    leadContent,
    defaultView,
    headingHierarchyDepth,
    primaryOrgs,
    includeRelatedPlans,
    columns,
  } = props;

  const t = useTranslations();
  const theme = useTheme();
  const plan = usePlan();
  const displayDashboard =
    activeFilters.view === 'dashboard' ||
    (activeFilters.view == null && defaultView === 'DASHBOARD');
  const orgs: ActionListOrganization[] = useMemo(() => {
    const result = constructOrgHierarchy<ActionListOrganization>(organizations);
    if (includeRelatedPlans) {
      // Organizations can have actions in other plans
      return result;
    }
    return result.filter(orgHasActions);
  }, [organizations, includeRelatedPlans]);
  const cts: ActionListCategoryType[] = useMemo(() => {
    return constructCatHierarchy<ActionListCategory, ActionListCategoryType>(
      categoryTypes,
      includeRelatedPlans
    );
  }, [categoryTypes]);
  const primaryActionClassification = includeRelatedPlans
    ? plan.primaryActionClassification?.common
    : plan.primaryActionClassification;

  const primaryCatType = cts.find(
    (ct) => ct.id == primaryActionClassification?.id
  );

  const filterSections: ActionListFilterSection[] = useMemo(() => {
    const opts = {
      mainConfig: availableFilters,
      plan,
      orgs,
      primaryOrgs,
      filterByCommonCategory: includeRelatedPlans,
      t,
    };
    return ActionListFilters.constructFilters(opts);
  }, [availableFilters, plan, orgs, primaryOrgs, includeRelatedPlans, t]);

  const handleChange = useCallback(
    (id: string, val: string | undefined) => {
      onFilterChange(id, val);
    },
    [onFilterChange]
  );

  const actionsWithDependencies =
    actions?.map(mapActionsToExpandDependencies) ?? [];

  const actionsWithRps = mapResponsibleParties<
    ActionListAction,
    ActionListOrganization
  >(actionsWithDependencies, orgs);
  const mappedActions: ActionListAction[] = mapActionCategories<
    ActionListCategoryType,
    ActionListCategory,
    ActionListAction
  >(actionsWithRps, cts, primaryCatType, headingHierarchyDepth);
  const enabledFilters = filterSections
    .map((section) =>
      section.filters.filter((filter) => activeFilters[filter.id])
    )
    .flat();

  let filteredActions = mappedActions;
  enabledFilters.forEach((filter) => {
    filteredActions = filteredActions.filter((action) =>
      filter.filterAction(activeFilters[filter.id], action)
    );
  });

  let groupBy = 'category';
  if (
    plan.features.hasActionPrimaryOrgs &&
    primaryCatType?.identifier &&
    `${getCategoryString(primaryCatType.identifier)}` in activeFilters
  ) {
    groupBy = 'primaryOrg';
  }
  // for umbrella plans group by plan if no common category exists
  if (includeRelatedPlans && !plan.primaryActionClassification?.common)
    groupBy = 'plan';

  // add plan.feature.showActionUpdateStatus to backend
  const showUpdateStatus =
    theme.settings.dashboard?.showActionUpdateStatus === false ? false : true;

  return (
    <>
      <ActionListSection id="actions">
        <ActionListHeader>
          <Container>
            <h1>{title}</h1>
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
              {t('actions-as-list')}
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
              {t('dashboard')}
            </Tab>
          </div>
        </Container>
      </IndicatorsTabs>
      <Container fluid="lg">
        <div
          id="list-view"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby="list-tab"
          hidden={!displayDashboard}
        >
          {displayDashboard && filteredActions.length > 0 ? (
            <>
              {theme.settings.dashboard.showPieCharts !== false && (
                <ActionStatusGraphs
                  actions={filteredActions}
                  shownDatasets={{
                    phase: true,
                    progress: true,
                    timeliness: showUpdateStatus,
                  }}
                />
              )}
              <ActionStatusTable
                actions={filteredActions}
                orgs={orgs}
                plan={plan}
                hasRelatedPlans={includeRelatedPlans}
                enableExport={true}
                columns={columns}
              />
            </>
          ) : (
            <Alert color="primary">{t('search-no-results')}</Alert>
          )}
        </div>
      </Container>
      <Container>
        <div
          id="dashboard-view"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby="dashboard-tab"
          hidden={displayDashboard}
        >
          {!displayDashboard && filteredActions.length > 0 ? (
            <ActionCardList
              actions={filteredActions}
              groupBy={groupBy}
              includeRelatedPlans={includeRelatedPlans}
              headingHierarchyDepth={headingHierarchyDepth}
            />
          ) : (
            <Alert color="primary">{t('search-no-results')}</Alert>
          )}
        </div>
      </Container>
    </>
  );
};

type StatusboardProps = {
  title: string;
  leadContent: string;
  defaultView: ActionListPageView;
  availableFilters: ActionListPageFiltersFragment;
  filters: ActiveFilters;
  onFilterChange: FilterChangeCallback;
  headingHierarchyDepth: number;
  includeRelatedPlans: boolean;
};

function ActionListLoader(props: StatusboardProps) {
  const {
    title,
    leadContent,
    defaultView,
    filters,
    onFilterChange,
    availableFilters,
    headingHierarchyDepth,
    includeRelatedPlans,
  } = props;
  const plan = usePlan();
  const t = useTranslations();
  const { workflow, setLoading } = useWorkflowSelector();
  useEffect(() => setLoading(false));
  const { error, data } = useSuspenseQuery<DashboardActionListQuery>(
    GET_ACTION_LIST,
    {
      variables: {
        plan: plan.identifier,
        relatedPlanActions: includeRelatedPlans,
        path: '/actions',
        workflow,
      },
    }
  );

  if (error || !data || !data.plan)
    return (
      <ErrorMessage
        message={t('error-loading-actions', getActionTermContext(plan))}
      />
    );

  const { plan: loadedPlan, planOrganizations, planPage } = data;
  const { categoryTypes, primaryOrgs } = loadedPlan;
  const actions = includeRelatedPlans
    ? data.relatedPlanActions
    : data.planActions;

  return (
    <ActionList
      title={title}
      columns={
        planPage?.__typename === 'ActionListPage'
          ? (planPage.dashboardColumns ?? [])
          : []
      }
      leadContent={leadContent}
      defaultView={defaultView}
      headingHierarchyDepth={headingHierarchyDepth}
      availableFilters={availableFilters}
      activeFilters={filters}
      onFilterChange={onFilterChange}
      organizations={planOrganizations}
      actions={actions}
      categoryTypes={categoryTypes}
      primaryOrgs={primaryOrgs}
      includeRelatedPlans={includeRelatedPlans}
    />
  );
}
ActionListLoader.fragments = {
  listFilters: ALL_ACTION_LIST_FILTERS,
};

export default ActionListLoader;
