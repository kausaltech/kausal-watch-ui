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
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(process.env.GATSBY_HNH_API + "/action/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
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
        return item.userId === val;
      });
    }
    this.setState({theme: val});
    this.setState({data: filteredData});
    console.log(filteredData);
  }

  render() {

      return (
        <div>
          <ActionListFilters data={this.state.data} changeOption={this.handleChange} /> 
          <ActionList data={this.state.data} error={this.state.error} isLoaded={this.state.isLoaded} />
        </div>
      );
    }
  }


export default ActionListFiltered
