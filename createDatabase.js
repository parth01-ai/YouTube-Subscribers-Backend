const mongoose = require("mongoose");

const subscriberModel = require("./models/subscribers.js");

mongoose.set("strictQuery", true);

const data = require("./data");

// Connect to DATABASE
const DATABASE_URL = "mongodb://localhost:27017/subscribers";

// Set up default mongoose connection
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created..."));

const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  // console.log(connection)
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
