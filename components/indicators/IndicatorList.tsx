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
  CategoryType,
  IndicatorListPage,
  IndicatorListQuery,
} from 'common/__generated__/graphql';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const getCategoriesFromTypes = (categoryTypes: CategoryType[]) =>
  categoryTypes.reduce(
    (categories, categoryType) => [...categories, ...categoryType.categories],
    []
  );

const getFilterConfig = (categoryType) => ({
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

const filterIndicators = (indicators, filters) =>
  indicators.filter(
    (item) =>
      (!filters['cat-theme'] ||
        item.categories.find(({ id }) => id === filters['cat-theme'])) &&
      (!filters['name'] ||
        item.name.toLowerCase().includes(filters['name'].toLowerCase()))
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

  const [filters, setFilters] = useState(router.query);

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

    const categories = getCategoriesFromTypes(categoryTypes);

    return {
      indicators,
      categories,
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
  const filterConfig = !!data?.plan?.categoryTypes[0]
    ? getFilterConfig(data.plan.categoryTypes[0])
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
    filters
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
          indicators={filteredIndicators}
          filters={filters}
          hierarchy={hierarchy}
        />
      </Container>
    </>
  );
};

export default IndicatorList;
