export function constructOrgHierarchy(orgsIn, actions) {
  const orgsById = new Map();
  const skipOrgs = ['Hallitus', 'Valtuusto', 'Lautakunta', 'Jaosto'];

  function isSkippedOrg(org) {
    if (!org.classification) return false;
    return skipOrgs.indexOf(org.classification.name) >= 0;
  }

  let orgs = orgsIn.map((org) => {
    const newOrg = { ...org, children: [] };
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
    if (org.children.length) return;

    let actionCount = 0;
    let contactPersonCount = 0;
    while (org) {
      org.descendantActionCount = (org.descendantActionCount || 0) + actionCount;
      org.descedantContactPersonCount = (org.descedantContactPersonCount || 0) + contactPersonCount;
      if (org.actionCount) actionCount += org.actionCount;
      if (org.contactPersonCount) contactPersonCount += org.contactPersonCount;
      org = org.parent;
    }
  });

  actions.forEach((action) => {
    action.responsibleParties.forEach((rp) => {
      rp.organization = orgsById.get(rp.organization.id);
    });
  });

  return orgs;
}

export function orgHasActions(org) {
  if (org.actionCount || org.descendantActionCount) return true;
  return false;
}
