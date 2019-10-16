import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import { Router } from '../../routes';
import PlanContext from '../../context/plan';

import ContentLoader from '../../components/common/ContentLoader';
import Layout from '../../components/layout';
import ActionList from '../../components/actions/ActionList';


class ActionListPage extends React.Component {
  static contextType = PlanContext;

  static async getInitialProps({ query }) {
    const filters = ActionList.getFiltersFromQuery(query);

    const ret = {
      filters,
      namespacesRequired: ['common'],
    };
    return ret;
  }

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filters) {
    // navigate to new page
    const query = {};

    for (let [key, val] of Object.entries(filters)) {
      if (!val)
        continue
      query[key] = val;
    }

    Router.replace({
      pathname: '/actions',
      query,
    });
  }

  render() {
    const plan = this.context;
    const { filters } = this.props;

    return (
      <Layout>
        {!process.browser ? <ContentLoader /> : (
          <ActionList plan={plan} filters={filters} onFilterChange={this.handleFilterChange} />
        )}
      </Layout>
    );
  }
}

ActionListPage.contextType = PlanContext;

ActionListPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ActionListPage);
