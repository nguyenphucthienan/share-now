import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import {
  fetchPost,
  clearPost,
  fetchComments,
  clearComments
} from '../../actions';

import CommentSection from '../comments/CommentSection';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostHearted: false,
      numOfHearts: 0
    };
  }

  componentDidMount() {
    document.title = `${config.appName} – Post`;

    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchComments(postId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      const { hearts } = nextProps.post;
      this.setState({ numOfHearts: hearts.length });

      if (this.props.user) {
        const { _id: userId } = this.props.user;
        this.setState({ isPostHearted: hearts.includes(userId) });
      }
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
    } catch (err) {
      console.log(err);
    }
  }

  async deletePost() {
    try {
      const { _id: postId } = this.props.post;
      await axios.delete(`/api/posts/${postId}`);
      this.props.history.push('/dashboard');
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
        <a
          className="btn-floating halfway-fab btn waves-effect waves-light red center-align"
          onClick={() => this.deletePost()}
        >
          <i className="material-icons left">delete_forever</i>Delete
        </a>
      );
    }

    return <div />;
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <Link
          to="/dashboard"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  render() {
    if (this.props.post) {
      const {
        _id: postId,
        image, location,
        title, content
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
                    <i className="material-icons">location_on</i>
                    <span className="card-content-title"> Location: </span>
                    <span className="card-content-text">{location}</span>
                  </p>
                </div>
              </div>
              <div className="card row">
                <div className="col s12">
                  <p>
                    <i className="material-icons">favorite</i>
                    <span className="card-content-title"> Hearts: </span>
                    <span className="card-content-text">{this.state.numOfHearts}</span>
                  </p>
                  <p>
                    <i className="material-icons">chrome_reader_mode</i>
                    <span className="card-content-title"> Content: </span>
                    <span className="card-content-text">{content}</span>
                  </p>
                  <div className="row">
                    <div className="col s12">
                      {this.renderDeleteButton()}
                    </div>
                  </div>
                </div>
              </div>
              <CommentSection postId={postId} />
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
  fetchPost,
  clearPost,
  fetchComments,
  clearComments
})(withRouter(PostDetail));
