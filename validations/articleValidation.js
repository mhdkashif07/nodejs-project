const Joi = require('joi');
// const { password } = require('./custom.validation');

const articleCreateValidation = {
  body: Joi.object().keys({
    scope: Joi.string().max(16).required(),
    slug: Joi.string().max(128).default(null),
    type: Joi.string().default('ARTICLE'),
    seo_title: Joi.string().max(128),
    seo_description: Joi.string().max(255),
    provider: Joi.string(),
    title: Joi.string().max(128).default(null),
    show_in_feed: Joi.boolean().required().default(true),
    is_published: Joi.boolean().required().default(false),
    reaction_count: Joi.string(),
    comment_count: Joi.string(),
    score: Joi.string(),
    url_hash: Joi.string(),
    url_path: Joi.string(),
    published_at: Joi.date().default(null),
    articleAuthors: Joi.array().items(Joi.string()),
    articleTags: Joi.array().items(Joi.string()),
    articleMedia: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  }),
};

module.exports = {
  articleCreateValidation,
};
