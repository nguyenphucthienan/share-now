import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, clearPosts } from '../actions';
import config from '../config';

import PostList from './posts/PostList';
import PostPagination from './posts/PostPagination';

let deferredPrompt;

class Dashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Dashboard`;
    this.props.fetchPosts(this.props.page || 1);

    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      deferredPrompt = event;
      return false;
    });

    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }
      });

      deferredPrompt = null;
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  renderNewButton() {
    if (this.props.user) {
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

    return <div />;
  }

  render() {
    return (
      <div className="container">
        <h2 className="center-align">Dashboard</h2>
        <PostList posts={this.props.postsData} />
        <PostPagination
          totalPages={this.props.totalPages}
          page={this.props.page}
          fetchPosts={this.props.fetchPosts}
        />
        {this.renderNewButton()}
      </div>
    );
  }
}

function mapStateToProps({ user, posts: { postsData, totalPages, page } }) {
  return { user, postsData, totalPages, page };
}

export default connect(mapStateToProps, {
  fetchPosts,
  clearPosts
})(Dashboard);
