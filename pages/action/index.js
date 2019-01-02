import React from 'react';
import Head from 'next/head'
import Layout from '../../components/layout'
import ActionContent from '../../components/Actions/ActionContent'
import ContentLoader from '../../components/Common/ContentLoader'


class ActionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actionProps: props.actionProps
    }
  }

  static async getInitialProps({ req, query }) {
    const props = {}

    props.id = query.id
    if (req) {
      props.actionProps = await ActionContent.fetchData(props.id)
    }
    return props
  }

  async componentDidMount() {
    if (!this.state.actionProps) {
      this.setState({
        actionProps: await ActionContent.fetchData(this.props.id)
      })
    }
  }

  render() {
    let content, head

    if (this.state.actionProps) {
      const action = this.state.actionProps.action
      content = <ActionContent {...this.state.actionProps} />
      head = (
        <Head>
          <title>{action.name} | Hiilineutraali Helsinki 2035</title>
        </Head>
      )
    } else {
      content = <ContentLoader />
      head = null
    }

    return (
      <Layout>
        {head}
        {content}
      </Layout>
    );
  }
}

export default ActionPage;
