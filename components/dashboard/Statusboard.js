/* eslint-disable max-classes-per-file */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { useSpring } from 'react-spring';
import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from 'common/i18n';
import { constructOrgHierarchy, orgHasActions } from 'common/organizations';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';
import StatusboardFilters from './StatusboardFilters';
import ActionStatusGraphs from './ActionStatusGraphs';
import ActionStatusTable from './ActionStatusTable';

const ActionListSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s400};
  background-color: ${(props) => props.theme.neutralLight};
`;

const ActionListHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXxl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

export const GET_ACTION_LIST = gql`
  query ActionList($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes {
        id
        identifier
        name
        usableForActions
        categories {
          id
          identifier
          name
          parent {
            id
          }
        }
      }
      generalContent {
        id
        actionListLeadContent
      }
    }
    planActions(plan: $plan) {
      id
      identifier
      name(hyphenated: true)
      officialName
      completion
      updatedAt
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

function ActionListResults({
  t, planActions, planOrganizations, categoryTypes, filters, onFilterChange
}) {
  const plan = useContext(PlanContext);
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

  /*
    this.actions.forEach((act) => {
      act.categories = act.categories
        .filter((cat) => cat.id in catsById)
        .map((cat) => catsById[cat.id]);
    });
  */
  const handleChange = useCallback(
    (filterType, val) => {
      const newFilters = { ...filters };
      newFilters[filterType] = val;
      onFilterChange(newFilters);
    },
    [onFilterChange, filters],
  );

  /*
    // Determine root categories
    this.actions.forEach((action) => {
    });
  }
  */

  function filterAction(item) {
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
    if (filters.text) {
      const searchStr = filters.text.toLowerCase();
      if (item.identifier.toLowerCase().startsWith(searchStr)) return true;
      if (item.name.toLowerCase().search(searchStr) !== -1) return true;
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
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const AnimatedContainer = Container;

  return (
    <>
      <ActionListSection id="actions">
        <ActionListHeader>
          <AnimatedContainer style={springProps}>
            <h1>{ t('dashboard') }</h1>
            <Row>
              <Col sm="12">
                <StatusboardFilters
                  categoryTypes={catTypes}
                  orgs={orgs.filter(orgHasActions)}
                  impacts={impacts}
                  filters={filters}
                  onChange={handleChange}
                  actionCount={filteredActions.length}
                />
              </Col>
            </Row>
          </AnimatedContainer>
        </ActionListHeader>
      </ActionListSection>
      <Container>
        <ActionStatusGraphs actions={filteredActions} />
        <ActionStatusTable actions={filteredActions} orgs={orgs} />
      </Container>
    </>
  );
}
ActionListResults = withTranslation('common')(ActionListResults);

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
    organization: PropTypes.string,
    text: PropTypes.string,
    impact: PropTypes.string,
  }).isRequired,
  planActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  planOrganizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Statusboard({
  t, plan, filters, onFilterChange,
}) {
  const { loading, error, data } = useQuery(GET_ACTION_LIST, {
    variables: { plan: plan.identifier },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={t('error-loading-actions')} />;

  const { plan: loadedPlan, ...otherProps } = data;
  const { categoryTypes } = loadedPlan;
  const generalContent = loadedPlan.generalContent || {};

  return (
    <ActionListResults
      plan={plan}
      leadContent={generalContent.actionListLeadContent}
      filters={filters}
      onFilterChange={onFilterChange}
      categoryTypes={categoryTypes}
      {...otherProps}
    />
  );
}

Statusboard.propTypes = {
  t: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
  filters: PropTypes.shape({}).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
Statusboard.getFiltersFromQuery = (query) => ActionListResults.getFiltersFromQuery(query);

export default withTranslation('common')(Statusboard);
