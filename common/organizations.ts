
export interface OrganizationInput<Type> {
  id: string,
  classification?: {
    name: string,
  },
  parent?: {
    id: string
  },
  actionCount: number,
  contactPersonCount: number,
};

export interface OrganizationHierarchyMember<Type> extends Omit<OrganizationInput<Type>, 'parent'> {
  descendantActionCount: number,
  descendantContactPersonCount: number,
  depth: number,
  parent: null | this,
  children: this[],
};

export function constructOrgHierarchy<Type extends OrganizationHierarchyMember<Type>>(
  orgsIn: OrganizationInput<Type>[]
) {
  const orgsById = new Map();
  const skipClasses = ['Hallitus', 'Valtuusto', 'Lautakunta', 'Jaosto'];

  function isSkippedOrg(org: OrganizationInput<Type>) {
    if (!org.classification) return false;
    return skipClasses.indexOf(org.classification.name) >= 0;
  }

  let orgs: Type[] = orgsIn.map((org) => {
    // @ts-ignore
    const newOrg: Type = {
      ...org,
      children: [],
      descendantActionCount: 0,
      descendantContactPersonCount: 0,
      depth: 0,
    };
    orgsById.set(newOrg.id, newOrg);
    return newOrg;
  });
  orgs.forEach((org) => {
    if (!org.parent) return;
    // Check if org or its parents is one of the skipped organization types
    // and yank them out of the org hierarchy
    if (isSkippedOrg(org)) return;
    let parent = orgsById.get(org.parent.id);
    while (isSkippedOrg(parent)) {
      parent = orgsById.get(parent.parent.id);
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
    while (org) {
      org.descendantActionCount += actionCount;
      org.descendantContactPersonCount += contactPersonCount;
      if (org.actionCount) actionCount += org.actionCount;
      if (org.contactPersonCount) contactPersonCount += org.contactPersonCount;
      org = org.parent;
    }
  });
  return orgs;
}


export interface OrgMappedAction<OrgType extends OrganizationHierarchyMember<OrgType>> {
  responsibleParties: {
    organization: OrgType
  }[]
}

export interface ActionInput {
  responsibleParties: {
    organization: {
      id: string,
    }
  }[]
}

export function mapResponsibleParties<
  ActionType extends OrgMappedAction<OrgType>,
  OrgType extends OrganizationHierarchyMember<OrgType>
>(
  actions: ActionInput[], orgs: OrgType[]
) {
  const orgsById = new Map(orgs.map((org) => [org.id, org]));
  const mappedActions: ActionType[] = actions.map((action) => {
    const rps = action.responsibleParties.map((rp) => {
      const organization = orgsById.get(rp.organization.id);
      const mappedRp: ActionType['responsibleParties'][0] = {
        ...rp,
        organization
      }
      return mappedRp;
    });
    const mappedAction: ActionType = {...action, responsibleParties: rps};
    return mappedAction;
  });
  return mappedActions;
}

export function orgHasActions<Type>(org: OrganizationHierarchyMember<Type>) {
  if (org.actionCount || org.descendantActionCount) return true;
  return false;
}
