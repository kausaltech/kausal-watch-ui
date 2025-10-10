import { notFound } from 'next/navigation';

import { getActionsListPage, getIncludeRelatedActions } from '@/queries/get-actions-list-page';
import { tryRequest } from '@/utils/api.utils';

import { ActionListPage } from './ActionListPage';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function ActionsPage(props: Props) {
  const params = await props.params;
  const { plan } = params;

  const { data: pageSettingsData } = await tryRequest(getIncludeRelatedActions(plan));

  /**
   * TODO:  The backend returns no categories for a CategoryTypeFilterBlock for multi-plans.
   *        Here we set onlyWithActions to false if the includeRelatedPlans setting is active to ensure
   *        categories are displayed. This can be removed once the backend is updated to return
   *        multi-plan categories when onlyWithActions is true.
   */
  const excludeFilterCategoriesWithoutActions = pageSettingsData?.plan?.actionListPage
    ?.includeRelatedPlans
    ? false
    : true;

  const { data } = await tryRequest(
    getActionsListPage(plan, excludeFilterCategoriesWithoutActions)
  );

  if (data?.plan?.actionListPage?.__typename !== 'ActionListPage') {
    return notFound();
  }

  return <ActionListPage actionListPage={data.plan.actionListPage} testId="actions-list-page" />;
}
