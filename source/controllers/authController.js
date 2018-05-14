const passport = require('passport');

exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.googleLoginCallback = passport.authenticate('google');

exports.googleCallback = (req, res) => {
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.currentUser = (req, res) => {
  res.send(req.user);
};
