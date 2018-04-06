import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
  class Authentication extends Component {
    render() {
      return (
        <Route
          {...this.props}
          render={() => (this.props.user ? <ComposedComponent {...this.props} /> : <Redirect to="/" />)}
        />
      );
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
};
