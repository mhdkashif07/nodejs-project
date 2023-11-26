// const httpStatus = require('http-status');
const Category = require('../models/categoryModel');
// const ApiError = require('../utils/ApiError');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const users = await Category.paginate(filter, options);
  return users;
};

module.exports = {
  queryCategories,
};
