const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })

    .then((card) => {
      res.status(201).send(card);
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {

      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params);

  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)

    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка с указанным _id не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  if (!req.params.cardId || !req.user._id) {
    return res.status(400).send({ message: " Переданы некорректные данные для постановки лайка" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий _id карточки" });
      }

      res.send(card);
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (!req.params.cardId || !req.user._id) {
    return res.status(400).send({ message: " Переданы некорректные данные для снятия лайка" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий _id карточки" });
      }

      res.send(card);
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
