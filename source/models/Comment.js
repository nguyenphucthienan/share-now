const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: 'Post ID cannot be blank'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User ID cannot be blank'
  },
  content: {
    type: String,
    require: 'Content cannot be blank',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Comment', commentSchema);
