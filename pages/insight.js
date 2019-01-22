import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';
import Layout from '../components/layout';
import VisGraph from '../components/insight/VisGraph';
import CytoGraph from '../components/insight/CytoGraph';
import ContentLoader from '../components/Common/ContentLoader';
import { aplans } from '../common/api';
import IndicatorsHero from '../components/Indicators/IndicatorsHero';

class VisPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const resp = await aplans.get('insight');
    const { data } = resp.data;
    const { edges, nodes } = data;

    this.setState({ edges, nodes });
  }

  render() {
    let content;
    const { edges, nodes } = this.state;

    content = <CytoGraph edges={edges} nodes={nodes} />;
    return (
      <Layout>
        <IndicatorsHero />
        {content}
      </Layout>
    );
  }
}

export default VisPage;
