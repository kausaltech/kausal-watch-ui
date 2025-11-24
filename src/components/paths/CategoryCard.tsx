import React from 'react';

import { readableColor, transparentize } from 'polished';
import styled from 'styled-components';

import {
  type CategoryFragmentFragment,
  IndicatorCategoryRelationshipType,
} from '@/common/__generated__/graphql';
import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { Link } from '@/common/links';

import PathsNodeSummary from './PathsNodeSummary';
import IndicatorSparkline from './graphs/IndicatorSparkline';

const GroupIdentifierHeader = styled.div<{
  $color?: string | null | undefined;
}>`
  background-color: ${(props) => props.$color || props.theme.themeColors.dark};
  color: ${(props) => readableColor(props.$color || props.theme.themeColors.dark)};
  padding: 6px;
  margin-bottom: ${(props) => props.theme.spaces.s100};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.cardBackground.primary};
  color: ${(props) => props.theme.textColor.primary};
  box-shadow: 2px 2px 8px ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
`;

const CardContentBlock = styled.div<{ $disabled?: boolean }>`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const CardHeaderBlock = styled.div``;
const CardDataBlock = styled.div``;
const CardHeader = styled.h3`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  color: ${(props) => props.theme.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

type CategoryCardProps = {
  category: CategoryFragmentFragment;
  group?: CategoryFragmentFragment;
  pathsInstance?: GetInstanceContextQuery['instance'];
  onLoaded: (id: string, impact: number) => void;
};

const CategoryCard = (props: CategoryCardProps) => {
  const { category, group, pathsInstance, onLoaded } = props;

  const mainIndicatorId = category.indicatorRelationships?.find(
    (relationship) => relationship.type === IndicatorCategoryRelationshipType.MainGoal
  )?.indicator?.id;

  return (
    <Card>
      {group && (
        <GroupIdentifierHeader $color={group?.color || category?.color}>
          {group.id !== 'all' ? group?.name : ' '}
        </GroupIdentifierHeader>
      )}
      <CardContent>
        <CardHeaderBlock>
          <Link className="card-wrapper" href={category?.categoryPage?.urlPath || ''}>
            <CardHeader className="card-title">
              {!category?.type.hideCategoryIdentifiers && (
                <Identifier>{category.identifier}. </Identifier>
              )}
              {category.name}
            </CardHeader>
          </Link>
          {/* Leave this out for now */}
          {category.leadParagraph && false && (
            <CardContentBlock>{category.leadParagraph}</CardContentBlock>
          )}
        </CardHeaderBlock>
        <CardDataBlock>
          {category.kausalPathsNodeUuid && pathsInstance?.id && (
            <CardContentBlock>
              <PathsNodeSummary
                categoryId={category.id}
                node={category.kausalPathsNodeUuid}
                pathsInstance={pathsInstance}
                onLoaded={onLoaded}
              />
            </CardContentBlock>
          )}
          <CardContentBlock>
            {mainIndicatorId && (
              <IndicatorSparkline
                indicatorId={mainIndicatorId}
                relationshipType={IndicatorCategoryRelationshipType.MainGoal}
              />
            )}
          </CardContentBlock>
        </CardDataBlock>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
