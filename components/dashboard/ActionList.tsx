import React, { useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import { Container, Row, Col, Nav, NavItem, Alert } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { getActionTermContext, useTranslation } from 'common/i18n';
import {
  constructOrgHierarchy,
  mapResponsibleParties,
  OrganizationHierarchyMember,
  orgHasActions,
  OrgMappedAction,
} from 'common/organizations';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { usePlan } from 'context/plan';
import { useTheme } from 'common/theme';
import RichText from 'components/common/RichText';
import ActionListFilters, {
  ActionListFilterSection,
  Filters,
  FilterValue,
} from 'components/actions/ActionListFilters';
import ActionCardList from 'components/actions/ActionCardList';
import ActionStatusGraphs from './ActionStatusGraphs';
import {
  ActionListFilterFragment,
  ActionListPageFiltersFragment,
  ActionListPageView,
  DashboardActionListQuery,
} from 'common/__generated__/graphql';
import {
  CategoryMappedAction,
  CategoryHierarchyMember,
  CategoryTypeHierarchy,
  constructCatHierarchy,
  mapActionCategories,
  getCategoryString,
} from 'common/categories';
import { useRouter } from 'next/router';

const DynamicActionStatusTable = dynamic(() => import('./ActionStatusTable'));

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
  color: ${(props) => props.theme.themeColors.white};
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
    status {
      id
      identifier
      name
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
      versionName
      viewUrl
      hideActionIdentifiers
      publishedAt
      image {
        rendition(size: "128x128", crop: true) {
          src
        }
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
      }
      ... on AttributeChoice {
        choice {
          id
          name
        }
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

// const actionTableColumnFragment = gql`
//   fragment ActionTableColumnFragment on ActionListPage {
//     dashboardColumns {
//       _typename
//     }
//   }
// `;

export const GET_ACTION_LIST = gql`
  query DashboardActionList(
    $plan: ID!
    $relatedPlanActions: Boolean! # $path: String!
  ) {
    plan(id: $plan) {
      ...PlanFragment
    }
    planActions(plan: $plan) @skip(if: $relatedPlanActions) {
      ...ActionFragment
    }
    relatedPlanActions(plan: $plan) @include(if: $relatedPlanActions) {
      ...ActionFragment
    }
    # planPage(plan: $plan, path: $path) {
    #   ...ActionTableColumnFragment
    # }

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
`;
//  ${actionTableColumnFragment}

const ACTION_LIST_FILTER = gql`
  fragment ActionListFilter on StreamFieldInterface {
    __typename
    field
    id
    ... on CategoryTypeFilterBlock {
      style
      showAllLabel
      depth
      categoryType {
        id
        identifier
        name
        hideCategoryIdentifiers
        selectionType
        helpText
        categories(onlyWithActions: $singlePlan) {
          id
          identifier
          name
          order
          helpText
          parent {
            id
          }
          common {
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

type FilterChangeCallback = (id: string, value: FilterValue) => void;

export type ActionListPrimaryOrg =
  DashboardActionListQuery['plan']['primaryOrgs'][0];

type ActionListProps = {
  actions: DashboardActionListQuery['planActions'];
  categoryTypes: NonNullable<DashboardActionListQuery['plan']>['categoryTypes'];
  organizations: DashboardActionListQuery['planOrganizations'];
  availableFilters: ActionListPageFiltersFragment;
  activeFilters: Filters;
  onFilterChange: FilterChangeCallback;
  title: string;
  leadContent: string;
  headingHierarchyDepth: number;
  includeRelatedPlans: boolean;
  defaultView: ActionListPageView;
  primaryOrgs: ActionListPrimaryOrg[];
};

type OrganizationInput = NonNullable<
  DashboardActionListQuery['planOrganizations']
>[0];
export type ActionListOrganization = OrganizationInput &
  OrganizationHierarchyMember<OrganizationInput>;
type QueryAction = NonNullable<DashboardActionListQuery['planActions']>[0];
export type ActionListAction = QueryAction &
  OrgMappedAction<ActionListOrganization> &
  CategoryMappedAction<ActionListCategoryType, ActionListCategory>;

export type ActionListCategoryTypeFilterBlock = ActionListFilterFragment & {
  __typename?: 'CategoryTypeFilterBlock';
};
export type ActionListActionAttributeTypeFilterBlock =
  ActionListFilterFragment & { __typename?: 'ActionAttributeTypeFilterBlock' };

type QueryCategoryType = DashboardActionListQuery['plan']['categoryTypes'][0];
type CategoryInput = QueryCategoryType['categories'][0];
export type ActionListCategory = CategoryInput &
  CategoryHierarchyMember<ActionListCategoryType>;
export type ActionListCategoryType = QueryCategoryType &
  CategoryTypeHierarchy<ActionListCategory>;

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
  } = props;
  const { t } = useTranslation('common');
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
    ? plan.primaryActionClassification.common
    : plan.primaryActionClassification;

  const primaryCatType = cts.find(
    (ct) => ct.id == primaryActionClassification.id
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

  const actionsWithRps = mapResponsibleParties<
    ActionListAction,
    ActionListOrganization
  >(actions, orgs);
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
    `${getCategoryString(primaryCatType.identifier)}` in activeFilters
  ) {
    groupBy = 'primaryOrg';
  }

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
            {!includeRelatedPlans && (
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
            )}
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
              <ActionStatusGraphs
                actions={filteredActions}
                shownDatasets={{
                  phase: true,
                  progress: true,
                  timeliness: showUpdateStatus,
                }}
              />
              <DynamicActionStatusTable
                actions={filteredActions}
                orgs={orgs}
                plan={plan}
                enableExport={true}
                showUpdateStatus={showUpdateStatus}
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

ActionList.getFiltersFromQuery = (query) => {
  const { organization, text, impact, ...rest } = query;
  return {
    organization,
    text,
    impact,
    ...rest,
  };
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
  const { t } = useTranslation('common');
  const { pathname } = useRouter();
  const { loading, error, data } = useQuery<DashboardActionListQuery>(
    GET_ACTION_LIST,
    {
      variables: {
        plan: plan.identifier,
        relatedPlanActions: includeRelatedPlans,
        // path: pathname,
      },
    }
  );

  if (loading) return <ContentLoader />;
  if (error)
    return (
      <ErrorMessage
        message={t('error-loading-actions', getActionTermContext(plan))}
      />
    );

  const { plan: loadedPlan, planOrganizations } = data;
  const { categoryTypes, primaryOrgs } = loadedPlan;
  const actions = includeRelatedPlans
    ? data.relatedPlanActions
    : data.planActions;

  return (
    <ActionList
      title={title}
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
ActionListLoader.getFiltersFromQuery = (query) =>
  ActionList.getFiltersFromQuery(query);

export default ActionListLoader;
