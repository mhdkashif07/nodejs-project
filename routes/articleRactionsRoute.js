const express = require('express');

const { article, articleReaction } = require('../controllers/index');
const validate = require('../middlewares/validate');
const { articleValidation, articleReactions } = require('../validations');

const router = express.Router();

router.route('/like/:articleId/:userId').post(articleReaction.articleLike);

module.exports = router;
