import React from 'react';
import Layout from '../components/layout';
import { aplans } from '../common/api';
import IndicatorsHero from '../components/Indicators/IndicatorsHero';
import PlanContext from '../context/plan';
import dynamic from 'next/dynamic'


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
    const { edges, nodes } = this.state;
    let content;

    if (process.browser) {
      const CytoGraph = dynamic(import('../components/insight/CytoGraph'));
      content = <CytoGraph edges={edges} nodes={nodes} />;
    }
    return (
      <Layout>
        <IndicatorsHero />
        {content}
      </Layout>
    );
  }
}

export default VisPage;
