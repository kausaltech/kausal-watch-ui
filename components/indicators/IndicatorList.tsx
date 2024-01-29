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

const getFilterConfig = (categoryType, indicators) => ({
  mainFilters: [
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
  ],
  primaryFilters: [],
  advancedFilters: [],
});

const GET_INDICATOR_LIST = gql`
  query IndicatorList($plan: ID!) {
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
        }
      }
    }
    planIndicators(plan: $plan) {
      id
      relatedCauses {
        id
        causalIndicator {
          id
        }
        effectIndicator {
          id
        }
        effectType
      }
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
  const filterByCategory = (indicator) =>
    !categoryIdentifier ||
    !filters[getCategoryString(categoryIdentifier)] ||
    !!indicator.categories.find(
      ({ type, id }) => filters[getCategoryString(type.identifier)] === id
    );

  const filterBySearch = (indicator) =>
    !filters['name'] ||
    indicator.name.toLowerCase().includes(filters['name'].toLowerCase());

  return indicators.filter(
    (indicator) => filterByCategory(indicator) && filterBySearch(indicator)
  );
};

/**
 * IndicatorListFiltered currently only accepts and displays a single category type,
 * so we use the first usableForIndicators category type which has associated indicators.
 */
const getFirstUsableCategoryType = (categoryTypes, indicators) =>
  categoryTypes.find((categoryType) =>
    indicators.find((indicator) =>
      indicator.categories.find(({ type }) => type.id === categoryType.id)
    )
  );

interface Props {
  leadContent: IndicatorListPage['leadContent'];
  displayInsights: IndicatorListPage['displayInsights'];
}

const IndicatorList = ({ leadContent, displayInsights }: Props) => {
  const plan = usePlan();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { loading, error, data } = useQuery<IndicatorListQuery>(
    GET_INDICATOR_LIST,
    {
      variables: { plan: plan.identifier },
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
    const { planIndicators } = data;
    // Check if any of the indicators has causality link
    return (
      planIndicators.find((indicator) => {
        return (
          indicator.relatedCauses?.find(
            (effect) => effect.effectType !== 'PART_OF'
          ) !== undefined
        );
      }) !== undefined
    );
  };

  const getIndicatorListProps = (data) => {
    const { plan } = data;
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
    };
  };

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const indicatorListProps = getIndicatorListProps(data);
  const hierarchy = processCommonIndicatorHierarchy(data?.planIndicators);
  const showInsights = (displayInsights ?? true) && hasInsights(data);

  const categoryType = getFirstUsableCategoryType(
    data?.plan?.categoryTypes,
    indicatorListProps.indicators
  );

  const filterConfig = categoryType
    ? getFilterConfig(categoryType, indicatorListProps.indicators)
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
    indicatorListProps.indicators,
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
        />
      </Container>
    </>
  );
};

export default IndicatorList;
