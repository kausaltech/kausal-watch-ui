import type { CategoryType, IndicatorListIndicator } from './IndicatorList';
import type { Hierarchy } from './process-indicators';

export type Sort = {
  key: string;
  direction: 'asc' | 'desc';
  categoryType?: CategoryType | null;
};

export enum IndicatorTableColumnId {
  Name = 'name',
  TimeResolution = 'timeResolution',
  Level = 'level',
  Organization = 'organization',
  Common = 'common',
  LatestValue = 'latestValue',
  Dimensions = 'dimensions',
  Categories = 'categories',
}

export type IndicatorTableColumn = {
  id: IndicatorTableColumnId;
  label: string;
  categoryTypeId?: string;
};

const levels: Record<string, { fi: string; index: number }> = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

/**
 * Uses the common category hierarchy to split indicators into hierarchical and non-hierarchical groups.
 */
export function groupIndicatorsByHierarchy(
  indicators: IndicatorListIndicator[],
  hierarchy: Hierarchy
): {
  nonHierarchicalIndicators: IndicatorListIndicator[];
  hierarchicalIndicators: IndicatorListIndicator[];
} {
  return indicators.reduce(
    (groups, indicator) =>
      !!indicator.common && hierarchy[indicator.common.id]
        ? {
            ...groups,
            hierarchicalIndicators: [...groups.hierarchicalIndicators, indicator],
          }
        : {
            ...groups,
            nonHierarchicalIndicators: [...groups.nonHierarchicalIndicators, indicator],
          },
    {
      nonHierarchicalIndicators: [],
      hierarchicalIndicators: [],
    }
  );
}

/**
 * Uses the common category hierarchy to split indicators into hierarchical and non-hierarchical groups,
 * and then sort them separately.
 */
export function sortIndicators(
  sortingOrder: Sort[],
  hierarchy: Hierarchy | null | undefined,
  indicators: IndicatorListIndicator[],
  displayMunicipality: boolean
): IndicatorListIndicator[] {
  const isHierarchical = !!hierarchy && Object.keys(hierarchy).length > 0;
  const sortedIndicators = [...indicators];
  sortingOrder.forEach((sort) => {
    sortedIndicators.sort((a, b) => {
      if (sort.key === 'level') {
        if (!a.level || !b.level) {
          return 0;
        }
        if (levels[a.level].index < levels[b.level].index) {
          return -1;
        }
        if (levels[a.level].index > levels[b.level].index) {
          return 1;
        }
        return 0;
      }
      if (sort.key === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sort.key === 'organization') {
        return a.organization.name.localeCompare(b.organization.name);
      }
      if (sort.key === 'category') {
        if (!sort.categoryType) {
          return 0;
        }
        const categoryAId = a.categories.find((c) => c.type.id === sort.categoryType?.id)?.id;
        const categoryBId = b.categories.find((c) => c.type.id === sort.categoryType?.id)?.id;
        if (!categoryAId || !categoryBId) {
          return 0;
        }
        return (
          (sort.categoryType.categories.find((c) => c.id === categoryAId)?.order ?? 0) -
          (sort.categoryType.categories.find((c) => c.id === categoryBId)?.order ?? 0)
        );
      }
      return 0;
    });
  });

  if (displayMunicipality) {
    sortedIndicators.sort((a, b) => a.organization.name.localeCompare(b.organization.name));
  }

  /**
   * Split indicators that belong to a hierarchy (visualised as a tree in the table)
   * so that they can be sorted separately from non hierarchical indicators
   */
  const { nonHierarchicalIndicators, hierarchicalIndicators } = isHierarchical
    ? groupIndicatorsByHierarchy(sortedIndicators, hierarchy)
    : {
        nonHierarchicalIndicators: sortedIndicators,
        hierarchicalIndicators: [],
      };

  if (hierarchicalIndicators.length && hierarchy) {
    hierarchicalIndicators.sort((a, b) => {
      if (a.common == null || b.common == null) {
        return 0;
      }

      const pathA = hierarchy[a.common.id]?.path ?? [];
      const pathB = hierarchy[b.common.id]?.path ?? [];

      for (let i = 0; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] === pathB[i]) continue;

        return parseInt(pathA[i]) - parseInt(pathB[i]);
      }

      return pathA.length - pathB.length;
    });
  }

  if (!isHierarchical || !displayMunicipality) {
    return [...nonHierarchicalIndicators, ...hierarchicalIndicators];
  }

  const grouped = new Map<string, IndicatorListIndicator[]>();

  [...nonHierarchicalIndicators, ...hierarchicalIndicators].forEach((indicator) => {
    const commonId = indicator.common?.id;
    const group: IndicatorListIndicator[] | [] = grouped.get(commonId ?? '') ?? [];
    grouped.set(commonId ?? '', [...group, indicator]);
  });

  return Array.from(grouped.values()).flat();
}

/**
 * Calculates the indentation level of an indicator based on the common category hierarchy.
 */
export const indentationLevel: (item: IndicatorListIndicator, hierarchy: Hierarchy) => number = (
  item,
  hierarchy
) => {
  if (!item.common || !hierarchy[item.common.id]) {
    return 0;
  }
  return (hierarchy[item.common.id]?.path?.length ?? 1) - 1;
};

export const groupIndicatorsByCommonCategory = (
  indicators: IndicatorListIndicator[]
): Map<string, IndicatorListIndicator[]> => {
  const grouped = new Map<string, IndicatorListIndicator[]>();
  indicators.forEach((indicator) => {
    const commonId = indicator.common?.id;
    const group: IndicatorListIndicator[] | [] = grouped.get(commonId ?? '') ?? [];
    grouped.set(commonId ?? '', [...group, indicator]);
  });
  return grouped;
};
