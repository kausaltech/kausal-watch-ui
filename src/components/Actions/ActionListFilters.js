import React from 'react'

import { Button, ButtonGroup } from 'reactstrap';

import ActionIcon from './ActionIcon';

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCat: '',
      activeCatName: this.getCategoryName(''),
      activeOrg: '',
    };
    console.log("cats as filters:"+this.props.cats);
  }
  
  onRadioBtnClick(rSelected) {
    this.setState({ 
      activeCat: rSelected,
      activeCatName: this.getCategoryName(rSelected) 
    });
    this.props.changeOption("Category", rSelected);
  }

  onOrgBtnClick(oSelected) {
    this.setState({ 
      activeOrg: oSelected
    });
    this.props.changeOption("Organization", oSelected);
  }

  getCategoryName(catId) {
    let cat = this.props.cats.find(cat => cat.id === catId);
    return cat ? cat.attributes.name : 'Kaikki';
  }
  
  render() {
    let rootCategories = this.props.cats.filter(cat => cat.relationships.parent.data == null);
    return (
      <div className="filters mb-4">
        <ButtonGroup className="mb-4"> 
          <Button color="primary" size="lg" outline onClick={() => this.onRadioBtnClick("")} active={this.state.activeCat === ""}><ActionIcon category="0" /></Button>
          {rootCategories.map(category => (
              <Button outline key={category.id} color="primary" size="lg" onClick={() => this.onRadioBtnClick(category.id)} active={this.state.activeCat === category.id}>
                <ActionIcon category={category.id} /> 
              </Button>
            ))}
        </ButtonGroup>
        <h5>{ this.state.activeCatName }</h5>
        <ButtonGroup className="mb-4"> 
          <Button color="primary" size="lg" outline onClick={() => this.onOrgBtnClick("")} active={this.state.activeOrg === ""}><ActionIcon category="0" /></Button>
          {this.props.orgs.map(org => (
              <Button outline key={org.id} color="primary" size="lg" onClick={() => this.onOrgBtnClick(org.id)} active={this.state.activeOrg === org.id}>
                 {org.id}
              </Button>
            ))}
        </ButtonGroup> 
        <h5>{ this.state.activeOrg }</h5>
      </div>
    );
  }
}

export default ActionListFilters
