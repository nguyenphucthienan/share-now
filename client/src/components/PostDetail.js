import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {
  fetchPosts,
  fetchPost,
  clearPost,
  fetchComments,
  clearComments
} from '../actions';

import CommentList from './CommentList';

class PostDetail extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Post`;

    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchComments(postId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      const { _id: userId } = this.props.user;
      const { hearts } = nextProps.post;

      this.setState({
        isPostHearted: hearts.includes(userId),
        numOfHearts: hearts.length
      });
    }
  }

  componentWillUnmount() {
    this.props.clearPost();
    this.props.clearComments();
  }

  async heartOrUnheartPost() {
    if (this.state.isPostHearted) {
      this.setState({
        isPostHearted: !this.state.isPostHearted,
        numOfHearts: this.state.numOfHearts - 1
      });
    } else {
      this.setState({
        isPostHearted: !this.state.isPostHearted,
        numOfHearts: this.state.numOfHearts + 1
      });
    }

    try {
      const { _id: postId } = this.props.post;
      await axios.post(`/api/posts/${postId}/heart`, null);
      await this.props.fetchPosts(this.props.page);
    } catch (err) {
      console.log(err);
    }
  }

  renderHeartButton() {
    if (this.props.user) {
      const heartColor = this.state.isPostHearted ? 'pink lighten-1' : 'grey darken-2';

      return (
        <a
          className={`btn-floating halfway-fab waves-effect waves-light ${heartColor}`}
          onClick={() => this.heartOrUnheartPost()}
        >
          <i className="material-icons">favorite</i>
        </a >
      );
    }

    return <div />;
  }

  renderDeleteButton() {
    const { _id: userId } = this.props.user;
    const { _id: authorId } = this.props.post.author;

    if (userId && userId === authorId) {
      return (
        <button type="button" className="btn-floating halfway-fab btn waves-effect waves-light red center-align">
          <i className="material-icons left">delete_forever</i>Delete
        </button>
      );
    }

    return <div />;
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
        image, title, content
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
                  {this.renderHeartButton()}
                </div>
              </div>
              <div className="card row">
                <div className="col s12">
                  <p>
                    <span className="card-content-title">Hearts: </span>
                    <span>{this.state.numOfHearts}</span>
                  </p>
                  <p>
                    <span className="card-content-title">Content: </span>
                    <span>{content}</span>
                  </p>
                  <div className="row">
                    <div className="col s12">
                      {this.renderDeleteButton()}
                    </div>
                  </div>
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

function mapStateToProps({ user, posts: { page }, post, }) {
  return { user, page, post };
}

export default connect(mapStateToProps, {
  fetchPosts,
  fetchPost,
  clearPost,
  fetchComments,
  clearComments
})(withRouter(PostDetail));
