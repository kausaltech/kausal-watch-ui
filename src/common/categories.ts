import type { TCrumb } from '@/components/common/Breadcrumbs';

import type { Category, PlanContextFragment } from './__generated__/graphql';

export interface CategoryInput {
  id: string;
  parent?: {
    id: string;
  } | null;
}

export interface CategoryTypeInput {
  id: string;
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
      // @ts-ignore
      const categoryOrCommonCategoryType = mapToCommonCategories ? ctIn.common : ctIn;
      const ct: CTType = {
        ...categoryOrCommonCategoryType,
      };
      ct.categories = ctIn.categories.map((cat) => {
        // @ts-ignore
        const categoryOrCommon = mapToCommonCategories ? cat.common : cat;
        const newCat: CatType = {
          ...categoryOrCommon,
          type: ct,
          children: [],
        };
        if (mapToCommonCategories) {
          newCat.parent = cat.parent?.common ?? null;
        } else {
          newCat.parent = cat.parent;
        }
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
  Cat extends CategoryHierarchyMember<CT>,
> {
  primaryCategories: Cat[] | null;
  categories: Cat[];
}

export interface CategoryMappedActionInput {
  categories: {
    id: string;
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
  depth: number
) {
  const useCommonCategories = primaryRootCT?.__typename === 'CommonCategoryType' ?? false;
  const categories = categoryTypes.map((ct) => ct.categories).flat();

  const categoriesById: Map<string, Cat> = new Map(categories.map((c) => [c.id, c]));
  const mappedActions: ActionType[] = actions.map((action) => {
    let actionPrimaryCategories: Cat[] = [];
    const actionCategories: (ActionType['categories'][0] | null)[] = action.categories
      .map((cat) => {
        if (useCommonCategories && cat.common == null) return;
        const category = useCommonCategories ? cat.common : cat;
        const catObj = categoriesById.get(category.id);
        if (!catObj) return null;
        const categoryPath: Cat[] = [];
        if (primaryRootCT && catObj.type.identifier === primaryRootCT.identifier) {
          let root = catObj;
          categoryPath.unshift(root);
          while (root.parent) {
            root = root.parent;
            categoryPath.unshift(root);
          }
          if (depth > categoryPath.length) {
            depth = categoryPath.length;
          }
          actionPrimaryCategories = categoryPath.slice(0, depth);
        }
        return catObj;
      })
      .filter((cat) => cat != null);
    // @ts-ignore
    const mappedAction: ActionType = {
      ...action,
      categories: actionCategories,
      primaryCategories: actionPrimaryCategories,
    };
    return mappedAction;
  });
  return mappedActions;
}

/**
 * Format category identifier for query parameters
 */
export const getCategoryString = (catIdentifier: string) => `cat-${catIdentifier}`;

export const MAX_CRUMB_LENGTH = 90;

export const isIdentifierVisible = (category: Category, showIdentifiers: boolean) =>
  category.categoryPage && category.identifier && showIdentifiers;

export const getCategoryName = (category: Category, showIdentifiers: boolean) =>
  isIdentifierVisible(category, showIdentifiers)
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
export const getDeepParents = (category: Category): Category[] =>
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
    .reduce(
      // Convert categories to a flat array representing the hierarchy
      (categories, category) => [...getDeepParents(category), ...categories],
      []
    )
    .map((category) => ({
      id: category.id,
      name: getCategoryName(category, showIdentifiers),
      url: getCategoryUrl(category, primaryCategory),
    }));
