const crypto = require('crypto');
const mongoose = require('mongoose');
// const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, 'Please provide a valid email'],
  },
  service:{
    type: String, 
    unique: true
  },
  identifier: {
    type: String, 
    unique: true
  },
  url_hash:{
    type: String, 
    unique: true
  },
  url_path
  service
  identifier
  name
  name_number
  email
  is_email_verified
  email_verified_at
  created_at
  updated_at
  last_login_at
  allow_notifications
  allow_marketing
  subscriber_count
  subscription_count
  is_banned
  banned_at
  is_in_removal
  is_removed
  removed_at
  restoration_code
  role: {
    type: String,
    enum: ['user', 'author', 'admin', 'superAdmin'],
    default: 'user',
  },
  phot: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide Confirm Password'],
    validate: {
      //This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

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
