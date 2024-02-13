const express = require('express');

const { channel } = require('../controllers/index');

const router = express.Router();

router
  .route('/')
  //   .get(channel.createChannel)
  .post(channel.createChannel);

// router
//   .route('/:id')
//   .get(category.getSingleCategory)
//   .delete(category.deleteCategory)
//   .patch(category.updateCategory);

module.exports = router;
