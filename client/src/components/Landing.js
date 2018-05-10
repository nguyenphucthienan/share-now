import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../config';

class Landing extends Component {
  componentDidMount() {
    document.title = `${config.appName}`;
  }

  renderButtons() {
    if (this.props.user) {
      return (
        <Link
          key="1"
          to="/dashboard"
          className="waves-effect waves-light btn green darken-1"
        >
          <i className="material-icons left">arrow_forward</i>Go to Dashboard
        </Link>
      );
    }

    return (
      <a
        key="1"
        href="/api/login/google"
        className="waves-effect waves-light btn red darken-2"
      >
        <i className="material-icons left">person_outline</i>Login with Google
      </a >
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container center-align white-text">
        <h2>ShareNow</h2>
        <p className="flow-text">
          {user ? `Hi, ${user.displayName}!` : 'Hi there!'}
        </p>
        {this.renderButtons()}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Landing);
