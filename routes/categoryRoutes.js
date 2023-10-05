const express = require('express');

const categoryController = require('../controllers/categoryController');
// const { gettingError } = require('../Middleware/gettingError');

const router = express.Router();

router.route('/').post(categoryController.createCategory);

router.route('/:id').get(categoryController.getSingleCategory);

module.exports = router;
