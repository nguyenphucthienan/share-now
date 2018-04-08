import React, { Component } from 'react';

import CommentCard from './CommentCard';

class CommentList extends Component {
  render() {
    if (this.props.comments) {
      return (
        <div className="row">
          <div className="col s12">
            {
              this.props.comments.map(comment => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                />
              ))
            }
          </div>
        </div>
      );
    }

    return <div />;
  }
}

export default CommentList;
