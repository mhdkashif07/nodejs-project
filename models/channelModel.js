// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const channelSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A channel must have a name'],
    unique: true,
  },
});

// add plugin that converts mongoose to json
channelSchema.plugin(paginate);

const Channel = mongoose.model('channels', channelSchema);
module.exports = Channel;
