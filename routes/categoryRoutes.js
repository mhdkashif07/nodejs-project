const express = require('express');

const { category } = require('../controllers/index');

const router = express.Router();

router
  .route('/')
  .get(category.getCategories)
  .post(category.createCategory);

router
  .route('/:id')
  .get(category.getSingleCategory)
  .delete(category.deleteCategory)
  .patch(category.updateCategory);

module.exports = router;
