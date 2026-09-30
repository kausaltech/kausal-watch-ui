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
    flex: 0 2 768px;
    padding: 0 ${theme.spaces.s100};
    background-color: ${theme.themeColors.white};
    border-radius: ${theme.cardBorderRadius};
  }

  ${theme.breakpoints.down('lg')} {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: stretch;

    ${MainContent} {
      position: relative;
      top: 0;
      flex: 1 0 auto;
      width: 100%;
      max-width: 768px;
      margin: 0 auto;
    }
  }

  ${theme.breakpoints.down('md')} {
    gap: ${theme.spaces.s150};
  }

  ${theme.breakpoints.down('sm')} {
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
  precedingBlockHasBackground,
}: {
  page: CategoryPage;
  pageSectionColor: string;
  precedingBlockHasBackground?: boolean;
}) {
  const hasMainContentTemplate = !!page.layout?.layoutMainBottom?.length;

  return (
    <ContentArea $backgroundColor={undefined}>
      <MainContent>
        {hasMainContentTemplate
          ? page.layout?.layoutMainBottom?.map((block, i) => (
              <CategoryPageStreamField key={i} page={page} block={block} wrapAttributeBlock />
            ))
          : page.body && (
              <StreamField
                page={page}
                blocks={page.body}
                precedingBlockHasBackground={precedingBlockHasBackground}
              />
            )}
      </MainContent>
    </ContentArea>
  );
}
