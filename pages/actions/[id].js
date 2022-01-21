import React from 'react';
import { useRouter } from 'next/router'
import ActionContent from '../../components/actions/ActionContent';
import Layout from '../../components/layout';

function ActionPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <ActionContent id={id} />
    </Layout>
  );
}

export default ActionPage;
