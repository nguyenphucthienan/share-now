import React, { Component } from 'react';

class CommentCard extends Component {
  render() {
    const {
      author: { email, displayName },
      content
    } = this.props.comment;

    return (
      <div>
        <hr />
        <p className="card-content-title">{email} - {displayName}</p>
        <p>{content}</p>
      </div>
    );
  }
}

export default CommentCard;
