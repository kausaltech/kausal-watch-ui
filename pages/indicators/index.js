import React from 'react';
import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import IndicatorsHero from '../../components/Indicators/IndicatorsHero';
import IndicatorList from '../../components/Indicators/IndicatorList';

import PlanContext from '../../context/plan';


class IndicatorsPage extends React.Component {
  render() {
    return (
      <Layout>
        <IndicatorsHero />
        <Container>
          <IndicatorList />
        </Container>
      </Layout>
    );
  }
}

IndicatorsPage.contextType = PlanContext;

export default IndicatorsPage;
