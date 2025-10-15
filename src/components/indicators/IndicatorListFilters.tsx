import { useTranslations } from 'next-intl';

import { CategoryTypeSelectWidget } from '@/common/__generated__/graphql';
import { usePlan } from '@/context/plan';

import { type ActionListPageFiltersFragment } from '../../common/__generated__/graphql';
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

interface IndicatorListFiltersProps {
  indicators: IndicatorListIndicator[];
  categoryType: CategoryType | null | undefined;
  commonCategories: CollectedCommonCategory[] | null;
  activeFilters: Filters;
  onChange: (filterType: string, val: FilterValue) => void;
  actionCount: number;
  actionCountLabel: string;
}

const IndicatorListFilters = (props: IndicatorListFiltersProps) => {
  const { activeFilters, onChange, actionCount, categoryType, indicators, commonCategories } =
    props;
  const t = useTranslations();
  const plan = usePlan();
  /* Create category filter */
  const filterConfig = getFilterConfig(categoryType, indicators, commonCategories);

  const filterSections: ActionListFilterSection[] = ActionListFilters.constructFilters({
    mainConfig: filterConfig,
    primaryOrgs: [],
    orgs: [],
    plan,
    filterByCommonCategory: false,
    t,
    actionTerm: 'INDICATOR',
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
