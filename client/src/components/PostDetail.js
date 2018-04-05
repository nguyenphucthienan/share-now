import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../config';
import { fetchPost, clearPost, fetchComments, clearComments } from '../actions';

import CommentList from './CommentList';

class PostDetail extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Post`;

    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchComments(postId);
  }

  componentWillUnmount() {
    this.props.clearPost();
    this.props.clearComments();
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <a
          onClick={() => this.props.history.push('/dashboard')}
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </a>
      </div>
    );
  }

  render() {
    if (this.props.post) {
      const {
        _id: postId,
        image, title, content, hearts
      } = this.props.post;

      return (
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="row">
                <div className="col s12">
                  <h4 className="center-align">{title}</h4>
                </div>
              </div>
              <div className="card row">
                <div className="col s12 center-align image-detail">
                  <img className="responsive-img" src={image} alt={title} />
                  <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">favorite</i></a>
                </div>
              </div>
              <div className="card row">
                <div className="col s12">
                  <p>
                    <span className="card-content-title">Hearts: </span>
                    <span>{hearts.length || 0}</span>
                  </p>
                  <p>
                    <span className="card-content-title">Content: </span>
                    <span>{content}</span>
                  </p>
                </div>
              </div>
              <CommentList postId={postId} />
              {this.renderBackButton()}
            </div>
          </div>
        </div>
      );
    }

    return <div />;
  }
}

function mapStateToProps({ post }) {
  return { post };
}

export default connect(mapStateToProps, {
  fetchPost,
  clearPost,
  fetchComments,
  clearComments
})(withRouter(PostDetail));
