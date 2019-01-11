import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import ContentLoader from './Common/ContentLoader';
import ErrorComponent from '../pages/_error';


class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    if (!this.constructor.PageContentComponent) {
      throw new Error('You must supply PageContentComponent');
    }

    this.state = {
      id: props.id,
      childProps: props.childProps,
      error: props.error,
    };
  }

  static async getInitialProps({ res, req, query }) {
    const props = {};

    props.id = query.id;
    if (req) {
      const data = await this.PageContentComponent.fetchData(props.id);
      if (!data) {
        if (res) {
          res.statusCode = 404;
        }
        props.error = 404;
      } else {
        props.childProps = data;
      }
    }
    return props;
  }

  async componentDidMount() {
    const { childProps, id } = this.state;

    if (!childProps) {
      const data = await this.constructor.PageContentComponent.fetchData(id);
      if (!data) {
        this.setState({
          error: 404,
        });
      } else {
        this.setState({
          childProps: data,
        });
      }
    }
  }

  render() {
    let content;
    const { childProps, error } = this.state;
    const { PageContentComponent } = this.constructor;

    if (error) {
      return <ErrorComponent statusCode={error} />;
    }
    let headTags;
    if (childProps) {
      headTags = PageContentComponent.getHeadTags(childProps);
      content = <PageContentComponent {...childProps} />;
    } else {
      content = <ContentLoader />;
    }
    return (
      <Layout {...headTags}>
        {content}
      </Layout>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  childProps: PropTypes.object,
  error: PropTypes.number,
};

export default DetailPage;
