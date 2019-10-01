import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Layout from '../components/layout';
import { Router } from '../routes';
import { aplans } from '../common/api';
import IndicatorsHero from '../components/indicators/IndicatorsHero';
import PlanContext from '../context/plan';
import ContentLoader from '../components/common/ContentLoader';


class VisPage extends React.Component {
  static contextType = PlanContext;

  static propTypes = {
    filters: PropTypes.shape({
      indicator: PropTypes.number,
    }),
  };

  static defaultProps = {
    filters: {
      indicator: null,
    },
  };

  static async getInitialProps({ query }) {
    const { indicator } = query;
    const indicatorId = parseInt(indicator, 10);

    return {
      filters: { indicator: isNaN(indicatorId) ? null : indicatorId },
      namespacesRequired: ['common'], // for translations
    };
  }

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const plan = this.context;
    const resp = await aplans.get('insight', {
      params: {
        plan: plan.identifier,
      },
    });

    const { data } = resp.data;
    const { edges, nodes } = data;

    this.setState({ edges, nodes, loading: false });
  }

  handleFilterChange(filters) {
    const { indicator } = filters;

    let queryParams = '';
    if (indicator) {
      queryParams = `?indicator=${indicator}`;
    }
    Router.replace('/insight' + queryParams, '/insight' + queryParams);
  }

  render() {
    const {
      edges, nodes, loading,
    } = this.state;
    const { filters } = this.props;

    let content;

    if (process.browser) {
      if (loading) {
        content = <ContentLoader />;
      } else {
        const CytoGraph = dynamic(import('../components/insight/CytoGraph'));
        content = (
          <CytoGraph
            edges={edges}
            nodes={nodes}
            filters={filters}
            onFilterChange={this.handleFilterChange}
          />
        );
      }
    }
    return (
      <Layout>
        <IndicatorsHero />
        {content}
      </Layout>
    );
  }
}

export default VisPage;
