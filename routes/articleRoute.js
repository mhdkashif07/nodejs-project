const express = require('express');

const { article } = require('../controllers/index');
const validate = require('../middlewares/validate');
const { articleValidation } = require('../validations');

const router = express.Router();

router
  .route('/')
  .get(article.getArticles)
  .post(
    validate(articleValidation.articleCreateValidation),
    article.createArticle
  );

// router
//   .route('/:id')
//   .get(articleController.getSingleCategory)
//   .delete(articleController.deleteCategory)
//   .patch(articleController.updateCategory);

module.exports = router;
