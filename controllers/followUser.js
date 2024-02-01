const { CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const ArticleReactions = require('../models/articleReactionModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const { article } = require('../models/articleModel');

//** follow a user
exports.followUser = catchAsync(async (req, res, next) => {
  const user = String(req.user._id);
  const numericUserId = user.match(/\d+/);

  const userId = numericUserId['input'];
  const userIdSecond = req.params.userId;
  const userExit = await User.findById(userIdSecond);
  console.log(userExit);

  if (!userExit) {
    return next(new AppError('User does not exist', NOT_FOUND));
  }

  // Check if the user has already follow the user
  const isFollow = userExit.follower.includes(userId);

  if (isFollow) {
    // return next(new AppError('Article already liked', 400));
    await User.findOneAndUpdate(
      { _id: userExit },
      { $pull: { follower: userId } }
    );
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: userIdSecond } }
    );
    //   articleExit.likes -= 1;
  } else {
    await User.findOneAndUpdate(
      { _id: userIdSecond },
      { $push: { follower: userId } }
    );
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { following: userIdSecond } }
    );
  }

  res.status(200).json('You have done this successfully');
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
