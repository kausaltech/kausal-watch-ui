import React from 'react';

import { type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import type { CategoryPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';
import CategoryPageStreamField from '@/components/common/CategoryPageStreamField';
import StreamField from '@/components/common/StreamField';

const MainContent = styled.div``;

const columnLayout = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 ${theme.spaces.s200} ${theme.spaces.s200};
  gap: ${theme.spaces.s300};

  ${MainContent} {
    flex: 0 2 ${theme.breakpointMd};
    padding: 0 ${theme.spaces.s100};
    background-color: ${theme.themeColors.white};
    border-radius: ${theme.cardBorderRadius};
  }

  @media (max-width: ${theme.breakpointLg}) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: stretch;

    ${MainContent} {
      position: relative;
      top: 0;
      flex: 1 0 auto;
      width: 100%;
      max-width: ${theme.breakpointMd};
      margin: 0 auto;
    }
  }

  @media (max-width: ${theme.breakpointMd}) {
    gap: ${theme.spaces.s150};
  }

  @media (max-width: ${theme.breakpointSm}) {
    padding: 0 ${theme.spaces.s050} ${theme.spaces.s050};
  }
`;

type ContentAreaProps = {
  $columnLayout?: boolean;
  $backgroundColor?: string;
};

const ContentArea = styled.div<ContentAreaProps>`
  ${({ $columnLayout, theme }) => $columnLayout && columnLayout(theme)};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export default function CategoryPageContent({
  page,
}: {
  page: CategoryPage;
  pageSectionColor: string;
}) {
  const hasMainContentTemplate = !!page.layout?.layoutMainBottom?.length;

  return (
    <ContentArea $backgroundColor={undefined}>
      <MainContent>
        {hasMainContentTemplate
          ? page.layout?.layoutMainBottom?.map((block, i) => (
              <CategoryPageStreamField key={i} page={page} block={block} />
            ))
          : page.body && <StreamField page={page} blocks={page.body} />}
      </MainContent>
    </ContentArea>
  );
}
