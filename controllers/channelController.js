const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const { successResponse } = require('../helpers/successResponses');
const catchAsync = require('../utils/catchAsync');
const Channel = require('../models/channelModel');

//** create a single channel
exports.createChannel = catchAsync(async (req, res, next) => {
  const doc = await Channel.create(req.body);
  successResponse(req, res, 'success', CREATED_CODE, 'custom message', doc);
});
