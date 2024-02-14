// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    scope: {
      type: String,
    },
    seo_title: {
      type: String,
    },
    seo_description: {
      type: String,
    },
    content: {
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
    published_at: {
      type: Date,
      default: null,
    },
    comments: [
      {
        text: {
          type: String,
        },
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'users',
        },
      },
    ],
    likes: {
      type: Number,
    },
    disLikes: {
      type: Number,
    },
    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
      },
    ],
    disLikedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
      },
    ],

    articleAuthors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articleauthors',
      },
    ],
    articleTags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articletags',
      },
    ],
    articleMedia: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'articlemedias',
      },
    ],
  },
  {
    timestamps: true,
  }
);

//QUERY MIDDLEWARES:
//populate the user and tour id
articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments.postedBy',
    select: 'name',
  });
  next();
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'likedBy',
    select: 'name',
  });
  next();
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'disLikedBy',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('articles', articleSchema);
