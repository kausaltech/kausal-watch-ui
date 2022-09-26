
export interface CategoryInput {
  id: string,
  parent?: {
    id: string,
  },
}

export interface CategoryTypeInput {
  id: string,
  categories: CategoryInput[],
}

export interface CategoryHierarchyMember<CTType> extends Omit<CategoryInput, 'parent' | 'type'> {
  depth: number,
  parent: null | this,
  children: this[],
  type: CTType,
};

export interface CategoryTypeHierarchy<CatType> extends Omit<CategoryTypeInput, 'categories'> {
  categories: CatType[],
}

export function constructCatHierarchy<
  CatType extends CategoryHierarchyMember<CTType>,
  CTType extends CategoryTypeHierarchy<CatType>,
>(
  ctsIn: CategoryTypeInput[],
) {
  const objsById: Map<string, CatType> = new Map();
  const ctsById = new Map()

  let cts: CTType[] = ctsIn.map((ctIn) => {
    // @ts-ignore
    const ct: CTType = {
      ...ctIn,
    }
    ct.categories = ctIn.categories.map((cat) => {
      // @ts-ignore
      const newCat: CatType = {
        ...cat,
        type: ct,
        children: [],
      };
      objsById.set(newCat.id, newCat);
      return newCat;
    });

    ctsById.set(ct.id, ct);
    return ct;
  });
  objsById.forEach((cat) => {
    const parent = cat.parent ? objsById.get(cat.parent.id) : null;
    if (!parent) return;
    parent.children.push(cat);
    cat.parent = parent;
  });
  objsById.forEach((cat) => {
    let parent = cat.parent;
    let depth = 0;
    while (parent) {
      depth += 1;
      parent = parent.parent;
    }
    cat.depth = depth;
  });
  return cts;
}


export interface CategoryMappedAction<
  CT extends CategoryTypeHierarchy<Cat>,
  Cat extends CategoryHierarchyMember<CT>
> {
  primaryRootCategory: Cat | null,
  categories: Cat[]
}

export interface CategoryMappedActionInput {
  categories: {
    id: string,
  }[]
}

export function mapActionCategories<
  CT extends CategoryTypeHierarchy<Cat>,
  Cat extends CategoryHierarchyMember<CT>,
  ActionType extends CategoryMappedAction<CT, Cat>,
>(
  actions: CategoryMappedActionInput[], cts: CategoryTypeHierarchy<Cat>[],
  primaryRootCT: CT = null,
) {
  const cats = cts.map((ct) => ct.categories).flat();
  const catsById: Map<string, Cat> = new Map(
    cats.map(cat => [cat.id, cat])
  );
  const mappedActions: ActionType[] = actions.map((action) => {
    let primaryRootCategory;
    const cats: ActionType['categories'] = action.categories.map((cat) => {
      const catObj = catsById.get(cat.id);
      if (primaryRootCT && catObj.type.id == primaryRootCT.id) {
        let root = catObj;
        while (root.parent) root = root.parent;
        primaryRootCategory = root;
      }
      return catObj;
    });
    // @ts-ignore
    const mappedAction: ActionType = {...action, categories: cats, primaryRootCategory};
    return mappedAction;
  });
  return mappedActions;
}
