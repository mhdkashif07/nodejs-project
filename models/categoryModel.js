// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
  },
});

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;
