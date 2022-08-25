import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Row, Col, Nav, NavItem, Alert
} from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { constructOrgHierarchy, orgHasActions } from 'common/organizations';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';
import RichText from 'components/common/RichText';
import ActionListFilters from 'components/actions/ActionListFilters';
import ActionCardList from 'components/actions/ActionCardList';
import ActionStatusGraphs from './ActionStatusGraphs';

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
      categoryTypes {
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
          name
          parent {
            id
          }
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

const ActionListResults = (props) => {
  const {
    planActions,
    planOrganizations,
    categoryTypes,
    filters,
    onFilterChange,
    title,
    leadContent,
    primaryOrgs } = props;
  const { t } = useTranslation('common');
  const plan = useContext(PlanContext);
  const displayDashboard = filters.view === 'dashboard';
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

    act.categories = act.categories.map((cat) => {
      const out = catById[cat.id];
      act.rootCategory = null;
      if (out.type.identifier === 'action') {
        let root = out;
        while (root.parent != null) root = root.parent;
        act.rootCategory = root;
      }
      return out;
    });

    return { ...act, responsibleParties: rps };
  });
  const orgs = constructOrgHierarchy(planOrganizations, actions);

  const handleChange = useCallback(
    (filterType, val) => {
      const newFilters = { ...filters };
      newFilters[filterType] = val;
      onFilterChange(newFilters);
    },
    [onFilterChange, filters],
  );

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
    return true;
  }

  const filteredActions = actions.filter(filterAction);
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
                  categoryTypes={catTypes}
                  orgs={orgs.filter(orgHasActions)}
                  primaryOrgs={primaryOrgs}
                  impacts={impacts}
                  phases={phases}
                  hasActionPrimaryOrgs={plan.features.hasActionPrimaryOrgs}
                  schedules={schedules}
                  filters={filters}
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
          <div id="list-view" role="tabpanel" tabIndex="0" aria-labelledby="list-tab" hidden={!displayDashboard}>
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
          <div id="dashboard-view" role="tabpanel" tabIndex="0" aria-labelledby="dashboard-tab" hidden={displayDashboard}>
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

ActionListResults.getFiltersFromQuery = (query) => {
  const {
    organization, text, impact, ...rest
  } = query;
  return {
    organization, text, impact, ...rest,
  };
};

ActionListResults.propTypes = {
  filters: PropTypes.shape({
    primaryOrg: PropTypes.string,
    organization: PropTypes.string,
    text: PropTypes.string,
    impact: PropTypes.string,
  }).isRequired,
  planActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  planOrganizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Statusboard(props) {
  const {
    plan,
    title,
    leadContent,
    filters,
    onFilterChange,
  } = props;
  const { t } = useTranslation('common');
  const { loading, error, data } = useQuery(GET_ACTION_LIST, {
    variables: { plan: plan.identifier },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={t('error-loading-actions', getActionTermContext(plan))} />;

  const { plan: loadedPlan, ...otherProps } = data;
  const { categoryTypes, primaryOrgs } = loadedPlan;

  return (
    <ActionListResults
      plan={plan}
      title={title}
      leadContent={leadContent}
      filters={filters}
      onFilterChange={onFilterChange}
      categoryTypes={categoryTypes}
      primaryOrgs={primaryOrgs}
      {...otherProps}
    />
  );
}

Statusboard.propTypes = {
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
  filters: PropTypes.shape({}).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
Statusboard.getFiltersFromQuery = (query) => ActionListResults.getFiltersFromQuery(query);

export default Statusboard;
