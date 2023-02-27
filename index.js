const express = require("express");

const app = require("./app.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// listening port number
const PORT = 3000;

// Wide listing a cors to accept a specific domain route
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enable cors usage
app.use(cors());

// Connect to DATABASE
const DATABASE_URL = "mongodb://localhost:27017/subscribers";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

//app.listen() function
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;
