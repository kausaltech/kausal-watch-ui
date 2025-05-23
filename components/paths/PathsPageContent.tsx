import React from 'react';

import StreamField from 'components/paths/StreamField';
import styled, { css } from 'styled-components';
import { GeneralPlanPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/[...slug]/ContentPage';

import { ActionListPage } from '@/app/root/[domain]/[lang]/[plan]/(with-layout-elements)/actions/ActionListPage';
import CategoryPageHeaderBlock from '@/components/paths/contentblocks/CategoryPageHeaderBlock';

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
  const isCategoryPage = page.__typename === 'CategoryPage';
  const isStaticPage = page.__typename === 'StaticPage';
  const isActionListPage = page.__typename === 'ActionListPage';

  return (
    <>
      {isCategoryPage && (
        <ContentArea>
          <MainContent>
            <CategoryPageHeaderBlock
              page={page}
              title={page.title}
              lead={page.category?.leadParagraph}
              pathsNodeId={page.category?.kausalPathsNodeUuid}
            />
            {page.body && <StreamField page={page} blocks={page.body} />}
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
