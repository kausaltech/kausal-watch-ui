import {
  getActionsListPage,
  getIncludeRelatedActions,
} from '@/lib/queries/get-actions-list-page';
import { ActionListPage } from './ActionListPage';
import { notFound } from 'next/navigation';

type Props = {
  params: { plan: string; lang: string };
};

export const dynamic = 'force-dynamic';

export default async function ActionsPage({ params }: Props) {
  const { plan } = params;

  const { data: pageSettingsData } = await getIncludeRelatedActions(plan);
  const { data } = await getActionsListPage(
    plan,
    pageSettingsData.plan?.actionListPage?.includeRelatedPlans ?? false
  );

  if (data.plan?.actionListPage?.__typename !== 'ActionListPage') {
    return notFound();
  }

  return <ActionListPage actionListPage={data.plan.actionListPage} />;
}
