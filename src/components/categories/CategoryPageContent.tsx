import React from 'react';

import { Container, Row } from 'reactstrap';
import styled, { css } from 'styled-components';

import type { CategoryPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';
import CategoryPageStreamField, {
  checkAttributeHasValueByType,
} from '@/components/common/CategoryPageStreamField';
import StreamField from '@/components/common/StreamField';

const MainContent = styled.div``;

const columnLayout = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => `0 ${theme.spaces.s200} ${theme.spaces.s200}`};
  gap: ${({ theme }) => theme.spaces.s300};

  ${MainContent} {
    flex: 0 2 ${({ theme }) => theme.breakpointMd};
    padding: 0 ${({ theme }) => theme.spaces.s100};
    background-color: ${({ theme }) => theme.themeColors.white};
    border-radius: ${({ theme }) => theme.cardBorderRadius};
  }

  @media (max-width: ${({ theme }) => theme.breakpointLg}) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: stretch;

    ${MainContent} {
      position: relative;
      top: 0;
      flex: 1 0 auto;
      width: 100%;
      max-width: ${({ theme }) => theme.breakpointMd};
      margin: 0 auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpointMd}) {
    gap: ${({ theme }) => theme.spaces.s150};
  }

  @media (max-width: ${({ theme }) => theme.breakpointSm}) {
    padding: ${({ theme }) => `0 ${theme.spaces.s050} ${theme.spaces.s050}`};
  }
`;

type ContentAreaProps = {
  $columnLayout?: boolean;
  $backgroundColor?: string;
};

const ContentArea = styled.div<ContentAreaProps>`
  ${({ $columnLayout }) => $columnLayout && columnLayout};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export default function CategoryPageContent({
  page,
}: {
  page: CategoryPage;
  pageSectionColor: string;
}) {
  const hasMainContentTemplate = !!page.layout?.layoutMainBottom?.length;

  console.log('CategoryPageContent', page);
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
