import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

import PlanContext from '../../context/plan';


export const GET_ACTION_LIST = gql`
  query ActionList($plan: ID!) {
    planActions(plan: $plan) {
      id
      identifier
      name
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
    }
    planCategories(plan: $plan) {
      id
      identifier
      name
      imageUrl
      parent {
        id
      }
      type {
        id
      }
    }
    planOrganizations(plan: $plan) {
      id
      abbreviation
      name
    }
  }
`;


class ActionListFiltered extends React.Component {
  static contextType = PlanContext;

  constructor(props) {
    super(props);

    this.actions = props.planActions;
    this.cats = props.planCategories;
    this.orgs = props.planOrganizations;

    const catsById = {};
    this.cats.forEach((cat) => {
      catsById[cat.id] = cat;
    });
    this.cats.forEach((cat) => {
      if (cat.parent) {
        cat.parent = catsById[cat.parent.id];
      }
    });

    this.actions.forEach((act) => {
      act.categories = act.categories.map(cat => catsById[cat.id]);
    });

    this.state = {
      error: null,
      activeCategory: '',
      activeOrganization: '',
      activeSearch: '',
      activeImpact: '',
    };
    this.handleChange = this.handleChange.bind(this);

    // Determine root categories
    this.actions.forEach((action) => {
      let category = action.categories[0];

      while (category.parent) category = category.parent;
      action.rootCategory = category;
    });
  }

  handleChange(filterType, val) {
    const change = `active${filterType}`;
    this.setState({
      [change]: val,
    });
  }

  filterActions() {
    const actions = this.actions.filter((item) => {
      const activeCat = this.state.activeCategory;
      const activeOrg = this.state.activeOrganization;
      const activeSearch = this.state.activeSearch;
      const activeImpact = this.state.activeImpact;

      if (activeCat && item.rootCategory.id !== activeCat) return false;
      if (activeOrg) {
        if (!item.responsibleParties.find(rp => rp.organization.id === activeOrg)) return false;
      }
      if (activeSearch) {
        const searchStr = activeSearch.toLowerCase();
        if (item.identifier.toLowerCase().startsWith(searchStr)) return true;
        if (item.name.toLowerCase().search(searchStr) !== -1) return true;
        return false;
      }
      if (activeImpact && (!item.impact || (item.impact.id !== activeImpact))) return false;
      return true;
    });

    return actions;
  }

  render() {
    const actions = this.filterActions();
    const impacts = this.context.actionImpacts;

    return (
      <div id="actions">
        <h1 className="mb-4">Toimenpiteet</h1>
        <ActionListFilters cats={this.cats} orgs={this.orgs} impacts={impacts} changeOption={this.handleChange} />
        <ActionList actions={actions} error={this.state.error} />
      </div>
    );
  }
}

ActionListFiltered.propTypes = {
  planActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  planOrganizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  planCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionListFiltered;
