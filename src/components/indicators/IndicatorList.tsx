'use client';

import React, { useState } from 'react';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import type {
  GetPlanPageIndicatorListQuery,
  IndicatorListQuery,
  IndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { getCategoryString } from '@/common/categories';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import type { ActionListFilterSection, FilterValue } from '@/components/actions/ActionListFilters';
import ActionListFilters from '@/components/actions/ActionListFilters';
import ContentLoader from '@/components/common/ContentLoader';
import ErrorMessage from '@/components/common/ErrorMessage';
import { GET_INDICATOR_LIST } from '@/queries/get-indicator-list';

import { usePlan } from '../../context/plan';
import IndicatorListFiltered from './IndicatorListFilteredNew';
import IndicatorsHero from './IndicatorsHero';
import { processCommonIndicatorHierarchy } from './process-indicators';

export type IndicatorListIndicator = NonNullable<
  IndicatorListQuery['plan']
>['indicatorLevels'][number]['indicator'];
export type IndicatorCategory = NonNullable<IndicatorListIndicator['categories']>[number];
type CategoryType = NonNullable<IndicatorListQuery['plan']>['categoryTypes'][number];
type CommonCategory = NonNullable<NonNullable<CategoryType['categories']>[number]['common']>;

const createFilterUnusedCategories =
  (indicators: IndicatorListIndicator[]) => (category: IndicatorCategory) =>
    indicators.find(({ categories }) =>
      categories.find(({ id, parent }) => id === category.id || parent?.id === category.id)
    );

const createFilterUnusedCommonCategories =
  (indicators: IndicatorListIndicator[]) => (commonCategory: CommonCategory) =>
    indicators.find(({ categories }) =>
      categories.find((category) => category.common && category.common.id === commonCategory.id)
    );

interface CommonCategoryGroup {
  categories: Set<CommonCategory>;
  type: CommonCategoryType;
}

interface CollectedCommonCategory {
  typeIdentifier: string;
  categories: CommonCategory[];
  type: CommonCategoryType;
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
            categories: new Set<CommonCategory>(),
            type: { ...category.common.type },
          };
        }
        commonCategories[typeIdentifier].categories.add(category.common);
      }
    });
  });

  return Object.entries(commonCategories).map(
    ([typeIdentifier, data]): CollectedCommonCategory => ({
      typeIdentifier,
      categories: Array.from(data?.categories),
      type: data?.type,
    })
  );
};

