const crypto = require('crypto');
const mongoose = require('mongoose');
// const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    service: {
      type: String,
    },
    userRole: {
      type: String,
    },
    identifier: {
      type: String,
    },
    url_hash: {
      type: String,
    },
    url_path: {
      type: String,
    },
    service: {
      type: String,
    },
    identifier: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    name_number: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'A user must have email'],
      unique: true,
      lowercase: true,
      // validate: [validator.isEmail, 'Please provide a valid email'],
    },
    is_email_verified: {
      type: Boolean,
    },
    email_verified_at: {
      type: String,
    },
    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
    last_login_at: {
      type: String,
    },
    allow_notifications: {
      type: Boolean,
    },
    allow_marketing: {
      type: Boolean,
    },
    subscriber_count: {
      type: Number,
    },
    subscription_count: {
      type: Number,
    },
    is_banned: {
      type: Boolean,
    },
    banned_at: {
      type: String,
    },
    is_in_removal: {
      type: Boolean,
      default: false,
    },
    is_removed: {
      type: Boolean,
      default: false,
    },
    removed_at: {
      type: String,
    },
    restoration_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//for every find query just show the not false active users
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// match the user input password and the stored password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//check if the password is changed after creation
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(JWTTimestamp, changedTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('users', userSchema);
module.exports = User;
