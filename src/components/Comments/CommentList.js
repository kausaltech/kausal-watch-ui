import React from 'react';
import axios from 'axios';

import { Alert }  from 'reactstrap';
import Comment from './Comment';
import ContentLoader from '../Common/ContentLoader';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: [],
      commentCount: [],
    };
    
    this.fetchComments = this.fetchComments.bind(this)
  }

  fetchComments(section) {
    axios.get(process.env.GATSBY_KK_API + "/comment", {
      params: {
        section: section
      }
    })
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          comments: result.data.results,
          commentCount: result.data.count
        });
      })
    .catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error: true
        });
      }
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
      return (<div className="comment-list"><Alert>Error: {this.state.error.message}</Alert></div>);
    } else if (!this.state.isLoaded) {
      return (<ContentLoader />);
    } else if (this.state.commentCount === 0) {
      return (<div className="comment-list"><Alert>Ei kommentteja</Alert></div>);
    }
    else {
      return (
      <div className="comment-list">
         {this.state.comments.map(item => (
            <Comment key={item.id} comment={item} />
          ))}
      </div>
    );
  }
}
}
export default CommentList;