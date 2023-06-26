const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const REGEXP_LINK = require('../middlewares/validations');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.get('/users', getUsers);

router.get(
  '/users/:id',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(REGEXP_LINK),
    }),
  }),
  updateAvatar,
);

module.exports = router;
