import React from 'react';
import { Container, Row } from 'reactstrap';
import Head from 'next/head';
import styled from 'styled-components'


const VisContainer = styled.div`
  width: 100%;
  height: 800px;
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

class CytoGraph extends React.Component {
  constructor(props) {
    super(props);
    this.visRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.nodes) {
      return;
    }
    this.renderNetwork();
  }

  componentDidUpdate() {
    if (!this.props.nodes) {
      return;
    }
    this.renderNetwork();
  }

  renderNetwork() {
    const visNode = this.visRef.current;
    const { cytoscape } = window;
    const { nodes, edges } = this.props;
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
          label: wordWrap(node.name, 40),
          type: node.type,
          level: node.indicator_level,
          depth: node.depth,
          node,
        },
      };
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
          color = '#009246';
          label = '+';
          break;
        case 'decreases':
          color = '#bd2719';
          label = '–';
          break;
        case 'part_of':
          color = 'grey';
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
          label,
          color,
        },
      };
      elements.push(out);
    });

    cytoscape.use(window.cytoscapeCoseBilkent);
    cytoscape.use(window.cytoscapeDagre);

    const cy = cytoscape({
      container: visNode,
      elements,
      layout: {
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
      },
      maxZoom: 2,
      minZoom: 0.1,
      wheelSensitivity: 0.25,
      style: [ // the stylesheet for the graph
        {
          selector: '*',
          style: {
            'font-family': 'HelsinkiGrotesk',
          },
        },
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-outline-width': 1,
            'text-outline-color': '#eee',
          },
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'data(color)',
            'arrow-scale': 2,
            'line-color': 'data(color)',
            'text-outline-width': 1,
            'text-outline-color': '#eee',
            'curve-style': 'bezier',
            'text-margin-x': '10px',
            'text-halign': 'right',
            'font-size': '24px',
            'font-weight': 'bold',
          },
        },
        {
          selector: 'node[type="action"]',
          style: {
            shape: 'hexagon',
            'background-color': '#009246',
          },
        },
        {
          selector: 'node[level="operational"]',
          style: {
            shape: 'rectangle',
            'background-color': '#00d7a7',
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '20px',
          },
        },
        {
          selector: 'node[level="tactical"]',
          style: {
            shape: 'rectangle',
            'background-color': '#9fc9eb',
            width: 'label',
            height: 'label',
            'text-valign': 'center',
            padding: '20px',
          },
        },
        {
          selector: 'node[level="strategic"]',
          style: {
            shape: 'diamond',
            'background-color': '#9fc9eb',
          },
        },
      ],
    });
    this.cy = cy;
  }

  render() {
    return (
      <Container style={{ paddingBottom: 3150 }}>
        <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.3.1/cytoscape.umd.js" integrity="sha256-hn9fGJip8ICOwvaxGFKOtn4tfZtg1GShai5exCVKclM=" crossOrigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/cytoscape-cose-bilkent@4.0.0/cytoscape-cose-bilkent.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/dagre/0.8.4/dagre.js" integrity="sha256-8Bl575vPNIbhjI9ksUdwQyoV6LtDc9AWQ8M4EGJNnPI=" crossOrigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/cytoscape-dagre@2.2.2/cytoscape-dagre.min.js" />
        </Head>
        <Row>
          <VisContainer ref={this.visRef} />
        </Row>
      </Container>
    );
  }
}

export default CytoGraph;
