import { getTranslations } from 'next-intl/server';

import { GetContentPageQuery } from '@/common/__generated__/graphql';
import { getContentPage } from '@/lib/queries/get-content-page';
import { AccessibilityPage } from './AccessibilityPage';
import { Content, GeneralPlanPage } from '../[...slug]/ContentPage';
import { Metadata } from 'next';

type Props = {
  params: {
    plan: string;
    lang: string;
  };
};

const isAccessibilityPageWithBody = (
  planPage: GetContentPageQuery['planPage']
) =>
  (planPage?.__typename === 'AccessibilityStatementPage' ||
    planPage?.__typename === 'StaticPage') &&
  planPage?.body?.length;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.lang });

  return {
    title: t('accessibility-statement'),
  };
}

export default async function ContentPage({ params }: Props) {
  const { plan } = params;

  const { data } = await getContentPage(plan, '/accessibility');

  if (isAccessibilityPageWithBody(data.planPage)) {
    return <Content page={data.planPage as GeneralPlanPage} />;
  }

  return <AccessibilityPage />;
}
