import React from 'react';
import { Router } from '@reach/router';

import Layout from '../../components/layout'
import IndicatorContent from '../../components/Indicators/IndicatorContent';

class IndicatorPage extends React.Component {
  
  render() {
    return (
      <Layout>
        <Router>
          <IndicatorContent path="indicator/:indicator" />
        </Router>
      </Layout>
    );
  }
};

export default IndicatorPage;