const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const { validateUserBody, validateAuth } = require('./middlewares/validations');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'));

app.use(express.json());

app.post('/signin', validateUserBody, login);

app.post('/signup', validateAuth, createUser);

app.use(auth);

app.use(router);

app.use('*', () => {
  throw new NotFoundError('Page not found');
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
