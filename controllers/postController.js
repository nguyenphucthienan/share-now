const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.getPosts = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  try {
    const posts = await Post
      .find({})
      .sort({
        createdAt: -1
      })
      .populate('comments')
      .skip(page * offset)
      .limit(offset)
      .exec();

    return res.send(posts);
  } catch (err) {
    return res.status(422).send(err);
  }
};

exports.getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post
      .findOne({
        _id: postId
      })
      .populate('author', '_id email displayName');

    return res.send(post);
  } catch (err) {
    return res.status(422).send(err);
  }
};

exports.createPost = async (req, res) => {
  const { id: userId } = req.user;
  const { image, title, content } = req.body;

  const post = new Post({
    author: userId,
    image,
    title,
    content
  });

  try {
    await post.save();
    return res.send(post);
  } catch (err) {
    return res.status(422).send(err);
  }
};
