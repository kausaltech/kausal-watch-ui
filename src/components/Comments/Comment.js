import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.showAuthor = this.showAuthor.bind(this);
    this.parseTimestamp = this.parseTimestamp.bind(this);
  }
  
  showAuthor(author) {
    if (author != null) return (<span>{author}</span>)
    else return (<span>Anonymous</span>)
  }
  
  parseTimestamp = (timestamp) => {
    const timeFormat = 'DD.MM.YYYY HH:mm';
    return moment(timestamp).format(timeFormat);
  }
    
  render() {
    const comment = this.props.comment;
    
    return (
      <div className="hearing-comment">
        <div className="hearing-comment-header clearfix">
          <div className="hearing-comment-votes">
            <Button className="btn-sm hearing-comment-vote-link">
              <span name="thumbs-o-up"/> {comment.n_votes}
            </Button>
          </div>
          <div className="hearing-comment-publisher">
            <span className="hearing-comment-user">
              {this.showAuthor(comment.author_name)}
            </span>
            <span className="hearing-comment-date">
              {this.parseTimestamp(comment.created_at)}
            </span>
          </div>
        </div>
        <div className="hearing-comment-body">
          <p>{comment.content}</p>
        </div>
      </div>
    );
  }
}

export default Comment;