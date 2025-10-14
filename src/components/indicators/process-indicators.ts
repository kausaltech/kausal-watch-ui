/**
 * TODO:    This function is tricky to follow because `processed` is mutated
 *          implicitly when calling `expandPaths`. This should be refactored
 *          or rewritten when implementing the next larger indicator page updates.
 */
import { RelatedCommonIndicatorEffectType } from '@/common/__generated__/graphql';

import type { IndicatorListIndicator } from './IndicatorList';

export type Hierarchy = {
  [key: string]: {
    id: string;
    isRoot: boolean;
    children: string[];
    path?: string[];
    // Doesn't seem to be used
    pathNames?: string[];
  };
};

export const processCommonIndicatorHierarchy = (
  planIndicators: IndicatorListIndicator[]
): Hierarchy => {
  const uniqueCommonIndicators: { [key: string]: IndicatorListIndicator['common'] } = {};

  planIndicators.forEach((i) => {
    if (i.common != null && !(i.common.id in uniqueCommonIndicators)) {
      uniqueCommonIndicators[i.common.id] = i.common;
    }
  });

  const makeLinks = (commonIndicator: IndicatorListIndicator['common']) => {
    if (commonIndicator == null) {
      return null;
    }
    return {
      id: commonIndicator.id,
      isRoot:
        commonIndicator.relatedEffects
          .filter((e) => e.effectType === RelatedCommonIndicatorEffectType.PartOf)
          .filter((e) => uniqueCommonIndicators[e.effectIndicator.id] != null).length === 0,
      children: commonIndicator.relatedCauses
        .filter((e) => e.effectType === RelatedCommonIndicatorEffectType.PartOf)
        .filter((e) => uniqueCommonIndicators[e.causalIndicator.id] != null)
        .map((e) => e.causalIndicator.id),
    };
  };

  const processedHierarchy: Hierarchy = Object.fromEntries(
    Object.values(uniqueCommonIndicators)
      .filter((i) => i != null)
      .map((i) => [i.id, makeLinks(i)])
      .filter(([, v]) => v !== null) as [string, NonNullable<ReturnType<typeof makeLinks>>][]
  );

  const expandPaths = (indicators, path) => {
    let descendants = [];
    indicators.forEach((indicator) => {
      const newPath = [...path, indicator.id];
      indicator.path = newPath;
      indicator.pathNames = newPath.map((p) => uniqueCommonIndicators[p].name);
      indicator.descendants = expandPaths(
        indicator.children.map((c) => processedHierarchy[c]),
        newPath
      );

      descendants = descendants.concat(indicator.descendants, [indicator.id]);
    });
    return descendants;
  };

  const rootIndicators = Object.values(processedHierarchy).filter((i) => i.isRoot);

  if (rootIndicators.length === Object.keys(uniqueCommonIndicators).length) {
    // The hierarchy is flat because all the common indicators are root
    return {};
  }

  expandPaths(rootIndicators, []);

  return processedHierarchy;
};
