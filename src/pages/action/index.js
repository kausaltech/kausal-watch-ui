import React from 'react';
import { Router } from '@reach/router';

import Layout from '../../components/layout'
import ActionContent from '../../components/ActionContent';

class ActionPage extends React.Component {
  
  render() {
    return (
      <Layout>
        <Router>
          <ActionContent path="action/:action" />
        </Router>
      </Layout>
    );
  }
};

export default ActionPage;