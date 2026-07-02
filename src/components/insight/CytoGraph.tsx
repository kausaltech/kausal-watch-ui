import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Theme } from '@emotion/react';
import { withTheme } from '@emotion/react';
import styled from '@emotion/styled';

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import type { TFunction } from '@/common/i18n';
import { usePlan } from '@/context/plan';

import { getActionLinkProps, getIndicatorLinkProps } from '../../common/links';
import InsightFilter from './InsightFilter';

cytoscape.use(dagre);

type Router = ReturnType<typeof useRouter>;

// Nodes and edges as returned by the (legacy) insight API. Nodes are augmented
// at render time with their resolved cause/effect relations.
type InsightNode = {
  id: string;
  type: string;
  indicator_level: string;
  depth: number;
  identifier: string;
  name: string;
  causes: InsightNode[];
  effects: InsightNode[];
  parent?: InsightNode;
};

type InsightEdge = {
  id: string;
  from: string;
  to: string;
  effect_type: string;
  confidence_level: string;
};

type InsightFilters = {
  indicator: number | null;
};

// dagre layout options are provided by the cytoscape-dagre plugin and aren't
// part of cytoscape's built-in LayoutOptions union.
type DagreLayoutOptions = cytoscape.BaseLayoutOptions & {
  name: 'dagre';
  ranker?: string;
  edgeWeight?: (edge: cytoscape.EdgeSingular) => number;
  nodeDimensionsIncludeLabels?: boolean;
  animate?: boolean;
  animateDuration?: number;
  zoom?: number;
  pan?: { x: number; y: number };
};

type CytoGraphOwnProps = {
  nodes: InsightNode[];
  edges: InsightEdge[];
  filters: InsightFilters;
  onFilterChange: (filters: InsightFilters) => void;
};

type CytoGraphProps = CytoGraphOwnProps & {
  theme: Theme;
  t: TFunction;
  router: Router;
  pathname: string;
  searchParams: ReturnType<typeof useSearchParams>;
  openIndicatorsInModal: boolean;
};

type CytoGraphState = {
  filters: InsightFilters;
};

const VisContainer = styled.div`
  width: 100%;
  height: 800px;
  background-color: #f6f6f6;
  margin: 2em 0;
`;

function wordWrap(inputStr: string, maxWidth: number) {
  const newLineStr = '\n';
  let done = false;
  let res = '';
  let str = inputStr;

  function testWhite(x: string) {
    const white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
  }

  do {
    let found = false;
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i -= 1) {
      if (testWhite(str.charAt(i))) {
        res += [str.slice(0, i), newLineStr].join('');
        str = str.slice(i + 1);
        found = true;
        break;
      }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
      res += [str.slice(0, maxWidth), newLineStr].join('');
      str = str.slice(maxWidth);
    }

    if (str.length < maxWidth) done = true;
  } while (!done);

  return res + str;
}

class CytoGraph extends React.Component<CytoGraphProps, CytoGraphState> {
  visRef = React.createRef<HTMLDivElement>();

  cy?: cytoscape.Core;

  state: CytoGraphState = {
    filters: this.props.filters,
  };

  componentDidMount() {
    const { nodes } = this.props;

    if (!nodes) {
      return;
    }
    this.renderNetwork();
  }

  componentDidUpdate(prevProps: CytoGraphProps) {
    const { nodes, edges } = this.props;

    if (!nodes) {
      return;
    }
    // Only rebuild the graph when the underlying data changes. Other prop
    // changes (e.g. the modal search param) must not trigger a full re-layout.
    if (prevProps.nodes === nodes && prevProps.edges === edges) {
      return;
    }
    this.renderNetwork();
  }

