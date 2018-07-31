import React, { Component } from 'react';

class AdminUserCard extends Component {
  render() {
    const { displayName, email, role } = this.props.user;

    return (
      <li className="collection-item avatar transparent-background">
        <span className="title card-content-title">{displayName}</span>
        <p>{email}<br />{role === 1 ? 'Admin' : 'User'}</p>
        <p className="secondary-content">
          <i className="material-icons">
            {role === 1 ? 'verified_user' : 'grade'}
          </i>
        </p>
      </li>
    );
  }
}

export default AdminUserCard;
