import React from 'react';
import Layout from '../../components/layout';
import CytoGraph from '../../components/insight/CytoGraph';
import { aplans } from '../../common/api';
import IndicatorsHero from '../../components/Indicators/IndicatorsHero';
import PlanContext from '../../context/plan';


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
        type: 'organization',
      },
    });

    const { data } = resp.data;
    const { edges, nodes } = data;

    this.setState({ edges, nodes });
  }

  render() {
    const { edges, nodes } = this.state;
    const content = <CytoGraph edges={edges} nodes={nodes} />;

    return (
      <Layout>
        <IndicatorsHero />
        {content}
      </Layout>
    );
  }
}

export default VisPage;
