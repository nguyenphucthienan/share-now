import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../config';
import { fetchPost } from '../actions';

class PostDetail extends Component {
  async componentDidMount() {
    document.title = `${config.appName} – Post`;
    this.props.fetchPost(this.props.match.params.id);
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <a
          onClick={() => this.props.history.push('/dashboard')}
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </a>
      </div>
    );
  }

  render() {
    if (this.props.post) {
      const {
        image, title, content, comments, hearts
      } = this.props.post;

      return (
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="col s12">
                  <h4 className="center-align">{title}</h4>
                </div>
              </div>
              <div className="card row">
                <div className="col s12 image-detail">
                  <img className="responsive-img" src={image} alt={title} />
                  <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">favorite</i></a>
                </div>
              </div>
              <div className="card row">
                <div className="col s12">
                  <p>
                    <span className="card-content-title">Hearts: </span>
                    <span>{hearts.length || 0}</span>
                  </p>
                  <p>
                    <span className="card-content-title">Content: </span>
                    <span>{content}</span>
                  </p>
                </div>
              </div>
              <div className="card row">
                <div className="col s12">
                  <p>
                    <span className="card-content-title">Comments: </span>
                    <span>{comments.length || 0}</span>
                  </p>
                </div>
              </div>
              {this.renderBackButton()}
            </div>
          </div>
        </div>
      );
    }

    return <div />;
  }
}

function mapStateToProps({ post }) {
  return { post };
}

export default connect(mapStateToProps, { fetchPost })(withRouter(PostDetail));
