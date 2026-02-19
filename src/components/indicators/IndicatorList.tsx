'use client';

import React, { useCallback, useRef, useState } from 'react';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
  type IndicatorListIndicatorFragment,
  type IndicatorListPageFragmentFragment,
  type IndicatorListQuery,
  type IndicatorListQueryVariables,
} from '@/common/__generated__/graphql';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';
import type { FilterValue } from '@/components/actions/ActionListFilters';
import ErrorPage from '@/components/common/ErrorPage';
import { GET_INDICATOR_LIST } from '@/queries/get-indicator-list';

import { usePlan } from '../../context/plan';
import IndicatorListFiltered from './IndicatorListFiltered';
import IndicatorListFilters from './IndicatorListFilters';
import IndicatorModal from './IndicatorModal';
import IndicatorsHero from './IndicatorsHero';
import { type Sort, type SortState, sortIndicators } from './indicatorUtils';
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

/**
 * Multiplan lists we collect the common categories from the indicators that belong to different plans
 */
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

/**
 * Apply filters to the indicators
 */
function filterIndicators<I extends IndicatorListIndicator>(
  indicators: I[],
  filters: Filters
): I[] {
  const categoryFilters = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && value !== null && key.startsWith('cat')
  );

  // TODO: Handle common categories
  const filterByCategory = (indicator: I) => {
    if (categoryFilters.length === 0) return true;
    // Use 'every' for AND logic - indicator matches if it satisfies ALL category filters
    return categoryFilters.every(([key, value]) => {
      // Treat undefined, null, or empty array as "no filter applied"
      if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
        return true;
      }
      const categoryTypeIdentifier = key.replace('cat-', '');
      // Find if indicator has a category matching this type
      return indicator.categories.some((category) => {
        if (category.type.identifier === categoryTypeIdentifier) {
          // Helper to check if category or any of its parents match
          const matchesCategoryOrParent = (cat: typeof category, targetValue: string): boolean => {
            if (cat.id === targetValue) return true;
            // Walk up the parent chain
            if (cat.parent?.id) {
              return matchesCategoryOrParent(cat.parent as typeof category, targetValue);
            }
            return false;
          };

          // Handle both single value and array of values (multiselect)
          if (Array.isArray(value)) {
            return value.some((v) => matchesCategoryOrParent(category, v));
          }
          return matchesCategoryOrParent(category, value);
        }
        return false;
      });
    });
  };

  const filterBySearch = (indicator: I) =>
    !filters['name'] || indicator.name.toLowerCase().includes(filters['name'].toLowerCase());

  const filterByLevel = (indicator: I) => {
    const level = filters['indicator-level'];
    if (level == null) return true;
    if (Array.isArray(level)) return level.length === 0 ? true : level.includes(indicator.level);
    return level === indicator.level;
  };

  return indicators.filter((indicator) => {
    const categoryResult = categoryFilters ? filterByCategory(indicator) : true;
    const searchResult = filterBySearch(indicator);
    const levelResult = filterByLevel(indicator);
    return categoryResult && searchResult && levelResult;
  });
}

/**
 * Get the first usable plan category type
 * It's used to select one category for default columns
 * and filters if custom layout is not applied
 */
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
/**
 * Generate default columns for legacy plans with no custom layout
 */
const getDefaultColumns = (
  displayMunicipality: boolean,
  categoryType: CategoryType | undefined,
  displayNormalizedValues: boolean,
  displayLevel: boolean,
  t: ReturnType<typeof useTranslations<string>>
): NonNullable<IndicatorListPageFragmentFragment['listColumns']> => {
  const columns: NonNullable<IndicatorListPageFragmentFragment['listColumns']> = [
    {
      __typename: 'IndicatorListColumn',
      id: 'default-column-name',
      columnLabel: t('name'),
      columnHelpText: '',
      sourceField: IndicatorDashboardFieldName.Name,
    },
  ];
  if (displayLevel) {
    columns.push({
      __typename: 'IndicatorListColumn',
      id: 'default-column-level',
      columnLabel: t('type'),
      columnHelpText: '',
      sourceField: IndicatorDashboardFieldName.Level,
    });
  }
  if (categoryType) {
    columns.push({
      __typename: 'IndicatorCategoryColumn',
      id: 'default-column-category',
      columnLabel: null,
      columnHelpText: '',
      categoryType: {
        id: categoryType.id,
        name: categoryType.name,
        __typename: 'CategoryType',
      },
      categoryLevel: null,
    });
  }
  if (displayMunicipality) {
    columns.push({
      __typename: 'IndicatorListColumn',
      id: 'default-column-organization',
      columnLabel: t('municipality'),
      columnHelpText: '',
      sourceField: IndicatorDashboardFieldName.Organization,
    });
  }

  columns.push({
    __typename: 'IndicatorListColumn',
    id: 'default-column-updated',
    columnLabel: t('updated'),
    columnHelpText: '',
    sourceField: IndicatorDashboardFieldName.UpdatedAt,
  });

  columns.push({
    __typename: 'IndicatorValueColumn',
    id: 'default-column-value',
    columnLabel: t('indicator-value'),
    columnHelpText: '',
    sourceField: null,
    isNormalized: false,
    valueType: IndicatorColumnValueType.Latest,
    defaultYear: null,
    referenceYear: null, // @deprecated, remove when type is updated
    hideUnit: false,
  });

  if (displayNormalizedValues) {
    columns.push({
      __typename: 'IndicatorValueColumn',
      id: 'default-column-value-normalized',
      columnLabel: t('indicator-population-normalized-value'),
      columnHelpText: '',
      sourceField: null,
      isNormalized: true,
      valueType: IndicatorColumnValueType.Latest,
      defaultYear: null,
      referenceYear: null, // @deprecated, remove when type is updated
      hideUnit: false,
    });
  }
  return columns;
};
interface IndicatorListPageProps {
  page: IndicatorListPageFragmentFragment;
  testId?: string;
}

