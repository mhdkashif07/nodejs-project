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

router.route('/:articleId').post(auth.protect, commentController.createComment);

router
  .route('/:articleId/:commentId')
  .delete(auth.protect, commentController.deleteComment);

module.exports = router;
