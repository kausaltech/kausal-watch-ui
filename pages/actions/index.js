import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from '../../common/i18n';
import { getActionListLinkProps } from '../../common/links';
import PlanContext from '../../context/plan';

import ContentLoader from '../../components/common/ContentLoader';
import Layout, { Meta } from '../../components/layout';
import ActionList from '../../components/actions/ActionList';

function ActionListPage() {
  const router = useRouter();
  const filters = ActionList.getFiltersFromQuery(router.query);
  const { t } = useTranslation('common');

  const handleFilterChange = useCallback(
    (newFilters) => {
      // navigate to new page
      const query = {};

      Object.entries(newFilters).forEach(([key, val]) => {
        if (!val) return;
        query[key] = val;
      });

      const link = getActionListLinkProps(query);
      router.replace(link.href, undefined, { shallow: true });
    },
    [],
  );
  const plan = useContext(PlanContext);
  return (
    <Layout>
      <Meta title={t('actions')} />
      {!process.browser ? <ContentLoader /> : (
        <ActionList plan={plan} filters={filters} onFilterChange={handleFilterChange} />
      )}
    </Layout>
  );
}
const initialProps = {
  namespacesRequired: ['common', 'actions'],
};
ActionListPage.getInitialProps = async () => (initialProps);

export default ActionListPage;
