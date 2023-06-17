const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const NOT_FOUND = 404;

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'));

app.use((req, res, next) => {
  req.user = {
    _id: '648582273b35f8daa0eca946', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());

app.use(router);

app.patch('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
