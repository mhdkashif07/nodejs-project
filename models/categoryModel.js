// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
  },
});

// add plugin that converts mongoose to json
categorySchema.plugin(paginate);

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;
