const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment
      .find({
        postId
      })
      .sort({
        createdAt: 1
      })
      .populate('author', '_id email displayName');

    return res.send(comments);
  } catch (err) {
    return res.status(422).send(err);
  }
};

exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { id: userId } = req.user;
  const { content } = req.body;

  const comment = new Comment({
    postId,
    author: userId,
    content
  });

  try {
    await comment.save();
    return res.send(comment);
  } catch (err) {
    return res.status(422).send(err);
  }
};
