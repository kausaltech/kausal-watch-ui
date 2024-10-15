'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { Container } from 'reactstrap';
import ContentLoader from 'components/common/ContentLoader';
import { usePlan } from '../../context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import IndicatorsHero from './IndicatorsHero';
import IndicatorListFiltered from './IndicatorListFiltered';
import ActionListFilters, {
  ActionListFilterSection,
  FilterValue,
} from 'components/actions/ActionListFilters';
import {
  Category,
  Indicator,
  IndicatorListPage,
  IndicatorListQuery,
} from 'common/__generated__/graphql';
import { getCategoryString } from 'common/categories';
import { processCommonIndicatorHierarchy } from './process-indicators';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useUpdateSearchParams } from '@/common/hooks/update-search-params';

const createFilterUnusedCategories =
  (indicators: Indicator[]) => (category: Category) =>
    indicators.find(({ categories }) =>
      categories.find(
        ({ id, parent }) => id === category.id || parent?.id === category.id
      )
    );

const createFilterUnusedCommonCategories =
  (indicators: Indicator[]) => (commonCategory: any) =>
    indicators.find(({ categories }) =>
      categories.find(
        (category) =>
          category.common && category.common.id === commonCategory.id
      )
    );

const collectCommonCategories = (indicators) => {
  const commonCategories = {};
  indicators.forEach((indicator) => {
    indicator.categories.forEach((category) => {
      if (category.common) {
        const typeIdentifier = category.common.type.identifier;
        if (!commonCategories[typeIdentifier]) {
          commonCategories[typeIdentifier] = {
            categories: new Set(),
            type: { ...category.common.type },
          };
        }
        commonCategories[typeIdentifier].categories.add(category.common);
      }
    });
  });
  return Object.entries(commonCategories).map(([typeIdentifier, data]) => ({
    typeIdentifier,
    categories: Array.from(data?.categories),
    type: data?.type,
  }));
};

const includeRelatedPlanIndicators = true;

const getFilterConfig = (categoryType, indicators, commonCategories) => ({
  mainFilters: [
    ...(includeRelatedPlanIndicators
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
            categories: categories.filter(
              createFilterUnusedCommonCategories(indicators)
            ),
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
              categories: categoryType.categories.filter(
                createFilterUnusedCategories(indicators)
              ),
              hideCategoryIdentifiers: true,
              selectionType: 'SINGLE',
            },
          },
        ]),
  ],
  primaryFilters: [],
  advancedFilters: [],
});

const GET_INDICATOR_LIST = gql`
  query IndicatorList($plan: ID!, $relatedPlanIndicators: Boolean!) {
    plan(id: $plan) {
      id
      features {
        hasActionPrimaryOrgs
      }
      indicatorLevels {
        level
        indicator {
          id
          name
          timeResolution
          organization {
            id
            name
          }
          common {
            id
            name
            normalizations {
              unit {
                shortName
              }
              normalizer {
                name
                id
                identifier
              }
            }
          }
          categories {
            id
            name
            parent {
              id
            }
            type {
              id
              identifier
            }
          }
          latestGraph {
            id
          }
          latestValue {
            id
            date
            value
            normalizedValues {
              normalizerId
              value
            }
          }
          unit {
            shortName
          }
        }
      }
      categoryTypes(usableForIndicators: true) {
        name
        id
        identifier
        categories {
          id
          identifier
          order
          name
          parent {
            id
          }
          common @include(if: $relatedPlanIndicators) {
            type {
              identifier
              name
            }
          }
        }
      }
      hasIndicatorRelationships
    }
    planIndicators(plan: $plan) @skip(if: $relatedPlanIndicators) {
      id
      common {
        id
        name
        indicators {
          id
          organization {
            name
          }
        }
        relatedCauses {
          effectType
          causalIndicator {
            id
            name
          }
        }
        relatedEffects {
          id
          effectType
          effectIndicator {
            id
            name
          }
        }
      }
    }
    relatedPlanIndicators(plan: $plan) @include(if: $relatedPlanIndicators) {
      id
      name
      level(plan: $plan)
      timeResolution
      organization {
        id
        name
      }
      common {
        id
        name
        normalizations {
          unit {
            shortName
          }
          normalizer {
            name
            id
            identifier
          }
        }
      }
      latestGraph {
        id
      }
      latestValue {
        id
        date
        value
        normalizedValues {
          normalizerId
          value
        }
      }
      unit {
        shortName
      }
      categories {
        id
        name
        parent {
          id
        }
        type {
          id
          identifier
          name
        }
        common {
          id
          identifier
          name
          order
          type {
            identifier
            name
          }
        }
      }
    }
  }
`;

interface Filters {
  name?: string;
  [category: string]: FilterValue;
}

