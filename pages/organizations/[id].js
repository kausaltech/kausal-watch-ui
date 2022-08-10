import React from 'react';
import Layout from 'components/layout';
import IndicatorContent from 'components/orgs/OrgContent';

function OrgPage({ id }) {
  return (
    <Layout>
      <IndicatorContent id={id} />
    </Layout>
  );
}

OrgPage.getInitialProps = async ({ query }) => ({
  id: query.id,
  namespacesRequired: ['common'],
});

export default OrgPage;
