const Joi = require('joi');
// const { password } = require('./custom.validation');

const articleLikeValidation = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    articleId: Joi.string().required(),
    like: Joi.number().required(),
  }),
};

module.exports = {
  articleLikeValidation,
};
