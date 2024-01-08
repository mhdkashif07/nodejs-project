const mongoose = require('mongoose');

const articleReactionSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.ObjectId,
      ref: 'articles',
    },
    userId: {
      type: String,
    },
    isLike: {
      type: String,
    },
    isLaugh: {
      type: String,
    },
    isLove: {
      type: String,
    },
    isGrief: {
      type: String,
    },
    isInspiring: {
      type: String,
    },
    isThoughtful: {
      type: String,
    },
    hasCommented: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('articleReactions', articleReactionSchema);
