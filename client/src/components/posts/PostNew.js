import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dataURItoBlob } from '../../utils';
import config from '../../config';

import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

class PostNew extends Component {
  componentDidMount() {
    document.title = `${config.appName} – New Post`;

    const videoPlayer = document.querySelector('#player');
    const canvasElement = document.querySelector('#canvas');
    const imagePickerArea = document.querySelector('#pick-image');

    imagePickerArea.style.display = 'none';
    videoPlayer.style.display = 'none';
    canvasElement.style.display = 'none';

    if (!('mediaDevices' in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = (constraints) => {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented!'));
        }

        return new Promise(((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        }));
      };
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoPlayer.srcObject = stream;
        videoPlayer.style.display = 'block';
      })
      .catch((err) => {
        imagePickerArea.style.display = 'block';
      });
  }

  onCapture() {
    const videoPlayer = document.querySelector('#player');
    const canvas = document.querySelector('#canvas');
    const captureButton = document.querySelector('#capture-button');

    canvas.style.display = 'block';
    videoPlayer.style.display = 'none';
    captureButton.style.display = 'none';

    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoPlayer, 0, 0, videoPlayer.videoWidth, videoPlayer.videoHeight);

    videoPlayer.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    const picture = dataURItoBlob(canvas.toDataURL());

    const postData = new FormData();
    postData.append('image', picture, 'test.png');

    axios.post('/api/posts/upload', postData)
      .then(response => console.log(response));
  }

  async createPost(values) {
    try {
      const response = await axios.post('/api/posts', values);
      const { data: { _id: postId } } = response;
      this.props.history.push(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <Link
          to="/dashboard"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2 className="center-align">New Post</h2>
            <video id="player" className="responsive-video" autoPlay />
            <canvas id="canvas" />
            <button id="capture-button" className="btn waves-effect waves-light orange accent-3 center-align" onClick={() => this.onCapture()}>
              Capture
            </button>
            <div id="pick-image">
              <input type="file" accept="image/*" id="image-picker" />
            </div>
            <div>
              <form onSubmit={this.props.handleSubmit(values => this.createPost(values))}>
                <Field
                  type="text"
                  name="image"
                  label="Image"
                  component={InputField}
                />
                <Field
                  type="text"
                  name="title"
                  label="Title"
                  component={InputField}
                />
                <Field
                  type="text"
                  name="content"
                  label="Content"
                  component={TextAreaField}
                />
                <div className="row center-align">
                  <div className="col s12">
                    <button type="submit" className="btn waves-effect waves-light green accent-3 center-align">
                      <i className="material-icons left">done</i>Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {this.renderBackButton()}
          </div>
        </div>
      </div >
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.image) {
    errors.image = 'Image cannot be blank';
  }

  if (!values.title) {
    errors.title = 'Title cannot be blank';
  }

  if (values.title && values.title.trim().length > 150) {
    errors.title = 'Title must be a string with a maximum length of 150 characters';
  }

  if (!values.content) {
    errors.content = 'Content cannot be blank';
  }

  if (values.content && values.content.trim().length < 10) {
    errors.content = 'Content must be at least 10 characters';
  }

  return errors;
}

function mapStateToProps({ posts: { page } }) {
  return { page };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'postNew',
  validate
})(PostNew));
