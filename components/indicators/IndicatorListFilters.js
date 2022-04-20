import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import { withTheme } from 'styled-components';
import { withTranslation } from '../../common/i18n';
import TextInput from '../common/TextInput';
import DropDown from '../common/DropDown';
import Button from '../common/Button';

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

  getDepth(cats, catId, depth) {
    let currentDepth = depth;
    const currentCat = cats.find((cat) => cat.id === catId);
    if (currentCat.parent) currentDepth = this.getDepth(cats, currentCat.parent.id, depth + 1);
    return currentDepth;
  };

  render() {
    const { t, theme, cats } = this.props;
    const { activeCat } = this.state;
    const { showIdentifiers, filterIndicatorsByAllLevels } = theme.settings.categories;

    let sortedCats = _.cloneDeep(cats.sort((a, b) => a.identifier.localeCompare(b.identifier)));
    if (!filterIndicatorsByAllLevels) sortedCats = sortedCats.filter((cat) => !cat.parent);

    sortedCats.forEach((cat) => {
      cat.label = `${' '.repeat(this.getDepth(cats, cat.id, 0) * 4)}
      ${showIdentifiers ? `${this.getCategoryIdentifier(cat.id)}. ` : ''}
      ${this.getCategoryName(cat.id)}`;
    });

    return (
      <form className="filters mb-5 mt-5" onSubmit={(event) => { event.preventDefault(); }}>
        <Row>
        { sortedCats.length > 1 && (
          <Col sm="9" md="4" lg="5">
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
                  { cat.label }
                </option>
              ))}
            </DropDown>
          </Col>
          )}
          <Col sm="9" md="5" lg="5">
            <TextInput
              label={t('filter-text')}
              name="search"
              id="searchfield"
              placeholder={t('filter-text-description')}
              onChange={this.onSearchChange}
            />
          </Col>
          <Col xs={6} sm={3} md={3} lg={2} xl={2} className="d-flex flex-column justify-content-end">
            <Button type="submit" color="primary" className="mb-3" block>
              { t('search') }
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

IndicatorListFilters.propTypes = {
  t: PropTypes.func.isRequired,
  cats: PropTypes.arrayOf(PropTypes.object),
};

export default withTranslation('common')(withTheme(IndicatorListFilters));
