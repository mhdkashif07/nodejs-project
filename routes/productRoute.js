const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const { reviewController } = require('../controllers');
// const variantsToFormData = require('../Middleware/variantsToFormData');

const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    // authController.protect,
    // authController.restrictTo('admin'),
    // productController.uploadProductImages,
    // productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

router
  .route('/:id/review')
  .put(authController.protect, reviewController.createReview);

module.exports = router;
