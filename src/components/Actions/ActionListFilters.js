import React from 'react'

import { Button, ButtonGroup } from 'reactstrap';

import HelIcon from '../Common/HelIcon';
import ActionIcon from './ActionIcon';

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: '',
      themeName: this.getCategoryName('')
    };
  }
  
  onRadioBtnClick(rSelected) {
    this.setState({ 
      theme: rSelected,
      themeName: this.getCategoryName(rSelected) 
    });
    this.props.changeOption(rSelected);
  }

  getCategoryName(catId) {
    let cat = this.props.themes.find(cat => cat.id === catId);
    return cat ? cat.attributes.name : 'Kaikki';
  }
  
  render() {
    let rootCategories = this.props.themes.filter(cat => cat.relationships.parent.data == null);
    return (
      <div className="filters mb-4">
        <ButtonGroup className="mb-4"> 
          <Button color="primary" outline onClick={() => this.onRadioBtnClick("")} active={this.state.theme === ""}><HelIcon iconName="bars" /></Button>
          {rootCategories.map(category => (
              <Button outline key={category.id} color="primary" size="lg" onClick={() => this.onRadioBtnClick(category.id)} active={this.state.theme === category.id}>
                <ActionIcon category={category.id} /> 
              </Button>
            ))}
        </ButtonGroup> 
        <h5>{ this.state.themeName }</h5>
      </div>
    );
  }
}

export default ActionListFilters
