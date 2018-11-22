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
      <select value={this.state.theme} onChange={this.handleChange} className="custom-select mb-5"> 
        <option value=""></option>
        {this.props.themes.map(category => (
            <option key={category.id} value={category.id}>{category.attributes.name}</option>
          ))}
      </select> 

    );
  }
}

export default ActionListFilters
