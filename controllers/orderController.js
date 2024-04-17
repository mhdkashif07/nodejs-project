const { OK_CODE, CREATED_CODE, NOT_FOUND } = require('../constants/constants');
const {
  successResponse,
  successResponsePagination,
} = require('../helpers/successResponses');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const { categoryService } = require('../services');
const pick = require('../utils/pick');
const OrderItem = require('../models/orderItemModel');

//** create a single order
exports.createOrder = catchAsync(async (req, res, next) => {
  //creating the order items ids before saving the order
  const newOrderItemsIds = Promise.all(
    req.body.orderItems.map(async (item) => {
      let newOrderItem = new OrderItem({
        quantity: item.quantity,
        product: item.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const OrderItemsIds = await newOrderItemsIds;

  //saving the order item as a new instance
  let order = new Order({
    orderItems: OrderItemsIds,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zipCode: req.body.zipCode,
    country: req.body.country,
    phone: req.body.phone,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return new AppError('No order created', 404);
  }
  successResponse(
    req,
    res,
    'success',
    CREATED_CODE,
    'Order created successfully',
    order
  );
});

//** get a single category
// exports.getSingleCategory = catchAsync(async (req, res, next) => {
//   const doc = await Category.findById(req.params.id);
//   if (!doc) {
//     return next(new AppError('No document found with that', 404));
//   }
//   successResponse(req, res, 'success', OK_CODE, 'custom message', doc);
// });

//** get all orders
exports.getOrders = catchAsync(async (req, res, next) => {
  const doc = await Order.find();

  if (!doc) {
    return next(new AppError('No documents found', 404));
  }
  successResponsePagination(req, res, 'success', 202, 'custom message', doc);
});

//** delete single category
// exports.deleteCategory = catchAsync(async (req, res, next) => {
//   const doc = await Category.findByIdAndDelete(req.params.id);
//   if (!doc) {
//     return next(new AppError('No document found with that', 404));
//   }
//   successResponse(req, res, 'success', 200, 'Deleted Successfully');
// });

//** update single category
// exports.updateCategory = catchAsync(async (req, res, next) => {
//   const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!doc) {
//     return next(new AppError('No document found with that id', 404));
//   }
//   successResponse(req, res, 'success', 200, 'Updated Successfully', doc);
// });
