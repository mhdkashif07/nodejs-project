const Joi = require('joi');
// const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    userRole: Joi.string().valid('user', 'admin').default('user'),
  }),
};

module.exports = {
  register,
};
