import React, { Component } from 'react';

import CommentCard from './CommentCard';

class CommentList extends Component {
  render() {
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
}

export default CommentList;
