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

  // Check if the user has already liked the article
  const isLiked = articleExit.likedBy.includes(userId);

  if (isLiked) {
    // return next(new AppError('Article already liked', 400));
    articleExit.likedBy.pull(userId);
    articleExit.likes -= 1;
  } else {
    articleExit.likedBy.push(userId);
    articleExit.likes += 1;

    if (articleExit.disLikedBy.includes(userId)) {
      articleExit.disLikedBy.pull(userId);
      articleExit.disLikes -= 1;
    }
  }

  const savedLikes = await articleExit.save();
  console.log(savedLikes);
  res.status(200).json(savedLikes);
});

//** dislike single article
exports.articleDislike = catchAsync(async (req, res, next) => {
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

  // Check if the user has already disliked the article
  const isDisliked = articleExit.disLikedBy.includes(userId);

  if (isDisliked) {
    // return next(new AppError('Article already liked', 400));
    articleExit.disLikedBy.pull(userId);
    articleExit.disLikes -= 1;
  } else {
    articleExit.disLikedBy.push(userId);
    articleExit.disLikes += 1;

    if (articleExit.likedBy.includes(userId)) {
      articleExit.likedBy.pull(userId);
      articleExit.likes -= 1;
    }
  }

  const savedDisliked = await articleExit.save();
  console.log(savedDisliked);
  res.status(200).json(savedDisliked);
});
