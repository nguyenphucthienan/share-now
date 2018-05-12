import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

class PushNotificationNew extends Component {
  componentDidMount() {
    document.title = `${config.appName} – Admin – New Push Notification`;
  }

  async sendPushNotification(values) {
    try {
      await axios.post('/api/notifications/push', values);
      this.props.history.push('/admin');
    } catch (err) {
      console.log(err);
    }
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn" >
        <Link
          to="/admin"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="container white-text">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2 className="center-align">Push Notification</h2>
            <form onSubmit={this.props.handleSubmit(values => this.sendPushNotification(values))}>
              <Field
                type="text"
                name="title"
                label="Title"
                component={InputField}
              />
              <Field
                type="text"
                name="openUrl"
                label="Open URL"
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
                  <button type="submit" className="btn waves-effect waves-light green accent-4 center-align">
                    <i className="material-icons left">done</i>Send
                  </button>
                </div>
              </div>
            </form>
            {this.renderBackButton()}
          </div>
        </div>
      </div >
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title cannot be blank';
  }

  if (values.title && values.title.trim().length > 150) {
    errors.title = 'Title must be a string with a maximum length of 150 characters';
  }

  if (!values.openUrl) {
    errors.openUrl = 'Open URL cannot be blank';
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
  form: 'pushNotificationNew',
  validate
})(PushNotificationNew);
