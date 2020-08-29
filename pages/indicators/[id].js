import React from 'react';
import Layout from '../../components/layout';
import IndicatorContent from '../../components/indicators/IndicatorContent';

function IndicatorPage({ id }) {
  return (
    <Layout>
      <IndicatorContent id={id} />
    </Layout>
  );
}

IndicatorPage.getInitialProps = async ({ query }) => ({
  id: query.id,
  namespacesRequired: ['common', 'actions'],
});

export default IndicatorPage;