const filterIndicators = (
  indicators,
  filters: Filters,
  categoryIdentifier?: string
) => {
  const filterByCategory = (indicator) => {
    if (
      !categoryIdentifier ||
      !filters[getCategoryString(categoryIdentifier)]
    ) {
      return true;
    }
    return indicator.categories.some(
      ({ type, id }) => filters[getCategoryString(type.identifier)] === id
    );
  };

  const filterByCommonCategory = (indicator) => {
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

  const filterBySearch = (indicator) => {
    if (!filters['name']) {
      return true;
    }
    return indicator.name.toLowerCase().includes(filters['name'].toLowerCase());
  };

  return indicators.filter((indicator) => {
    const categoryResult = filterByCategory(indicator);
    const commonCategoryResult = filterByCommonCategory(indicator);
    const searchResult = filterBySearch(indicator);
    return (
      (!includeRelatedPlanIndicators ? categoryResult : commonCategoryResult) &&
      searchResult
    );
  });
};

const getFirstUsableCategoryType = (categoryTypes, indicators) =>
  categoryTypes.find((categoryType) =>
    indicators.find((indicator) =>
      indicator.categories.find(({ type }) => type.id === categoryType.id)
    )
  );

interface Props {
  leadContent: IndicatorListPage['leadContent'];
  displayInsights: IndicatorListPage['displayInsights'];
  displayLevel: IndicatorListPage['displayLevel'];
}

const IndicatorList = ({
  leadContent,
  displayInsights,
  displayLevel,
}: Props) => {
  const plan = usePlan();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { loading, error, data } = useQuery<IndicatorListQuery>(
    GET_INDICATOR_LIST,
    {
      variables: {
        plan: plan.identifier,
        relatedPlanIndicators: includeRelatedPlanIndicators,
      },
    }
  );

  const getObjectFromSearchParams = (
    searchParams: ReadonlyURLSearchParams | null
  ) => (searchParams ? Object.fromEntries(searchParams) : {});

  const [filters, setFilters] = useState<Filters>(() =>
    getObjectFromSearchParams(searchParams)
  );

  const handleFilterChange = (id: string, val: FilterValue) => {
    setFilters((state) => {
      const newFilters = { ...state, [id]: val };
      updateSearchParams(newFilters);
      return newFilters;
    });
  };

  const hasInsights = (data) => {
    const { plan } = data;
    return plan.hasIndicatorRelationships === true;
  };

  const getIndicatorListProps = (data) => {
    const { plan, relatedPlanIndicators } = data;
    const displayMunicipality = plan.features.hasActionPrimaryOrgs === true;
    const displayNormalizedValues =
      undefined !==
      plan.indicatorLevels.find(
        (l) =>
          l.indicator?.common != null &&
          l.indicator.common.normalizations.length > 0
      );
    const generalContent = plan.generalContent || {};
    const { indicatorLevels, categoryTypes } = plan;

    const indicators = indicatorLevels.map((il) => {
      const { indicator, level } = il;
      return { ...indicator, level: level.toLowerCase() };
    });

    return {
      indicators,
      leadContent: generalContent.indicatorListLeadContent,
      displayMunicipality,
      displayNormalizedValues,
      relatedPlanIndicators: includeRelatedPlanIndicators
        ? relatedPlanIndicators
        : [],
    };
  };

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const indicatorListProps = getIndicatorListProps(data);

  const indicators = includeRelatedPlanIndicators
    ? indicatorListProps.relatedPlanIndicators
    : indicatorListProps.indicators;

  const commonCategories = collectCommonCategories(indicators);
  const hierarchy = processCommonIndicatorHierarchy(
    includeRelatedPlanIndicators
      ? indicatorListProps.relatedPlanIndicators
      : data?.planIndicators
  );
  const showInsights = (displayInsights ?? true) && hasInsights(data);

  const categoryType = getFirstUsableCategoryType(
    data?.plan?.categoryTypes,
    indicators
  );

  const filterConfig = categoryType
    ? getFilterConfig(
        categoryType,
        indicators,
        includeRelatedPlanIndicators ? commonCategories : []
      )
    : {};

  const filterSections: ActionListFilterSection[] =
    ActionListFilters.constructFilters({
      mainConfig: filterConfig,
      primaryOrgs: [],
      orgs: [],
      plan,
      filterByCommonCategory: false,
      t,
    });

  const filteredIndicators = filterIndicators(
    indicators,
    filters,
    categoryType?.identifier
  );

  return (
    <>
      <IndicatorsHero
        leadContent={leadContent || undefined}
        showInsights={showInsights}
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
          shouldDisplayCategory={(category: Category) =>
            category.type.id === categoryType?.id
          }
          displayLevel={displayLevel}
        />
      </Container>
    </>
  );
};

export default IndicatorList;
