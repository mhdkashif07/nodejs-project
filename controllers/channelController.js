const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const catchAsync = require('../utils/catchAsync');
const Channel = require('../models/channelModel');
const AppError = require('../utils/appError');

//define storage for multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// const multerStorage = multer.memoryStorage();

//check the uploaded file is only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadChannelPhoto = upload.single('photo');

// Resize the image
exports.resizeChannelPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

//** create a single channel
exports.createChannel = catchAsync(async (req, res, next) => {
  const doc = await Channel.create(req.body);
  successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
});

//** get a single channel
exports.getChannel = catchAsync(async (req, res, next) => {
  const doc = await Channel.findById(req.params.id);
  if (!doc) {
    new AppError('No document found', 404);
  }
  successResponse(req, res, 'success', OK_CODE, 'custom message', doc);
});

//** delete a single channel
exports.deleteChannel = catchAsync(async (req, res, next) => {
  const doc = await Channel.findByIdAndDelete(req.params.id);
  if (!doc) {
    new AppError('No document found', 404);
  }
  successResponse(req, res, 'success', 304, 'Delete Successfully');
});
