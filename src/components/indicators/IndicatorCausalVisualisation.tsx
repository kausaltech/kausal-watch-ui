import type { ReactElement } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { Theme } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { captureException } from '@sentry/nextjs';
import { useLocale, useTranslations } from 'next-intl';
import { Alert } from 'reactstrap';

import ContentLoader from '@common/components/ContentLoader';

import { aplans } from '@/common/api';
import Connector from '@/components/indicators/Connector';
import IndicatorCard, { type IndicatorTimeResolution } from '@/components/indicators/IndicatorCard';
import { usePlan } from '@/context/plan';

type NodeId = string | number;

type CausalEdge = {
  id: NodeId;
  from: NodeId;
  to: NodeId;
  effect_type: string;
};

type RawNode = {
  id: NodeId;
  type: string;
  indicator_level: string;
  object_id: NodeId;
  name: string;
  latest_value: { value: number; date: string; unit: string } | null;
  time_resolution: IndicatorTimeResolution;
};

// Nodes are augmented with their connecting edges and grid position while
// the layout is being computed.
type CausalNode = RawNode & {
  from: CausalEdge[];
  to: CausalEdge[];
  column?: number;
  row?: number;
};

type InsightData = {
  nodes: RawNode[];
  edges: CausalEdge[];
};

const CausalChain = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 1em;
  margin-bottom: 3em;

  @media print {
    background-color: #fff;
  }
`;

const Column = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const StyledIndicator = styled.div`
  flex: 1 1 120px;
  position: relative;
  width: 240px;
  margin: 10px 20px;

  .card {
    height: 100%;
  }
