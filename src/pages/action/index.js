import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';

import Layout from '../../components/layout'
import ActionContent from '../../components/ActionContent';

const ActionPage = ({ uid }) => {
  return (
    <Layout>
      <Router>
        <ActionContent path="action/:uid" />
      </Router>
    </Layout>
  );
};

ActionPage.propTypes = {
  uid: PropTypes.string,
};

export default ActionPage;