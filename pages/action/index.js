import React from 'react';

import Layout from '../../components/layout'
import ActionContent from '../../components/Actions/ActionContent';

class ActionPage extends React.Component {
  static async getInitialProps({ query }) {
    return {id: query.id}
  }
  render() {
    const id = this.props.id
    return (
      <Layout>
        <ActionContent id={id} />
      </Layout>
    );
  }
}

export default ActionPage;
