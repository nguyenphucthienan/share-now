const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const notificationController = require('../controllers/notificationController');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

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

router.get(
  '/users',
  requireLogin,
  requireAdmin,
  userController.getUsers
);

router.get('/posts', postController.getPosts);
router.get('/posts/my-posts', postController.getMyPosts);

router.post(
  '/posts',
  requireLogin,
  postController.createPost
);

router.get('/posts/:postId', postController.getPost);

router.delete(
  '/posts/:postId',
  requireLogin,
  postController.deletePost
);

router.get('/posts/:postId/comments', commentController.getComments);

router.post(
  '/posts/:postId/comments',
  requireLogin,
  commentController.createComment
);

router.post(
  '/posts/:postId/heart',
  requireLogin,
  postController.heartPost
);

router.post(
  '/posts/upload',
  requireLogin,
  postController.uploadImage
);

router.post(
  '/posts/cloudinary-upload',
  requireLogin,
  postController.cloudinaryUpload
);

router.post('/notifications/subscribe', notificationController.saveSubscription);

router.post(
  '/notifications/push',
  requireLogin,
  requireAdmin,
  notificationController.pushNotification
);

module.exports = router;
