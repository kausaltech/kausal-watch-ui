import { useTranslations } from 'next-intl';

import {
  CategoryTypeSelectWidget,
  type IndicatorListFilterFragment,
  type IndicatorListPageFiltersFragment,
} from '@/common/__generated__/graphql';
import { type TFunction, getIndicatorTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';

import ActionListFilters, {
  type ActionListFilterSection,
  type AdditionalFilterBadge,
  type FilterValue,
  type Filters,
} from '../actions/ActionListFilters';
import { type CategoryType, type IndicatorCategory } from './IndicatorList';
import { type IndicatorListIndicator } from './IndicatorList';
import { type CollectedCommonCategory } from './IndicatorList';

const createFilterUnusedCategories =
  (indicators: IndicatorListIndicator[]) =>
  (category: { id: string; parent?: { id: string } | null }) =>
    indicators.find(({ categories }) =>
      categories.find(({ id, parent }) => id === category.id || parent?.id === category.id)
    );

const createFilterUnusedCommonCategories =
  (indicators: IndicatorListIndicator[]) => (category: IndicatorCategory) =>
    indicators.find(({ categories }) => categories.find((cat) => cat.id === category.id));

const isCategoryFilterKey = (key: string) => key.startsWith('cat-');

const getCategoryTypeIdentifierFromFilterKey = (key: string) => key.replace(/^cat-/, '');

const getConfiguredFilterIds = (filterSections: ActionListFilterSection[]) =>
  new Set(filterSections.flatMap((section) => section.filters.map((filter) => filter.id)));

const formatTypeIdentifier = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const getCategoryBadgeDataByTypeAndId = (
  indicators: IndicatorListIndicator[],
  typeIdentifier: string,
  categoryId: string
) => {
  for (const indicator of indicators) {
    // Walk through each category and its parent chain to find the matching category id.
    // This allows badge labels to be resolved even when the selected category is a parent category.
    for (const category of indicator.categories) {
      let current: typeof category | null | undefined = category;

      while (current) {
        if (current.id === categoryId) {
          return {
            typeName: formatTypeIdentifier(typeIdentifier),
            categoryName: current.name,
          };
        }

        current = current.parent as typeof category | null | undefined;
      }
    }
  }

  return null;
};

// Prevent actionlistfilters to inject the showAllLabel "See all actions" into the empty showAllLabel
const indicatorFiltersToActionListFilters = (
  filters:
    | IndicatorListPageFiltersFragment['advancedFilters']
    | IndicatorListPageFiltersFragment['primaryFilters']
    | IndicatorListPageFiltersFragment['mainFilters'],
  t: TFunction
) => {
  return filters?.map((filter) => ({
    ...filter,
    showAllLabel: t('filter-all-categories'),
  }));
};
const getFilterConfig = (
  categoryType: CategoryType | null | undefined,
  indicators: IndicatorListIndicator[],
  commonCategories: CollectedCommonCategory[] | null,
  filterLayout: {
    advancedFilters: IndicatorListPageFiltersFragment['advancedFilters'];
    primaryFilters: IndicatorListPageFiltersFragment['primaryFilters'];
    mainFilters: IndicatorListPageFiltersFragment['mainFilters'];
  },
  t: TFunction
): IndicatorListPageFiltersFragment => {
  // Common categories is null if we are not including related plans
  const useDefaultFilters =
    filterLayout.advancedFilters?.length === 0 &&
    filterLayout.primaryFilters?.length === 0 &&
    filterLayout.mainFilters?.length === 0;

  // If we are provided with a custom layout, we convert the indicator list filters to action list filters
  if (!useDefaultFilters) {
    // console.log('-----------------> Using custom filters', filterLayout);

    // if (!filter.showAllLabel) filter.showAllLabel = t('filter-all-categories');
    return {
      mainFilters: indicatorFiltersToActionListFilters(filterLayout.mainFilters, t) as NonNullable<
        IndicatorListPageFiltersFragment['mainFilters']
      >,
      primaryFilters: indicatorFiltersToActionListFilters(
        filterLayout.primaryFilters,
        t
      ) as NonNullable<IndicatorListPageFiltersFragment['primaryFilters']>,
      advancedFilters: indicatorFiltersToActionListFilters(
        filterLayout.advancedFilters,
        t
      ) as NonNullable<IndicatorListPageFiltersFragment['advancedFilters']>,
      __typename: 'IndicatorListPage',
    };
  }

  // If we are not provided with a custom layout, we generate the default (legacy) filters
  if (!commonCategories && !categoryType) {
    // console.log('-----------------> Using empty default filters');
    return {
      mainFilters: [],
      primaryFilters: [],
      advancedFilters: [],
      __typename: 'IndicatorListPage',
    };
  }

  // console.log('-----------------> Using default filters with category type', categoryType);
  const mainTypeFilter = categoryType
    ? {
        __typename: 'CategoryTypeFilterBlock' as const,
        field: 'category',
        id: 'default-category-filter',
        style: 'dropdown',
        showAllLabel: t('filter-all-categories'),
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
          showAllLabel: t('filter-all-categories'),
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
    __typename: 'IndicatorListPage',
  };
};

interface IndicatorListFiltersProps {
  indicators: IndicatorListIndicator[];
  categoryType: CategoryType | null | undefined;
  commonCategories: CollectedCommonCategory[] | null;
  activeFilters: Filters;
  onChange: (filterType: string, val: FilterValue) => void;
  actionCount: number;
  actionCountLabel: string;
  filterLayout: {
    advancedFilters: IndicatorListPageFiltersFragment['advancedFilters'];
    primaryFilters: IndicatorListPageFiltersFragment['primaryFilters'];
    mainFilters: IndicatorListPageFiltersFragment['mainFilters'];
  };
  filterGroupLabel?: string | null;
  filterValueLabel?: string | null;
}

const IndicatorListFilters = (props: IndicatorListFiltersProps) => {
  const {
    activeFilters,
    onChange,
    actionCount,
    categoryType,
    indicators,
    commonCategories,
    filterLayout,
    filterGroupLabel,
    filterValueLabel,
  } = props;
  const t = useTranslations();
  const plan = usePlan();
  /* Create category filter */
  const filterConfig = getFilterConfig(categoryType, indicators, commonCategories, filterLayout, t);

  const filterSections: ActionListFilterSection[] = ActionListFilters.constructFilters({
    mainConfig: filterConfig,
    primaryOrgs: [],
    orgs: [],
    plan,
    filterByCommonCategory: false,
    t,
    actionTerm: 'INDICATOR',
    isIndicatorList: true,
  });

  const configuredFilterIds = getConfiguredFilterIds(filterSections);

  const additionalFilterBadges: AdditionalFilterBadge[] = Object.entries(activeFilters)
    .filter(
      ([key, value]) => isCategoryFilterKey(key) && typeof value === 'string' && value.length > 0
    )
    .filter(([key]) => !configuredFilterIds.has(key))
    .map(([key, value]) => {
      const typeIdentifier = getCategoryTypeIdentifierFromFilterKey(key);
      const badgeData = getCategoryBadgeDataByTypeAndId(indicators, typeIdentifier, value);
      if (!badgeData) return null;
      const fallbackLabel = `${badgeData.typeName}: ${badgeData.categoryName}`;

      return {
        key: `${key}-${value}`,
        id: key,
        value,
        label:
          filterGroupLabel && filterValueLabel
            ? `${filterGroupLabel}: ${filterValueLabel}`
            : fallbackLabel,
        onReset: () => onChange(key, undefined),
      };
    })
    .filter((badge): badge is AdditionalFilterBadge => badge != null);

  return (
    <ActionListFilters
      filterSections={filterSections}
      activeFilters={activeFilters}
      onChange={onChange}
      actionCount={actionCount}
      actionCountLabel={t('indicators', getIndicatorTermContext(plan))}
      additionalFilterBadges={additionalFilterBadges}
    />
  );
};

export default IndicatorListFilters;
