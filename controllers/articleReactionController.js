const { CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const ArticleReactions = require('../models/articleReactionModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Article = require('../models/articleModel');
const User = require('../models/userModel');

//** like single article
exports.articleLike = catchAsync(async (req, res, next) => {
  console.log('like', req.params.userId);
  const userId = req.params.userId;
  const articleId = req.params.articleId;

  const articleExit = await Article.find({ articleId });
  const userExit = await User.find({ userId });

  if (!articleExit) {
    console.log('article does not exit');
  }
  if (!userExit) {
    console.log('article does not exit');
  }

  // const doc = await ArticleReactions.create(req.body);

  // if (!doc) {
  //   return next(new AppError('No document Created', NOT_FOUND));
  // }
  // successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
});
