import React from 'react';
import PropTypes from 'prop-types';

import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

import { aplans } from '../../common/api';


class ActionListFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      activeCategory: '',
      activeOrganization: '',
      activeSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);

    // Determine root categories
    props.actions.forEach((action) => {
      let category = action.categories[0];

      while (category.parent != null) category = category.parent;
      action.root_category = category;
    });
  }

  static async fetchData() {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.findAll('action', {
      include: ['status', 'categories', 'categories.parent', 'categories.parent.parent', 'responsible_parties'],
      'fields[action]': ['identifier', 'name', 'image_url', 'categories', 'responsible_parties', 'status', 'completion'],
      'fields[category]': ['identifier', 'name', 'parent', 'image_url'],
      'fields[organization]': ['name', 'abbreviation', 'parent'],
      'fields[action_status]': ['identifier', 'name'],
    });
    const props = {
      actions: resp.data,
      orgs: resp.store.getAll('organization'),
      cats: resp.store.getAll('category'),
    };

    return props;
  }

  handleChange(filterType, val) {
    const change = `active${filterType}`;
    this.setState({
      [change]: val,
    });
  }

  filterActions() {
    const actions = this.props.actions.filter((item) => {
      const activeCat = this.state.activeCategory;
      const activeOrg = this.state.activeOrganization;
      const activeSearch = this.state.activeSearch;

      if (activeCat && item.root_category.id != activeCat) return false;
      if (activeOrg) {
        if (!item.responsible_parties.find(org => org.id == activeOrg)) return false;
      }
      if (activeSearch) {
        if (item.name.toLowerCase().search(activeSearch.toLowerCase()) == -1) return false;
      }
      return true;
    });

    return actions;
  }

  render() {
    const actions = this.filterActions();

    return (
      <div id="actions">
        <h1 className="mb-4">Toimenpiteet</h1>
        <ActionListFilters cats={this.props.cats} orgs={this.props.orgs} changeOption={this.handleChange} />
        <ActionList actions={actions} error={this.state.error} />
      </div>
    );
  }
}

ActionListFiltered.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  orgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  cats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionListFiltered;
