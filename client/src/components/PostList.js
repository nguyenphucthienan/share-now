import React, { Component } from 'react';

import PostCard from './PostCard';

class PostList extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    );
  }
}

export default PostList;