const IndicatorListPage = (props: IndicatorListPageProps) => {
  const { page, testId } = props;
  const {
    title,
    leadContent,
    displayInsights,
    displayLevel,
    includeRelatedPlans,
    listColumns,
    mainFilters,
    primaryFilters,
    advancedFilters,
  } = page;
  const filterSections = {
    mainFilters: mainFilters as NonNullable<IndicatorListPageFragmentFragment['mainFilters']>,
    primaryFilters: primaryFilters as NonNullable<
      IndicatorListPageFragmentFragment['primaryFilters']
    >,
    advancedFilters: advancedFilters as NonNullable<
      IndicatorListPageFragmentFragment['advancedFilters']
    >,
  };

  const plan = usePlan();
  const t = useTranslations();

  const openIndicatorsInModal = plan.features.indicatorsOpenInModal === true;
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const getObjectFromSearchParams = (searchParams: ReadonlyURLSearchParams | null) =>
    searchParams ? Object.fromEntries(searchParams) : {};

  const [filters, setFilters] = useState<Filters>(() => getObjectFromSearchParams(searchParams));
  const [indicatorModalId, setIndicatorModalId] = useState<string | null>(
    () => searchParams.get('indicator') ?? null
  );

  // Store filtered indicators in a ref so handleChangeModal can access them
  const filteredIndicatorsRef = useRef<IndicatorListIndicator[]>([]);

  const [sort, setSort] = useState<SortState>(null);

  // click handler for Name/Level sorting
  const sortHandler = (key: 'name' | 'level') => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const handleChangeModal = useCallback(
    (indicatorId?: string | null) => {
      setIndicatorModalId(indicatorId ?? null);
      if (openIndicatorsInModal) {
        // When using global modal, store indicatorsOrder in sessionStorage for navigation
        const order = filteredIndicatorsRef.current.map((ind) => ind.id).join(',');
        if (indicatorId && order) {
          sessionStorage.setItem('indicatorModalOrder', order);
        } else {
          sessionStorage.removeItem('indicatorModalOrder');
        }
        updateSearchParams({
          indicator: indicatorId ?? undefined,
        });
      } else {
        updateSearchParams({ indicator: indicatorId ?? undefined });
      }
    },
    [openIndicatorsInModal, updateSearchParams]
  );

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

  if (error) return <ErrorPage message={t('error-loading-indicators')} details={error.message} />;
  return <ContentLoader fullPage message={t('loading')} />;

  /* Do we show the insights tab as an alternative to the list view? */
  const showInsights = data.plan?.hasIndicatorRelationships === true && (displayInsights ?? true);

  const indicators: IndicatorListIndicator[] = (
    (includeRelatedPlans ?? false) ? data.relatedPlanIndicators : data.planIndicators
  ) as IndicatorListIndicator[];

  const indicatorListColumns: NonNullable<IndicatorListPageFragmentFragment['listColumns']> = [];
  const displayMunicipality = plan?.features.hasActionPrimaryOrgs === true;

  /* This collects the common categories from the indicators that belong to different plans */
  const commonCategories = collectCommonCategories(indicators);
  /* If no layout is defined, we support only one category type for indicators, it is guessed here */
  /* If we have category columns defined, we use the first category type from the columns */
  const firstCategoryColumnTypeId: string | undefined = listColumns?.find(
    (column) => column.__typename === 'IndicatorCategoryColumn'
  )?.categoryType.id;
  const mainCategoryType: CategoryType | undefined = firstCategoryColumnTypeId
    ? (data?.plan?.categoryTypes?.find(
        (categoryType) => categoryType.id === firstCategoryColumnTypeId
      ) as CategoryType)
    : getFirstUsablePlanCategoryType(data?.plan?.categoryTypes, indicators);

  /* If no custom columns are defined, we create default columns */
  if (!listColumns || listColumns.length === 0) {
    const displayNormalizedValues =
      undefined !==
      indicators?.find((ind) => {
        if (!ind) return false;
        if (!ind.common) return false;
        if (!ind.common.normalizations) return false;
        return ind.common.normalizations?.length > 0;
      });

    const defaultColumns = getDefaultColumns(
      displayMunicipality,
      mainCategoryType,
      displayNormalizedValues,
      displayLevel ?? false,
      t
    );
    indicatorListColumns.push(...defaultColumns);
  } else {
    indicatorListColumns.push(...listColumns);
  }

  // The list would be fairly useless if we don't have name column
  // We add it by default if it's not included in the layout
  if (
    !indicatorListColumns.find(
      (column) =>
        column.__typename === 'IndicatorListColumn' &&
        column.sourceField === IndicatorDashboardFieldName.Name
    )
  ) {
    indicatorListColumns.unshift({
      __typename: 'IndicatorListColumn',
      id: 'default-column-name',
      columnLabel: t('name'),
      columnHelpText: '',
      sourceField: IndicatorDashboardFieldName.Name,
    });
  }
  const hierarchy = processCommonIndicatorHierarchy(indicators);

  /* Sort & filter indicators */
  /* TODO: Sorting options are not implemented yet */
  /* Automatically guess default sorting order */
  const sortingOrder: Sort[] = [{ key: 'name', direction: 'asc' }];
  // If we display category column sort by category
  if (mainCategoryType) {
    sortingOrder.push({ key: 'category', direction: 'asc', categoryType: mainCategoryType });
  }
  // If we display level column sort by level
  if (
    indicatorListColumns.find(
      (column) =>
        column.__typename === 'IndicatorListColumn' &&
        column.sourceField === IndicatorDashboardFieldName.Level
    )
  ) {
    sortingOrder.push({ key: 'level', direction: 'asc' });
  }
  // If we display municipality column sort by municipality
  if (displayMunicipality) {
    sortingOrder.push({ key: 'organization', direction: 'asc' });
  }

  const sortedIndicators = sortIndicators(
    sortingOrder,
    hierarchy,
    indicators,
    displayMunicipality ?? false,
    sort
  );
  const filteredIndicators = filterIndicators(sortedIndicators, filters);

  // Update ref with current filtered indicators (refs can be updated during render)
  filteredIndicatorsRef.current = filteredIndicators;

  const getIndicatorPlanIdentifier = (
    indicator: IndicatorListIndicator | undefined,
    sitePlanIdentifier: string
  ) => {
    // Sometimes indicators are associated with multiple plans
    // If the indicator is associated with the site plan, we return the site plan identifier
    // Otherwise, we return the first other plan identifier we find so the modal can fetch the indicator from the correct plan
    if (!indicator) return sitePlanIdentifier;
    const currentPlan = indicator.plans.find(
      (plan) => plan.identifier === sitePlanIdentifier
    )?.identifier;
    if (currentPlan) {
      return currentPlan;
    }
    return indicator.plans[0]?.identifier;
  };

  return (
    <>
      {indicatorModalId && !openIndicatorsInModal && (
        <IndicatorModal
          indicatorId={indicatorModalId}
          indicatorPlanIdentifier={getIndicatorPlanIdentifier(
            indicators.find((indicator) => indicator.id === indicatorModalId),
            plan.identifier
          )}
          sitePlanIdentifier={plan.identifier}
          onChange={(indicatorId) => handleChangeModal(indicatorId)}
          indicatorsOrder={filteredIndicators.map((indicator) => indicator.id)}
          usableCategoryTypes={data?.plan?.categoryTypes ?? []}
        />
      )}
      <IndicatorsHero
        title={title ?? undefined}
        leadContent={leadContent || undefined}
        showInsights={showInsights}
        testId={testId}
      >
        <IndicatorListFilters
          indicators={indicators}
          filterLayout={filterSections}
          categoryType={mainCategoryType}
          commonCategories={includeRelatedPlans ? commonCategories : null}
          activeFilters={filters}
          onChange={handleFilterChange}
          actionCount={filteredIndicators.length}
          actionCountLabel={t('indicators')}
        />
      </IndicatorsHero>

      <Container>
        <IndicatorListFiltered
          indicators={filteredIndicators}
          openIndicatorsInModal={openIndicatorsInModal ? handleChangeModal : undefined}
          hierarchy={hierarchy}
          listColumns={indicatorListColumns}
          sort={sort}
          onSortState={sortHandler}
        />
      </Container>
    </>
  );
};

export default IndicatorListPage;
