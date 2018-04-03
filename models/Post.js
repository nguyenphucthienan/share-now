const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User ID cannot be blank'
  },
  image: {
    type: String,
    require: 'Image cannot be blank',
    trim: true
  },
  title: {
    type: String,
    require: 'Title cannot be blank',
    trim: true
  },
  content: {
    type: String,
    require: 'Content cannot be blank',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  hearts: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

mongoose.model('Post', postSchema);
