import React from 'react';

import {
  CustomInput as BaseCustomInput, Input, FormGroup, Label, Row, Col,
} from 'reactstrap';

import styled from 'styled-components';

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`;

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
    this.onCatBtnClick = this.onCatBtnClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onOrgBtnClick(evt) {
    this.setState({
      activeOrg: evt.target.value,
    });
    this.props.changeOption('Organization', evt.target.value);
  }

  onCatBtnClick(evt) {
    this.setState({
      activeCat: evt.target.value,
      activeCatName: this.getCategoryName(evt.target.value),
    });
    this.props.changeOption('Category', evt.target.value);
  }

  onSearchChange(evt) {
    this.setState({
      activeSearch: evt.target.value,
    });
    this.props.changeOption('Search', evt.target.value);
  }

  getCategoryName(catId) {
    const cat = this.props.cats.find(cat => cat.id === catId);
    return cat ? cat.name : 'Kaikki teemat';
  }

  getOrganizationName(orgId) {
    const org = this.props.orgs.find(org => org.id === orgId);
    return org ? org.name : '?';
  }

  render() {
    const rootCategories = this.props.cats
      .filter(cat => cat.parent == null)
      .sort((a, b) => a.name.localeCompare(b.name));
    const orgs = this.props.orgs.slice(0)
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="filters mb-5 text-left">
        <Row>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="catfield">Rajaa teeman mukaan</Label>
              <CustomInput type="select" id="catfield" name="category" value={this.state.activeCat} onChange={this.onCatBtnClick} className="mb-2">
                <option value="">Kaikki teemat</option>
                {rootCategories.map(cat => (
                  <option value={cat.id} key={cat.id}>{ this.getCategoryName(cat.id) }</option>
                ))}
              </CustomInput>

            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="orgfield">Rajaa vastuuorganisaation mukaan</Label>
              <CustomInput type="select" id="orgfield" name="organization" value={this.state.activeOrg} onChange={this.onOrgBtnClick} className="mb-2">
                <option value="">Kaikki organisaatiot</option>
                {orgs.map(org => (
                  <option value={org.id} key={org.id}>{ this.getOrganizationName(org.id) }</option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label for="searchfield">Etsi tekstistä</Label>
              <Input name="search" id="searchfield" placeholder="Hae kuvauksista" onChange={this.onSearchChange} />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ActionListFilters;
