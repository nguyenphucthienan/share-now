import React from 'react';

export default ({ input, label, meta: { error, touched } }) => (
  <div className="row">
    <div className="col s12">
      <label>{label}</label>
      <input {...input} />
      <div className="red-text error-message">
        {touched && error}
      </div>
    </div>
  </div>
);
