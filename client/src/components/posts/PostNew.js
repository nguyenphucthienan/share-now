import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
// import Geocode from 'react-geocode';
import axios from 'axios';
import { dataURItoBlob } from '../../utils';
import config from '../../config';

import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

let image;

class PostNew extends Component {
  componentDidMount() {
    document.title = `${config.appName} – New Post`;

    this.initializeCamera();
    this.initializeLocation();
  }

  initializeCamera() {
    const videoPlayer = document.querySelector('#player');
    const canvas = document.querySelector('#canvas');
    const imagePickerArea = document.querySelector('#pick-image');
    const captureButton = document.querySelector('#capture-button');

    videoPlayer.style.display = 'none';
    canvas.style.display = 'none';
    imagePickerArea.style.display = 'none';
    captureButton.style.display = 'none';

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
        captureButton.style.display = 'inline-block';
      })
      .catch((err) => {
        imagePickerArea.style.display = 'block';
      });
  }

  initializeLocation() {
    // Geocode.setApiKey('AIzaSyCs53fPASgO3QEtT-6jzzN9yARULWl99P8');
    const locationButton = document.getElementById('#location-button');

    if (!('geolocation' in navigator)) {
      locationButton.style.display = 'none';
    }
  }

  componentWillUnmount() {
    const videoPlayer = document.querySelector('#player');

    if (videoPlayer.srcObject) {
      videoPlayer.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }
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

    image = dataURItoBlob(canvas.toDataURL());
  }

  onGetLocation() {
    const locationButton = document.querySelector('#location-button');

    if (!('geolocation' in navigator)) {
      return;
    }

    locationButton.style.display = 'none';

    navigator.geolocation.getCurrentPosition((position) => {
      locationButton.style.display = 'inline';

      // Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
      //   .then(
      //     (response) => {
      //       const address = response.results[1].formatted_address;
      //       this.props.change('location', address);
      //     },
      //     (error) => {
      //       console.error(error);
      //     }
      //   );
    }, (err) => {
      console.log(err);
      locationButton.style.display = 'inline';
    }, { timeout: 5000 });
  }

  onFileSelect(event) {
    image = event.target.files[0];
  }

  async createPost(values) {
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();
      formData.append('image', image, 'image.png');

      image = null;

      const uploadResponse = await axios.post('/api/posts/cloudinary-upload', formData);
      const postData = { ...values };
      postData.image = uploadResponse.data.url;

      const response = await axios.post('/api/posts', postData);
      const { data: { _id: postId } } = response;
      this.props.history.push(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn" >
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
            <hr />
            <div className="row center-align">
              <div className="col s12">
                <button type="button" id="capture-button" className="btn waves-effect waves-light orange accent-3 center-align" onClick={() => this.onCapture()}>
                  Capture
                </button>
              </div>
            </div>
            <div id="pick-image" className="row center-align">
              <div className="col s12">
                <input type="file" accept="image/*" id="image-picker" onChange={this.onFileSelect} />
              </div>
            </div>
            <div>
              <form onSubmit={this.props.handleSubmit(values => this.createPost(values))}>
                <Field
                  id="location-input"
                  type="text"
                  name="location"
                  label="Location"
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
                    <button type="button" className="btn waves-effect waves-light red center-align" id="location-button" onClick={() => this.onGetLocation()}>
                      <i className="material-icons">location_on</i>
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

  if (!values.location) {
    errors.location = 'Location cannot be blank';
  }

  if (values.location && values.location.trim().length > 100) {
    errors.location = 'Location must be a string with a maximum length of 100 characters';
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
