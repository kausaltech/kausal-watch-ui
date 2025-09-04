export interface OrganizationInput {
  id: string;
  classification?: {
    name: string;
  } | null;
  parent?: {
    id: string;
  } | null;
  actionCount: number;
  contactPersonCount: number;
}

export interface OrganizationHierarchyMember<OrgT extends Omit<OrganizationInput, 'parent'>> {
  descendantActionCount: number;
  descendantContactPersonCount: number;
  depth: number;
  parent: null | (OrgT & OrganizationHierarchyMember<OrgT>);
  children: (OrgT & OrganizationHierarchyMember<OrgT>)[];
}

export type OrganizationWithHierarchy<OrgT extends OrganizationInput> = OrgT &
  OrganizationHierarchyMember<OrgT>;

export function constructOrgHierarchy<OrgT extends OrganizationInput>(
  orgsIn: OrgT[]
): OrganizationWithHierarchy<OrgT>[] {
  const orgsById = new Map<string, OrganizationWithHierarchy<OrgT>>();
  const skipClasses = ['Hallitus', 'Valtuusto', 'Lautakunta', 'Jaosto'];

  function isSkippedOrg(org: OrganizationWithHierarchy<OrgT>) {
    if (!org.classification) return false;
    return skipClasses.indexOf(org.classification.name) >= 0;
  }

  let orgs = orgsIn.map((org) => {
    const newOrg = {
      ...org,
      parent: org.parent ?? null,
      children: [],
      descendantActionCount: 0,
      descendantContactPersonCount: 0,
      depth: 0,
    } as OrganizationWithHierarchy<OrgT>;
    orgsById.set(newOrg.id, newOrg);
    return newOrg;
  });
  orgs.forEach((org) => {
    if (!org.parent) return;
    // Check if org or its parents is one of the skipped organization types
    // and yank them out of the org hierarchy
    if (isSkippedOrg(org)) return;
    let parent = orgsById.get(org.parent.id)!;
    while (isSkippedOrg(parent)) {
      if (!parent.parent) break;
      parent = orgsById.get(parent.parent.id)!;
    }
    parent.children.push(org);
    org.parent = parent;
  });

  // Filter out skipped orgs
  orgs = orgs.filter((org) => !isSkippedOrg(org));

  // Calculate action and contact person counts for descendants
  orgs.forEach((org) => {
    let parent = org.parent;
    let depth = 0;
    while (parent) {
      depth += 1;
      parent = parent.parent;
    }
    org.depth = depth;
    if (org.children.length) return;

    let actionCount = 0;
    let contactPersonCount = 0;
    let orgIter: typeof org | null = org;
    while (orgIter) {
      orgIter.descendantActionCount += actionCount;
      orgIter.descendantContactPersonCount += contactPersonCount;
      if (orgIter.actionCount) actionCount += orgIter.actionCount;
      if (orgIter.contactPersonCount) contactPersonCount += orgIter.contactPersonCount;
      orgIter = orgIter.parent;
    }
  });
  return orgs;
}

export interface OrgMappedAction<OrgT extends OrganizationInput> {
  responsibleParties: {
    organization: OrganizationWithHierarchy<OrgT>;
  }[];
}

export interface ActionInput {
  responsibleParties: {
    organization: {
      id: string;
    };
  }[];
}

export function mapResponsibleParties<
  ActionType extends ActionInput,
  OrgType extends OrganizationInput,
>(actions: ActionType[], orgs: OrganizationWithHierarchy<OrgType>[]) {
  const orgsById = new Map(orgs.map((org) => [org.id, org]));
  const mappedActions = actions.map((action) => {
    const rps = action.responsibleParties.map((rp) => {
      const organization = orgsById.get(rp.organization.id)!;
      const mappedRp: OrgMappedAction<OrgType>['responsibleParties'][0] = {
        ...rp,
        organization,
      };
      return mappedRp satisfies OrgMappedAction<OrgType>['responsibleParties'][0];
    });
    const mappedAction: OrgMappedAction<OrgType> = { ...action, responsibleParties: rps };
    return mappedAction;
  });
  return mappedActions as (ActionType & OrgMappedAction<OrgType>)[];
}

export function orgHasActions<Type extends OrganizationInput>(
  org: OrganizationWithHierarchy<Type>
) {
  if (org.actionCount || org.descendantActionCount) return true;
  return false;
}
