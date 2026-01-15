'use client';

import { useTranslations } from 'next-intl';

import type { GetHomePageQuery } from '@/common/__generated__/graphql';
import ErrorMessage from '@/components/common/ErrorMessage';
import StreamField from '@/components/common/StreamField';
import CategoriesContext from '@/context/categories';

type HomePageProps = {
  categories: NonNullable<
    NonNullable<GetHomePageQuery['plan']>['primaryActionClassification']
  >['categories'];
  page: NonNullable<GetHomePageQuery['planPage']>;
  testId?: string;
};

function HomePage({ categories, page, testId }: HomePageProps) {
  //const categories = primaryActionClassification?.categories;
  if (page.__typename != 'PlanRootPage') {
    throw new Error('Invalid home page type');
  }

  return (
    <CategoriesContext.Provider value={categories ?? []}>
      <div data-testid={testId}>{page.body && <StreamField page={page} blocks={page.body} />}</div>
    </CategoriesContext.Provider>
  );
}

type Props = { data: GetHomePageQuery; testId?: string };

export function RootPage({ data, testId }: Props) {
  const t = useTranslations();

  const { planPage, plan: queriedPlan } = data;
  const categories = queriedPlan?.primaryActionClassification?.categories ?? [];
  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return <HomePage page={planPage} categories={categories} testId={testId} />;
}
