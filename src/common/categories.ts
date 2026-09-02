import type { TCrumb } from '@/components/common/Breadcrumbs';

import type { PlanContextFragment } from './__generated__/graphql';

/**
 * Minimal structural shape of a category required by the helpers below.
 * (The generated GraphQL module no longer exports raw schema types.)
 */
export type Category = {
  id: string;
  identifier?: string | null;
  name: string;
  categoryPage?: { urlPath: string } | null;
  parent?: Category | null;
};

export interface CategoryInput {
  id: string;
  identifier?: string | null;
  name?: string;
  parent?: {
    id: string;
    common?: { id: string; identifier?: string; name?: string } | null;
  } | null;
  common?: { id: string; identifier?: string; name?: string; __typename?: string } | null;
}

export interface CategoryTypeInput {
  id: string;
  identifier?: string;
  __typename?: string;
  common?: { id?: string; identifier?: string; name?: string; __typename?: string } | null;
  categories: CategoryInput[];
}

export interface CategoryHierarchyMember<CTType> extends Omit<CategoryInput, 'parent' | 'type'> {
  depth: number;
  parent: null | this;
  children: this[];
  type: CTType;
}

export interface CategoryTypeHierarchy<CatType> extends Omit<CategoryTypeInput, 'categories'> {
  categories: CatType[];
}

export function constructCatHierarchy<
  CatType extends CategoryHierarchyMember<CTType>,
  CTType extends CategoryTypeHierarchy<CatType>,
>(ctsIn: CategoryTypeInput[], mapToCommonCategories: boolean = false) {
  const objsById: Map<string, CatType> = new Map();
  const ctsById = new Map();

  const cts: CTType[] = ctsIn
    .filter((ctIn) => mapToCommonCategories === false || ctIn.common != null)
    .map((ctIn) => {
      // The filter above guarantees `common` exists when mapping to common categories
      const categoryOrCommonCategoryType = (mapToCommonCategories ? ctIn.common : ctIn) ?? ctIn;
      const ct = {
        ...categoryOrCommonCategoryType,
      } as CTType;
      ct.categories = ctIn.categories.flatMap((cat) => {
        // Some categories don't have a common mapping.
        const categoryOrCommon = mapToCommonCategories ? cat.common : cat;
        if (!categoryOrCommon) return [];
        const newCat = {
          ...categoryOrCommon,
          type: ct,
          children: [],
        } as unknown as CatType;
        // Parents are provisionally plain ids; they are replaced with the real
        // hierarchy objects below.
        if (mapToCommonCategories) {
          newCat.parent = (cat.parent?.common ?? null) as CatType | null;
        } else {
          newCat.parent = (cat.parent ?? null) as CatType | null;
        }
        objsById.set(newCat.id, newCat);
        return [newCat];
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
  Cat extends CategoryHierarchyMember<CT>,
> {
  primaryCategories: Cat[] | null;
  categories: Cat[];
}

export interface CategoryMappedActionInput {
  categories: {
    id: string;
    common?: {
      id: string;
    } | null;
  }[];
}

export function mapActionCategories<
  CT extends CategoryTypeHierarchy<Cat>,
  Cat extends CategoryHierarchyMember<CT>,
  ActionType extends CategoryMappedAction<CT, Cat>,
>(
  actions: CategoryMappedActionInput[],
  categoryTypes: CategoryTypeHierarchy<Cat>[],
  primaryRootCT: CT | null = null,
  depth: number,
  useCommonCategories: boolean = primaryRootCT?.__typename === 'CommonCategoryType'
) {
  const categories = categoryTypes.map((ct) => ct.categories).flat();

  const categoriesById: Map<string, Cat> = new Map(categories.map((c) => [c.id, c]));
  const mappedActions: ActionType[] = actions.map((action) => {
    let actionPrimaryCategories: Cat[] = [];
    const actionCategories = action.categories
      .map((cat) => {
        const category = useCommonCategories ? cat.common : cat;
        if (!category) return null;
        const catObj = categoriesById.get(category.id);
        if (!catObj) return null;
        if (primaryRootCT && catObj.type.identifier === primaryRootCT.identifier) {
          const categoryPath: Cat[] = [];
          let root = catObj;
          categoryPath.unshift(root);
          while (root.parent) {
            root = root.parent;
            categoryPath.unshift(root);
          }
          if (depth > categoryPath.length) depth = categoryPath.length;
          actionPrimaryCategories = categoryPath.slice(0, depth);
        }
        return catObj;
      })
      .filter((cat) => cat != null);
    const mappedAction = {
      ...action,
      categories: actionCategories,
      primaryCategories: actionPrimaryCategories,
    } as unknown as ActionType;
    return mappedAction;
  });
  return mappedActions;
}

/**
 * Format category identifier for query parameters
 */
export const getCategoryString = (catIdentifier: string) => `cat-${catIdentifier}`;

export const MAX_CRUMB_LENGTH = 90;

export const isIdentifierVisible = (category: Category, showIdentifiers: boolean): boolean =>
  !!(category.categoryPage && category.identifier && showIdentifiers);

export const getCategoryName = (category: Category, showIdentifiers: boolean) =>
  category.categoryPage && category.identifier && showIdentifiers
    ? `${category.identifier}. ${category.name}`
    : category.name;

export const getCategoryUrl = (
  category: Category,
  primaryCategory?: PlanContextFragment['primaryActionClassification']
) => {
  if (category.categoryPage) {
    return category.categoryPage.urlPath;
  }

  if (primaryCategory) {
    return `/actions?cat-${primaryCategory.identifier}=${category.id}`;
  }

  return undefined;
};

// Convert a category parent hierarchy to a flat array
export const getDeepParents = <T extends { parent?: T | null }>(category: T): T[] =>
  !category.parent ? [category] : [...getDeepParents(category.parent), category];

/**
 * Converts a category with nested parents to a flat array ofr
 * parents starting with the top-level parent category.
 */
export const getBreadcrumbsFromCategoryHierarchy = (
  categories: Category[],
  showIdentifiers: boolean,
  primaryCategory?: PlanContextFragment['primaryActionClassification']
): TCrumb[] | null | undefined =>
  categories
    .reduce<Category[]>(
      // Convert categories to a flat array representing the hierarchy
      (acc, category) => [...getDeepParents(category), ...acc],
      []
    )
    .map((category) => ({
      id: category.id,
      name: getCategoryName(category, showIdentifiers),
      url: getCategoryUrl(category, primaryCategory),
    }));
