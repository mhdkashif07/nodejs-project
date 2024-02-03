const { CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const ArticleReactions = require('../models/articleReactionModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const { article } = require('../models/articleModel');

//** comment on article
exports.createComment = catchAsync(async (req, res, next) => {
  const user = String(req.user._id);
  const numericUserId = user.match(/\d+/);

  const userId = numericUserId['input'];
  const articleId = req.params.articleId;

  const articleExit = await Article.findById(articleId);

  if (!articleExit) {
    return next(new AppError('Article does not exist', NOT_FOUND));
  }

  const comment = {
    text: req.body.text,
    postedBy: userId,
  };

  if (articleExit) {
    // return next(new AppError('Article already liked', 400));
    await Article.findOneAndUpdate(
      { _id: articleExit },
      { $push: { comments: comment } }
    );
    // articleExit.likedBy.pull(userId);
    // articleExit.likes -= 1;
  }

  res.status(200).json('You have done this successfully');
});
