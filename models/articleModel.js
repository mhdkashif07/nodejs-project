// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A article must have a name'],
      unique: true,
    },
    authors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: users,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Article = mongoose.model('articles', articleSchema);
module.exports = Article;
