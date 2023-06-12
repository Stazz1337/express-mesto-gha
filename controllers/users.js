const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return res.status(400).send("Invalid request");
      }

      res.status(200).send(users); 
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
        });
      }
      return res.status(500).send({ message: "Server Error" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send("Invalid request");
  }

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send("Invalid request");
  }

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
