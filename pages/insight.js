import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';
import Layout from '../components/layout';
import VisGraph from '../components/insight/VisGraph';
import CytoGraph from '../components/insight/CytoGraph';
import ContentLoader from '../components/Common/ContentLoader';
import { aplans } from '../common/api';
import IndicatorsHero from '../components/Indicators/IndicatorsHero';
import PlanContext from '../context/plan';


class VisPage extends React.Component {
  static contextType = PlanContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const plan = this.context;
    const resp = await aplans.get('insight', {
      params: {
        plan: plan.identifier,
      },
    });

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
