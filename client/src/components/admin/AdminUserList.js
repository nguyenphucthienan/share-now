import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config';
import { fetchUsers } from '../../actions';

import AdminUserCard from './AdminUserCard';

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
      return this.props.usersData.map(user => (<AdminUserCard key={user.email} user={user} />));
    }

    return <div />;
  }

  render() {
    return (
      <div className="container">
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
