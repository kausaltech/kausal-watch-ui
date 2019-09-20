import React from 'react';
import Layout from '../../components/layout';
import IndicatorContent from '../../components/indicators/IndicatorContent';


class IndicatorPage extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id };
  }

  render() {
    const { id } = this.props;
    return (
      <Layout>
        <IndicatorContent id={id} />
      </Layout>
    );
  }
}

export default IndicatorPage;
