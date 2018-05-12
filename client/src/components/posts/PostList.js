import React, { Component } from 'react';

import PostCard from './PostCard';

class PostList extends Component {
  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map(post => (
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

export default PostList;
