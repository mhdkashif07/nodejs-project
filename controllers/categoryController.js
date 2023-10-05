const Category = require('../models/categoryModel');
// const {
//   createOne,
//   getAll,
//   getOne,
//   updateOne,
//   deleteOne,
// } = require('./handlerFactory');

//** create a single category
exports.createCategory = async (req, res, next) => {
  // const doc = await Category.create(req.body);
  // console.log(res.status);

  if (req.body.type !== 'category') {
    const error = new Error('This is a sample error');

    // Pass the error to the next middleware
    return next(error);
  }

  res.status(201).json({
    status: 'success',
    // data: {
    //   data: doc,
    // },
  });
};

//** get all categories
// exports.getAllCategories = getAll(Category);

//** get a single category
// exports.getSingleCategory = getOne(Category);

// const gettingError = (error) => {
//   console.log('This is error coming from middleware', error);
// };
exports.getSingleCategory = async (req, res, next) => {
  const doc = await Category.findById(req.params.id);
  // console.log(err);
  if (!doc) {
    // return next(new AppError(`No found with that ID`, 404));
    return next('No document found with that ');
  }
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      data: doc,
    },
  });
};

// //update single category
// exports.updateCategory = updateOne(Category);

// //delete single category
// exports.deleteCategory = deleteOne(Category);
