import React from 'react';

import Comment from './Comment';
import ContentLoader from '../ContentLoader';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: [],
      commentCount: [],
    };
  }

  componentDidMount() {
    fetch(process.env.GATSBY_KK_API + "/comment/?authorization_code=&section=5rIcblAyv2TDP881lLeUiruj1DSllMUh&hearing=")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('comments loaded');
          this.setState({
            isLoaded: true,
            comments: result.results,
            commentCount: result.count
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  render() {
    if (this.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <ContentLoader />;
    } else {
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