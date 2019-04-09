import React from 'react';
import PropTypes from 'prop-types';
import {
  CustomInput as BaseCustomInput, Input, FormGroup, Label, Row, Col,
} from 'reactstrap';

import styled from 'styled-components';

const CustomInput = styled(BaseCustomInput)`
  background-color: transparent !important;
`;

class IndicatorListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCat: '',
    };

    this.onCatBtnClick = this.onCatBtnClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onCatBtnClick(evt) {
    const { changeOption } = this.props;
    changeOption('Category', evt.target.value);
    this.setState({
      activeCat: evt.target.value,
    });
  }

  onSearchChange(evt) {
    const { changeOption } = this.props;
    changeOption('Search', evt.target.value);
  }

  getCategoryName(catId) {
    const { cats } = this.props;
    const category = cats.find(cat => cat.id === catId);
    return category ? category.name : 'Kaikki teemat';
  }

  getCategoryIdentifier(catId) {
    const { cats } = this.props;
    const category = cats.find(cat => cat.id === catId);
    return category ? category.identifier : '';
  }

  render() {
    const { cats } = this.props;
    const { activeCat } = this.state;
    const sortedCats = cats.sort((a, b) => a.identifier.localeCompare(b.identifier));

    return (
      <div className="filters mb-5 mt-5">
        <Row>
          <Col sm="12" md="6">
            <FormGroup>
              <Label for="catfield">Rajaa teeman mukaan</Label>
              <CustomInput
                type="select"
                id="catfield"
                name="category"
                value={activeCat}
                onChange={this.onCatBtnClick}
                className="mb-2"
              >
                <option value="">Kaikki teemat</option>
                {sortedCats.map(cat => (
                  <option value={cat.id} key={cat.id}>
                    { `${this.getCategoryIdentifier(cat.id)} ${this.getCategoryName(cat.id)}` }
                  </option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="12" md="6">
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

IndicatorListFilters.propTypes = {
  cats: PropTypes.arrayOf(PropTypes.object),
};

export default IndicatorListFilters;
