import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { aplans } from '@/common/api';
import IndicatorsHero from '@/components/indicators/IndicatorsHero';
import ContentLoader from '@/components/common/ContentLoader';

class VisPage extends React.Component<{
  planId: string;
  locale: string;
  filters: { indicator: number | null };
  router: AppRouterInstance;
}> {
  static propTypes = {
    planId: PropTypes.string,
    locale: PropTypes.string,
    filters: PropTypes.shape({
      indicator: PropTypes.number,
    }),
  };

  static defaultProps = {
    filters: {
      indicator: null,
    },
  };

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const params = {
      language: this.props.locale,
      plan: this.props.planId,
    };
    const resp = await aplans.get('insight', { params });

    const { edges, nodes } = resp;

    this.setState({ edges, nodes, loading: false });
  }

  handleFilterChange(filters) {
    const { indicator } = filters;
    const { router } = this.props;

    let queryParams = '';
    if (indicator) {
      queryParams = `?indicator=${indicator}`;
    }
    router.replace('/insight' + queryParams);
  }

  render() {
    const { edges, nodes, loading } = this.state;
    const { filters } = this.props;

    let content;

    const isServer = typeof window === 'undefined';
    if (!isServer) {
      if (loading) {
        content = <ContentLoader />;
      } else {
        const CytoGraph = dynamic(
          () => import('@/components/insight/CytoGraph')
        );
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
      <>
        <IndicatorsHero />
        {content}
      </>
    );
  }
}

export default VisPage;
