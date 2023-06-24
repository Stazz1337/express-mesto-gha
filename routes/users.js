const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get(
  '/users/:id',
  celebrate({
    // валидируем параметры
    id: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);

router.get('/users/me', getCurrentUser);

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
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, // eslint-disable-line
      ),
    }),
  }),
  updateAvatar,
);

module.exports = router;
