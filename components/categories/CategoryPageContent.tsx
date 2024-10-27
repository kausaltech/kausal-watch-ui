import React from 'react';
import { Container, Row } from 'reactstrap';
import styled, { css } from 'styled-components';

import StreamField from '@/components/common/StreamField';
import { GetContentPageQuery } from '@/common/__generated__/graphql';
import CategoryPageStreamField, {
  checkAttributeHasValueByType,
} from '@/components/common/CategoryPageStreamField';

type GeneralPlanPage = NonNullable<GetContentPageQuery['planPage']>;

type CategoryPage = { __typename: 'CategoryPage' } & GeneralPlanPage;

const MainContent = styled.div``;

const AsideContent = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spaces.s200};
  flex: 0 1 320px;
  background-color: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => `${theme.spaces.s200} ${theme.spaces.s100}`};
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  pageSectionColor,
}: {
  page: CategoryPage;
  pageSectionColor: string;
}) => {
  const hasMainContentTemplate = !!page.layout?.layoutMainBottom?.length;
  const hasAsideTemplate = !!page.layout?.layoutAside;
  const hasAside =
    hasAsideTemplate &&
    page.layout?.layoutAside?.some((block) =>
      checkAttributeHasValueByType(block.attributeType.identifier, page)
    );

  return (
    <ContentArea
      $columnLayout={hasAside}
      $backgroundColor={hasAside ? pageSectionColor : undefined}
    >
      <MainContent>
        {hasMainContentTemplate
          ? page.layout?.layoutMainBottom?.map((block, i) => (
              <CategoryPageStreamField
                key={i}
                page={page}
                block={block}
                hasAsideColumn={hasAside}
              />
            ))
          : page.body && (
              <StreamField
                page={page}
                blocks={page.body}
                color={pageSectionColor}
              />
            )}
      </MainContent>

      {hasAside && (
        <AsideContent>
          <Container>
            {page.layout?.layoutAside?.map((block, i) => (
              <Row key={i}>
                <CategoryPageStreamField
                  page={page}
                  block={block}
                  context="aside"
                  columnProps={{ md: 12 }}
                />
              </Row>
            ))}
          </Container>
        </AsideContent>
      )}
    </ContentArea>
  );
};

export default CategoryPageContent;
