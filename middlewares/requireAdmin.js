module.exports = (req, res, next) => {
  if (req.user && req.user.role === 1) {
    return next();
  }

  return res.status(401).send({ error: 'You do not have permission to do this' });
};