  handleFilterNode = (nodeId: string | null) => {
    const { onFilterChange } = this.props;

    if (!nodeId) {
      onFilterChange({ indicator: null });
      return;
    }
    const { nodes } = this.props;
    const node = nodes.filter((obj) => obj.id === nodeId);
    if (node.length !== 1) {
      throw new Error(`Node with id ${nodeId} not found`);
    }
    onFilterChange({ indicator: parseInt(node[0].id.slice(1), 10) });
  };

  downloadAs(el: React.MouseEvent<HTMLElement>) {
    const cygraph = this.cy;
    if (!cygraph) {
      return;
    }
    const target = el.currentTarget as HTMLAnchorElement;
    const exportOptions = {
      full: true,
      output: 'blob' as const,
      maxWidth: 25000,
      bg: '#ffffff',
    };
    const blob = cygraph.png(exportOptions);
    const url = window.URL.createObjectURL(blob);
    target.href = url;
    target.target = '_blank';
    target.download = `nakemysverkko-${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.png`;
  }

  renderNetwork() {
    const visNode = this.visRef.current;
    const { nodes, edges, theme, router, pathname, searchParams, openIndicatorsInModal } =
      this.props;
    const elements: cytoscape.ElementDefinition[] = [];
    const nodeMap: Record<string, InsightNode> = {};

    nodes.forEach((node) => {
      nodeMap[node.id] = node;
      node.causes = [];
      node.effects = [];
    });

    edges.forEach((edge) => {
      const fromNode = nodeMap[edge.from];
      const toNode = nodeMap[edge.to];

      if (edge.effect_type === 'part_of') {
        nodeMap[edge.from].parent = nodeMap[edge.to];
      }
      fromNode.effects.push(toNode);
      toNode.causes.push(fromNode);
    });

    nodes.forEach((node) => {
      const label =
        node.type === 'action'
          ? wordWrap(`${node.identifier}. ${node.name}`, 40)
          : wordWrap(node.name, 40);

      const out: cytoscape.ElementDefinition = {
        data: {
          id: node.id,
          type: node.type,
          level: node.indicator_level,
          depth: node.depth,
          identifier: node.identifier,
          node,
          label,
        },
      };

      elements.push(out);
    });

    edges.forEach((edge) => {
      let color: string | undefined;
      let label: string | undefined;

      switch (edge.effect_type) {
        case 'increases':
          color = theme.graphColors.green050;
          label = '+';
          break;
        case 'decreases':
          color = theme.graphColors.red050;
          label = '–';
          break;
        case 'part_of':
          color = theme.graphColors.blue070;
          label = '';
          break;
        default:
          break;
      }
      const out: cytoscape.ElementDefinition = {
        data: {
          id: edge.id,
          source: edge.from,
          target: edge.to,
          confidenceLevel: edge.confidence_level,
          label,
          color,
        },
      };
      elements.push(out);
    });

    const cyLayoutOptions: DagreLayoutOptions = {
      name: 'dagre',
      ranker: 'longest-path',
      edgeWeight: (edge) => {
        let weight = 1;

        if (edge.source().data('level') === 'strategic') {
          weight += 1;
        }
        if (edge.target().data('level') === 'strategic') {
          weight += 1;
        }
        return weight;
      },
      nodeDimensionsIncludeLabels: true,
      animate: false,
      animateDuration: 2000,
      zoom: 0.5,
      pan: { x: 0, y: 0 },
    };

    const cy = cytoscape({
      container: visNode,
      elements,
      layout: cyLayoutOptions,
      zoomingEnabled: true,
      maxZoom: 2,
      minZoom: 0.1,
      style: [
        // the stylesheet for the graph
        {
          selector: '*',
          style: {
            'font-family': `sans-serif`,
          },
        },
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-outline-width': 0,
            color: '#ffffff',
            'font-weight': theme.fontWeightNormal,
          },
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            'target-text-offset': 1,
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'data(color)',
            'arrow-scale': 2,
            'line-color': 'data(color)',
            'text-outline-width': 3,
            'text-outline-color': 'data(color)',
            color: '#ffffff',
            'curve-style': 'bezier',
            'font-size': '18px',
            'font-weight': theme.fontWeightBold,
            width: 2,
          },
        },
        {
          selector: 'edge[confidenceLevel="high"]',
          style: {
            width: 5,
          },
        },
        {
          selector: 'node[type="action"]',
          style: {
            shape: 'rectangle',
            'background-color': theme.actionColor,
            color: readableColor(theme.actionColor),
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '24px',
          },
        },
        {
          selector: 'node[level="operational"]',
          style: {
            shape: 'rectangle',
            'background-color': theme.graphColors.blue070,
            color: readableColor(theme.graphColors.blue070),
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '12px',
          },
        },
        {
          selector: 'node[level="tactical"]',
          style: {
            shape: 'rectangle',
            'background-color': theme.graphColors.blue030,
            color: readableColor(theme.graphColors.blue030),
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '12px',
          },
        },
        {
          selector: 'node[level="strategic"]',
          style: {
            shape: 'rectangle',
            'background-color': theme.graphColors.blue010,
            color: readableColor(theme.graphColors.blue010),
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '24px',
          },
        },
        {
          selector: 'node[level="unspecified"]',
          style: {
            shape: 'rectangle',
            'background-color': theme.graphColors.grey020,
            color: readableColor(theme.graphColors.grey020),
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '24px',
          },
        },
      ],
    });
    this.cy = cy;
    const { filters } = this.state;
    const { indicator } = filters;
    if (indicator) {
      const rootNode = cy.$(`#i${indicator}`);

      if (rootNode) {
        const selectedNodes = rootNode.predecessors();
        const removeNodes = cy
          .nodes()
          .difference(selectedNodes)
          .filter((node) => node.id() != rootNode.id());
        removeNodes.remove();
        cy.layout(cyLayoutOptions).run();
        cy.center(rootNode);
      }
    }
    cy.on('tap', 'node', (evt) => {
      const node = evt.target as cytoscape.NodeSingular;
      if (node.data('type') === 'action') {
        const id = node.data('identifier') as string;
        const link = getActionLinkProps(id);
        router.push(link.href);
      } else {
        const id = (node.data('id') as string).slice(1);
        if (openIndicatorsInModal) {
          // Open the indicator in the global modal by setting the search param
          // that GlobalIndicatorModal listens for, instead of navigating away.
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('indicator', id);
          router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
        } else {
          const link = getIndicatorLinkProps(id);
          router.push(link.href);
        }
      }
    });
  }

  render() {
    const { nodes, filters, t } = this.props;
    const { indicator } = filters;
    let activeFilterNode: string | null = null;

    if (indicator != null) {
      activeFilterNode = `i${indicator.toString()}`;
    }

    return (
      <div>
        <Container>
          <Row>
            <Col sm="8" lg="6">
              <InsightFilter
                nodes={nodes}
                activeFilterNode={activeFilterNode}
                onFilterNode={this.handleFilterNode}
              />
            </Col>
            <Col sm="4" lg="6">
              <UncontrolledButtonDropdown className="float-end">
                <DropdownToggle caret color="secondary">
                  {t('insight-download-label')}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" href="#" onClick={(e) => this.downloadAs(e)}>
                    {t('insight-download-png')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Col>
          </Row>
        </Container>
        <VisContainer ref={this.visRef} />
      </div>
    );
  }
}

// Extend this legacy class component with translations and router hooks
function ExtendedCytoGraph(props: CytoGraphOwnProps & { theme: Theme }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const plan = usePlan();
  const openIndicatorsInModal = plan.features.indicatorsOpenInModal === true;

  return (
    <CytoGraph
      {...props}
      t={t}
      router={router}
      pathname={pathname}
      searchParams={searchParams}
      openIndicatorsInModal={openIndicatorsInModal}
    />
  );
}

export default withTheme(ExtendedCytoGraph);
