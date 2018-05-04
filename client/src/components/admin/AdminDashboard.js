import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

class AdminDashboard extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Admin`;
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn" >
        <Link
          to="/dashboard"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="container center-align">
        <h2>Admin</h2>
        <Link
          to="/admin/push-notification"
          className="waves-effect waves-light btn-large purple darken-4"
        >
          <i className="material-icons left">cloud</i>Push Notification
        </Link>
        {this.renderBackButton()}
      </div>
    );
  }
}

export default AdminDashboard;
