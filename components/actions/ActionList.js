/* eslint-disable max-classes-per-file */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { useSpring, animated } from 'react-spring';
import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from 'common/i18n';
import { captureMessage } from 'common/sentry';
import RichText from 'components/common/RichText';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';
import ActionListFilters from 'components/actions/ActionListFilters';
import ActionCardList from './ActionCardList';

const ActionListSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s400};
  background-color: ${(props) => props.theme.neutralLight};
`;

const ActionListHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
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
      manualStatusReason
      implementationPhase {
        id
        identifier
        name
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
      mergedWith {
        id
        identifier
      }
    }
    planOrganizations(plan: $plan, withAncestors: true) {
      id
      abbreviation
      name
      classification {
        name
      }
      parent {
        id
      }
    }
  }
`;

function constructOrgHierarchy(orgsIn, actions) {
  const orgsById = new Map();
  const skipOrgs = ['Hallitus', 'Valtuusto', 'Lautakunta', 'Jaosto'];

  function isSkippedOrg(org) {
    if (!org.classification) return false;
    return skipOrgs.indexOf(org.classification.name) >= 0;
  }

  const orgs = orgsIn.map((org) => {
    const newOrg = { ...org, children: [] };
    orgsById.set(newOrg.id, newOrg);
    return newOrg;
  });

  orgs.forEach((org) => {
    if (!org.parent) return;
    // Check if org or its parents is one of the skipped organization types
    // and yank them out of the org hierarchy
    if (isSkippedOrg(org)) return;
    let parent = orgsById.get(org.parent.id);
    while (isSkippedOrg(parent)) {
      parent = orgsById.get(parent.parent.id);
    }
    parent.children.push(org);
    org.parent = parent;
  });

  actions.forEach((action) => {
    action.responsibleParties.forEach((rp) => {
      rp.organization = orgsById.get(rp.organization.id);
    });
  });

  return orgs.filter((org) => !isSkippedOrg(org));
}

function ActionListResults({
  t, planActions, planOrganizations, categoryTypes, leadContent, filters, onFilterChange
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
    <ActionListSection id="actions">
      <ActionListHeader>
        <AnimatedContainer style={springProps}>
          <h1>{ t('actions') }</h1>
          {leadContent && (
            <Row>
              <Col sm="12" md="8" className="mb-5">
                <div className="text-content"><RichText html={leadContent} /></div>
              </Col>
            </Row>
          )}
          <Row>
            <Col sm="12">
              <h2>{ t('browse-actions') }</h2>
              <ActionListFilters
                categoryTypes={catTypes}
                orgs={orgs}
                impacts={impacts}
                filters={filters}
                onChange={handleChange}
                actionCount={filteredActions.length}
              />
            </Col>
          </Row>
        </AnimatedContainer>
      </ActionListHeader>
      <Container>
        <ActionCardList actions={filteredActions} />
      </Container>
    </ActionListSection>
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
  leadContent: PropTypes.string.isRequired,
};

function ActionList({
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

ActionList.propTypes = {
  t: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
  filters: PropTypes.shape({}).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
ActionList.getFiltersFromQuery = (query) => ActionListResults.getFiltersFromQuery(query);

export default withTranslation('common')(ActionList);
