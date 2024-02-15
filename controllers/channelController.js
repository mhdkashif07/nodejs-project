const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const catchAsync = require('../utils/catchAsync');
const Channel = require('../models/channelModel');
const AppError = require('../utils/appError');

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
