'use client';

import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import type { GetHomePageQuery } from '@/common/__generated__/graphql';
import ChangeHistory from '@/components/common/ChangeHistory';
import ErrorMessage from '@/components/common/ErrorMessage';
import StreamField from '@/components/common/StreamField';
import CategoriesContext from '@/context/categories';
import { usePlan } from '@/context/plan';

type HomePageProps = {
  categories: NonNullable<
    NonNullable<GetHomePageQuery['plan']>['primaryActionClassification']
  >['categories'];
  page: NonNullable<GetHomePageQuery['planPage']>;
  testId?: string;
};

function HomePage({ categories, page, testId }: HomePageProps) {
  const plan = usePlan();
  //const categories = primaryActionClassification?.categories;
  if (page.__typename != 'PlanRootPage') {
    throw new Error('Invalid home page type');
  }

  const hasChangeLogMessageBlock =
    Array.isArray(page.body) && page.body.some((b) => b?.blockType === 'ChangeLogMessageBlock');

  const showFallbackChangeHistory =
    plan.features.enableChangeLog && !!page.changeLogMessage && !hasChangeLogMessageBlock;

  return (
    <CategoriesContext.Provider value={categories ?? []}>
      <div data-testid={testId}>
        {page.body && <StreamField page={page} blocks={page.body} />}
        {showFallbackChangeHistory && (
          <Container className="my-5">
            <Row>
              <Col xs="12">
                <ChangeHistory
                  entityType="page"
                  entityId={String(page.id)}
                  entry={page.changeLogMessage}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
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
