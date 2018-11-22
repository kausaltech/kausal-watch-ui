import React from 'react'

import ActionListFilters from './ActionListFilters';
import ActionList from './ActionList';

class ActionListFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      included: [],
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(process.env.GATSBY_HNH_API + "/action/?include=categories")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data,
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
  
  handleChange(val) {
    this.setState({theme: val});
    let filteredData;
    if(val === ""){
      filteredData = this.state.data;
    }
    else {
      filteredData = this.state.data.filter(function(item) {
        return item.relationships.categories.data[0].id === val;
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
