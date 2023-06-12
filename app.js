const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
const path = require("path");

const { PORT = 3000 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"));

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "648582273b35f8daa0eca946", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(router);

app.patch('*', function(req, res){
  res.status(404).send({message: "Page not found"});
});

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
