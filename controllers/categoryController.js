const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');

//** create a single category
exports.createCategory = async (req, res, next) => {
  const doc = await Category.create(req.body);

  if (!doc) {
    return next(new AppError('No document Created', NOT_FOUND));
  }
  successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
};

//** get a single category
exports.getSingleCategory = async (req, res, next) => {
  const doc = await Category.findById(req.params.id);
  if (!doc) {
    // return next(new AppError(`No found with that ID`, 404));
    return next(new AppError('No document found with that', 404));
  }
  successResponse(req, res, 'success', OK_CODE, 'custom message', doc);
};
