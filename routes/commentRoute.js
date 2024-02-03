const express = require('express');

const {
  article,
  articleReaction,
  auth,
  commentController,
} = require('../controllers/index');
const validate = require('../middlewares/validate');
const { articleValidation, articleReactions } = require('../validations');

const router = express.Router();

router
  .route('/:articleId/comment')
  .put(auth.protect, commentController.createComment);

router
  .route('/:articleId')
  .post(
    validate(articleReactions.articleLikeValidation),
    articleReaction.articleLike
  );

module.exports = router;
