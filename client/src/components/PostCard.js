import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { fetchPosts } from '../actions';

class PostCard extends Component {
  constructor(props) {
    super(props);
    const { _id: userId } = this.props.user;
    const { hearts } = this.props.post;

    this.state = {
      isPostHearted: hearts.includes(userId),
      numOfHearts: hearts.length
    };
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

    const { _id: postId } = this.props.post;
    await axios.post(`/api/posts/${postId}/heart`, null);
    await this.props.fetchPosts();
  }

  render() {
    const {
      _id: postId,
      image,
      title
    } = this.props.post;

    const heartColor = this.state.isPostHearted ? 'red' : 'grey darken-2';

    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image">
            <img src={image} alt={title} />
            <Link to={`/posts/${postId}`}>
              <span className="card-title">{title}</span>
            </Link>
            <a
              className={`btn-floating halfway-fab waves-effect waves-light ${heartColor}`}
              onClick={() => this.heartOrUnheartPost()}
            >
              <i className="material-icons">favorite</i>
            </a>
          </div>
          <div className="card-content">
            <p>
              <span className="card-content-title">Hearts: </span>
              <span>{this.state.numOfHearts}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { fetchPosts })(withRouter(PostCard));
