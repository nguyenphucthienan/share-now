import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import PostCard from './PostCard';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.page || 1);
  }

  renderPosts() {
    if (this.props.postsData) {
      return this.props.postsData.map(post => (
        <PostCard
          key={post._id}
          post={post}
        />
      ));
    }

    return <div />;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts: { page, postsData } }) {
  return { page, postsData };
}

export default connect(mapStateToProps, {
  fetchPosts
})(PostList);
