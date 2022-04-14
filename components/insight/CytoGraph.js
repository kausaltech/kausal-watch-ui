import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Container, Row, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import dayjs from 'dayjs';
import styled, { withTheme } from 'styled-components';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { withRouter } from 'next/router';

import { withTranslation } from '../../common/i18n';
import { getIndicatorLinkProps, getActionLinkProps } from '../../common/links';
import { Meta } from '../layout';
import InsightFilter from './InsightFilter';

cytoscape.use(dagre);

const VisContainer = styled.div`
  width: 100%;
  height: 800px;
  background-color: #f6f6f6;
  margin: 2em 0;
`;

function wordWrap(inputStr, maxWidth) {
  const newLineStr = '\n';
  let done = false;
  let res = '';
  let str = inputStr;

  function testWhite(x) {
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

/* eslint-disable react/static-property-placement */
class CytoGraph extends React.Component {
  static propTypes = {
    filters: PropTypes.shape({
      indicator: PropTypes.number,
    }),
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filters: {
      indicator: null,
    },
  };

  constructor(props) {
    super(props);
    this.visRef = React.createRef();
    this.handleFilterNode = this.handleFilterNode.bind(this);
    this.state = {
      filters: props.filters,
    };
  }

  componentDidMount() {
    const { nodes } = this.props;

    if (!nodes) {
      return;
    }
    this.renderNetwork();
  }

  componentDidUpdate() {
    const { nodes } = this.props;

    if (!nodes) {
      return;
    }
    this.renderNetwork();
  }

  handleFilterNode(nodeId) {
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
    onFilterChange({ indicator: parseInt(node[0].id.substr(1), 10) });
  }

  downloadAs(el) {
    const cygraph = this.cy;
    const { target } = el;
    const exportOptions = {
      full: true,
      output: 'blob',
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
    const { nodes, edges, theme, router } = this.props;
    const elements = [];
    const nodeMap = {};

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
      const out = {
        data: {
          id: node.id,
          type: node.type,
          level: node.indicator_level,
          depth: node.depth,
          identifier: node.identifier,
          node,
        },
      };

      if (node.type === 'action') {
        out.data.label = wordWrap(`${node.identifier}. ${node.name}`, 40);
      } else {
        out.data.label = wordWrap(node.name, 40);
      }

      /*
      if (node.parent && node.indicator_level === 'strategic') {
        out.data.parent = node.parent.id;
      }
      */
      elements.push(out);
    });

    edges.forEach((edge) => {
      let color;
      let label;

      /*
      if (edge.effect_type === 'part_of') {
        return;
      }
      */
      switch (edge.effect_type) {
        case 'increases':
          color = theme.causalityIncreasesColor;
          label = '+';
          break;
        case 'decreases':
          color = theme.causalityDecreasesColor;
          label = '–';
          break;
        case 'part_of':
          color = theme.causalityIsPartOfColor;
          label = '';
          break;
        default:
          break;
      }
      const out = {
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

    const cyLayoutOptions = {
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
      style: [ // the stylesheet for the graph
        {
          selector: '*',
          style: {
            'font-family': `${theme.fontFamily}, sans-serif`,
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
            color: theme.actionColorFg,
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
            'background-color': theme.operationalIndicatorColor,
            color: theme.operationalIndicatorColorFg,
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
            'background-color': theme.tacticalIndicatorColor,
            color: theme.tacticalIndicatorColorFg,
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
            'background-color': theme.strategicIndicatorColor,
            color: theme.strategicIndicatorColorFg,
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
        const removeNodes = cy.nodes().difference(selectedNodes).filter((node) => node.id() != rootNode.id());
        removeNodes.remove();
        cy.layout(cyLayoutOptions).run();
        cy.center(rootNode);
      }
    }
    function nodeTapHandler() {
      if (this.data('type') === 'action') {
        const id = this.data('identifier');
        const link = getActionLinkProps(id);
        router.push(link.href);
      } else {
        const id = this.data('id').substr(1);
        const link = getIndicatorLinkProps(id);
        router.push(link.href);
      }
    }
    cy.on('tap', 'node', nodeTapHandler);
  }

  render() {
    const { nodes, filters, t } = this.props;
    const { indicator } = filters;
    let activeFilterNode;

    if (indicator != null) {
      activeFilterNode = `i${indicator.toString()}`;
    }

    return (
      <div>
        <Meta
          title={`${t('indicators')}`}
          description="Toimenpiteiden edistymistä ja kasvihuonekaasupäästöjen kehitystä seurataan mittareilla"
        />
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

export default withRouter(withTranslation('common')(withTheme(CytoGraph)));
