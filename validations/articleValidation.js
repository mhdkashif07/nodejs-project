const Joi = require('joi');
// const { password } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    scope: Joi.string().max(16).required(),
    slug: Joi.string().max(128),
    title: Joi.string().max(128),
    seo_title: Joi.string().max(128),
    seo_description: Joi.string().max(255),
    status: Joi.boolean().required(),
    show_in_feed: Joi.boolean().required(),
  }),
};

module.exports = {
  create,
};
