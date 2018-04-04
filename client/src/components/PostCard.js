import React, { Component } from 'react';

class PostCard extends Component {
  render() {
    const { image, title, content } = this.props.post;

    return (
      <div className="col s12 m6">
        <div className="card">
          <div className="card-image">
            <img src={image} alt={title} />
            <span className="card-title">{title}</span>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">favorite</i></a>
          </div>
          <div className="card-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
