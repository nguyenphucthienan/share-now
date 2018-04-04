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

exports.createPost = async (req, res) => {
  const { image, title, content } = req.body;

  const post = new Post({
    author: req.user.id,
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
