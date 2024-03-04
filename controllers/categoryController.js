const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const {
  successResponse,
  successResponsePagination,
} = require('../helpers/successResponses');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');
const { categoryService } = require('../services');
const pick = require('../utils/pick');

//** create a single category
exports.createCategory = catchAsync(async (req, res, next) => {
  const doc = await Category.create(req.body);
  successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
});

//** get a single category
exports.getSingleCategory = catchAsync(async (req, res, next) => {
  const doc = await Category.findById(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that', 404));
  }
  successResponse(req, res, 'success', OK_CODE, 'custom message', doc);
});

//** get all categories
exports.getCategories = catchAsync(async (req, res, next) => {
  // const filter = pick(req.query, ['name', 'role']);
  const { limit, page, ...query } = req.query;
  const doc = await categoryService.queryCategories(query, { limit, page });

  if (!doc) {
    return next(new AppError('No documents found', 404));
  }
  res.send(doc);
  // successResponsePagination(req, res, 'success', 202, 'custom message', doc);
});

//** delete single category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const doc = await Category.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that', 404));
  }
  successResponse(req, res, 'success', 200, 'Deleted Successfully');
});

//** update single category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError('No document found with that id', 404));
  }
  successResponse(req, res, 'success', 200, 'Updated Successfully', doc);
});
