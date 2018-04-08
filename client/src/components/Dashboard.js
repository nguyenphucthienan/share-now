import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

import PostList from './PostList';
import PostPagination from './PostPagination';

class Dashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Dashboard`;
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
      <div className="container">
        <h2 className="center-align">Dashboard</h2>
        <PostList />
        <PostPagination />
        {this.renderNewButton()}
      </div>
    );
  }
}

export default Dashboard;
