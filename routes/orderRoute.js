const express = require('express');

const { auth, orderController } = require('../controllers/index');

const router = express.Router();

router
  .route('/')
  .get(auth.protect, orderController.getOrders)
  .post(auth.protect, orderController.createOrder);

// router
//   .route('/:articleId/:commentId')
//   .delete(auth.protect, commentController.deleteComment);

module.exports = router;
