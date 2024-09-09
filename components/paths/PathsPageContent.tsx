import React from 'react';

import { GetContentPageQuery } from 'common/__generated__/graphql';
import { categoryTypeStreamfield } from 'components/paths/mock/pathsMockData';
import StreamField from 'components/paths/StreamField';
import styled, { css } from 'styled-components';

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

const PathsPageContent = ({
  page,
}: {
  page: GeneralPlanPage;
  pageSectionColor?: string;
}) => {
  //console.log('page', page);
  const isCategoryPage = page.__typename === 'CategoryPage';
  const isCategoryTypePage =
    page.__typename === 'CategoryTypePage' || page.slug === 'massnahmenpakete';
  const isStaticPage = page.__typename === 'StaticPage';
  return (
    <>
      {isCategoryPage && (
        <ContentArea>
          <MainContent>
            {page.body && <StreamField page={page} blocks={page.body} />}
          </MainContent>
        </ContentArea>
      )}
      {isCategoryTypePage && (
        <ContentArea>
          <MainContent>
            {page.body && (
              <StreamField page={page} blocks={categoryTypeStreamfield.data} />
            )}
          </MainContent>
        </ContentArea>
      )}
      {!isCategoryTypePage && isStaticPage && (
        <ContentArea>
          <MainContent>
            {page.body && <StreamField page={page} blocks={page.body} />}
          </MainContent>
        </ContentArea>
      )}
      {!isCategoryPage && !isCategoryTypePage && !isStaticPage && (
        <div>Unknown page type</div>
      )}
    </>
  );
};

export default PathsPageContent;
