import React, { Component } from 'react';

class PostCard extends Component {
  render() {
    return (
      <div className="col s12 m6">
        <div className="card">
          <div className="card-image">
            <img src="https://cdn.worldvectorlogo.com/logos/react-1.svg" alt="img" />
            <span className="card-title">Card Title</span>
            <a className="btn-floating halfway-fab waves-effect waves-light red darken-2"><i className="material-icons">favorite</i></a>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
