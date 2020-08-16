/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Spring } from 'react-spring/renderprops.cjs';
import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { captureMessage } from '../../common/sentry';
import ContentLoader from '../common/ContentLoader';
import PlanContext from '../../context/plan';
import ActionListFilters from './ActionListFilters';
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
    planWithContent: plan(id: $plan) {
      id
      generalContent {
        actionListLeadContent
      }
    }
    actionCategories: planCategories(plan: $plan, categoryType: "action") {
      id
      identifier
      name
      parent {
        id
      }
      type {
        id
      }
    }
    emissionScopes: planCategories(plan: $plan, categoryType: "emission_scope") {
      id
      identifier
      name
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

class ActionListFiltered extends React.Component {
  static contextType = PlanContext;

  static getFiltersFromQuery(query) {
    const {
      organization, category, scope, text, impact,
    } = query;
    return {
      organization, category, scope, text, impact,
    };
  }

  constructor(props) {
    super(props);

    this.actions = props.planActions.map((act) => {
      const rps = act.responsibleParties.map((rp) => ({ ...rp }));
      return { ...act, responsibleParties: rps };
    });
    this.cats = props.actionCategories.map((cat) => ({ ...cat }));
    this.orgs = constructOrgHierarchy(props.planOrganizations, this.actions);

    const { emissionScopes } = props;

    const catsById = {};
    this.cats.forEach((cat) => {
      catsById[cat.id] = cat;
    });
    this.cats.forEach((cat) => {
      if (cat.parent) {
        cat.parent = catsById[cat.parent.id];
      }
    });

    const scopesById = {};
    emissionScopes.forEach((cat) => {
      scopesById[cat.id] = cat;
    });
    this.actions.forEach((act) => {
      act.emissionScopes = act.categories
        .filter((cat) => cat.id in scopesById)
        .map((cat) => scopesById[cat.id]);
      act.categories = act.categories
        .filter((cat) => cat.id in catsById)
        .map((cat) => catsById[cat.id]);
    });

    this.handleChange = this.handleChange.bind(this);

    // Determine root categories

    this.actions.forEach((action) => {
      if (action.categories[0]) {
        let category = action.categories[0];
        let seenCats = {};
        while (category.parent) {
          category = category.parent;
          if (category.id in seenCats) {
            captureMessage(`Category ${category.id} has invalid parent`);
            break;
          } else {
            seenCats[category.id] = category;
          }
        }
        action.rootCategory = category;
      } else {
        action.rootCategory = {
          // If action has no category, assign null category
          // TODO: handle this better
          id: '0',
          identifier: '0',
          imageUrl: null,
          name: '',
          parent: null,
        };
      }
    });
  }

  handleChange(filterType, val) {
    const filters = { ...this.props.filters };
    filters[filterType] = val;
    this.setState({
      filters,
    });
    this.props.onFilterChange(filters);
  }

  filterActions() {
    const { filters } = this.props;
    const {
      category, organization, text, impact, scope,
    } = filters;

    const actions = this.actions.filter((item) => {
      if (category && item.rootCategory.id !== category) return false;
      if (organization) {
        let found = false;
        item.responsibleParties.forEach((rp) => {
          let org = rp.organization;

          while (org) {
            if (org.id === organization) {
              found = true;
              break;
            }
            org = org.parent;
          }
        });
        if (!found) return false;
      }
      if (impact && (!item.impact || (item.impact.id !== impact))) return false;

      if (scope) {
        if (!item.emissionScopes.find(es => es.id === scope)) return false;
      }

      if (text) {
        const searchStr = text.toLowerCase();
        if (item.identifier.toLowerCase().startsWith(searchStr)) return true;
        if (item.name.toLowerCase().search(searchStr) !== -1) return true;
        return false;
      }
      return true;
    });

    return actions;
  }

  render() {
    const { t, emissionScopes, filters, leadContent } = this.props;
    const actions = this.filterActions();
    const impacts = this.context.actionImpacts;
    return (
      <ActionListSection id="actions">
        <ActionListHeader>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(props) => (
              <Container style={props}>
                <h1>{ t('actions') }</h1>
                {leadContent && (
                  <Row>
                    <Col sm="12" md="8" className="mb-5">
                      <div className="text-content" dangerouslySetInnerHTML={{ __html: leadContent }} />
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col sm="12" md="10">
                    <h2>{ t('browse-actions') }</h2>
                    <ActionListFilters
                      cats={this.cats}
                      emissionScopes={emissionScopes}
                      orgs={this.orgs}
                      impacts={impacts}
                      filters={filters}
                      onChange={this.handleChange}
                      actionCount={actions.length}
                    />
                  </Col>
                </Row>
              </Container>
            )}
          </Spring>
        </ActionListHeader>
        <Container>
          <ActionCardList actions={actions} />
        </Container>
      </ActionListSection>
    );
  }
}

ActionListFiltered.propTypes = {
  filters: PropTypes.shape({
    organization: PropTypes.string,
    category: PropTypes.string,
    text: PropTypes.string,
    impact: PropTypes.string,
  }).isRequired,
  planActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  planOrganizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  actionCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class ActionList extends React.Component {
  static getFiltersFromQuery(query) {
    return ActionListFiltered.getFiltersFromQuery(query);
  }

  render() {
    const {
      t, plan, filters, onFilterChange,
    } = this.props;
    return (
      <Query query={GET_ACTION_LIST} variables={{ plan: plan.identifier }}>
        {({ data, loading, error }) => {
          if (loading) return <ContentLoader />;
          if (error) return <p>{ t('error-loading-actions') }</p>;

          const { planWithContent, ...otherProps } = data;
          const generalContent = planWithContent.generalContent || {};

          return (
            <ActionListFiltered
              t={t}
              plan={plan}
              leadContent={generalContent.actionListLeadContent}
              filters={filters}
              onFilterChange={onFilterChange}
              {...otherProps}
            />
          );
        }}
      </Query>
    );
  }
}

ActionList.propTypes = {
  t: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
  filters: PropTypes.shape({}).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default withTranslation('common')(ActionList);
