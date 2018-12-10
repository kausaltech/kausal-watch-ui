import React from 'react'

import { Button, ButtonGroup, CustomInput } from 'reactstrap';

import ActionIcon from './ActionIcon';

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCat: '',
      activeCatName: this.getCategoryName(''),
      activeOrg: '',
    };
    
    this.onOrgBtnClick = this.onOrgBtnClick.bind(this);
  }
  
  onRadioBtnClick(rSelected) {
    this.setState({ 
      activeCat: rSelected,
      activeCatName: this.getCategoryName(rSelected) 
    });
    this.props.changeOption("Category", rSelected);
  }

  onOrgBtnClick(evt) {
    this.setState({ 
      activeOrg: evt.target.value
    });
    this.props.changeOption("Organization", evt.target.value);
  }

  getCategoryName(catId) {
    let cat = this.props.cats.find(cat => cat.id === catId);
    return cat ? cat.attributes.name : 'Kaikki teemat';
  }
  
  render() {
    let rootCategories = this.props.cats.filter(cat => cat.relationships.parent.data == null);
    return (
      <div className="filters mb-5">
        <ButtonGroup className="mb-2"> 
          <Button color="primary" size="lg" outline onClick={() => this.onRadioBtnClick("")} active={this.state.activeCat === ""}><ActionIcon category="0" /></Button>
          {rootCategories.map(category => (
              <Button outline key={category.id} color="primary" size="lg" onClick={() => this.onRadioBtnClick(category.id)} active={this.state.activeCat === category.id}>
                <ActionIcon category={category.id} /> 
              </Button>
            ))}
        </ButtonGroup>
        <h5 className="mb-4">{ this.state.activeCatName }</h5>
        <CustomInput type="select" id="exampleCustomSelect" name="customSelect" value={this.state.activeOrg} onChange={this.onOrgBtnClick} className="mb-4">
          <option value="">Kaikki Organisaatiot</option>
          {this.props.orgs.map(org => (
              <option value={org.id} key={org.id}>{org.id}</option>
            ))}
        </CustomInput> 
      </div>
    );
  }
}

export default ActionListFilters
