import { IndicatorDesiredTrend } from '@/common/__generated__/graphql';
import dayjs from '@/common/dayjs';

import type { CategoryType, IndicatorListIndicator } from './IndicatorList';
import type { Hierarchy } from './process-indicators';

export type Sort = {
  key: string;
  direction: 'asc' | 'desc';
  categoryType?: CategoryType | null;
};

export type SortState = { key: 'name' | 'level'; direction: 'asc' | 'desc' } | null;

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
const dirFactor = (direction: 'asc' | 'desc') => (direction === 'desc' ? -1 : 1);

const compareLevelIndex = (a: IndicatorListIndicator, b: IndicatorListIndicator) => {
  if (!a.level || !b.level) return 0;
  const aIdx = levels[a.level]?.index ?? 0;
  const bIdx = levels[b.level]?.index ?? 0;
  return aIdx - bIdx;
};

export function sortIndicators(
  sortingOrder: Sort[],
  hierarchy: Hierarchy | null | undefined,
  indicators: IndicatorListIndicator[],
  displayMunicipality: boolean,
  sortState?: SortState
): IndicatorListIndicator[] {
  const isHierarchical = !!hierarchy && Object.keys(hierarchy).length > 0;
  const sortedIndicators = [...indicators];
  sortingOrder.forEach((rule) => {
    const dir = dirFactor(rule.direction);
    sortedIndicators.sort((a, b) => {
      switch (rule.key) {
        case 'level':
          return dir * compareLevelIndex(a, b);
        case 'name':
          return dir * a.name.localeCompare(b.name);
        case 'organization':
          return dir * a.organization.name.localeCompare(b.organization.name);
        case 'category': {
          if (!rule.categoryType) return 0;
          const categoryAId = a.categories.find((c) => c.type.id === rule.categoryType?.id)?.id;
          const categoryBId = b.categories.find((c) => c.type.id === rule.categoryType?.id)?.id;
          if (!categoryAId || !categoryBId) return 0;
          const orderA = rule.categoryType.categories.find((c) => c.id === categoryAId)?.order ?? 0;
          const orderB = rule.categoryType.categories.find((c) => c.id === categoryBId)?.order ?? 0;
          return dir * (orderA - orderB);
        }

        default:
          return 0;
      }
    });
  });

  if (displayMunicipality && !sortState) {
    sortedIndicators.sort((a, b) => a.organization.name.localeCompare(b.organization.name));
  }

  if (sortState) {
    const dir = dirFactor(sortState.direction);
    if (sortState.key === 'name') {
      sortedIndicators.sort((a, b) => dir * a.name.localeCompare(b.name));
    } else if (sortState.key === 'level') {
      sortedIndicators.sort((a, b) => dir * compareLevelIndex(a, b));
    }
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

type IndicatorGoalValue = IndicatorListIndicator['goals'][number];

type IndicatorDataValue =
  | IndicatorListIndicator['latestValue']
  | IndicatorListIndicator['referenceValue']
  | IndicatorListIndicator['values'][number]
  | IndicatorGoalValue
  | null
  | undefined;

export const getGoalValue = (
  goals: IndicatorListIndicator['goals'],
  defaultGoalYear: number | null
): IndicatorGoalValue | null => {
  if (!goals || goals.length === 0) {
    return null;
  }

  const now = dayjs();

  const validGoals = goals.filter(
    (goal): goal is NonNullable<IndicatorGoalValue> & { date: string } =>
      goal !== null && goal !== undefined && goal.date !== null && goal.date !== undefined
  );

  if (validGoals.length === 0) {
    return null;
  }

  if (defaultGoalYear === null || defaultGoalYear === undefined) {
    const nextGoal = validGoals.find((goal) => dayjs(goal.date).isSameOrAfter(now));
    return nextGoal || null;
  }

  const defaultGoalYearStart = dayjs(`${defaultGoalYear}-01-01`);
  const defaultGoalYearEnd = dayjs(`${defaultGoalYear}-12-31`).endOf('day');

  const goalOnYear = validGoals.find((goal) => {
    const goalDate = dayjs(goal.date);

    return (
      goalDate.isSameOrAfter(defaultGoalYearStart) &&
      (goalDate.isBefore(defaultGoalYearEnd) || goalDate.isSame(defaultGoalYearEnd))
    );
  });

  if (goalOnYear) {
    return goalOnYear;
  }

  const goalsBeforeYear = validGoals
    .filter((goal) => dayjs(goal.date).isBefore(defaultGoalYearStart))
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

  if (goalsBeforeYear.length > 0) {
    return goalsBeforeYear[0];
  }

  const goalsBetweenNowAndYear = validGoals.filter((goal) => {
    const goalDate = dayjs(goal.date);

    return (
      goalDate.isSameOrAfter(now) &&
      (goalDate.isBefore(defaultGoalYearEnd) || goalDate.isSame(defaultGoalYearEnd))
    );
  });

  if (goalsBetweenNowAndYear.length === 0) {
    const goalsAfterYear = validGoals
      .filter((goal) => dayjs(goal.date).isAfter(defaultGoalYearEnd))
      .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    if (goalsAfterYear.length > 0) {
      return goalsAfterYear[0];
    }
  }

  return validGoals[validGoals.length - 1];
};

const getNumberValue = (value: IndicatorDataValue, isNormalized: boolean): number | null => {
  if (!value) {
    return null;
  }

  if (isNormalized) {
    return value.normalizedValues?.[0]?.value ?? null;
  }

  return value.value ?? null;
};

export const determineDesirableDirection = (
  desiredTrend: IndicatorListIndicator['desiredTrend'] | null | undefined,
  values: IndicatorListIndicator['values'],
  goals: IndicatorListIndicator['goals']
): '+' | '-' | null => {
  if (desiredTrend === IndicatorDesiredTrend.Increasing) {
    return '+';
  }

  if (desiredTrend === IndicatorDesiredTrend.Decreasing) {
    return '-';
  }

  if (!values.length || !goals?.length) {
    return null;
  }

  const latestValue = values[values.length - 1];
  const latestGoal = goals[goals.length - 1];

  if (
    latestGoal?.value !== null &&
    latestGoal?.value !== undefined &&
    latestValue?.value !== null &&
    latestValue?.value !== undefined &&
    latestGoal.value - latestValue.value >= 0
  ) {
    return '+';
  }

  return '-';
};

export const isGoalAlreadyExceeded = (params: {
  currentValue: number;
  values: IndicatorListIndicator['values'];
  goals: IndicatorListIndicator['goals'];
  desiredTrend: IndicatorListIndicator['desiredTrend'] | null | undefined;
  defaultGoalYear: number | null;
  isNormalized: boolean;
}): boolean => {
  const { currentValue, values, goals, desiredTrend, defaultGoalYear, isNormalized } = params;

  const displayGoal = getGoalValue(goals, defaultGoalYear);

  if (!displayGoal) {
    return false;
  }

  const goalValue = getNumberValue(displayGoal, isNormalized);

  if (goalValue === null || !Number.isFinite(goalValue)) {
    return false;
  }

  const desirableDirection = determineDesirableDirection(desiredTrend, values, goals);

  if (!desirableDirection) {
    return false;
  }

  const difference = goalValue - currentValue;

  return desirableDirection === '+' ? difference <= 0 : difference >= 0;
};
