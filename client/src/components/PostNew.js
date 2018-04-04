import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

class PostNew extends Component {
  componentDidMount() {
    document.title = `${config.appName} – New Post`;
  }

  async createPost(values) {
    await axios.post('/api/posts', values);
    this.props.history.push('/posts');
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <a
          onClick={() => this.props.history.goBack()}
          className="waves-effect waves-light btn btn-floating btn-large red darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2 className="center-align">New Post</h2>
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
                    <button type="submit" className="btn green darken-1 center-align">
                      <i className="material-icons left">done</i>Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {this.renderBackButton()}
          </div>
        </div>
      </div>
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

export default reduxForm({
  form: 'postNew',
  validate
})(withRouter(PostNew));
