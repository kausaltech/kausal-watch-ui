import React from 'react'

import { Button, ButtonGroup as BaseButtonGroup, CustomInput  as BaseCustomInput, Input} from 'reactstrap';

import ActionIcon from './ActionIcon';

import styled from 'styled-components';


const ButtonGroup = styled(BaseButtonGroup)`
  flex-wrap: wrap;
  justify-content: center;
`

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCat: '',
      activeCatName: this.getCategoryName(''),
      activeOrg: '',
      activeSearch: '',
    };
    
    this.onOrgBtnClick = this.onOrgBtnClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  onSearchChange(evt) {
    this.setState({ 
      activeSearch: evt.target.value
    });
    this.props.changeOption("Search", evt.target.value);
  }
  
  getCategoryName(catId) {
    let cat = this.props.cats.find(cat => cat.id === catId);
    return cat ? cat.attributes.name : 'Kaikki teemat';
  }

  getOrganizationName(orgId) {
    let org = this.props.orgs.find(org => org.id === orgId);
    return org ? org.attributes.name : '?';
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
        <CustomInput type="select" id="orgfierld" name="organization" value={this.state.activeOrg} onChange={this.onOrgBtnClick} className="mb-4">
          <option value="">Kaikki organisaatiot</option>
          {this.props.orgs.map(org => (
              <option value={org.id} key={org.id}>{ this.getOrganizationName(org.id) }</option>
            ))}
        </CustomInput> 
        <Input name="search" id="searchfield" placeholder="Hae kuvauksista"  onChange={this.onSearchChange}/>
      </div>
    );
  }
}

export default ActionListFilters
