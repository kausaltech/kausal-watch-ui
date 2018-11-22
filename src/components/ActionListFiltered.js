import React from 'react'

import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

class ActionListFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rawData: [],
      data: [],
      included: [],
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  componentDidMount() {
    fetch(process.env.GATSBY_HNH_API + "/action/?include=categories,categories.parent,categories.parent.parent")
      .then(res => res.json())
      .then(
        (result) => {
          result.data.map(item => item.rootCategory = this.getRootCategory(item.relationships.categories.data[0].id, result.included));
          this.setState({
            isLoaded: true,
            data: result.data,
            rawData: result.data,
            included: result.included
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  getRootCategory(catId, categories) {
    let category = categories.find(cat => cat.id === catId);
    if (category.relationships.parent.data != null) {
      let parentId = category.relationships.parent.data.id;
      return this.getRootCategory(parentId, categories);
    }
    else return catId;
  }
  
  handleChange(val) {
    this.setState({theme: val});
    let filteredData;
    if(val === ""){
      filteredData = this.state.rawData;
    }
    else {
      filteredData = this.state.rawData.filter(function(item) {
        return item.rootCategory === val;
      });
    }
    this.setState({theme: val});
    this.setState({data: filteredData});
  }

  render() {

      return (
        <div>
          <ActionListFilters themes={this.state.included} changeOption={this.handleChange} /> 
          <ActionList data={this.state.data} included={this.state.included} error={this.state.error} isLoaded={this.state.isLoaded} />
        </div>
      );
    }
  }


export default ActionListFiltered
