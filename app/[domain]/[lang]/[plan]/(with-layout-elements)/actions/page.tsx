import {
  getActionsListPage,
  getIncludeRelatedActions,
} from '@/queries/get-actions-list-page';
import { ActionListPage } from './ActionListPage';
import { notFound } from 'next/navigation';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: { plan: string; lang: string };
};

export default async function ActionsPage({ params }: Props) {
  const { plan } = params;

  const { data: pageSettingsData } = await tryRequest(
    getIncludeRelatedActions(plan)
  );
  const { data } = await tryRequest(
    getActionsListPage(
      plan,
      pageSettingsData?.plan?.actionListPage?.includeRelatedPlans ?? false
    )
  );

  if (data?.plan?.actionListPage?.__typename !== 'ActionListPage') {
    return notFound();
  }

  return <ActionListPage actionListPage={data.plan.actionListPage} />;
}
