import React from 'react';

import { GetContentPageQuery } from 'common/__generated__/graphql';
import StreamField from 'components/paths/StreamField';
import styled, { css } from 'styled-components';

import CategoryPageHeaderBlock from '@/components/paths/contentblocks/CategoryPageHeaderBlock';

type GeneralPlanPage = NonNullable<GetContentPageQuery['planPage']>;

type CategoryPage = { __typename: 'CategoryPage' } & GeneralPlanPage;

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

    ${MainContent}, ${AsideContent} {
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

const ContentArea = styled.div<{
  $columnLayout?: boolean;
  $backgroundColor?: string;
}>`
  ${({ $columnLayout }) => $columnLayout && columnLayout};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const CategoryPageContent = ({
  page,
}: {
  page: CategoryPage;
  pageSectionColor: string;
}) => {
  return (
    <ContentArea>
      <MainContent>
        <h1>Whaat?</h1>
        <CategoryPageHeaderBlock
          page={page}
          title={page.title}
          lead="fgfdhgdfhgfhfghf"
        />
        --
        {page.body && <StreamField page={page} blocks={page.body} />}
      </MainContent>
    </ContentArea>
  );
};

export default CategoryPageContent;
