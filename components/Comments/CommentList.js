import React from 'react';
import { Alert } from 'reactstrap';
import { kerrokantasi as kkAPI } from '../../common/api';

import Comment from './Comment';
import ContentLoader from '../common/ContentLoader';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: [],
      commentCount: [],
    };

    this.fetchComments = this.fetchComments.bind(this);
  }

  fetchComments(section) {
    kkAPI.get('comment', {
      params: {
        section,
      },
    })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            comments: result.data.results,
            commentCount: result.data.count,
          });
          this.props.updateCount(result.data.count);
        },
      )
      .catch(
        (error) => {
          this.setState({
            isLoaded: true,
            error: true,
          });
        },
      );
  }

  componentDidMount() {
    this.fetchComments(this.props.section);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.refresh !== prevProps.refresh) {
      this.fetchComments(this.props.section);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="comment-list">
          <Alert>
Error:
            {this.state.error.message}
          </Alert>
        </div>
      );
    } if (!this.state.isLoaded) {
      return (<ContentLoader />);
    } if (this.state.commentCount === 0) {
      return (<div className="comment-list"><Alert>Ei kommentteja</Alert></div>);
    }

    return (
      <div className="comment-list">
        {this.state.comments.map(item => (
          <Comment key={item.id} comment={item} />
        ))}
      </div>
    );
  }
}
export default CommentList;
