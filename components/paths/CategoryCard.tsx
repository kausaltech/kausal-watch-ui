import { useEffect } from 'react';

import { beautifyValue } from 'common/data/format';
import { Link } from 'common/links';
import ActionParameters from 'components/paths/ActionParameters';
import { useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import { Spinner } from 'reactstrap';
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

const ContentLoader = styled(Spinner)`
  margin: 0 auto;
  //background-color: ${(props) => props.theme.themeColors.light};
`;

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
  const { categoryId, node, pathsInstance, onLoaded } = props;
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

  useEffect(() => {
    if (data) {
      const nodeMetric = new DimensionalMetric(data.node.metricDim!);
      const defaultConfig = nodeMetric.getDefaultSliceConfig(activeGoal);
      const thisYear = nodeMetric.getSingleYear(
        yearRange[1],
        defaultConfig.categories
      );

      const yearTotal =
        thisYear.rows[0] &&
        thisYear.rows.reduce(
          (partialSum, a) => (a ? partialSum + a[0] : partialSum),
          0
        );
      onLoaded(categoryId, yearTotal || 0);
    }
  }, [activeGoal, data, yearRange]);

  if (loading) {
    return <ContentLoader type="grow" />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    if (data.node.metricDim) {
      const nodeMetric = new DimensionalMetric(data.node.metricDim!);
      const defaultConfig = nodeMetric.getDefaultSliceConfig(activeGoal);
      const thisYear = nodeMetric.getSingleYear(
        yearRange[1],
        defaultConfig.categories
      );

      const yearTotal =
        thisYear.rows[0] &&
        thisYear.rows.reduce(
          (partialSum, a) => (a ? partialSum + a[0] : partialSum),
          0
        );
      /*
      console.log('default config', defaultConfig);
      console.log('metric', nodeMetric);
      console.log('this year', thisYear);
      */
      // TODO: Just get any label for now
      const configCategories = Object.values(defaultConfig.categories)[0];
      const label = thisYear.allLabels.find(
        (label) =>
          label.id === configCategories?.categories[0] ||
          label.id === configCategories?.groups[0]
      )?.label;

      const unit = nodeMetric.getUnit();

      return (
        <CardContentBlock>
          <div>{nodeMetric.getName()}</div>
          {yearTotal && (
            <>
              <h5>{label}</h5>
              <h4>
                {yearTotal.toPrecision(3)} {unit}
              </h4>
            </>
          )}
        </CardContentBlock>
      );
    } else {
      return <div>{data.node.__typename} not supported</div>;
    }
  }
  return null;
};

const PathsActionNodeContent = (props) => {
  const { categoryId, node, pathsInstance, onLoaded } = props;
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

  useEffect(() => {
    if (data) {
      const pathsAction = new PathsActionNode(data.action);
      const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;
      onLoaded(categoryId, impact);
    }
  }, [activeGoal, data, yearRange]);

  if (loading) {
    return <ContentLoader type="grow" />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    const pathsAction = new PathsActionNode(data.action);
    const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;
    return (
      <CardContentBlock>
        {t('impact')} {yearRange[1]}
        <h4>
          {yearRange ? beautifyValue(impact) : <span>---</span>}
          {pathsAction.getUnit()}
        </h4>
        <ActionParameters parameters={data.action.parameters} />
      </CardContentBlock>
    );
  }
  return null;
};

const PathsNodeContent = (props) => {
  const { categoryId, node, paths, onLoaded } = props;

  const { data, loading, error } = useQuery(GET_NODE_INFO, {
    fetchPolicy: 'no-cache',
    variables: { node: node },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths }),
    },
  });

  if (loading) {
    return <ContentLoader type="grow" />;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Handle error appropriately
  }
  if (data) {
    if (data.node.__typename === 'ActionNode') {
      return (
        <PathsActionNodeContent
          categoryId={categoryId}
          node={node}
          pathsInstance={paths}
          onLoaded={onLoaded}
        />
      );
    } else if (data.node.__typename) {
      return (
        <PathsBasicNodeContent
          categoryId={categoryId}
          node={node}
          pathsInstance={paths}
          onLoaded={onLoaded}
        />
      );
    }
    return null;
  }
};

const CategoryCard = (props) => {
  const { category, group, pathsInstance, onLoaded } = props;
  return (
    <Card>
      {group && (
        <GroupIdentifierHeader $color={group?.color || category?.color}>
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
            categoryId={category.id}
            node={category.kausalPathsNodeUuid}
            paths={pathsInstance}
            onLoaded={onLoaded}
          />
        )}
      </div>
    </Card>
  );
};

export default CategoryCard;
