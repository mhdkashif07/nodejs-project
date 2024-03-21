// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { paginate } = require('./plugins');
const OrderItem = require('./orderItemModel');

const orderSchema = mongoose.Schema({
  orderItems: [OrderItem],
  shippingAddress1: {
    type: String,
    required: [true, 'Order must have shipping address'],
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  totalPrice: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  dateOrdered: {
    type: Date.now(),
  },
});

// add plugin that converts mongoose to json
// orderSchema.plugin(paginate);

// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'categoryId',
//     select: 'name',
//   });
//   next();
// });

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
