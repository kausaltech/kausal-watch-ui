interface MergedWithLike {
  identifier: string;
  plan: {
    id: string;
    shortName?: string | null;
    name?: string | null;
  };
}

export function getMergedName(mergedWith: MergedWithLike, planId: string): string {
  if (mergedWith.plan.id === planId) {
    return mergedWith.identifier;
  }

  const planLabel = mergedWith.plan.shortName || mergedWith.plan.name;

  return planLabel ? `${planLabel} ${mergedWith.identifier}` : mergedWith.identifier;
}
