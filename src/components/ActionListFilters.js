import React from 'react'

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({theme: event.target.value});
    console.log("change to theme " + this.state.theme );
    this.props.changeOption(event.target.value);
  }

  render() {
    return (
      <select value={this.state.theme} onChange={this.handleChange}>
        <option value=""></option>
        <option value="1">Theme 1</option>
        <option value="2">Theme 2</option> 
      </select> 
    );
  }
}

export default ActionListFilters
