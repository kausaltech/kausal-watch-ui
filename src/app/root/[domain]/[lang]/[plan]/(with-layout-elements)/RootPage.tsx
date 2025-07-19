'use client';

import { useTranslations } from 'next-intl';

import { Category, GetHomePageQuery } from '@/common/__generated__/graphql';
import ErrorMessage from '@/components/common/ErrorMessage';
import StreamField from '@/components/common/StreamField';
import CategoriesContext from '@/context/categories';

type HomePageProps = {
  categories: Category[];
  page: NonNullable<GetHomePageQuery['planPage']>;
};

function HomePage({ categories, page }: HomePageProps) {
  //const categories = primaryActionClassification?.categories;

  if (page.__typename != 'PlanRootPage') {
    throw new Error('Invalid home page type');
  }

  return (
    <CategoriesContext.Provider value={categories ?? []}>
      <div className="content-area">
        {page.body && <StreamField page={page} blocks={page.body} color="#ffffff" />}
      </div>
    </CategoriesContext.Provider>
  );
}

type Props = { data: GetHomePageQuery };

export function RootPage({ data }: Props) {
  const t = useTranslations();

  const { planPage, plan: queriedPlan } = data;
  const categories = queriedPlan?.primaryActionClassification?.categories as Category[];
  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return <HomePage page={planPage} categories={categories} />;
}
