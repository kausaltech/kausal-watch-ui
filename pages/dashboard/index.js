import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { withTranslation } from '../../common/i18n';
import { getDashboardLinkProps } from '../../common/links';
import PlanContext from '../../context/plan';

import ContentLoader from '../../components/common/ContentLoader';
import Layout, { Meta } from '../../components/layout';
import Dashboard from '../../components/dashboard/Dashboard';


class DashboardPage extends React.Component {
  static async getInitialProps({ query }) {
    const filters = Dashboard.getFiltersFromQuery(query);

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

  /* eslint-disable class-methods-use-this */
  handleFilterChange(filters) {
    // navigate to new page
    const query = {};

    Object.entries(filters).forEach((item) => {
      const [key, val] = item;
      if (!val) return;
      query[key] = val;
    });

    const link = getDashboardLinkProps(query);
    // Use shallow routing to avoid page re-rendering
    Router.replace(link.href, undefined, { shallow: true });
  }

  render() {
    const plan = this.context;
    const { filters, t } = this.props;

    return (
      <Layout>
        <Meta title={t('dashboard')} />
        {!process.browser ? <ContentLoader /> : (
          <Dashboard plan={plan} filters={filters} onFilterChange={this.handleFilterChange} />
        )}
      </Layout>
    );
  }
}

DashboardPage.contextType = PlanContext;

DashboardPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(DashboardPage);
