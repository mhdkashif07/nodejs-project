const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { successResponse } = require('../helpers/successResponses');
const { CREATED_CODE, OK_CODE } = require('../constants/constants');

//** create a review
exports.createReview = catchAsync(async (req, res, next) => {
  //get review and comment from the body
  const { comment, rating } = req.body;

  //find the product
  const product = Product.find(req.params.id);

  //checking user previous comment
  const existedReview = product.reviews.find(
    (el) => el.user.toString() === req.user._id
  );
  if (existedReview) {
    return res.status(400).send({
      status: false,
      message: 'Product already reviewed',
    });
  }

  //review object
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  //push the review object to the reviews array
  product.reviews.push(review);

  //number of reviews
  product.numReviews = product.reviews.length;

  //calculate product rating
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  //save the product
  await product.save();
  res.status(200).send({
    status: true,
    message: 'Review Added',
  });

  // const doc = await .create(req.body);
  if (!doc) {
    new AppError('No document created', 404);
  }
  successResponse(
    req,
    res,
    'success',
    CREATED_CODE,
    'Product created successfully',
    doc
  );
});
