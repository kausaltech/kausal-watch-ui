import React from 'react';

import { GetContentPageQuery } from 'common/__generated__/graphql';
import StreamField from 'components/paths/StreamField';
import { Container } from 'reactstrap';
import styled, { css } from 'styled-components';

import { ActionListPage } from '@/app/[domain]/[lang]/[plan]/(with-layout-elements)/actions/ActionListPage';
import CategoryPageHeaderBlock from '@/components/paths/contentblocks/CategoryPageHeaderBlock';

type GeneralPlanPage = NonNullable<GetContentPageQuery['planPage']>;

type CategoryPage = { __typename: 'CategoryPage' } & GeneralPlanPage;

const MainContent = styled.div`
  position: relative;
`;

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

const ContentArea = styled.div``;

const PathsPageContent = ({
  page,
}: {
  page: GeneralPlanPage;
  pageSectionColor?: string;
}) => {
  console.log('page', page);
  const isCategoryPage = page.__typename === 'CategoryPage';
  const isStaticPage = page.__typename === 'StaticPage';
  const isActionListPage = page.__typename === 'ActionListPage';
  return (
    <>
      {isCategoryPage && (
        <ContentArea>
          <MainContent>
            <Container>
              <CategoryPageHeaderBlock
                page={page}
                title={page.title}
                lead="Category page header title"
              />
              {page.body && <StreamField page={page} blocks={page.body} />}
            </Container>
          </MainContent>
        </ContentArea>
      )}
      {isStaticPage && (
        <ContentArea>
          <MainContent>
            {page.body && <StreamField page={page} blocks={page.body} />}
          </MainContent>
        </ContentArea>
      )}
      {isActionListPage && (
        <ContentArea>
          <ActionListPage actionListPage={page} />
        </ContentArea>
      )}
      {!isActionListPage && !isCategoryPage && !isStaticPage && (
        <div>Unknown page type</div>
      )}
    </>
  );
};

export default PathsPageContent;
