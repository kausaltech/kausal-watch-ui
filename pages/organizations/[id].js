import React from 'react';
import Layout from 'components/layout';
import OrgContent from 'components/orgs/OrgContent';

function OrgPage({ id }) {
  return (
    <Layout>
      <OrgContent id={id} />
    </Layout>
  );
}

OrgPage.getInitialProps = async ({ query }) => ({
  id: query.id,
  namespacesRequired: ['common'],
});

export default OrgPage;
