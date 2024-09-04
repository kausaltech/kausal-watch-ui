'use client';

import React from 'react';

import CategoryPageContent from 'components/paths/CategoryPageContent';
import { useTheme } from 'styled-components';

export const PathsContent = ({ page }: { page: GeneralPlanPage }) => {
  // TODO: Resolve shareImageUrl by pagetype

  const theme = useTheme();
  const isCategoryPage = page.__typename === 'CategoryPage';
  const categoryColor =
    isCategoryPage && (page.category?.color || page.category?.parent?.color);
  const pageSectionColor = categoryColor || theme.themeColors.light;

  return (
    <article>
      {isCategoryPage ? (
        <CategoryPageContent page={page} pageSectionColor={pageSectionColor} />
      ) : (
        <div>Insert content page here</div>
      )}
    </article>
  );
};
