import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyPosts, clearMyPosts } from '../actions';
import config from '../config';

import PostList from './posts/PostList';
import PostPagination from './posts/PostPagination';

class MyPostDashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – My Posts`;
    this.props.fetchMyPosts(this.props.page || 1);
  }

  componentWillUnmount() {
    this.props.clearMyPosts();
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
        <PostList posts={this.props.postsData} />
        <PostPagination
          totalPages={this.props.totalPages}
          page={this.props.page}
          fetchPosts={this.props.fetchMyPosts}
        />
        {this.renderNewButton()}
      </div>
    );
  }
}

function mapStateToProps({ myPosts: { postsData, totalPages, page } }) {
  return { postsData, totalPages, page };
}

export default connect(mapStateToProps, {
  fetchMyPosts,
  clearMyPosts
})(MyPostDashboard);
