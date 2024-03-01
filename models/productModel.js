const mongoose = require('mongoose');

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