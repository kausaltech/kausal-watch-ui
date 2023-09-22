import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from 'reactstrap';
import omitBy from 'lodash/omitBy';

import ContentLoader from '../common/ContentLoader';
import { usePlan } from '../../context/plan';
import { Meta } from '../layout';
import ErrorMessage from '../common/ErrorMessage';

import IndicatorsHero from './IndicatorsHero';
import IndicatorListFiltered, { isEmptyFilter } from './IndicatorListFiltered';
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
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getCategoryString } from 'common/categories';

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
  name: string;
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
  title: string;
  leadContent: IndicatorListPage['leadContent'];
}

const IndicatorList = ({ title, leadContent }: Props) => {
  const plan = usePlan();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { loading, error, data } = useQuery<IndicatorListQuery>(
    GET_INDICATOR_LIST,
    {
      variables: { plan: plan.identifier },
    }
  );

  const [filters, setFilters] = useState<Filters>(router.query);

  const handleFilterChange = (id: string, val: FilterValue) => {
    setFilters((state) => {
      const newFilters = { ...state, [id]: val };

      router.replace(
        { query: omitBy({ ...router.query, ...newFilters }, isEmptyFilter) },
        undefined,
        { scroll: false }
      );

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

  const processCommonIndicatorHierarchy = (planIndicators) => {
    const uniqueCommonIndicators = {};
    planIndicators.forEach((i) => {
      if (i.common != null && !(i.common.id in uniqueCommonIndicators)) {
        uniqueCommonIndicators[i.common.id] = i.common;
      }
    });
    const makeLinks = (commonIndicator) => ({
      id: commonIndicator.id,
      isRoot:
        commonIndicator.relatedEffects.filter((e) => e.effectType === 'PART_OF')
          .length === 0,
      children: commonIndicator.relatedCauses
        .filter((e) => e.effectType === 'PART_OF')
        .filter((e) => uniqueCommonIndicators[e.causalIndicator.id] != null)
        .map((e) => e.causalIndicator.id),
    });
    const processed = Object.fromEntries(
      Object.values(uniqueCommonIndicators).map((i) => [i.id, makeLinks(i)])
    );
    const expandPaths = (indicators, path) => {
      let descendants = [];
      indicators.forEach((indicator) => {
        const newPath = [...path, indicator.id];
        indicator.path = newPath;
        indicator.pathNames = newPath.map(
          (p) => uniqueCommonIndicators[p].name
        );
        indicator.descendants = expandPaths(
          indicator.children.map((c) => processed[c]),
          newPath
        );
        descendants = descendants.concat(indicator.descendants, [indicator.id]);
      });
      return descendants;
    };

    const rootIndicators = Object.values(processed).filter((i) => i.isRoot);
    if (rootIndicators.length === Object.keys(uniqueCommonIndicators).length) {
      // The hierarchy is flat because all the common indicators are root
      return {};
    }

    expandPaths(rootIndicators, []);
    return processed;
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
  const showInsights = hasInsights(data);

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
      <Meta title={title} />
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
