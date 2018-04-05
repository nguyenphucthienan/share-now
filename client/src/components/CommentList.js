import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentInput from './CommentInput';
import CommentCard from './CommentCard';

class CommentList extends Component {
  renderComments() {
    if (this.props.comments) {
      return this.props.comments.map(comment => (
        <CommentCard
          key={comment._id}
          comment={comment}
        />
      ));
    }

    return <div />;
  }

  render() {
    const { postId, comments } = this.props;

    return (
      <div className="card row">
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <p>
                <span className="card-content-title">Comments: </span>
                <span>{(comments && comments.length) || 0}</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {this.renderComments()}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col s12">
              <CommentInput postId={postId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps)(CommentList);
