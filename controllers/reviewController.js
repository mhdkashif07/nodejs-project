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
  const { comment, review } = req.body;

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
