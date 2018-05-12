import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

import PostList from './posts/PostList';
import PostPagination from './posts/PostPagination';

class MyPostDashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – My Posts`;
  }

  renderNewButton() {
    return (
      <div className="fixed-action-btn">
        <Link
          to="/posts/new"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="container white-text">
        <h2 className="center-align">My Posts</h2>
        <PostList />
        <PostPagination />
        {this.renderNewButton()}
      </div>
    );
  }
}

export default MyPostDashboard;
