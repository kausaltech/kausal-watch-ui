import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '../../common/i18n';
import { Router } from '../../routes';
import { getActionListLinkProps } from '../../common/links';
import PlanContext from '../../context/plan';

import ContentLoader from '../../components/common/ContentLoader';
import Layout from '../../components/layout';
import ActionList from '../../components/actions/ActionList';


class ActionListPage extends React.Component {
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

  /* eslint-disable class-methods-use-this */
  handleFilterChange(filters) {
    // navigate to new page
    const query = {};

    Object.entries(filters).forEach((item) => {
      const [key, val] = item;
      if (!val) return;
      query[key] = val;
    });

    const link = getActionListLinkProps(query);
    Router.replace(link.href);
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
