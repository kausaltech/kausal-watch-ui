import React from 'react';
import { getDashboardLinkProps } from '../../common/links';
import { usePlan } from 'context/plan';

import ContentLoader from '../../components/common/ContentLoader';
import Layout, { Meta } from '../../components/layout';
import Dashboard from '../../components/dashboard/Dashboard';
import { useRouter } from 'next/router';
import { useTranslation } from 'common/i18n';


function DashboardPage() {
  const router = useRouter();
  const plan = usePlan();
  const { t } = useTranslation();

  const handleFilterChange = (filters) => {
    // navigate to new page
    const query = {};

    Object.entries(filters).forEach((item) => {
      const [key, val] = item;
      if (!val) return;
      query[key] = val;
    });

    const link = getDashboardLinkProps(query);
    // Use shallow routing to avoid page re-rendering
    router.replace(link.href, undefined, { shallow: true });
  };
  return (
    <Layout>
      <Meta title={t('dashboard')} />
      {!process.browser ? <ContentLoader /> : (
        <Dashboard onFilterChange={handleFilterChange} />
      )}
    </Layout>
  );
}

export default DashboardPage;
