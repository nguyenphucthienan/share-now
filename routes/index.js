const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

router.get('/login/google', authControllers.googleLogin);

router.get(
  '/login/google/callback',
  authControllers.googleLoginCallback,
  authControllers.googleCallback
);

router.get('/logout', authControllers.logout);

router.get('/me', authControllers.currentUser);

module.exports = router;
