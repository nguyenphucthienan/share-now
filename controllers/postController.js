const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.getPosts = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  try {
    const countPromise = Post.count({});
    const postsPromise = Post
      .find({})
      .sort({
        createdAt: -1
      })
      .populate('comments')
      .skip(page * offset)
      .limit(offset)
      .exec();

    const data = await Promise.all([
      countPromise,
      postsPromise
    ]);

    const returnData = {
      totalPosts: data[0],
      postsData: data[1]
    };

    return res.send(returnData);
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

exports.heartPost = async (req, res) => {
  const { postId } = req.params;
  const { id: userId } = req.user;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const hearts = post.hearts.map(obj => obj.toString());
    const operator = hearts.includes(userId) ? '$pull' : '$addToSet';

    const returnPost = await Post.findByIdAndUpdate(
      post.id,
      { [operator]: { hearts: userId } },
      { new: true }
    );

    return res.send(returnPost);
  } catch (err) {
    return res.status(422).send(err);
  }
};
