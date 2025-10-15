'use client';

import React, { useState } from 'react';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import type {
  ActionListPageFiltersFragment,
  GetPlanPageIndicatorListQuery,
  IndicatorListIndicatorFragment,
  IndicatorListQuery,
  IndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { CategoryTypeSelectWidget } from '@/common/__generated__/graphql';
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

/* We augment the IndicatorListIndicatorFragment with a level property */
export type IndicatorListIndicator = IndicatorListIndicatorFragment & {
  level: string;
};
export type IndicatorCategory = NonNullable<IndicatorListIndicator['categories']>[number];
type CategoryType = NonNullable<IndicatorListQuery['plan']>['categoryTypes'][number];

const createFilterUnusedCategories =
  (indicators: IndicatorListIndicator[]) =>
  (category: { id: string; parent?: { id: string } | null }) =>
    indicators.find(({ categories }) =>
      categories.find(({ id, parent }) => id === category.id || parent?.id === category.id)
    );

const createFilterUnusedCommonCategories =
  (indicators: IndicatorListIndicator[]) => (category: IndicatorCategory) =>
    indicators.find(({ categories }) => categories.find((cat) => cat.id === category.id));

interface CommonCategoryGroup {
  categories: Set<IndicatorCategory>;
  type: NonNullable<IndicatorListIndicatorFragment['categories'][number]['common']>['type'];
}

interface CollectedCommonCategory {
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

const getFilterConfig = (
  categoryType: CategoryType | null | undefined,
  indicators: IndicatorListIndicator[],
  commonCategories: CollectedCommonCategory[] | null
): ActionListPageFiltersFragment => {
  // Common categories is null if we are not including related plans

  if (!commonCategories && !categoryType) {
    return {
      mainFilters: [],
      primaryFilters: [],
      advancedFilters: [],
      __typename: 'ActionListPage',
    };
  }

  const mainTypeFilter = categoryType
    ? {
        __typename: 'CategoryTypeFilterBlock' as const,
        field: 'category',
        id: '817256d7-a6fb-4af1-bbba-096171eb0d36',
        style: 'dropdown',
        showAllLabel: '',
        depth: null,
        categoryType: {
          id: categoryType.id,
          identifier: categoryType.identifier,
          name: categoryType.name,
          helpText: '',
          categories: categoryType.categories
            .filter(createFilterUnusedCategories(indicators))
            .map((cat) => ({
              ...cat,
              helpText: '',
              common: cat.common ? { id: cat.id, __typename: 'CommonCategory' as const } : null,
            })),
          hideCategoryIdentifiers: true,
          selectionType: CategoryTypeSelectWidget.Single,
          __typename: 'CategoryType' as const,
        },
      }
    : null;

  const commonCategoryFilters = commonCategories
    ? commonCategories.map((cat) => {
        const { typeIdentifier, categories, type } = cat;
        return {
          __typename: 'CategoryTypeFilterBlock' as const,
          field: 'category',
          id: `common_${typeIdentifier}`,
          style: 'dropdown',
          showAllLabel: '',
          depth: null,
          categoryType: {
            id: type?.identifier || typeIdentifier,
            identifier: type?.identifier || typeIdentifier,
            name: type?.name || typeIdentifier,
            helpText: '',
            selectionType: CategoryTypeSelectWidget.Single,
            categories: categories
              .filter(createFilterUnusedCommonCategories(indicators))
              .map((cat, index) => ({
                id: cat.id,
                identifier: cat.common?.id || cat.id,
                name: cat.name,
                order: index,
                helpText: '',
                parent: cat.parent,
                common: cat.common,
                __typename: 'Category' as const,
              })),
            hideCategoryIdentifiers: true,
            __typename: 'CategoryType' as const,
          },
        };
      })
    : [];

  return {
    mainFilters: [
      ...(commonCategories ? commonCategoryFilters : mainTypeFilter ? [mainTypeFilter] : []),
    ],
    primaryFilters: [],
    advancedFilters: [],
    __typename: 'ActionListPage',
  };
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
  const getObjectFromSearchParams = (searchParams: ReadonlyURLSearchParams | null) =>
    searchParams ? Object.fromEntries(searchParams) : {};

  const [filters, setFilters] = useState<Filters>(() => getObjectFromSearchParams(searchParams));
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

  /* Create category filter */
  const filterConfig = getFilterConfig(
    categoryType,
    indicators,
    includeRelatedPlans ? commonCategories : null
  );

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
    includeRelatedPlans ?? false,
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
          displayMunicipality={displayMunicipality}
          displayNormalizedValues={displayNormalizedValues}
          categoryColumnLabel={categoryType?.name}
          indicators={filteredIndicators}
          //filters={filters}
          hierarchy={hierarchy}
          shouldDisplayCategory={(category: IndicatorCategory) =>
            category.type.id === categoryType?.id
          }
          displayLevel={displayLevel}
          includePlanRelatedIndicators={includeRelatedPlans ?? false}
          commonCategories={commonCategories}
        />
      </Container>
    </>
  );
};

export default IndicatorList;
