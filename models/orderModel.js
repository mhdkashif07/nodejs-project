// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const channelSchema = mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users',
     required: true
    }, // Reference to user who placed the order
  products: [productSchema], // Array of products in the order
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

// add plugin that converts mongoose to json
channelSchema.plugin(paginate);

channelSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'categoryId',
    select: 'name',
  });
  next();
});

const Channel = mongoose.model('channels', channelSchema);
module.exports = Channel;
