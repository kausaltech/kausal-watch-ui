'use client';

import { useTranslations } from 'next-intl';

import { GetHomePageQuery } from '@/common/__generated__/graphql';
import ErrorMessage from '@/components/common/ErrorMessage';
import ContentLoader from '@/components/common/ContentLoader';
import StreamField from '@/components/common/StreamField';
import CategoriesContext from '@/context/categories';

type HomePageProps = {
  primaryActionClassification: NonNullable<
    GetHomePageQuery['plan']
  >['primaryActionClassification'];
  page: NonNullable<GetHomePageQuery['planPage']>;
};

function HomePage({ primaryActionClassification, page }: HomePageProps) {
  const categories = primaryActionClassification?.categories;

  if (page.__typename != 'PlanRootPage') {
    throw new Error('Invalid home page type');
  }

  return (
    <CategoriesContext.Provider value={categories ?? []}>
      <div className="content-area">
        {page.body && (
          <StreamField page={page} blocks={page.body} color="#ffffff" />
        )}
      </div>
    </CategoriesContext.Provider>
  );
}

type Props = { data: GetHomePageQuery };

export function RootPage({ data }: Props) {
  const t = useTranslations();

  // if (error) {
  //   return <ErrorMessage message={error.message} />;
  // } else if (loading) {
  //   return <ContentLoader />;
  // } else if (!data) {
  //   return <ErrorMessage message={t('error-occurred')} />;
  // }

  const { planPage, plan: queriedPlan } = data;

  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return (
    <HomePage
      page={planPage}
      primaryActionClassification={queriedPlan?.primaryActionClassification}
    />
  );
}
