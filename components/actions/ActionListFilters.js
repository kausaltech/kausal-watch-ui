import React from 'react';

import {
  CustomInput as BaseCustomInput, Input, FormGroup, Label, Row, Col, Badge, Button
} from 'reactstrap';

import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`;

const FiltersList = styled.div`
  font-size: 2rem;

  .count {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .close {
    color: white;
    margin-left: .5em;
  }

`;

class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.onOrgBtnClick = this.onOrgBtnClick.bind(this);
    this.onCatBtnClick = this.onCatBtnClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onImpactBtnClick = this.onImpactBtnClick.bind(this);
  }

  onOrgBtnClick(evt) {
    this.props.onChange('organization', evt.target.value);
  }

  onCatBtnClick(evt) {
    this.props.onChange('category', evt.target.value);
  }

  onImpactBtnClick(evt) {
    this.props.onChange('impact', evt.target.value);
  }

  onSearchChange(evt) {
    this.props.onChange('text', evt.target.value);
  }

  getCategoryName(catId) {
    const cat = this.props.cats.find(cat => cat.id === catId);
    return cat ? cat.name : this.props.t('filter-all-categories');
  }

  getOrganizationName(orgId) {
    const org = this.props.orgs.find(org => org.id === orgId);
    return org ? org.name : '';
  }

  getImpactName(impactId) {
    const imp = this.props.impacts.find(imp => imp.id === impactId);
    return imp ? imp.name : '';
  }

  render() {
    const { t, filters, impacts, actionCount } = this.props;
    const rootCategories = this.props.cats
      .filter(cat => cat.parent == null)
      .sort((a, b) => a.name.localeCompare(b.name));
    const orgs = this.props.orgs.slice(0)
      .sort((a, b) => a.name.localeCompare(b.name));

    const category = filters.category === undefined ? '' : filters.category;
    const organization = filters.organization === undefined ? '' : filters.organization;
    const impact = filters.impact === undefined ? '' : filters.impact;

    return (
      <div className="filters mb-2 text-left">
        <Row>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="catfield">{ t('filter-category') }</Label>
              <CustomInput type="select" id="catfield" name="category" value={category} onChange={this.onCatBtnClick} className="mb-2">
                <option value="">{ t('filter-all-categories') }</option>
                {rootCategories.map(cat => (
                  <option value={cat.id} key={cat.id}>{ this.getCategoryName(cat.id) }</option>
                ))}
              </CustomInput>

            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="orgfield">{ t('filter-organization') }</Label>
              <CustomInput type="select" id="orgfield" name="organization" value={organization} onChange={this.onOrgBtnClick} className="mb-2">
                <option value="">{ t('filter-all-organizations') }</option>
                {orgs.map((org) => (
                  <option value={org.id} key={org.id}>{ this.getOrganizationName(org.id) }</option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="impactfield">{ t('filter-impact') }</Label>
              <CustomInput type="select" id="impactfield" name="impact" value={impact} onChange={this.onImpactBtnClick} className="mb-2">
                <option value="">{ t('filter-all-impacts') }</option>
                {impacts.map((impact) => (
                  <option value={impact.id} key={impact.id}>{ impact.name }</option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6 }}>
            <FormGroup>
              <Label for="searchfield">{ t('filter-text') }</Label>
              <Input name="search" id="searchfield" placeholder={t('filter-text-default')} value={filters.text || ''} onChange={this.onSearchChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FiltersList className="mb-4 mt-3">
              { filters.organization && <div><Badge color="primary" className="mr-3"><Button close size="sm" onClick={this.onOrgBtnClick} />{ this.getOrganizationName(filters.organization) }</Badge></div> }
              { filters.category && <div><Badge color="primary" className="mr-3"><Button close onClick={this.onCatBtnClick} />{ this.getCategoryName(filters.category) }</Badge></div> }
              { filters.impact && <div><Badge color="primary" className="mr-3"><Button close onClick={this.onImpactBtnClick} />{ this.getImpactName(filters.impact) } { t('impact') }</Badge></div> }
              { filters.text && <div> <Badge color="primary" className="mr-3"><Button close onClick={this.onSearchChange} />"{ filters.text }"</Badge></div> }
              <div className="count"> { actionCount} {t('filter-result-actions')}</div>
            </FiltersList>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation('common')(ActionListFilters);
