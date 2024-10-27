import { useContext, createContext } from 'react';
import type { CategoryListBlockCategory } from '@/components/contentblocks/CategoryListBlock';

type CategoriesContext = Array<CategoryListBlockCategory>;

const CategoriesContext = createContext<CategoriesContext>([]);

export const useFallbackCategories = () => useContext(CategoriesContext);
export default CategoriesContext;
