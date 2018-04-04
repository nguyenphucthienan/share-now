import React, { Component } from 'react';
import config from '../config';

import PostList from './PostList';

class Dashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Dashboard`;
  }

  render() {
    return (
      <div className="container">
        <h2 className="center-align">Dashboard</h2>
        <PostList />
      </div>
    );
  }
}

export default Dashboard;
