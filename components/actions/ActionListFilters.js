import React from 'react';
import { Spring, Transition } from 'react-spring/renderprops.cjs';
import {
  CustomInput as BaseCustomInput, FormGroup, Label, Row, Col, Badge, Button
} from 'reactstrap';

import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import TextInput from '../common/TextInput';
import DropDown from '../common/DropDown';

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`;

const FiltersList = styled.div`
  font-size: ${(props) => props.theme.fontSizeLg};
  line-height: ${(props) => props.theme.lineHeightBase};

  .count {
    margin-top: ${(props) => props.theme.spaces.s100};
    font-weight: ${(props) => props.theme.fontWeightBold};
    font-size: ${(props) => props.theme.fontSizeMd};
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

function generateSortedOrgTree(orgs, depth) {
  const sortedOrgs = orgs.sort((a, b) => a.name.localeCompare(b.name));
  let out = [];

  sortedOrgs.forEach((org) => {
    org.depth = depth;
    out.push(org);
    if (!org.children.length) return;
    out = out.concat(generateSortedOrgTree(org.children, depth + 1));
  });

  return out;
}

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

    const orgs = generateSortedOrgTree(this.props.orgs.filter((org) => !org.parent), 0);

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
              <Col sm="12" md={{ size: 6 }} lg="6" className="mb-2 d-flex align-items-end">
                <DropDown
                  label={t('filter-category') }
                  id="catfield"
                  name="category"
                  value={category}
                  onChange={this.onCatBtnClick}
                >
                  <option value="">{ t('filter-all-categories') }</option>
                  {rootCategories.map(cat => (
                    <option value={cat.id} key={cat.id}>{ this.getCategoryName(cat.id) }</option>
                  ))}
                </DropDown>
              </Col>
              <Col sm="12" md={{ size: 6 }} lg="6" className="mb-2 d-flex align-items-end">
                <DropDown
                  label={t('filter-organization')}
                  id="orgfield"
                  name="organization"
                  value={organization}
                  onChange={this.onOrgBtnClick}
                >
                  <option value="">{ t('filter-all-organizations') }</option>
                  {orgs.map((org) => (
                    <option value={org.id} key={org.id}>{ ' '.repeat(org.depth * 4) + org.name }</option>
                  ))}
                </DropDown>
              </Col>
              <Col sm="12" md={{ size: 6 }} lg="4" className="mb-2 d-flex align-items-end">
                <DropDown
                  label={t('filter-impact')}
                  id="impactfield"
                  name="impact"
                  value={impact}
                  onChange={this.onImpactBtnClick}
                >
                  <option value="">{ t('filter-all-impacts') }</option>
                  {impacts.map((item) => (
                    <option value={item.id} key={item.id}>{ item.name }</option>
                  ))}
                </DropDown>
              </Col>
              <Col sm="12" md={{ size: 6 }} lg="4" className="mb-2 d-flex align-items-end">
                <DropDown
                  label={ t('filter-emission-scope') }
                  id="scopefield"
                  name="emissionscope"
                  value={scope}
                  onChange={this.onEmissionScopeBtnClick}
                >
                  <option value="">{ t('filter-all-emission-scopes') }</option>
                  {emissionScopes.map((es) => (
                    <option value={es.id} key={es.id}>{ es.name }</option>
                  ))}
                </DropDown>
              </Col>
              <Col sm="12" md={{ size: 12 }} lg="4">
                <TextInput
                  label={t('filter-text')}
                  id="searchfield"
                  name="search"
                  placeholder={t('filter-text-default')}
                  value={filters.text || ''}
                  onChange={this.onSearchChange}
                />
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
