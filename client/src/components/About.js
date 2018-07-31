import React, { Component } from 'react';
import config from '../config';

class About extends Component {
  componentDidMount() {
    document.title = `${config.appName} – About`;
  }

  render() {
    return (
      <div className="container center-align">
        <h2>About</h2>
        <p className="flow-text">A Web Application for sharing hilarious Teacher Test Comments</p>
        <p className="flow-text">Built using a MERN stack</p>
        <ul className="stack-list flow-text">
          <li>MongoDB</li>
          <li>Express</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </div>
    );
  }
}

export default About;
