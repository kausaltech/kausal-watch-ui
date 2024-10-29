import React, { useEffect, useState } from 'react';

import {
  Category,
  CategoryFragmentFragment,
} from 'common/__generated__/graphql';
import {
  ActionNode,
  CausalGridNodeFragment,
} from 'common/__generated__/paths/graphql';
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
import HighlightValue from '@/components/paths/HighlightValue';
import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getScopeLabel, getScopeTotal } from '@/utils/paths/emissions';
import { DimensionalMetric } from '@/utils/paths/metric';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import PathsActionNode from '@/utils/paths/PathsActionNode';
import { NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';

const GroupIdentifierHeader = styled.div<{
  $color?: string | null | undefined;
}>`
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

type PathsBasicNodeContentProps = {
  categoryId: string;
  node: CausalGridNodeFragment;
  onLoaded: (id: string, impact: number) => void;
};

type Emissions = {
  total: { value: number | null; label: string | null };
  indirect: { value: number | null; label: string | null };
  direct: { value: number | null; label: string | null };
};

const PathsBasicNodeContent = (props: PathsBasicNodeContentProps) => {
  const { categoryId, node, onLoaded } = props;
  const yearRange = useReactiveVar(yearRangeVar);

  const [emissions, setEmissions] = useState<Emissions>({
    total: { value: null, label: null },
    indirect: { value: null, label: null },
    direct: { value: null, label: null },
  });

  const [unit, setUnit] = useState<string | null>(null);

  useEffect(() => {
    const nodeMetric = new DimensionalMetric(node.metricDim!);
    const indirect = getScopeTotal(nodeMetric, 'indirect', yearRange[1]);
    const direct = getScopeTotal(nodeMetric, 'direct', yearRange[1]);
    setEmissions({
      total: { value: indirect + direct, label: nodeMetric.getName() },
      indirect: {
        value: indirect,
        label: getScopeLabel(nodeMetric, 'indirect'),
      },
      direct: { value: direct, label: getScopeLabel(nodeMetric, 'direct') },
    });
    setUnit(nodeMetric.getUnit());
    onLoaded(categoryId, indirect + direct);
    // using exhausive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <CardContentBlock>
      <div>
        {emissions.total.value ? (
          <div>
            <HighlightValue
              displayValue={emissions.total.value.toPrecision(3) || ''}
              header={`${emissions.total.label} (${yearRange[1]})`}
              unit={unit || ''}
              size="md"
            />
          </div>
        ) : null}
        {emissions.direct.value ? (
          <div>
            <HighlightValue
              displayValue={emissions.direct.value.toPrecision(3)}
              header={emissions.direct.label || ''}
              unit={unit || ''}
              size="sm"
            />
          </div>
        ) : (
          <div />
        )}
        {emissions.indirect.value ? (
          <div>
            <HighlightValue
              displayValue={emissions.indirect.value.toPrecision(3)}
              header={emissions.direct.label || ''}
              unit={unit || ''}
              size="sm"
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    </CardContentBlock>
  );
};

type PathsActionNodeContentProps = {
  categoryId: string;
  node: ActionNode;
  refetching: boolean;
  onLoaded: (id: string, impact: number) => void;
};

const PathsActionNodeContent = (props: PathsActionNodeContentProps) => {
  const { categoryId, node, refetching = false, onLoaded } = props;
  const t = useTranslations();

  const yearRange = useReactiveVar(yearRangeVar);
  const pathsAction = new PathsActionNode(node);
  const impact = pathsAction.getYearlyImpact(yearRange[1]) || 0;

  useEffect(() => {
    onLoaded(categoryId, impact);
    // Using exhaustive deps here causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange[1]]);

  return (
    <CardContentBlock>
      <HighlightValue
        displayValue={pathsAction.isEnabled() ? beautifyValue(impact) : '-'}
        header={`${t('impact')} ${yearRange[1]}`}
        unit={pathsAction.getUnit() || ''}
        size="md"
        muted={refetching || !pathsAction.isEnabled()}
        mutedReason={!pathsAction.isEnabled() ? 'Not included in scenario' : ''}
      />
      <ActionParameters parameters={node.parameters} />
    </CardContentBlock>
  );
};

type PathsNodeContentProps = {
  categoryId: string;
  node: string;
  paths: string;
  onLoaded: (id: string, impact: number) => void;
};

const PathsNodeContent = React.memo((props: PathsNodeContentProps) => {
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

  const refetching = networkStatus === NetworkStatus.refetch;

  if (loading && !refetching) {
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
          onLoaded={onLoaded}
          refetching={refetching}
        />
      );
    } else if (data.node.__typename) {
      return (
        <PathsBasicNodeContent
          categoryId={categoryId}
          node={data.node}
          onLoaded={onLoaded}
        />
      );
    }
    return null;
  }
});

PathsNodeContent.displayName = 'PathsNodeContent';

type CategoryCardProps = {
  category: Category;
  group?: CategoryFragmentFragment;
  pathsInstance?: string;
  onLoaded: (id: string, impact: number) => void;
};

const CategoryCard = (props: CategoryCardProps) => {
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
        <Link href={category?.categoryPage?.urlPath || ''} legacyBehavior>
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
        {category.kausalPathsNodeUuid && pathsInstance && (
          <PathsNodeContent
            categoryId={category.id}
            node={category.kausalPathsNodeUuid}
            paths={pathsInstance}
            onLoaded={onLoaded}
          />
        )}
        {category.indicators?.length > 0 && (
          <CardContentBlock>
            <IndicatorSparkline indicator={category.indicators[0]} />
          </CardContentBlock>
        )}
      </div>
    </Card>
  );
};

export default CategoryCard;
