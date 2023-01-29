const express = require("express");
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const bodyParser = require("body-parser");
const cors = require("cors");

//connect the mongoose, <password> => password in mongoDB
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("connected successfully"))
  .catch((error) => {
    console.log("connection to database unsuccessfully");
    console.log(error);
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post("/register", authController.register);
app.post("/login", authController.login);

app.listen(8000, () => console.log("listening on port 8000"));

// app.get("/", function (req, res) {
//   res.send("Home page");
// });
// app.get("/about", function (req, res) {
//   res.send("About page");
// });
// app.get("/user", function (req, res) {
//   let user = ["orr", "maya", "lior"];
//   res.send(user[0]);
// });

// console.log("hi");

// function CircleArea(radius) {
//   const pi = 3.1415;
//   return pi * radius * radius;
// }
// module.exports.CircleArea = CircleArea;
