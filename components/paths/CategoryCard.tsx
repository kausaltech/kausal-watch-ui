import { beautifyValue } from 'common/data/format';
import { Link } from 'common/links';
import ActionParameters from 'components/paths/ActionParameters';
import { useTranslations } from 'next-intl';
import { readableColor, transparentize } from 'polished';
import ContentLoader from 'react-content-loader';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from 'react-sparklines';
import styled, { useTheme } from 'styled-components';

import PopoverTip from '@/components/common/PopoverTip';
import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getScopeLabel, getScopeTotal } from '@/utils/paths/emissions';
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

const CardContentBlock = styled.div<{ $disabled?: boolean }>`
  margin: ${({ theme }) => `0 ${theme.spaces.s100} ${theme.spaces.s100}`};
  opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
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

const IndicatorSparklineContainer = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  padding: 0% ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  border-radius: 0.5rem;
`;

const IndicatorSparkline = (props) => {
  const { indicator } = props;
  const theme = useTheme();
  return (
    <IndicatorSparklineContainer>
      Main indicator{' '}
      <PopoverTip content={indicator.name} identifier={indicator.id} />
      <Sparklines
        data={[5, 10, 5, 20, 8, 15]}
        limit={5}
        width={100}
        height={20}
        margin={5}
      >
        <SparklinesLine
          style={{ strokeWidth: 0.5, fill: 'none', stroke: theme.brandDark }}
        />
        <SparklinesReferenceLine
          type="mean"
          style={{ strokeWidth: 0.25, stroke: theme.graphColors.red050 }}
        />
      </Sparklines>
    </IndicatorSparklineContainer>
  );
};
const PathsBasicNodeContent = (props) => {
  const { categoryId, node, pathsInstance } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  // const t = useTranslations();

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

    /*
      console.log('default config', defaultConfig);
      console.log('metric', nodeMetric);
      console.log('this year', thisYear);
      */
    // TODO: Just get any label for now

    const unit = nodeMetric.getUnit();

    return (
      <CardContentBlock>
        <div>
          {directEmissions || indirectEmissions ? (
            <div>
              <h5>
                {nodeMetric.getName()} ({yearRange[1]})
              </h5>
              <h4>
                {(directEmissions + indirectEmissions).toPrecision(3)} {unit}
              </h4>
            </div>
          ) : null}
          {directEmissions ? (
            <div>
              {directEmissionsLabel}
              <h5>
                {directEmissions && directEmissions.toPrecision(3)} {unit}
              </h5>
            </div>
          ) : (
            <div />
          )}
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
      </CardContentBlock>
    );
  } else {
    return <div>{node.__typename} not supported</div>;
  }
};

const PathsActionNodeContent = (props) => {
  const { categoryId, node, pathsInstance, onLoaded } = props;
  const yearRange = useReactiveVar(yearRangeVar);
  const t = useTranslations();

  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;
  return (
    <CardContentBlock>
      {t('impact')} {yearRange[1]}
      <h4>
        {yearRange ? beautifyValue(impact) : <span>---</span>}
        {pathsAction.getUnit()}
      </h4>
      <ActionParameters parameters={node.parameters} />
    </CardContentBlock>
  );
};

const PathsNodeContent = (props) => {
  const { categoryId, node, paths, onLoaded } = props;
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
    if (data.node.__typename === 'ActionNode') {
      return (
        <PathsActionNodeContent
          categoryId={categoryId}
          node={data.node}
          pathsInstance={paths}
          onLoaded={onLoaded}
        />
      );
    } else if (data.node.__typename) {
      return (
        <PathsBasicNodeContent
          categoryId={categoryId}
          node={data.node}
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
        {category.indicators.length > 0 && (
          <CardContentBlock>
            <IndicatorSparkline indicator={category.indicators[0]} />
          </CardContentBlock>
        )}
      </div>
    </Card>
  );
};

export default CategoryCard;
