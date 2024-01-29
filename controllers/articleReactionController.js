const { CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const ArticleReactions = require('../models/articleReactionModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const { article } = require('../models/articleModel');

//** like single article
exports.articleLike = catchAsync(async (req, res, next) => {
  console.log('like', req.params.userId, req.params.articleId);
  const userId = req.params.userId;
  const articleId = req.params.articleId;

  const articleExit = await Article.findById(articleId);
  const userExit = await User.findById(userId);

  if (!articleExit) {
    return next(new AppError('Article does not exist', NOT_FOUND));
  }
  if (!userExit) {
    return next(new AppError('User does not exist', NOT_FOUND));
  }

  console.log(articleExit);

  if(articleExit.likedBy.includes(userId)){
    return next(new AppError('Article already liked', 400));
  }

  if(articleExit.disLikedBy.includes(userId)){
   articleExit.disLikedBy.pull(userId);
   articleExit.disLikes -= 1;
  }

  articleExit.likedBy.push(userId);
  articleExit.likes += 1;

  const savedLikes = await articleExit.save();
  console.log(savedLikes);
  res.status(200).json(savedLikes)
});
