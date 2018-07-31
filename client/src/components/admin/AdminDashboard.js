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
          to="/"
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
        <div className="row">
          <div className="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
            <h2>Admin</h2>
            <div className="row">
              <div className="col s12">
                <Link
                  to="/admin/user-list"
                  className="admin-button waves-effect waves-light btn-large purple darken-4"
                >
                  <i className="material-icons left">people</i>User List
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <Link
                  to="/admin/push-notification"
                  className="admin-button waves-effect waves-light btn-large purple darken-4"
                >
                  <i className="material-icons left">cloud</i>Push Notification
                </Link>
              </div>
            </div>
          </div>
        </div>
        {this.renderBackButton()}
      </div>
    );
  }
}

export default AdminDashboard;
