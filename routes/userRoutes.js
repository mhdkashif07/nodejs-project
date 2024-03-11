const express = require('express');

const { userController, auth, followUser } = require('../controllers/index');
const validate = require('../middlewares/validate');
const { userValidation } = require('../validations');

const router = express.Router();

router.post(
  '/auth/signup',
  //   validate(userValidation.register),
  userController.uploadUserImage,
  userController.resizeUserImage,
  auth.signup
);
router.post('/auth/login', auth.login);
router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);
router.post('/follow/:userId', auth.protect, followUser.followUser);

//router is like a mini application so we can use the protect route middleware on that
//so it will protect all the routes below this middleware
// router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updatePassword);

// router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  auth.protect,
  userController.uploadUserImage,
  userController.resizeUserImage,
  userController.updateMe
);
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
