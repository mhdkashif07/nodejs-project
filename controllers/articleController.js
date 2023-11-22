const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const Article = require('../models/articleModel');
const AppError = require('../utils/appError');

console.log("new");

//** create a single article
exports.createArticle = async (req, res, next) => {
  const doc = await Article.create(req.body);

  if (!doc) {
    return next(new AppError('No document Created', NOT_FOUND));
  }
  successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
};

//** get a single category
// exports.getSingleCategory = async (req, res, next) => {
//   const doc = await Category.findById(req.params.id);
//   if (!doc) {
//     // return next(new AppError(`No found with that ID`, 404));
//     return next(new AppError('No document found with that', 404));
//   }
//   successResponse(req, res, 'success', OK_CODE, 'custom message', doc);
// };

//** get all categories
// exports.getCategories = async (req, res, next) => {
//   const doc = await Category.find();
//   if (!doc) {
//     // return next(new AppError(`No found with that ID`, 404));
//     return next(new AppError('No documents found', 404));
//   }
//   successResponse(req, res, 'success', 202, 'custom message', doc);
// };

//** delete single category
// exports.deleteCategory = async (req, res, next) => {
//   const doc = await Category.findByIdAndDelete(req.params.id);
//   if (!doc) {
//     // return next(new AppError(`No found with that ID`, 404));
//     return next(new AppError('No document found with that', 404));
//   }
//   successResponse(req, res, 'success', 200, 'Deleted Successfully');
// };

//** update single category
// exports.updateCategory = async (req, res, next) => {
//   const doc = await Category.findByIdAndUpdate(req.params.id, req.body);
//   if (!doc) {
//     // return next(new AppError(`No found with that ID`, 404));
//     return next(new AppError('No document found with that id', 404));
//   }
//   successResponse(req, res, 'success', 200, 'Updated Successfully', doc);
// };
