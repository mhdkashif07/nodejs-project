const express = require('express');

const { article, articleReaction } = require('../controllers/index');
const validate = require('../middlewares/validate');
const { articleValidation, articleReactions } = require('../validations');

const router = express.Router();

router.route('/').get(article.getArticles).post(
  // validate(articleValidation.articleCreateValidation),
  article.createArticle
);

router
  .route('/:articleId/comment')
  .post(
    validate(articleReactions.articleLikeValidation),
    articleReaction.articleLike
  );

router
  .route('/:articleId')
  .post(
    validate(articleReactions.articleLikeValidation),
    articleReaction.articleLike
  );

module.exports = router;
