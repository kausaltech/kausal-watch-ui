import { getTranslations } from 'next-intl/server';

import { GetContentPageQuery } from '@/common/__generated__/graphql';
import { getContentPage } from '@/queries/get-content-page';
import { AccessibilityPage } from './AccessibilityPage';
import { Content, GeneralPlanPage } from '../[...slug]/ContentPage';
import { Metadata } from 'next';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{
    plan: string;
    lang: string;
  }>;
};

const isAccessibilityPageWithBody = (
  planPage: GetContentPageQuery['planPage']
) =>
  (planPage?.__typename === 'AccessibilityStatementPage' ||
    planPage?.__typename === 'StaticPage') &&
  planPage?.body?.length;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('accessibility-statement'),
  };
}

export default async function ContentPage(props: Props) {
  const params = await props.params;
  const { plan } = params;

  const { data } = await tryRequest(getContentPage(plan, '/accessibility'));

  if (data?.planPage && isAccessibilityPageWithBody(data.planPage)) {
    return <Content page={data.planPage as GeneralPlanPage} />;
  }

  return <AccessibilityPage />;
}
