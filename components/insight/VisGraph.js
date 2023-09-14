import React from 'react';
import { Container, Row } from 'reactstrap';
import Head from 'next/head';

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

class VisGraph extends React.Component {
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
    const { vis } = window;
    const { nodes, edges } = this.props;
    const nodesOut = [];
    const edgesOut = [];

    /* eslint no-param-reassign: ["error", { "props": false }] */
    nodes.forEach((node) => {
      const out = {};

      out.label = wordWrap(node.name, 40);
      out.id = node.id;
      const { type } = node;
      out.font = { face: 'HelsinkiGrotesk' };
      out.borderWidth = 0;
      switch (type) {
        case 'action':
          out.shape = 'hexagon';
          out.color = '#009246';
          break;
        case 'indicator':
          switch (node.indicator_level) {
            case 'operational':
              out.shape = 'box';
              out.color = '#00d7a7';
              break;
            case 'tactical':
              out.shape = 'box';
              out.color = '#9fc9eb';
              break;
            case 'strategic':
              out.shape = 'diamond';
              out.color = '#0072c6';
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      nodesOut.push(out);
    });
    edges.forEach((edge) => {
      const out = {};

      out.arrows = 'to';
      out.id = edge.id;
      out.from = edge.from;
      out.to = edge.to;

      if (edge.confidence_level === 'high') {
        out.width = 4;
      } else if (edge.confidence_level === 'medium') {
        out.width = 2;
      }

      const color = {};
      out.color = color;
      out.font = {
        size: 24,
        align: 'horizontal',
        strokeWidth: 4,
        bold: true,
      };
      switch (edge.effect_type) {
        case 'increases':
          color.color = '#009246';
          out.label = '+';
          break;
        case 'decreases':
          color.color = '#bd2719';
          out.label = '–';
          break;
        case 'part_of':
          color.color = 'grey';
          break;
        default:
          break;
      }
      edgesOut.push(out);
    });

    // provide the data in the vis format
    const visData = {
      nodes: new vis.DataSet(nodesOut),
      edges: new vis.DataSet(edgesOut),
    };
    const options = {
      layout: {
        hierarchical: {
          sortMethod: 'directed',
          enabled: false,
        },
      },
    };

    this.network = new vis.Network(visNode, visData, options);
  }

  render() {
    return (
      <Container style={{ paddingBottom: 3150 }}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css"
            integrity="sha256-iq5ygGJ7021Pi7H5S+QAUXCPUfaBzfqeplbg/KlEssg="
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.js"
            integrity="sha256-ff7iz7mLH5QJA9IUC44b+sqjMi7c2aTR9YO2DSzAGZo="
            crossOrigin="anonymous"
          />
        </Head>
        <Row>
          <div ref={this.visRef} style={{ height: 800, width: '100%' }} />
        </Row>
      </Container>
    );
  }
}

export default VisGraph;
