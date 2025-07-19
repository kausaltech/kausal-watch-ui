import { createContext, useContext } from 'react';

import { Category } from '@/common/__generated__/graphql';

//import type { CategoryListBlockCategory } from 'components/contentblocks/CategoryListBlock';

type CategoriesContext = Array<Category> | [];

const CategoriesContext = createContext<CategoriesContext>([]);

export const useFallbackCategories = () => useContext(CategoriesContext);
export default CategoriesContext;
