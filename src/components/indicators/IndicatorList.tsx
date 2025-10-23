'use client';

import React, { useState } from 'react';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import type {
  GetPlanPageIndicatorListQuery,
  IndicatorListIndicatorFragment,
  IndicatorListQuery,
  IndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { getCategoryString } from '@/common/categories';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import type { FilterValue } from '@/components/actions/ActionListFilters';
import ContentLoader from '@/components/common/ContentLoader';
import ErrorMessage from '@/components/common/ErrorMessage';
import { GET_INDICATOR_LIST } from '@/queries/get-indicator-list';

import { usePlan } from '../../context/plan';
import IndicatorListFiltered from './IndicatorListFilteredNew';
import IndicatorListFilters from './IndicatorListFilters';
import IndicatorModal from './IndicatorModal';
import IndicatorsHero from './IndicatorsHero';
import { sortIndicators } from './indicatorUtils';
import { processCommonIndicatorHierarchy } from './process-indicators';

/* We augment the IndicatorListIndicatorFragment with a level property */
export type IndicatorListIndicator = IndicatorListIndicatorFragment & {
  level: string;
};
export type IndicatorCategory = NonNullable<IndicatorListIndicator['categories']>[number];
export type CategoryType = NonNullable<IndicatorListQuery['plan']>['categoryTypes'][number];

interface CommonCategoryGroup {
  categories: Set<IndicatorCategory>;
  type: NonNullable<IndicatorListIndicatorFragment['categories'][number]['common']>['type'];
}

export interface CollectedCommonCategory {
  typeIdentifier: string;
  categories: IndicatorCategory[];
  type: NonNullable<IndicatorListIndicatorFragment['categories'][number]['common']>['type'];
}

const collectCommonCategories = (
  indicators: IndicatorListIndicator[]
): CollectedCommonCategory[] => {
  const commonCategories: Record<string, CommonCategoryGroup> = {};

  indicators.forEach((indicator: IndicatorListIndicator) => {
    indicator.categories.forEach((category: IndicatorCategory) => {
      if (category.common) {
        const typeIdentifier: string = category.common.type.identifier;
        if (!commonCategories[typeIdentifier]) {
          commonCategories[typeIdentifier] = {
            categories: new Set<IndicatorCategory>(),
            type: { ...category.common.type },
          };
        }
        commonCategories[typeIdentifier].categories.add(category);
      }
    });
  });

  return Object.entries(commonCategories).map(
    ([typeIdentifier, catGroup]): CollectedCommonCategory => ({
      typeIdentifier,
      categories: Array.from(catGroup.categories),
      type: catGroup.type,
    })
  );
};

interface Filters {
  name?: string;
  [category: string]: FilterValue;
}

function filterIndicators<I extends IndicatorListIndicator>(
  indicators: I[],
  filters: Filters,
  includeRelatedPlans: boolean,
  categoryIdentifier?: string
): I[] {
  const filterByCategory = (indicator: I) =>
    !categoryIdentifier ||
    !filters[getCategoryString(categoryIdentifier)] ||
    !!indicator.categories.find(
      ({ type, id }) => filters[getCategoryString(type.identifier)] === id
    );

  const filterByCommonCategory = (indicator: I) => {
    const activeFilters = Object.entries(filters).filter(
      ([_key, value]) => value !== undefined && value !== null
    );

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.every(([_filterKey, filterValue]) => {
      return indicator.categories.some((category) => {
        if (category.common) {
          return category.common.id === filterValue;
        }
        return false;
      });
    });
  };

  const filterBySearch = (indicator: I) =>
    !filters['name'] || indicator.name.toLowerCase().includes(filters['name'].toLowerCase());

  return indicators.filter((indicator) => {
    const categoryResult = filterByCategory(indicator);
    const commonCategoryResult = filterByCommonCategory(indicator);
    const searchResult = filterBySearch(indicator);
    return (!includeRelatedPlans ? categoryResult : commonCategoryResult) && searchResult;
  });
}

const getFirstUsablePlanCategoryType = (
  categoryTypes: CategoryType[] | null | undefined,
  indicators: IndicatorListIndicator[]
): CategoryType | undefined =>
  categoryTypes
    ? categoryTypes.find((categoryType) =>
        indicators.find((indicator) =>
          indicator.categories.find(({ type }) => type.id === categoryType.id)
        )
      )
    : undefined;

const getNextIndicatorId = (
  indicators: IndicatorListIndicator[],
  indicatorId: string
): string | undefined => {
  const index = indicators.findIndex((indicator) => indicator.id === indicatorId);
  return index < indicators.length - 1 ? indicators[index + 1].id : undefined;
};

const getPrevIndicatorId = (
  indicators: IndicatorListIndicator[],
  indicatorId: string
): string | undefined => {
  const index = indicators.findIndex((indicator) => indicator.id === indicatorId);
  return index > 0 ? indicators[index - 1].id : undefined;
};

type IndicatorListPage = NonNullable<GetPlanPageIndicatorListQuery['planPage']> & {
  __typename: 'IndicatorListPage';
};
interface IndicatorListProps {
  leadContent: IndicatorListPage['leadContent'];
  displayInsights: IndicatorListPage['displayInsights'];
  displayLevel: IndicatorListPage['displayLevel'];
  includeRelatedPlans: IndicatorListPage['includeRelatedPlans'];
  testId?: string;
}

const IndicatorList = ({
  leadContent,
  displayInsights,
  displayLevel,
  includeRelatedPlans,
  testId,
}: IndicatorListProps) => {
  const plan = usePlan();
  const t = useTranslations();
  const openIndicatorsInModal = true;
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const getObjectFromSearchParams = (searchParams: ReadonlyURLSearchParams | null) =>
    searchParams ? Object.fromEntries(searchParams) : {};

  const [filters, setFilters] = useState<Filters>(() => getObjectFromSearchParams(searchParams));
  const [indicatorModalId, setIndicatorModalId] = useState<string | null>(
    () => searchParams.get('indicator') ?? null
  );

  const handleChangeModal = (indicatorId?: string | null) => {
    setIndicatorModalId(indicatorId ?? null);
    updateSearchParams({ indicator: indicatorId ?? undefined });
  };

  const { loading, error, data } = useQuery<IndicatorListQuery, IndicatorListQueryVariables>(
    GET_INDICATOR_LIST,
    {
      variables: {
        plan: plan.identifier,
        relatedPlanIndicators: includeRelatedPlans ?? false,
      },
    }
  );

  const handleFilterChange = (id: string, val: FilterValue) => {
    setFilters((state) => {
      const newFilters = { ...state, [id]: val };
      updateSearchParams(newFilters);
      return newFilters;
    });
  };

  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader />;

  const showInsights = data.plan?.hasIndicatorRelationships === true && (displayInsights ?? true);

  const indicators: IndicatorListIndicator[] = (
    (includeRelatedPlans ?? false) ? data.relatedPlanIndicators : data.planIndicators
  ) as IndicatorListIndicator[];

  const displayMunicipality = plan?.features.hasActionPrimaryOrgs === true;

  const displayNormalizedValues =
    undefined !==
    indicators?.find((ind) => {
      if (!ind) return false;
      if (!ind.common) return false;
      if (!ind.common.normalizations) return false;
      return ind.common.normalizations?.length > 0;
    });

  const hierarchy = processCommonIndicatorHierarchy(indicators);

  /* This collects the common categories from the indicators that belong to different plans */
  const commonCategories = collectCommonCategories(indicators);
  /* We support only one category type for indicators, it is guessed here */
  const categoryType: CategoryType | undefined = getFirstUsablePlanCategoryType(
    data?.plan?.categoryTypes,
    indicators
  );

  const sortedIndicators = sortIndicators(hierarchy, indicators, displayMunicipality ?? false);
  const filteredIndicators = filterIndicators(
    sortedIndicators,
    filters,
    includeRelatedPlans ?? false,
    categoryType?.identifier
  );

  return (
    <>
      {indicatorModalId && (
        <IndicatorModal
          indicatorId={indicatorModalId}
          planIdentifier={
            indicators.find((indicator) => indicator.id === indicatorModalId)?.plans?.[0]?.id ??
            plan.identifier
          }
          onChange={(indicatorId) => handleChangeModal(indicatorId)}
          indicatorsOrder={filteredIndicators.map((indicator) => indicator.id)}
          usableCategoryTypes={data?.plan?.categoryTypes}
        />
      )}
      <IndicatorsHero
        leadContent={leadContent || undefined}
        showInsights={showInsights}
        testId={testId}
      >
        {/*
        <ActionListFilters
          filterSections={filterSections}
          activeFilters={filters}
          onChange={handleFilterChange}
          actionCount={filteredIndicators.length}
          actionCountLabel={t('indicators')}
        />*/}
        <IndicatorListFilters
          indicators={indicators}
          categoryType={categoryType}
          commonCategories={includeRelatedPlans ? commonCategories : null}
          activeFilters={filters}
          onChange={handleFilterChange}
          actionCount={filteredIndicators.length}
          actionCountLabel={t('indicators')}
        />
      </IndicatorsHero>

      <Container>
        <IndicatorListFiltered
          displayMunicipality={displayMunicipality}
          displayNormalizedValues={displayNormalizedValues}
          categoryType={categoryType}
          indicators={filteredIndicators}
          openIndicatorsInModal={openIndicatorsInModal && handleChangeModal}
          //filters={filters}
          hierarchy={hierarchy}
          displayLevel={displayLevel}
          includePlanRelatedIndicators={includeRelatedPlans ?? false}
          commonCategories={commonCategories}
        />
      </Container>
    </>
  );
};

export default IndicatorList;
