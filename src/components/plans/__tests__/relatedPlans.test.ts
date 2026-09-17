import {
  getRelatedPlansHeading,
  selectRelatedPlanCards,
  selectSwitcherPlans,
} from '../relatedPlans';

type TestRelatedPlan = {
  id: string;
  identifier: string;
  name: string;
  shortName: string | null;
  viewUrl: string | null;
  image: { rendition: { src: string } | null } | null;
};

function relatedPlan(id: string, overrides: Partial<TestRelatedPlan> = {}): TestRelatedPlan {
  return {
    id,
    identifier: `plan-${id}`,
    name: `Plan ${id}`,
    shortName: `P${id}`,
    viewUrl: `https://plan-${id}.example.org`,
    image: null,
    ...overrides,
  };
}

function testPlan({
  id = 'self',
  parent = null,
  children = [],
  allRelatedPlans = [],
  presentPlanHierarchyAsPeers = false,
  shortName = 'Self',
}: {
  id?: string;
  parent?: { id: string; name: string; viewUrl: string | null } | null;
  children?: { id: string }[];
  allRelatedPlans?: TestRelatedPlan[];
  presentPlanHierarchyAsPeers?: boolean;
  shortName?: string | null;
} = {}) {
  return {
    id,
    identifier: `plan-${id}`,
    name: `Plan ${id}`,
    shortName,
    viewUrl: `https://plan-${id}.example.org`,
    image: null,
    parent,
    children,
    allRelatedPlans,
    features: { presentPlanHierarchyAsPeers },
  };
}

const PARENT = { id: 'parent', name: 'Parent Plan', viewUrl: 'https://parent.example.org' };

describe('selectSwitcherPlans', () => {
  it('leaves out the parent plan by default', () => {
    const plan = testPlan({
      parent: PARENT,
      allRelatedPlans: [relatedPlan('parent'), relatedPlan('sibling')],
    });
    expect(selectSwitcherPlans(plan).map((pl) => pl.id)).toEqual(['sibling']);
  });

  it('lists the parent plan when the plan presents its hierarchy as peers', () => {
    const plan = testPlan({
      parent: PARENT,
      allRelatedPlans: [relatedPlan('parent'), relatedPlan('sibling')],
      presentPlanHierarchyAsPeers: true,
    });
    expect(selectSwitcherPlans(plan).map((pl) => pl.id)).toEqual(['parent', 'sibling']);
  });

  it('leaves out the plan itself and plans without a view URL', () => {
    const plan = testPlan({
      allRelatedPlans: [
        relatedPlan('self'),
        relatedPlan('unreachable', { viewUrl: null }),
        relatedPlan('sibling'),
      ],
    });
    expect(selectSwitcherPlans(plan).map((pl) => pl.id)).toEqual(['sibling']);
  });
});

describe('selectRelatedPlanCards', () => {
  it('shows a child plan alongside its siblings, without the parent', () => {
    const plan = testPlan({
      parent: PARENT,
      allRelatedPlans: [relatedPlan('parent'), relatedPlan('sibling')],
    });
    expect(selectRelatedPlanCards(plan).map((pl) => pl.id)).toEqual(['self', 'sibling']);
  });

  it('shows the parent as one more card when the plan presents its hierarchy as peers', () => {
    const plan = testPlan({
      parent: PARENT,
      allRelatedPlans: [relatedPlan('parent'), relatedPlan('sibling')],
      presentPlanHierarchyAsPeers: true,
    });
    expect(selectRelatedPlanCards(plan).map((pl) => pl.id)).toEqual(['self', 'parent', 'sibling']);
  });

  it('shows only the children of a parent plan by default', () => {
    const plan = testPlan({
      children: [{ id: 'child' }],
      allRelatedPlans: [relatedPlan('child')],
    });
    expect(selectRelatedPlanCards(plan).map((pl) => pl.id)).toEqual(['child']);
  });

  it('adds a parent plan itself to its children when it presents its hierarchy as peers', () => {
    const plan = testPlan({
      children: [{ id: 'child' }],
      allRelatedPlans: [relatedPlan('child')],
      presentPlanHierarchyAsPeers: true,
    });
    expect(selectRelatedPlanCards(plan).map((pl) => pl.id)).toEqual(['self', 'child']);
  });

  it('uses the square rendition for the plan itself', () => {
    const plan = {
      ...testPlan({ allRelatedPlans: [relatedPlan('sibling')] }),
      image: { square: { src: 'square.png' }, rendition: { src: 'card.png' } },
    };
    expect(selectRelatedPlanCards(plan)[0].image?.rendition?.src).toBe('square.png');
  });

  it('leaves out plans without a view URL', () => {
    const plan = testPlan({
      allRelatedPlans: [relatedPlan('unreachable', { viewUrl: null }), relatedPlan('sibling')],
    });
    expect(selectRelatedPlanCards(plan).map((pl) => pl.id)).toEqual(['self', 'sibling']);
  });
});

describe('getRelatedPlansHeading', () => {
  it('names the parent plan and links to it for a child plan', () => {
    const plan = testPlan({ parent: PARENT, allRelatedPlans: [relatedPlan('parent')] });
    expect(getRelatedPlansHeading(plan)).toEqual({
      text: 'Parent Plan',
      href: 'https://parent.example.org',
    });
  });

  it('names the plan itself when the plan presents its hierarchy as peers', () => {
    const plan = testPlan({
      parent: PARENT,
      allRelatedPlans: [relatedPlan('parent')],
      presentPlanHierarchyAsPeers: true,
    });
    expect(getRelatedPlansHeading(plan)).toEqual({ text: 'Self', href: undefined });
  });

  it('names the plan itself when there is no parent', () => {
    expect(getRelatedPlansHeading(testPlan())).toEqual({ text: 'Self', href: undefined });
  });

  it('prefers a heading set on the block itself, unlinked', () => {
    const plan = testPlan({ parent: PARENT, allRelatedPlans: [relatedPlan('parent')] });
    expect(getRelatedPlansHeading(plan, 'Liittyvät ohjelmat')).toEqual({
      text: 'Liittyvät ohjelmat',
      href: undefined,
    });
  });

  it('ignores an empty heading set on the block', () => {
    const plan = testPlan({ parent: PARENT, allRelatedPlans: [relatedPlan('parent')] });
    expect(getRelatedPlansHeading(plan, '')).toEqual({
      text: 'Parent Plan',
      href: 'https://parent.example.org',
    });
  });

  it('falls back to the long name when the plan has no short name', () => {
    expect(getRelatedPlansHeading(testPlan({ shortName: null }))).toEqual({
      text: 'Plan self',
      href: undefined,
    });
  });
});
