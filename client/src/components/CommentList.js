import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';

class CommentList extends Component {
  componentDidMount() {
    const { postId } = this.props;
    this.props.fetchComments(postId);
  }

  render() {
    return (
      <div className="card row">
        <div className="col s12">
          <p>
            <span className="card-content-title">Comments: </span>
            <span>{(this.props.comments && this.props.comments.length) || 0}</span>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps, { fetchComments })(CommentList);
