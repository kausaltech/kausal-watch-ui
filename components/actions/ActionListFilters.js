import React from 'react';
import { Spring, Transition } from 'react-spring/renderprops.cjs';
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

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.light};
`;


class ActionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.onOrgBtnClick = this.onOrgBtnClick.bind(this);
    this.onCatBtnClick = this.onCatBtnClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onImpactBtnClick = this.onImpactBtnClick.bind(this);
    this.onEmissionScopeBtnClick = this.onEmissionScopeBtnClick.bind(this);
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

  onEmissionScopeBtnClick(evt) {
    this.props.onChange('scope', evt.target.value);
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

  getEmissionScopeName(esId) {
    const es = this.props.emissionScopes.find(es => es.id === esId);
    return es ? es.name : '';
  }

  render() {
    const {
      t,
      emissionScopes,
      filters,
      impacts,
      actionCount,
    } = this.props;
    const rootCategories = this.props.cats
      .filter(cat => cat.parent == null)
      .sort((a, b) => a.name.localeCompare(b.name));
    const orgs = this.props.orgs.slice(0)
      .sort((a, b) => a.name.localeCompare(b.name));

    const category = filters.category === undefined ? '' : filters.category;
    const organization = filters.organization === undefined ? '' : filters.organization;
    const impact = filters.impact === undefined ? '' : filters.impact;
    const scope = filters.scope === undefined ? '' : filters.scope;

    const activeFilters = [];
    if (filters.organization) activeFilters.push({id: 0, reset: this.onOrgBtnClick, name: this.getOrganizationName(filters.organization)});
    if (filters.category) activeFilters.push({id: 1, reset: this.onCatBtnClick, name: this.getCategoryName(filters.category)});
    if (filters.impact) activeFilters.push({id: 2, reset: this.onImpactBtnClick, name: `${t('impact')}: ${this.getImpactName(filters.impact)}`});
    if (filters.text) activeFilters.push({id: 3, reset: this.onSearchChange, name: filters.text});
    if (filters.scope) activeFilters.push({id: 4, reset: this.onEmissionScopeBtnClick, name: this.getEmissionScopeName(filters.scope)});

    return (
      <div className="filters mb-2 text-left">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {(props) => (
            <Row style={props}>
              <Col sm="12" md={{ size: 6 }} lg="6">
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
              <Col sm="12" md={{ size: 6 }} lg="6">
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
              <Col sm="12" md={{ size: 6 }} lg="4">
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
              <Col sm="12" md={{ size: 6 }} lg="4">
                <FormGroup>
                  <Label for="scopefield">{ t('filter-emission-scope') }</Label>
                  <CustomInput type="select" id="scopefield" name="emissionscope" value={scope} onChange={this.onEmissionScopeBtnClick} className="mb-2">
                    <option value="">{ t('filter-all-emission-scopes') }</option>
                    {emissionScopes.map((es) => (
                      <option value={es.id} key={es.id}>{ es.name }</option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 12 }} lg="4">
                <FormGroup>
                  <Label for="searchfield">{ t('filter-text') }</Label>
                  <Input name="search" id="searchfield" placeholder={t('filter-text-default')} value={filters.text || ''} onChange={this.onSearchChange} />
                </FormGroup>
              </Col>
            </Row>
          )}
        </Spring>
        <Row>
          <Col>
            <FiltersList className="mb-4 mt-3">
              <Transition
                items={activeFilters}
                keys={(item) => item.id}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
              >
                {(item) => (props) => (
                  <StyledBadge
                    className="mr-3"
                    style={props}
                  >
                    <Button close size="sm" onClick={item.reset} />
                    { item.name }
                  </StyledBadge>
                )}
              </Transition>
              <div className="count">
                { actionCount }
                { ' ' }
                { t('filter-result-actions') }
              </div>
            </FiltersList>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation('common')(ActionListFilters);
