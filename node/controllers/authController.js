const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//   const hash = bcrypt.hash(password, 10)

exports.register = (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ email, password: hash });
  newUser.save((error, user) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).json({ message: "user created" });
  });
};

module.exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (error, user) => {
      if (user == null) {
        res.status(500).send({ message: "user not found", error });
      }
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error || !isMatch) {
          res.status(406).json({ message: "error" });
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
          res.json({ token });
        }
      });
    }
  );
};

// const mongoose = require("mongoose");
// const id = new mongoose.Types.ObjectId();
// console.log(id.getTimestamp());
