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
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
        });
      }
      return res.status(500).send({ message: "Server Error" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(400).send("Invalid request"); 
      }

      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params);

  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)

    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  if (!req.params.cardId || !req.user._id) {
    return res.status(400).send('Invalid request');
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send('Card not found');
      }

      res.send(card);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.dislikeCard = (req, res) => {
  if (!req.params.cardId || !req.user._id) {
    return res.status(400).send('Invalid request');
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send('Card not found');
      }

      res.send(card);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
