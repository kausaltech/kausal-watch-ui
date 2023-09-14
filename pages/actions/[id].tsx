import React from 'react';
import { useRouter } from 'next/router';
import ActionContent from '../../components/actions/ActionContent';
import Layout from '../../components/layout';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import { getActionTermContext, useTranslation } from 'common/i18n';
import { useQuery } from '@apollo/client';
import { GetActionDetailsQuery } from 'common/__generated__/graphql';
import { usePlan } from 'context/plan';

function ActionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['common', 'actions']);
  const plan = usePlan();
  const { loading, error, data } = useQuery<GetActionDetailsQuery>(
    ActionContent.query,
    {
      variables: {
        id,
        plan: plan.identifier,
        clientUrl: plan.viewUrl,
      },
    }
  );
  let component;

  if (error) component = <ErrorMessage message={error.message} />;
  else if (loading) component = <ContentLoader />;
  else if (!data || !data.action || !data.plan?.actionListPage) {
    component = (
      <ErrorMessage
        statusCode={404}
        message={t('action-not-found', getActionTermContext(plan))}
      />
    );
  } else {
    component = (
      <ActionContent action={data.action} extraPlanData={data.plan} />
    );
  }

  return <Layout>{component}</Layout>;
}

export default ActionPage;
