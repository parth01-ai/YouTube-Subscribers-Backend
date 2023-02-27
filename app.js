const express = require("express");

const subscriberModel = require("./models/subscribers.js");

const app = express();

app.use(express.json());

const data = require("./data");

//The Home Route;
app.get("/", (req, res) => {
  res.send("hello user");
});

// Access All Subscribers

app.get("/subscribers", async (req, res) => {
  const subscribers = await subscriberModel.find();
  try {
    res.send(subscribers);
  } catch (err) {
    res.status(404).send(err);
  }
});

// To Access Name And Channel Of Subscribers

app.get("/subscribers/name", async (req, res) => {
  try {
    const subscribers = await subscriberModel.find().select({
      name: 1,
      subscribedChannel: 1,
      _id: 0,
    });
    res.send(subscribers);
  } catch (err) {
    res.status(404).send(err);
  }
});

// To Access Find Subscriber Data Through Subscriber Id

app.get("/subscribers/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const subscriberData = await subscriberModel.findById(_id);

    res.send(subscriberData);
  } catch (err) {
    res.status(400).send({ message: "Error! Subscriber Id does not exist" });
  }
});

// Add new Subscribers
app.post("/subscribers/add", async (req, res) => {
  const subscribers = new subscriberModel({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel,
  });

  await subscribers
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send({err});
    });
});

//For Updating The Subscriber Data By Id

app.patch("/subscribers/update/:id", async (req, res) => {
  let userID = req.params.id;
  let userName = req.body.name;
  let userChannel = req.body.subscribedChannel;

  await subscriberModel
    .findOneAndUpdate(
      { _id: userID },
      { $set: { name: userName, subscribedChannel: userChannel } },
      { new: true }
    )
    .then((data) => {
      if (!data) {
        err = Error(`No subscriber with  ${userID}.`);
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      // When the id is not entered in the correct format.
      res.status(404).send({
        message: `No subscriber with id: ${userID}.`,
      });
    });
});

// For Delete Subscriber

app.delete("/subscribers/delete/:id", async (req, res) => {
  try {
    //deleteOne() method to easily remove a one record from the database
    await subscriberModel.deleteOne({ _id: req.params.id });
    res.status(200);
    res.send( "deleted succesfully" );
  } catch {
    res.status(400);
    res.send("subscriber does not exist" );
  }
});

//Exports module
module.exports = app;
