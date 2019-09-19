import React from 'react';
import ActionContent from '../../components/Actions/ActionContent';
import Layout from '../../components/layout';


class ActionPage extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id };
  }

  render() {
    const { id } = this.props;
    return (
      <Layout>
        <ActionContent id={id} />
      </Layout>
    );
  }
}

export default ActionPage;
