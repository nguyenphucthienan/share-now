import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import { fetchComments } from '../actions';

import TextAreaField from './TextAreaField';

class CommentInput extends Component {
  async createComment(values) {
    const { postId } = this.props;
    await axios.post(`/api/posts/${postId}/comments`, values);
    this.props.reset();
    await this.props.fetchComments(postId);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => this.createComment(values))}>
          <Field
            type="text"
            name="content"
            label="Enter your comment"
            component={TextAreaField}
          />
          <div className="right">
            <button type="submit" className="btn green accent-3 center-align">
              <i className="material-icons left">done</i>Comment
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.content) {
    errors.content = 'Comment cannot be blank';
  }

  if (values.content && values.content.trim().length < 10) {
    errors.content = 'Comment must be at least 10 characters';
  }

  return errors;
}

export default connect(null, { fetchComments })(reduxForm({
  form: 'commentInput',
  validate
})(CommentInput));
