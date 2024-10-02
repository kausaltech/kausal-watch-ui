import { beautifyValue } from 'common/data/format';
import { Link } from 'common/links';
import ActionParameters from 'components/paths/ActionParameters';
import { useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import styled from 'styled-components';

import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_PATHS_ACTION } from '@/queries/paths/get-paths-actions';
import {
  GET_NODE_CONTENT,
  GET_NODE_INFO,
} from '@/queries/paths/get-paths-node';
import { DimensionalMetric } from '@/utils/paths/metric';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { useQuery, useReactiveVar } from '@apollo/client';

const GroupIdentifierHeader = styled.div`
  background-color: ${(props) => props.$color};
  color: ${(props) => readableColor(props.$color || '#ffffff')};
  padding: 6px;
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const Card = styled.div`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.cardBackground.primary};
  color: ${(props) => props.theme.textColor.primary};
  box-shadow: 2px 2px 8px
    ${(props) => transparentize(0.9, props.theme.themeColors.dark)};
`;

const CardContentBlock = styled.div`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
`;
const CardHeader = styled.h3`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  color: ${(props) => props.theme.neutralDark};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

const PathsBasicNodeContent = (props) => {
  const { node, pathsInstance } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  const t = useTranslations();

  const { data, loading, error } = useQuery(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: { node: node, goal: activeGoal?.id },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance }),
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    if (data.node.metricDim) {
      //console.log('basicnodedata', data);
      const nodeMetric = new DimensionalMetric(data.node.metricDim!);
      //console.log('nodeMetric', nodeMetric);
      //console.log('data from year', nodeMetric.getSingleYear(yearRange[1], {}));
      const thisYear = nodeMetric.getSingleYear(yearRange[1], {});
      const directLabel = thisYear.allLabels.find(
        (label) =>
          label.id === 'transportation_emissions:emission_scope:group:direct'
      ).label;
      const indirectLabel = thisYear.allLabels.find(
        (label) =>
          label.id === 'transportation_emissions:emission_scope:group:indirect'
      ).label;
      return (
        <CardContentBlock>
          <div>{nodeMetric.getName()}</div>
          <div>
            {directLabel}: {thisYear.rows[0][0]}
          </div>
          <div>
            {indirectLabel}:{thisYear.rows[0][1]}
          </div>
        </CardContentBlock>
      );
    } else {
      return <div>{data.node.__typename} not supported</div>;
    }
  }
  return null;
};

const PathsActionNodeContent = (props) => {
  const { node, pathsInstance } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  const t = useTranslations();

  const { data, loading, error } = useQuery(GET_PATHS_ACTION, {
    fetchPolicy: 'no-cache',
    variables: { action: node, goal: activeGoal?.id },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstance }),
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    const pathsAction = new PathsActionNode(data.action);
    return (
      <CardContentBlock>
        {t('impact')} {yearRange[1]}
        <h4>
          {yearRange ? (
            beautifyValue(pathsAction.getYearlyImpact(yearRange[1]))
          ) : (
            <span>---</span>
          )}
          {pathsAction.getUnit()}
        </h4>
        <ActionParameters parameters={data.action.parameters} />
      </CardContentBlock>
    );
  }
  return null;
};

const PathsNodeContent = (props) => {
  const { node, paths } = props;

  const { data, loading, error } = useQuery(GET_NODE_INFO, {
    fetchPolicy: 'no-cache',
    variables: { node: node },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths }),
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    if (data.node.__typename === 'ActionNode') {
      return <PathsActionNodeContent node={node} pathsInstance={paths} />;
    } else if (data.node.__typename) {
      return <PathsBasicNodeContent node={node} pathsInstance={paths} />;
    }
    return null;
  }
};

const CategoryCard = (props) => {
  const { category, group, pathsInstance } = props;
  return (
    <Card>
      {group && (
        <GroupIdentifierHeader $color={category.color}>
          {group.id !== 'all' ? group?.name : ' '}
        </GroupIdentifierHeader>
      )}
      <div>
        {' '}
        <Link href={category.categoryPage.urlPath} legacyBehavior>
          <a className="card-wrapper">
            <CardHeader className="card-title">
              {!category?.type.hideCategoryIdentifiers && (
                <Identifier>{category.identifier}. </Identifier>
              )}
              {category.name}
            </CardHeader>
          </a>
        </Link>
        {category.leadParagraph && (
          <CardContentBlock>{category.leadParagraph}</CardContentBlock>
        )}
        {category.kausalPathsNodeUuid && (
          <PathsNodeContent
            node={category.kausalPathsNodeUuid}
            paths={pathsInstance}
          />
        )}
      </div>
    </Card>
  );
};

export default CategoryCard;
