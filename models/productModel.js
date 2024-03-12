const mongoose = require('mongoose');

//Review Modal

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'user required'],
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: [true, 'A product must have a title'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'categories',
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'subcategories',
    },
    productImages: [String],
    discount: String,
    price: Number,
    description: String,
    inStock: Boolean,
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    variantsList: [
      {
        labelType: String,
        labelName: String,
        sku: Number,
        in_stock: Boolean,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//this runs before the data even written in db
// productSchema.pre(/^find/, function (next) {
//   this.populate({
//     // strictPopulate: false,
//     path: 'category',
//     select: '-__v',
//   });
//   this.populate({
//     // strictPopulate: false,
//     path: 'subCategory',
//     select: '-__v',
//   });
//   next();
// });

const Product = mongoose.model('products', productSchema);

module.exports = Product;
