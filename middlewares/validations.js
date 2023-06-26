const { celebrate, Joi } = require('celebrate');

const REGEXP_LINK =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/; // eslint-disable-line
module.exports = REGEXP_LINK;

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEXP_LINK),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