`;

function getGridHeight(nodes: CausalNode[]) {
  let column = 0;
  let columnIndicators = nodes;
  let highestColumn = 0;

  while (columnIndicators.length !== 0) {
    columnIndicators = nodes.filter((item) => item.column === column);
    if (columnIndicators.length > highestColumn) highestColumn = columnIndicators.length;
    column += 1;
  }

  return highestColumn;
}

function getColumnHeight(nodes: CausalNode[], column: number) {
  const columnIndicators = nodes.filter((item) => item.column === column);
  return columnIndicators.length;
}

type NodeLayout = {
  top: number;
  height: number;
};

function drawEdge(
  nodes: CausalNode[],
  edge: CausalEdge,
  toIndex: number,
  gridHeight: number,
  theme: Theme,
  hoverId: NodeId | null,
  layout: Record<string, NodeLayout>
) {
  const fromNode = nodes.find((item) => edge.from === item.id);
  const toNode = nodes.find((item) => edge.to === item.id);

  if (!fromNode || !toNode) {
    return '';
  }

  const faded = hoverId != null && hoverId !== fromNode.id && hoverId !== toNode.id;
  const fromIndex = fromNode.from.findIndex((x) => x.id === edge.id);

  const fromColumn = fromNode.column ?? 0;
  const fromRow = fromNode.row ?? 0;
  const toColumn = toNode.column ?? 0;
  const toRow = toNode.row ?? 0;

  const nodeHeight = 160;
  const nodeWidth = 240;
  const verticalGap = 20;
  const centerX = nodeWidth / 2;

  const fromNodeHeight = (gridHeight / getColumnHeight(nodes, fromColumn)) * nodeHeight;
  const fromNodeFromTop = fromRow * (fromNodeHeight + verticalGap);

  const toNodeHeight = (gridHeight / getColumnHeight(nodes, toColumn)) * nodeHeight;
  const toNodeFromTop = toRow * (toNodeHeight + verticalGap);

  const fromDistribution = fromNodeHeight / (fromNode.from.length + 1);
  const fromOffset = fromIndex * fromDistribution + fromDistribution / 2;
  let startY = fromNodeFromTop - toNodeFromTop + fromOffset;

  const toDistribution = toNodeHeight / toNode.to.length;
  const toOffset = toIndex * toDistribution + toDistribution / 2;
  let endY = toOffset;

  let startX = -45 + (fromColumn - toColumn + 1) * 280;
  let endX = 0;

  let bend = startY < endY ? -5 : 5;

  // Pointing backward
  if (fromColumn > toColumn) {
    startX = (fromColumn - toColumn) * 280;
    endX = 235;
  }

  // Pointing down
  if (fromColumn === toColumn && fromRow < toRow) {
    const fromLayout = layout?.[String(fromNode.id)];
    const toLayout = layout?.[String(toNode.id)];
    if (fromLayout && toLayout) {
      // Use real measured positions
      startX = endX = centerX;
      startY = fromLayout.top + fromLayout.height - toLayout.top;
      endY = 0;
    } else {
      startX = endX = centerX;
      endY = 0;
      startY = fromNodeFromTop + fromNodeHeight - toNodeFromTop - 25;
      bend = 0;
    }
  }

  // Pointing up
  if (fromColumn === toColumn && fromRow > toRow) {
    const fromLayout = layout?.[String(fromNode.id)];
    const toLayout = layout?.[String(toNode.id)];

    if (fromLayout && toLayout) {
      startX = endX = centerX;
      startY = fromLayout.top - toLayout.top;
      endY = toLayout.height;
    } else {
      startX = endX = centerX;
      endY = toNodeHeight;
      startY = fromNodeFromTop - toNodeFromTop;
    }
    bend = 0;
  }

  let edgeColor: string = theme.themeColors.dark;
  let edgeIcon = '';

  switch (edge.effect_type) {
    case 'increases':
      edgeColor = theme.graphColors.green070;
      edgeIcon = '+';
      break;
    case 'decreases':
      edgeColor = theme.graphColors.red050;
      edgeIcon = '-';
      break;
    case 'part_of':
      edgeColor = theme.graphColors.blue070;
      edgeIcon = '⊂';
      break;
    default:
      edgeColor = theme.themeColors.dark;
      break;
  }

  return (
    <Connector
      startPoint={{ x: startX, y: startY }}
      endPoint={{ x: endX, y: endY }}
      color={edgeColor}
      bend={bend}
      icon={edgeIcon}
      faded={faded}
    />
  );
}

const setColumns = (nodes: CausalNode[], index: number, column: number): CausalNode[] => {
  // Assign indicators with columns
  const columned = nodes;

  // Sanity check: Bail out if we have already processed this.
  // FIXME: Otherwise setColumns() can sometimes loop forever
  if ('column' in columned[index]) {
    return columned;
  }
  columned[index].column = column;
  if (columned[index].from.length !== 0) {
    columned[index].from.forEach((edge) => {
      const nodeIndex = columned.findIndex((item) => item.id === edge.to);
      setColumns(columned, nodeIndex, column + 1);
    });
  }
  return columned;
};

const setRows = (nodes: CausalNode[]): CausalNode[] => {
  // Assign columned indicators with rows
  let columnIndicators = nodes;
  const griddedIndicators: CausalNode[] = [];
  let column = 0;
  while (columnIndicators.length !== 0) {
    columnIndicators = nodes.filter((item) => item.column === column);
    columnIndicators.forEach((indicator, row) => {
      indicator.row = row;
      griddedIndicators.push(indicator);
    });
    column += 1;
  }
  return griddedIndicators;
};

const combineData = (unfilteredNodes: RawNode[], unfilteredEdges: CausalEdge[]): CausalNode[] => {
  // Combine edges data to indicator nodes

  // FIXME: Use available data from old insight API to filter out "draft" indicators
  const filtered = unfilteredNodes.filter(
    (item) => item.type !== 'indicator' || item.indicator_level !== ''
  );
  const nodeIds = filtered.map((item) => item.id);
  const edges = unfilteredEdges.filter(
    (item) => nodeIds.includes(item.from) && nodeIds.includes(item.to)
  );

  const indicators: CausalNode[] = filtered.map((item) => ({
    ...item,
    from: edges.filter((edge) => edge.from === item.id),
    to: edges.filter((edge) => edge.to === item.id),
  }));

  const rootIndex = indicators.findIndex((item) => item.to.length === 0);
  const columned = setColumns(indicators, rootIndex, 0);
  const gridded = setRows(columned);
  return gridded;
};

type InteractiveCausalChainProps = {
  nodes: CausalNode[];
};

const InteractiveCausalChain = (props: InteractiveCausalChainProps) => {
  const { nodes } = props;
  const theme = useTheme();
  const [cardHover, setCardHover] = useState<NodeId | null>(null);

  const indicatorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [layout, setLayout] = useState<Record<string, NodeLayout>>({});

  useLayoutEffect(() => {
    const heights: Record<string, number> = {};

    nodes.forEach((node) => {
      const el = indicatorRefs.current[String(node.id)];
      if (el) {
        heights[String(node.id)] = el.getBoundingClientRect().height;
      }
    });

    const layoutMap: Record<string, NodeLayout> = {};
    const byColumn = new Map<number, CausalNode[]>();

    nodes.forEach((node) => {
      const col = node.column ?? 0;
      if (!byColumn.has(col)) byColumn.set(col, []);
      byColumn.get(col)!.push(node);
    });

    byColumn.forEach((colNodes) => {
      colNodes.sort((a, b) => (a.row ?? 0) - (b.row ?? 0));
      let offset = 0;
      colNodes.forEach((node) => {
        const id = String(node.id);
        const height = heights[id] ?? 160;
        layoutMap[id] = { top: offset, height };
        offset += height + 20;
      });
    });

    setLayout(layoutMap);
  }, [nodes]);

  let column = 0;
  const chain: ReactElement[] = [];
  const gridHeight = getGridHeight(nodes);
  let columnIndicators = nodes;

  const indicatorGoal = null; //FIXME: get goal value from API

  while (columnIndicators.length !== 0) {
    const children: ReactElement[] = [];

    columnIndicators = nodes.filter((item) => item.column === column);

    columnIndicators.forEach((indicator) => {
      let indicatorLevel = 'action';
      if (indicator.type !== 'action') indicatorLevel = indicator.indicator_level;
      const connectionsTo: ReactElement[] = [];
      indicator.to.forEach((edge, index) => {
        const edgeElement = drawEdge(nodes, edge, index, gridHeight, theme, cardHover, layout);
        if (!edgeElement) return;
        connectionsTo.push(<span key={edge.id}>{edgeElement}</span>);
      });

      const isConnected =
        cardHover != null &&
        (cardHover === indicator.id || indicator.to.some((edge) => edge.from === cardHover));

      children.push(
        <StyledIndicator
          key={indicator.id}
          ref={(el) => {
            indicatorRefs.current[String(indicator.id)] = el;
          }}
          onMouseEnter={() => {
            setCardHover(indicator.id);
          }}
          onMouseLeave={() => {
            setCardHover(null);
          }}
        >
          <IndicatorCard
            objectid={String(indicator.object_id)}
            name={indicator.name}
            level={indicatorLevel}
            key={indicator.id}
            latestValue={indicator.latest_value}
            resolution={indicator.time_resolution}
            goalValue={indicatorGoal}
            disabled={cardHover != null && !isConnected}
          />
          {connectionsTo}
        </StyledIndicator>
      );
    });
    chain.push(<Column key={column}>{children}</Column>);
    column += 1;
  }

  return <CausalChain className="causal-chain-visualisation">{chain}</CausalChain>;
};

type IndicatorCausalVisualisationProps = {
  actionId: string;
};

function IndicatorCausalVisualisation({ actionId }: IndicatorCausalVisualisationProps) {
  const plan = usePlan();
  const isServer = typeof window === 'undefined';
  const locale = useLocale();
  const t = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<InsightData | null>(null);

  useEffect(() => {
    if (data) {
      return;
    }
    const params = {
      plan: plan.identifier,
      action: actionId,
      language: locale,
    };
    void aplans
      .get('insight', { params })
      .then((result: InsightData) => {
        setData(result);
        setIsLoaded(true);
      })
      .catch((err: unknown) => {
        captureException(err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoaded(true);
      });
  }, [actionId, plan.identifier, locale, data]);

  if (error) {
    return (
      <Alert color="danger">
        Error:
        {error.message}
      </Alert>
    );
  }
  if (isServer || !isLoaded || !data) {
    return <ContentLoader message={t('loading')} />;
  }

  return (
    <div>
      <InteractiveCausalChain nodes={combineData(data.nodes, data.edges)} />
    </div>
  );
}

export default IndicatorCausalVisualisation;
