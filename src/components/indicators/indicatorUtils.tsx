import type { IndicatorListIndicator } from './IndicatorList';
import type { Hierarchy } from './process-indicators';

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

export function sortIndicators(
  hierarchy: Hierarchy | null | undefined,
  indicators: IndicatorListIndicator[],
  displayMunicipality: boolean
): IndicatorListIndicator[] {
  const isHierarchical = !!hierarchy && Object.keys(hierarchy).length > 0;
  const sortedIndicators = [...indicators]
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
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

export const indentationLevel: (item: IndicatorListIndicator, hierarchy: Hierarchy) => number = (
  item,
  hierarchy
) => {
  if (!item.common || !hierarchy[item.common.id]) {
    return 0;
  }
  return (hierarchy[item.common.id]?.path?.length ?? 1) - 1;
};
