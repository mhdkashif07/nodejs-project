/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { successResponse } = require('../helpers/successResponses');

const multerStorage = multer.memoryStorage();

//** check the uploaded file is only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    //if the mimetype is image so we did not pass any error and pass true
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImage = upload.fields([
  { name: 'userImage', maxCount: 1 },
]);

//** Resize the image
exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.files.userImage) return next();

  // 1) image Cover
  req.body.userImage = `user-${Date.now()}-profile.jpeg`;
  await sharp(req.files.userImage[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.body.userImage}`);

  // 2) Images
  // req.body.productImages = [];

  // ** map returns a promise so we solve with Promise.all this will upload the file to local db
  // req.body.userImage = 
  // await Promise.all(
  //   req.files.userImage.map(async (file, i) => {
  //     const fileName = `user-${Date.now()}-${i + 1}.jpeg`;
  //     await sharp(file.buffer)
  //       .resize(2000, 1333)
  //       .toFormat('jpeg')
  //       .jpeg({ quality: 90 })
  //       .toFile(`public/img/users/${fileName}`);

  //     req.body.userImage.push(fileName);
  //   })
  // );

  //**  this code will upload the image to aws
  // await Promise.all(
  //   req.files.productImages.map(async (file, i) => {
  //     req.body.productImages.push(
  //       (
  //         await imageUploder(
  //           file.buffer,
  //           `product-image-${i + 1}-${file.originalname}`
  //         )
  //       ).Location
  //     );
  //   })
  // );

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = async (req, res) => {
  const doc = await User.find();
  if (!doc) {
    // return next(new AppError(`No found with that ID`, 404));
    return next(new AppError('No documents found', 404));
  }
  successResponse(req, res, 'success', 202, 'custom message', doc);
};

// exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Do NOT update passwords with this!
// exports.updateUser = factory.updateOne(User);

// //Delete the current user by User
// exports.deleteMe = factory.deleteOne(User);

// //Delete the user by Admin
// exports.deleteUser = factory.deleteOne(User);
