import { GetContentPageQuery } from '@/common/__generated__/graphql';
import { getContentPage } from '@/lib/queries/get-content-page';
import React from 'react';
import { AccessibilityPage } from './AccessibilityPage';
import { Content, GeneralPlanPage } from '../[...slug]/ContentPage';

type Props = {
  params: { plan: string };
};

const isAccessibilityPageWithBody = (
  planPage: GetContentPageQuery['planPage']
) =>
  (planPage?.__typename === 'AccessibilityStatementPage' ||
    planPage?.__typename === 'StaticPage') &&
  planPage?.body?.length;

//      <Meta title={t('accessibility-statement')} />

export default async function ContentPage({ params }: Props) {
  const { plan } = params;

  const { data } = await getContentPage(plan, '/accessibility');

  if (isAccessibilityPageWithBody(data.planPage)) {
    return <Content page={data.planPage as GeneralPlanPage} />;
  }

  return <AccessibilityPage />;
}
