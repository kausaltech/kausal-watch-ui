import type { IndicatorListIndicator } from './IndicatorList';

export type Hierarchy = {
  [key: string]: {
    id: string;
    isRoot: boolean;
    children: string[];
    path: string[];
  };
};

export type Indicators = {
  id: string;
  name: string;
  level: string;
  organization: {
    name: string;
  };
  common: {
    id: string;
  };
}[];

const levels: Record<string, { fi: string; index: number }> = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

export function groupIndicatorsByHierarchy(
  indicators: Indicators,
  hierarchy: Hierarchy
): {
  nonHierarchicalIndicators: Indicators;
  hierarchicalIndicators: Indicators;
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
  indicators: Indicators,
  displayMunicipality: boolean
): Indicators {
  const isHierarchical = !!hierarchy && Object.keys(hierarchy).length > 0;

  const sortedIndicators = [...indicators]
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
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

  const grouped = new Map<string, Indicators>();

  [...nonHierarchicalIndicators, ...hierarchicalIndicators].forEach((indicator) => {
    const commonId = indicator.common?.id;
    const group: Indicators | [] = grouped.get(commonId) ?? [];
    grouped.set(commonId, [...group, indicator]);
  });

  return Array.from(grouped.values()).flat();
}
