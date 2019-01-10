import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../components/layout';
import IndicatorContent from '../../components/Indicators/IndicatorContent';

class IndicatorPage extends React.Component {
  static async getInitialProps({ query }) {
    console.log(query);
    return { id: query.id };
  }

  render() {
    return (
      <Layout>
        <IndicatorContent id={this.props.id} />
      </Layout>
    );
  }
}
IndicatorPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IndicatorPage;
