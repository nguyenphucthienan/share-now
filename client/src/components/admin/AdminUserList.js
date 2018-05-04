import React, { Component } from 'react';

class AdminUserList extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2 className="center-align">User List</h2>
            <ul className="collection">
              <li className="collection-item avatar">
                <span className="title">Title</span>
                <p>First Line <br />
                  Second Line
                </p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
              </li>
              <li className="collection-item avatar">
                <span className="title">Title</span>
                <p>First Line <br />
                  Second Line
                </p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUserList;
