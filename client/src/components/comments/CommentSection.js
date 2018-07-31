import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentSection extends Component {
  render() {
    const { postId, comments } = this.props;

    return (
      <div className="card row">
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <p>
                <i className="material-icons">people</i>
                <span className="card-content-title"> Comments: </span>
                <span className="card-content-text">{(comments && comments.length) || 0}</span>
              </p>
            </div>
          </div>
          <CommentList comments={comments} />
          <CommentInput postId={postId} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps)(CommentSection);
