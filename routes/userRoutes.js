const express = require('express');

const { user, auth, followUser } = require('../controllers/index');
const validate = require('../middlewares/validate');
const { userValidation } = require('../validations');

const router = express.Router();

router.post('/auth/signup', validate(userValidation.register), auth.signup);
router.post('/auth/login', auth.login);
router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);
router.post('/follow/:userId', auth.protect, followUser.followUser);
router.patch('/following/:userId', auth.resetPassword);

//router is like a mini application so we can use the protect route middleware on that
//so it will protect all the routes below this middleware
// router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updatePassword);

// router.get('/me', userController.getMe, userController.getUser);
// router.patch(
//   '/updateMe',
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

router.route('/').get(user.getAllUsers);
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
