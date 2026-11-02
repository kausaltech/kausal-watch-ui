import { notFound } from 'next/navigation';

import type { Metadata, ResolvingMetadata } from 'next';

import { getActionsListPage, getIncludeRelatedActions } from '@/queries/get-actions-list-page';
import { tryRequest } from '@/utils/api.utils';

import { ActionListPage } from './ActionListPage';

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { plan } = await props.params;
  const { data } = await tryRequest(getIncludeRelatedActions(plan));
  const title = data?.plan?.actionListPage?.title;
  if (!title) return {};
  const resolvedParent = await parent;
  return { title: `${title} | ${resolvedParent.title?.absolute}` };
}

// TODO: Can we deprecate this page in favor of src/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage.tsx ?

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
