import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config';
import { fetchUsers } from '../../actions';

class AdminUserList extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Admin – User List`;
    this.props.fetchUsers();
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn" >
        <Link
          to="/admin"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  renderUsers() {
    if (this.props.usersData) {
      return this.props.usersData.map((user) => {
        const { displayName, email, role } = user;

        return (
          <li key={email} className="collection-item avatar">
            <span className="title card-content-title">{displayName}</span>
            <p>{email}<br />{role === 1 ? 'Admin' : 'User'}</p>
            <p className="secondary-content">
              <i className="material-icons indigo-text text-darken-2">
                {role === 1 ? 'verified_user' : 'grade'}
              </i>
            </p>
          </li>
        );
      });
    }

    return <div />;
  }

  render() {
    return (
      <div className="container white-text">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2 className="center-align">User List</h2>
            <ul className="collection">
              {this.renderUsers()}
            </ul>
            {this.renderBackButton()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users: { page, usersData } }) {
  return { page, usersData };
}

export default connect(mapStateToProps, { fetchUsers })(AdminUserList);
