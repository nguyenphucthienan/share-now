import React, { Component } from 'react';
import config from '../config';

class Landing extends Component {
  componentDidMount() {
    document.title = `${config.appName}`;
  }

  render() {
    return (
      <div className="container center-align">
        <h2>ShareNow</h2>
        <p className="flow-text">Hi there!</p>
      </div>
    );
  }
}

export default Landing;
