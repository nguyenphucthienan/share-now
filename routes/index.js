const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const requireLogin = require('../middlewares/requireLogin');

router.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

router.get('/login/google', authController.googleLogin);

router.get(
  '/login/google/callback',
  authController.googleLoginCallback,
  authController.googleCallback
);

router.get('/logout', authController.logout);
router.get('/me', authController.currentUser);

router.get('/posts', postController.getPosts);
router.post('/posts', requireLogin, postController.createPost);

module.exports = router;
