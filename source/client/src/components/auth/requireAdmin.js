import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
  class AdminAuthorization extends Component {
    render() {
      return (
        <Route
          {...this.props}
          render={() => (this.props.user && this.props.user.role === 1 ?
            <ComposedComponent {...this.props} /> :
            <Redirect to="/" />
          )}
        />
      );
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  return connect(mapStateToProps)(withRouter(AdminAuthorization));
};
