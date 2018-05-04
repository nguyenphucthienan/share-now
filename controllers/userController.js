const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page - 1, 10));
  const offset = parseInt(req.query.offset, 10) || 5;

  try {
    const countPromise = User.count({});
    const usersPromise = User
      .find({})
      .select({
        _id: 0,
        email: 1,
        displayName: 1,
        role: 1
      })
      .sort({
        role: -1,
        createdAt: -1
      })
      .skip(page * offset)
      .limit(offset)
      .exec();

    const data = await Promise.all([
      countPromise,
      usersPromise
    ]);

    const returnData = {
      totalPages: Math.ceil(data[0] / offset),
      usersData: data[1]
    };

    return res.send(returnData);
  } catch (err) {
    return res.status(422).send(err);
  }
};
