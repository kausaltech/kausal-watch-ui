import React from 'react';

import { CategoryTypePageLevelLayout } from 'common/__generated__/graphql';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { CategoryPage } from 'components/common/CategoryPageStreamField';
import { usePaths } from 'context/paths/paths';
import ContentLoader from 'react-content-loader';
import { Container } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getScopeLabel, getScopeTotal } from '@/utils/paths/emissions';
import { DimensionalMetric } from '@/utils/paths/metric';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { gql, useQuery, useReactiveVar } from '@apollo/client';

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

const Background = styled.div`
  padding: 4rem 0 2em;
  background-color: ${(props) => props.theme.brandDark};
`;

const PathsActionImpact = styled.div`
  display: flex;
  margin-right: 1rem;
  gap: 1rem;
  align-content: stretch;
  align-items: stretch;

  > div {
    padding: 1rem;
    background: #fff;
    flex: 50% 0 0;

    > div {
      display: flex;
      > div {
        margin-right: 1rem;
      }
    }
  }
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
  const { categoryId, node, pathsInstance } = props;
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
      <PathsActionImpact>
        <div>
          <h4>
            {nodeMetric.getName()} ({yearRange[1]})
          </h4>
          <div>
            <div>
              {directEmissionsLabel}
              <h5>
                {directEmissions ? directEmissions.toPrecision(3) : 'XXX'}{' '}
                {unit}
              </h5>
            </div>
            {indirectEmissions ? (
              <div>
                {indirectEmissionsLabel}
                <h5>
                  {indirectEmissions.toPrecision(3)} {unit}
                </h5>
              </div>
            ) : (
              <div />
            )}
          </div>
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

const PathsActionNodeContent = (props) => {
  const { categoryId, node, pathsInstance } = props;
  const yearRange = useReactiveVar(yearRangeVar);

  const pathsAction = new PathsActionNode(node);

  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;
  return (
    <PathsActionImpact>
      <div>
        <h4>Impact ({yearRange[1]})</h4>
        <div>
          <div>
            Direct emissions
            <h5>
              {`${impact.toPrecision(3)} `}
              <span
                dangerouslySetInnerHTML={{ __html: pathsAction.getUnit() }}
              />
            </h5>
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </PathsActionImpact>
  );
};

const PathsNodeContent = (props) => {
  const { categoryId, node, paths } = props;
  console.log('getting paths node content');
  const activeGoal = useReactiveVar(activeGoalVar);

  const { data, loading, error, networkStatus } = useQuery(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: { node: node, goal: activeGoal?.id },
    notifyOnNetworkStatusChange: true,
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths }),
    },
  });

  if (loading) {
    return <PathsContentLoader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    console.log('paths node content', data);
    if (data.node.__typename === 'ActionNode') {
      return (
        <PathsActionNodeContent
          categoryId={categoryId}
          node={data.node}
          pathsInstance={paths}
        />
      );
    } else if (data.node.__typename) {
      return (
        <PathsBasicNodeContent
          categoryId={categoryId}
          node={data.node}
          pathsInstance={paths}
        />
      );
    }
    return null;
  }
};

function CategoryPageHeaderBlock(props: Props) {
  const { title, identifier, lead, level, pathsNodeId } = props;

  const paths = usePaths();

  return (
    <Background>
      <Container>
        <CategoryHeader>
          <Breadcrumbs
            breadcrumbs={[
              {
                id: '1',
                name: 'Massnahmenpakete',
                url: '/',
              },
              {
                id: '2',
                name: 'Pakete',
                url: '/categories/',
              },
              {
                id: '3',
                name: title,
                url: `/categories/${identifier}/`,
              },
            ]}
          />
          <h1>
            {identifier && <Identifier>{identifier}.</Identifier>} {title}
          </h1>
          {lead && <p>{lead}</p>}
          {pathsNodeId && paths && (
            <PathsNodeContent
              categoryId={identifier}
              node={pathsNodeId}
              paths={paths.instance.id}
            />
          )}
        </CategoryHeader>
      </Container>
    </Background>
  );
}

export default CategoryPageHeaderBlock;
