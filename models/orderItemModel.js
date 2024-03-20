// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
});

// add plugin that converts mongoose to json
// channelSchema.plugin(paginate);

// channelSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'categoryId',
//     select: 'name',
//   });
//   next();
// });

const Channel = mongoose.model('channels', channelSchema);
module.exports = Channel;
