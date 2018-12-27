import React from 'react';
import getConfig from 'next/config';

import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

import {aplans} from '../../common/api';


class ActionListFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rawData: [],
      data: [],
      categories: [],
      orgs: [],
      statuses: [],  
      activeCategory: '',
      activeOrganization: '',
      activeSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  componentDidMount() {
    aplans.get('action', {
      params: {
        include: "status,categories,categories.parent,categories.parent.parent,responsible_parties",
        "fields[action]": "identifier,name,categories,responsible_parties,status,completion",
        "fields[category]": "identifier,name,parent",
        "fields[organization]": "name,abbreviation,parent",
        "fields[action_status]": "identifier,name",
      }
    })
    .then(
      (result) => {
        const categories = result.data.included.filter(function(item) {
          return item.type === "category";
        });
        
        const orgs = result.data.included.filter(function(item) {
          return item.type === "organization";
        });
        
        const statuses = result.data.included.filter(function(item) {
          return item.type === "action_status";
        });
        
        this.setState({
          categories: categories,
          orgs: orgs,
          statuses: statuses
        });
        
        result.data.data.map(item => {
          item.rootCategory = this.getRootCategory(item.relationships.categories.data[0].id, categories);
          item.progress = Math.floor(Math.random() * Math.floor(100));
          return item;
        });
        const data = result.data.data;
        this.setState({
          isLoaded: true,
          data: data,
          rawData: data
        });
      }
    )
    .catch(
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
    //console.log("Filtering: " + change + " to " + val);
    this.setState({
      [change]: val
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategory !== this.state.activeCategory || prevState.activeOrganization !== this.state.activeOrganization || prevState.activeSearch !== this.state.activeSearch ) {
      this.applyFilters(this.state.activeCategory, this.state.activeOrganization, this.state.activeSearch);
    }
  }
  
  applyFilters(activeCat, activeOrg, activeSearch) {

    let filteredData = this.state.rawData;

    if(activeCat !== ""){
      filteredData = this.state.rawData.filter(function(item) {
        return item.rootCategory === activeCat;
      });
    }
    if(activeOrg !== ""){
      filteredData = filteredData.filter(function(item) {
        return item.relationships.responsible_parties.data.find(org => org.id === activeOrg);
      });
    }
    if(activeSearch !== ""){
      filteredData = filteredData.filter(function(item) {
        return item.attributes.name.toLowerCase().search(
          activeSearch.toLowerCase()) !== -1;
      });
    }
    this.setState({data: filteredData});
    
    return null;
  }
  
  render() {
      return (
        <div>
          <h1 className="mb-4">Toimenpiteet</h1>
          <ActionListFilters cats={this.state.categories} orgs={this.state.orgs} changeOption={this.handleChange} /> 
          <ActionList data={this.state.data} cats={this.state.categories} orgs={this.state.orgs} error={this.state.error} statuses={this.state.statuses} isLoaded={this.state.isLoaded} />
        </div>
      );
    }
  }


export default ActionListFiltered
