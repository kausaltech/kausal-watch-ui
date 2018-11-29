import React from 'react'

import { Button, ButtonGroup } from 'reactstrap';

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  onRadioBtnClick(rSelected) {
    this.setState({ theme: rSelected });
    this.props.changeOption(rSelected);
  }
  
  handleChange(event) {
    this.setState({theme: event.target.value});
    console.log("change to theme " + this.state.theme );
    this.props.changeOption(event.target.value);
  }

  render() {
    let rootCategories = this.props.themes.filter(cat => cat.relationships.parent.data == null);
    return (
      <ButtonGroup vertical className="mb-5"> 
        <Button color="primary" outline onClick={() => this.onRadioBtnClick("")} active={this.state.theme === ""}>Kaikki teemat</Button>
        {rootCategories.map(category => (
            <Button outline key={category.id} color="primary" onClick={() => this.onRadioBtnClick(category.id)} active={this.state.theme === category.id}>{category.attributes.name}</Button>
          ))}
      </ButtonGroup> 

    );
  }
}

export default ActionListFilters
