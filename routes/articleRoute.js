const express = require('express');

const { article } = require('../controllers/index');

const router = express.Router();

router
  .route('/')
  //   .get(articleController.getCategories)
  .post(article.createArticle);

// router
//   .route('/:id')
//   .get(articleController.getSingleCategory)
//   .delete(articleController.deleteCategory)
//   .patch(articleController.updateCategory);

module.exports = router;