const getFilterConfig = (
  categoryType: CategoryType,
  indicators: IndicatorListIndicator[],
  commonCategories: CollectedCommonCategory[] | null
) => ({
  mainFilters: [
    ...(commonCategories
      ? commonCategories.map(({ typeIdentifier, categories, type }) => ({
          __typename: 'CategoryTypeFilterBlock',
          field: 'category',
          id: `common_${typeIdentifier}`,
          style: 'dropdown',
          showAllLabel: '',
          depth: null,
          categoryType: {
            ...type,
            name: type.name || typeIdentifier,
            categories: categories.filter(createFilterUnusedCommonCategories(indicators)),
            hideCategoryIdentifiers: true,
            selectionType: 'SINGLE',
          },
        }))
      : [
          {
            __typename: 'CategoryTypeFilterBlock',
            field: 'category',
            id: '817256d7-a6fb-4af1-bbba-096171eb0d36',
            style: 'dropdown',
            showAllLabel: '',
            depth: null,
            categoryType: {
              ...categoryType,
              categories: categoryType.categories.filter(createFilterUnusedCategories(indicators)),
              hideCategoryIdentifiers: true,
              selectionType: 'SINGLE',
            },
          },
        ]),
  ],
  primaryFilters: [],
  advancedFilters: [],
});

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
      ([key, value]) => value !== undefined && value !== null
    );

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.every(([filterKey, filterValue]) => {
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

const getFirstUsableCategoryType = (
  categoryTypes: CategoryType[],
  indicators: IndicatorListIndicator[]
): CategoryType | undefined =>
  categoryTypes.find((categoryType) =>
    indicators.find((indicator) =>
      indicator.categories.find(({ type }) => type.id === categoryType.id)
    )
  );

type IndicatorListPage = NonNullable<GetPlanPageIndicatorListQuery['planPage']> & {
  __typename: 'IndicatorListPage';
};

interface Props {
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
}: Props) => {
  const plan = usePlan();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { loading, error, data } = useQuery<IndicatorListQuery, IndicatorListQueryVariables>(
    GET_INDICATOR_LIST,
    {
      variables: {
        plan: plan.identifier,
        relatedPlanIndicators: includeRelatedPlans ?? false,
      },
    }
  );

  const getObjectFromSearchParams = (searchParams: ReadonlyURLSearchParams | null) =>
    searchParams ? Object.fromEntries(searchParams) : {};

  const [filters, setFilters] = useState<Filters>(() => getObjectFromSearchParams(searchParams));

  const handleFilterChange = (id: string, val: FilterValue) => {
    setFilters((state) => {
      const newFilters = { ...state, [id]: val };
      updateSearchParams(newFilters);
      return newFilters;
    });
  };

  const hasInsights = (data: IndicatorListQuery) => {
    const { plan } = data;
    return plan?.hasIndicatorRelationships === true;
  };

  const getIndicatorListProps = (data: IndicatorListQuery) => {
    const { plan, relatedPlanIndicators } = data;
    const displayMunicipality = plan?.features.hasActionPrimaryOrgs === true;
    const displayNormalizedValues =
      undefined !==
      plan!.indicatorLevels.find(
        (l) => l.indicator?.common != null && l.indicator.common.normalizations.length > 0
      );
    const generalContent = plan?.generalContent || {};
    const { indicatorLevels } = plan!;

    const indicators = indicatorLevels.map((il) => {
      const { indicator, level } = il;
      return { ...indicator, level: level.toLowerCase() };
    });

    return {
      indicators,
      leadContent: generalContent.indicatorListLeadContent,
      displayMunicipality,
      displayNormalizedValues,
      relatedPlanIndicators: includeRelatedPlans ? relatedPlanIndicators : [],
    };
  };

  if (error) return <ErrorMessage message={error.message} />;
  if (loading || !data) return <ContentLoader />;

  const indicatorListProps = getIndicatorListProps(data);

  const indicators = includeRelatedPlans
    ? indicatorListProps.relatedPlanIndicators
    : indicatorListProps.indicators;

  const commonCategories = collectCommonCategories(indicators);
  const hierarchy = processCommonIndicatorHierarchy(
    includeRelatedPlans ? indicatorListProps.relatedPlanIndicators : data?.planIndicators
  );
  const showInsights = (displayInsights ?? true) && hasInsights(data);

  const categoryType = getFirstUsableCategoryType(data?.plan?.categoryTypes, indicators);

  const filterConfig = categoryType
    ? getFilterConfig(categoryType, indicators, includeRelatedPlans ? commonCategories : null)
    : {};

  const filterSections: ActionListFilterSection[] = ActionListFilters.constructFilters({
    mainConfig: filterConfig,
    primaryOrgs: [],
    orgs: [],
    plan,
    filterByCommonCategory: false,
    t,
    actionTerm: 'INDICATOR',
  });

  const filteredIndicators = filterIndicators(
    indicators,
    filters,
    includeRelatedPlans,
    categoryType?.identifier
  );

  return (
    <>
      <IndicatorsHero
        leadContent={leadContent || undefined}
        showInsights={showInsights}
        testId={testId}
      >
        <ActionListFilters
          filterSections={filterSections}
          activeFilters={filters}
          onChange={handleFilterChange}
          actionCount={filteredIndicators.length}
          actionCountLabel={t('indicators')}
        />
      </IndicatorsHero>

      <Container>
        <IndicatorListFiltered
          {...indicatorListProps}
          categoryColumnLabel={categoryType?.name}
          indicators={filteredIndicators}
          filters={filters}
          hierarchy={hierarchy}
          shouldDisplayCategory={(category: IndicatorCategory) =>
            category.type.id === categoryType?.id
          }
          displayLevel={displayLevel}
          includePlanRelatedIndicators={includeRelatedPlans}
          commonCategories={commonCategories}
        />
      </Container>
    </>
  );
};

export default IndicatorList;
