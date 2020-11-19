import React from 'react';
import ActionContent from '../../components/actions/ActionContent';
import Layout from '../../components/layout';

function ActionPage({ id }) {
  return (
    <Layout>
      <ActionContent id={id} />
    </Layout>
  );
}
ActionPage.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common', 'actions'],
  id: query.id,
});

export default ActionPage;
