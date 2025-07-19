/**
 * TODO:    This function is tricky to follow because `processed` is mutated
 *          implicitly when calling `expandPaths`. This should be refactored
 *          or rewritten when implementing the next larger indicator page updates.
 */
export const processCommonIndicatorHierarchy = (planIndicators) => {
  const uniqueCommonIndicators = {};
  planIndicators.forEach((i) => {
    if (i.common != null && !(i.common.id in uniqueCommonIndicators)) {
      uniqueCommonIndicators[i.common.id] = i.common;
    }
  });
  const makeLinks = (commonIndicator) => ({
    id: commonIndicator.id,
    isRoot:
      commonIndicator.relatedEffects
        .filter((e) => e.effectType === 'PART_OF')
        .filter((e) => uniqueCommonIndicators[e.effectIndicator.id] != null).length === 0,
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
      indicator.pathNames = newPath.map((p) => uniqueCommonIndicators[p].name);
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
