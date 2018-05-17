import React, { Component } from 'react';
import config from '../config';

class NotFound extends Component {
  componentDidMount() {
    document.title = `${config.appName} – 404`;
  }

  render() {
    return (
      <div className="container center-align">
        <h2>404</h2>
        <p className="flow-text">Page Not Found</p>
      </div>
    );
  }
}

export default NotFound;
