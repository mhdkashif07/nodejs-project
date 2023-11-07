const express = require('express');

const articleController = require('../controllers/articleController');

const router = express.Router();

router
  .route('/')
  //   .get(articleController.getCategories)
  .post(articleController.createArticle);

// router
//   .route('/:id')
//   .get(articleController.getSingleCategory)
//   .delete(articleController.deleteCategory)
//   .patch(articleController.updateCategory);

module.exports = router;
