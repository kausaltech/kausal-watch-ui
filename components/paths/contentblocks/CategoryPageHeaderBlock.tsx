import React from 'react';

import { CategoryTypePageLevelLayout } from 'common/__generated__/graphql';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { CategoryPage } from 'components/common/CategoryPageStreamField';
import ActionParameters from 'components/paths/ActionParameters';
import { usePaths } from 'context/paths/paths';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';
import { Container } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { ActionNode } from '@/common/__generated__/paths/graphql';
import { getBreadcrumbsFromCategoryHierarchy } from '@/common/categories';
import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getScopeLabel, getScopeTotal } from '@/utils/paths/emissions';
import { DimensionalMetric } from '@/utils/paths/metric';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { gql, NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';

import HighlightValue from '../HighlightValue';
import { useTranslations } from 'next-intl';
import InventoryNodeSummary from '../InventoryNodeSummary';
import PathsNodeSummary from '../PathsNodeSummary';

export const GET_CATEGORY_ATTRIBUTE_TYPES = gql`
  query GetCategoryAttributeTypes($plan: ID!) {
    plan(id: $plan) {
      id
      categoryTypes {
        id
        name
        attributeTypes {
          __typename
          format
          identifier
          choiceOptions {
            identifier
          }
        }
      }
    }
  }
`;

const PathsContentLoader = (props) => {
  const theme = useTheme();
  return (
    <ContentLoader
      speed={1}
      width={330}
      height={80}
      viewBox="0 0 330 80"
      backgroundColor={theme.graphColors.grey010}
      foregroundColor={theme.graphColors.grey030}
      {...props}
    >
      <rect x="5" y="1" rx="3" ry="3" width="166" height="16" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="6" y="24" rx="3" ry="3" width="130" height="27" />
      <rect x="4" y="61" rx="3" ry="3" width="166" height="16" />
    </ContentLoader>
  );
};

const Background = styled.div<{ $hasHeaderImage: boolean }>`
  padding: ${(props) => (props.$hasHeaderImage ? '2rem 0' : '4rem 0 2em')};
  background-color: ${(props) => props.theme.brandDark};
`;

const HeaderImage = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const PathsActionImpact = styled.div<{ $disabled: boolean }>`
  display: flex;
  margin-right: 1rem;
  gap: 1rem;
  align-content: stretch;
  align-items: stretch;
`;

const CategoryHeader = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground.primary};
  margin-bottom: 1rem;

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

// TODO: Type props
interface Props {
  page: CategoryPage;
  title: string;
  categoryId: string;
  identifier;
  lead?: string;
  attributes;
  typeId;
  level;
  layout?: CategoryTypePageLevelLayout['layoutMainTop'];
  pathsNodeId?: string;
}

