/* Get total of specific cope for a specific year */
export const getScopeTotal = (node, scope, year) => {
  const emissionDimension = node.dimensions.find((dim) => dim.originalId === 'emission_scope');
  const scopeGroup = emissionDimension?.groups.find((group) => group.originalId === scope);
  const scopeConfigCats = {};
  if (emissionDimension && scopeGroup)
    scopeConfigCats[emissionDimension.id] = {
      groups: [scopeGroup.id],
      categories: scopeGroup?.categories.map((cat) => cat.id),
    };
  const scopeYear = node.getSingleYear(year, scopeConfigCats);
  const scopeYearTotal =
    scopeYear.rows[0] &&
    scopeYear.rows.reduce((partialSum, a) => (a ? partialSum + a[0] : partialSum), 0);
  return scopeYearTotal;
};

/* Get label for a emission scope */
export const getScopeLabel = (node, scope) => {
  const emissionDimension = node.dimensions.find((dim) => dim.originalId === 'emission_scope');
  const scopeGroup = emissionDimension?.groups.find((group) => group.originalId === scope);
  return scopeGroup?.label;
};
