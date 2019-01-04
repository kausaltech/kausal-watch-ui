import React from 'react';
import Layout from '../../components/layout'
import IndicatorList from '../../components/Indicators/IndicatorList'

import ContentLoader from '../../components/Common/ContentLoader';

class IndicatorsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indicatorListProps: props.indicatorListProps
    }
  }
  
  static async getInitialProps({ req }) {
    let props = {}

    // When rendering on the server, load initial data here to pass to the
    // list component. Server-side-rendered content works better for social media
    // shares and SEO.
    if (req) {
      props.indicatorListProps = await IndicatorList.fetchData()
    }
    return props
  }

  async componentDidMount() {
    if (!this.state.indicatorListProps) {
      this.setState({
        indicatorListProps: await IndicatorList.fetchData()
      })
    }
  }
  
  render() {
    let indicatorList;

    if (this.state.indicatorListProps) {
      indicatorList = <IndicatorList {...this.state.indicatorListProps} />
    } else {
      indicatorList = <ContentLoader />
    }
    return (
      <Layout>
       <h1>Indicators</h1>
        {indicatorList}
      </Layout>
    );
  }
}

export default IndicatorsPage;
