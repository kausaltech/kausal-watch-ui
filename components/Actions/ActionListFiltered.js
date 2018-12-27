import React from 'react';

import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

import {aplans} from '../../common/api';


class ActionListFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      activeCategory: '',
      activeOrganization: '',
      activeSearch: '',
      actions: [],
      orgs: [],
      categories: []
    };
    Object.assign(this.state, this.processResponse(props.initialData))
    this.handleChange = this.handleChange.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  processResponse(data) {
    if (!data)
      return {}

    const categories = data.included.filter(function(item) {
      return item.type === "category";
    });

    const orgs = data.included.filter(function(item) {
      return item.type === "organization";
    });

    const statuses = data.included.filter(function(item) {
      return item.type === "action_status";
    });

    const actions = data.data.map(item => {
      const rootCategory = this.getRootCategory(item.relationships.categories.data[0].id, categories);
      const newItem = {...item, rootCategory}
      return newItem
    })
    return {
      categories,
      orgs,
      statuses,
      actions,
      isLoaded: true
    }
  }

  componentDidMount() {
    if (this.state.isLoaded)
      return

    aplans.getActionList().then(
      (result) => {
        const newState = this.processResponse(result.data)
        this.setState(newState)
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }
  
  getRootCategory(catId, cats) {
    let category = cats.find(cat => cat.id === catId);
    if (category.relationships.parent.data != null) {
      let parentId = category.relationships.parent.data.id;
      return this.getRootCategory(parentId, cats);
    }
    else return catId;
  }
  
  handleChange(filterType, val) {
    const change = "active" + filterType;
    this.setState({
      [change]: val
    });
  }

  filterActions() {
    const actions = this.state.actions.filter(item => {
      const activeCat = this.state.activeCategory;
      const activeOrg = this.state.activeOrganization;
      const activeSearch = this.state.activeSearch;

      if (activeCat && item.rootCategory != activeCat)
        return false
      if (activeOrg) {
        if (!item.relationships.responsible_parties.data.find(org => org.id == activeOrg))
          return false
      }
      if (activeSearch) {
        if (item.attributes.name.toLowerCase().search(activeSearch.toLowerCase()) == -1)
          return false
      }
      return true
    })

    return actions;
  }
  
  render() {
    const actions = this.filterActions()
    return (
      <div>
        <h1 className="mb-4">Toimenpiteet</h1>
        <ActionListFilters cats={this.state.categories} orgs={this.state.orgs} changeOption={this.handleChange} />
        <ActionList data={actions} cats={this.state.categories} orgs={this.state.orgs} error={this.state.error} statuses={this.state.statuses} isLoaded={this.state.isLoaded} />
      </div>
    );
  }
}


export default ActionListFiltered
