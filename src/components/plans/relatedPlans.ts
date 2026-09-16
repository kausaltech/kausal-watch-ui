/**
 * Which plans the public UI presents next to the current one, in the plan
 * switcher and in the related plans block.
 *
 * A plan with a parent is normally presented as belonging to it: the parent is
 * reachable via the site logo rather than the switcher, and the related plans
 * block uses the parent's name as its heading. Plans whose parent is really a
 * peer rather than an umbrella can opt out of that with the
 * `showParentPlanAsSibling` feature, which lists the parent alongside the
 * siblings in both places.
 */

/** The fields both the switcher and the block read off a related plan. */
export interface RelatedPlanLike {
  id: string;
  identifier: string;
  name: string;
  shortName?: string | null;
  viewUrl?: string | null;
  image?: { rendition?: { src: string } | null } | null;
}

export interface PlanLike<TRelated extends RelatedPlanLike = RelatedPlanLike> {
  id: string;
  identifier: string;
  name: string;
  shortName?: string | null;
  viewUrl?: string | null;
  image?: { square?: { src: string } | null } | null;
  parent?: { id: string; name: string; viewUrl?: string | null } | null;
  children: { id: string }[];
  allRelatedPlans: TRelated[];
  features: { showParentPlanAsSibling: boolean };
}

function isDisplayable(plan: RelatedPlanLike | null | undefined): plan is RelatedPlanLike {
  // Both the switcher entry and the card are links, and neither renders
  // anything without a URL to point at.
  return !!plan && !!plan.viewUrl;
}

function relatedPlansToShow<TRelated extends RelatedPlanLike>(
  plan: PlanLike<TRelated>
): TRelated[] {
  const hideParent = !plan.features.showParentPlanAsSibling && !!plan.parent;
  return plan.allRelatedPlans.filter(
    (pl) => isDisplayable(pl) && pl.id !== plan.id && !(hideParent && pl.id === plan.parent?.id)
  );
}

/** The plans the plan switcher offers to switch to. */
export function selectSwitcherPlans<TRelated extends RelatedPlanLike>(
  plan: PlanLike<TRelated>
): TRelated[] {
  return relatedPlansToShow(plan);
}

/**
 * The cards the related plans block shows.
 *
 * A plan presented as belonging to a parent lists itself among its siblings,
 * since the parent is already named in the heading. A parent plan normally
 * lists its children only, for the same reason -- unless it presents its own
 * children as peers, in which case it belongs in the row as well.
 */
export function selectRelatedPlanCards<TRelated extends RelatedPlanLike>(
  plan: PlanLike<TRelated>
): RelatedPlanLike[] {
  const related = relatedPlansToShow(plan);
  const isUmbrellaHeading = plan.children.length > 0 && !plan.features.showParentPlanAsSibling;
  if (isUmbrellaHeading) {
    return related;
  }
  // The plan's own default rendition is a non-square card image, so swap in
  // the square one to match the avatars of the other plans.
  const self: RelatedPlanLike = {
    id: plan.id,
    identifier: plan.identifier,
    name: plan.name,
    shortName: plan.shortName,
    viewUrl: plan.viewUrl,
    image: plan.image?.square ? { rendition: plan.image.square } : null,
  };
  return [self, ...related];
}

/**
 * The heading of the related plans block, and what it links to.
 *
 * `blockHeading` is what the editor typed into the block, and wins when set.
 * It is a heading of the editor's own choosing rather than a plan's name, so
 * it links nowhere.
 */
export function getRelatedPlansHeading(
  plan: PlanLike,
  blockHeading?: string | null
): { text: string; href: string | undefined } {
  if (blockHeading) {
    return { text: blockHeading, href: undefined };
  }
  const parent = plan.parent;
  if (parent && !plan.features.showParentPlanAsSibling) {
    return { text: parent.name, href: parent.viewUrl ?? undefined };
  }
  return { text: plan.shortName || plan.name, href: undefined };
}
