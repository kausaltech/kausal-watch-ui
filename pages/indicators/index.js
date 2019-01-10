import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import styled from 'styled-components';
import Layout from '../../components/layout';
import IndicatorList from '../../components/Indicators/IndicatorList';

import ContentLoader from '../../components/Common/ContentLoader';

const IndicatorsHero = styled(Jumbotron)`
  margin-bottom: 2rem;
`;

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

    // When rendering on the server, load initial data here to pass to the
    // list component. Server-side-rendered content works better for social media
    // shares and SEO.
    if (req) {
      props.indicatorListProps = await IndicatorList.fetchData();
    }
    return props;
  }

  async componentDidMount() {
    if (!this.state.indicatorListProps) {
      this.setState({
        indicatorListProps: await IndicatorList.fetchData(),
      });
    }
  }

  render() {
    let indicatorList;

    if (this.state.indicatorListProps) {
      indicatorList = (
        <IndicatorList {...this.state.indicatorListProps
      }
        />
      );
    } else {
      indicatorList = <ContentLoader />;
    }
    return (
      <Layout>
        <IndicatorsHero>
          <Container>
            <h1>
              Indikaattorit
            </h1>
          </Container>
        </IndicatorsHero>
        <Container>
          { indicatorList }
        </Container>
      </Layout>
    );
  }
}

export default IndicatorsPage;
