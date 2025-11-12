import { useTranslations } from 'next-intl';

import {
  CategoryTypeSelectWidget,
  type IndicatorListFilterFragment,
  type IndicatorListPageFiltersFragment,
} from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import { usePlan } from '@/context/plan';

import ActionListFilters, {
  type ActionListFilterSection,
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
      mainFilters: filterLayout.mainFilters,
      primaryFilters: filterLayout.primaryFilters,
      advancedFilters: filterLayout.advancedFilters,
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

  return (
    <ActionListFilters
      filterSections={filterSections}
      activeFilters={activeFilters}
      onChange={onChange}
      actionCount={actionCount}
      actionCountLabel={t('indicators')}
    />
  );
};

export default IndicatorListFilters;
