import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { withTranslation } from '../../common/i18n';
import TextInput from '../common/TextInput';
import DropDown from '../common/DropDown';

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
    return category ? category.name : t('filter-all-categories');
  }

  getCategoryIdentifier(catId) {
    const { cats } = this.props;
    const category = cats.find(cat => cat.id === catId);
    return category ? category.identifier : '';
  }

  render() {
    const { t, cats } = this.props;
    const { activeCat } = this.state;
    const sortedCats = cats.sort((a, b) => a.identifier.localeCompare(b.identifier));

    return (
      <div className="filters mb-5 mt-5">
        <Row>
          <Col sm="12" md="6">
            <DropDown
              label={t('filter-category')}
              type="select"
              id="catfield"
              name="category"
              value={activeCat}
              onChange={this.onCatBtnClick}
              className="mb-2"
            >
              <option value="">{t('filter-all-categories')}</option>
              {sortedCats.map(cat => (
                <option value={cat.id} key={cat.id}>
                  { `${this.getCategoryIdentifier(cat.id)} ${this.getCategoryName(cat.id)}` }
                </option> 
              ))}
            </DropDown>
          </Col>
          <Col sm="12" md="6">
            <TextInput
              label={t('filter-text')}
              name="search"
              id="searchfield"
              placeholder={t('filter-text-description')}
              onChange={this.onSearchChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

IndicatorListFilters.propTypes = {
  t: PropTypes.func.isRequired,
  cats: PropTypes.arrayOf(PropTypes.object),
};

export default withTranslation('common')(IndicatorListFilters);
