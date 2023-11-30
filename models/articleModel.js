// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    scope: {
      type: String,
    },
    slug: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'ARTICLE',
    },
    provider: {
      type: String,
    },
    title: {
      type: String,
      default: null,
    },
    show_in_feed: {
      type: Boolean,
      default: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    reaction_count: {
      type: String,
    },
    comment_count: {
      type: String,
    },
    score: {
      type: String,
    },
    url_hash: {
      type: String,
    },
    url_path: {
      type: String,
    },
    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
    published_at: {
      type: Date,
      default: null,
    },
    articleAuthors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articleAuthor',
      },
    ],
    articleTags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articleTag',
      },
    ],
    articleMedia: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articleMedia',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('articles', articleSchema);
module.exports = Article;
