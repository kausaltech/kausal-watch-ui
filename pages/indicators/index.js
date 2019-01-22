import React from 'react';
import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import IndicatorsHero from '../../components/Indicators/IndicatorsHero';
import IndicatorList from '../../components/Indicators/IndicatorList';

import ContentLoader from '../../components/Common/ContentLoader';

class IndicatorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorListProps: props.indicatorListProps,
    };
  }

  static async getInitialProps({
    req,
  }) {
    const props = {};

    if (req) {
      props.indicatorListProps = await IndicatorList.fetchData();
    }
    return props;
  }

  async componentDidMount() {
    const { indicatorListProps } = this.state;
    if (!indicatorListProps) {
      this.setState({
        indicatorListProps: await IndicatorList.fetchData(),
      });
    }
  }

  render() {
    let indicatorList;
    const { indicatorListProps } = this.state;

    if (indicatorListProps) {
      indicatorList = (
        <IndicatorList {...indicatorListProps} />
      );
    } else {
      indicatorList = <ContentLoader />;
    }
    return (
      <Layout>
        <IndicatorsHero />
        <Container>
          { indicatorList }
        </Container>
      </Layout>
    );
  }
}

export default IndicatorsPage;