const PathsBasicNodeContent = (props) => {
  const { categoryId, node, pathsInstance, refetching } = props;
  const yearRange = useReactiveVar(yearRangeVar);

  if (node.metricDim) {
    const nodeMetric = new DimensionalMetric(node.metricDim!);

    const indirectEmissions = getScopeTotal(
      nodeMetric,
      'indirect',
      yearRange[1]
    );
    const directEmissions = getScopeTotal(nodeMetric, 'direct', yearRange[1]);

    const indirectEmissionsLabel = getScopeLabel(nodeMetric, 'indirect');
    const directEmissionsLabel = getScopeLabel(nodeMetric, 'direct');

    const unit = nodeMetric.getUnit();

    const hasEmissionGoals = false;
    return (
      <PathsActionImpact $disabled={refetching}>
        <h4>
          {nodeMetric.getName()} ({yearRange[1]})
        </h4>
        <div>
          <HighlightValue
            displayValue={
              directEmissions ? directEmissions.toPrecision(3) : 'XXX'
            }
            header={directEmissionsLabel}
            unit={nodeMetric.getUnit() || ''}
            size="lg"
            muted={refetching}
          />
          <HighlightValue
            displayValue={
              indirectEmissions ? indirectEmissions.toPrecision(3) : 'XXX'
            }
            header={indirectEmissionsLabel}
            unit={nodeMetric.getUnit() || ''}
            size="lg"
            muted={refetching}
          />
        </div>
        {/* Hide targets now as we dont have them */}
        {hasEmissionGoals ? (
          <div>
            <h4>Emissions target (2024)</h4>
            <div>
              <div>
                Direct emissions<h5>XXX</h5>
              </div>
              <div>
                Indirect emissions<h5>XXX</h5>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </PathsActionImpact>
    );
  } else {
    return <div>{node.__typename} not supported</div>;
  }
};

type PathsActionNodeContentProps = {
  node: ActionNode;
  refetching: boolean;
};

const PathsActionNodeContent = (props: PathsActionNodeContentProps) => {
  const { node, refetching } = props;
  const t = useTranslations();
  const yearRange = useReactiveVar(yearRangeVar);

  const pathsAction = new PathsActionNode(node);

  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  return (
    <PathsActionImpact $disabled={refetching}>
      <div>
        <HighlightValue
          displayValue={impact.toPrecision(3)}
          header={`${t('impact')} ${yearRange[1]}`}
          unit={pathsAction.getUnit() || ''}
          size="lg"
          muted={refetching || !pathsAction.isEnabled()}
          mutedReason={
            !pathsAction.isEnabled() ? t('action-not-included-in-scenario') : ''
          }
        />
      </div>
      <div>
        <div>
          <ActionParameters parameters={node.parameters} />
        </div>
      </div>
    </PathsActionImpact>
  );
};

const PathsNodeContent = (props) => {
  const { categoryId, node, pathsInstance } = props;
  const activeGoal = useReactiveVar(activeGoalVar);

  const { data, loading, error, networkStatus } = useQuery(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: { node: node, goal: activeGoal?.id },
    notifyOnNetworkStatusChange: true,
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance.id }),
    },
  });
  const refetching = networkStatus === NetworkStatus.refetch;
  if (loading && !refetching) {
    return <PathsContentLoader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    console.log('paths node content', data);
    if (data.node.__typename === 'ActionNode') {
      return (
        <PathsActionNodeContent node={data.node} refetching={refetching} />
      );
    } else if (data.node.__typename) {
      return (
        <InventoryNodeSummary
          categoryId={categoryId}
          node={data.node}
          pathsInstance={pathsInstance}
          refetching={refetching}
          displayGoals={false}
        />
      );
    }
    return null;
  }
};

interface Props {
  page: CategoryPage;
  title: string;
  identifier;
  lead?: string;
  color?;
  attributes;
}

function CategoryPageHeaderBlock(props: Props) {
  const { title, identifier, lead, pathsNodeId, page } = props;
  const paths = usePaths();
  const pathsInstance = paths?.instance;
  const headerImage = page.category?.image || page.category?.parent?.image;

  const breadcrumbs = page.category?.parent
    ? getBreadcrumbsFromCategoryHierarchy([page.category.parent], false)
    : [];

  console.log('breadcrumbs', breadcrumbs);
  console.log('page', page);
  // TODO: A better way to find root category list page
  const rootCategoryListPage =
    page?.category && page.category.type.id === '76'
      ? { id: 0, name: 'Bereiche', url: '/klimaschutzplan/bereiche' }
      : null;
  const currentCategoryListPage =
    page?.category && page.category.level?.id === '25'
      ? {
          id: 1,
          name: page.category.level.namePlural,
          url: '/klimaschutzplan/massnahmenpakete',
        }
      : null;
  if (rootCategoryListPage) breadcrumbs.unshift(rootCategoryListPage);
  if (currentCategoryListPage) breadcrumbs.push(currentCategoryListPage);
  return (
    <Background $hasHeaderImage={!!headerImage}>
      <Container>
        {headerImage && headerImage.large && (
          <HeaderImage>
            <Image
              src={headerImage.large.src}
              alt="Picture of the author"
              sizes="100vw"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </HeaderImage>
        )}
        <CategoryHeader>
          {!!breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          <h1>
            {identifier && <Identifier>{identifier}.</Identifier>} {title}
          </h1>
          {lead && <p>{lead}</p>}
          {pathsNodeId && pathsInstance?.id && (
            <PathsNodeSummary
              categoryId={identifier}
              node={pathsNodeId}
              pathsInstance={pathsInstance}
            />
          )}
        </CategoryHeader>
      </Container>
    </Background>
  );
}

export default CategoryPageHeaderBlock;
