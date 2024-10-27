const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// get all users
app.get("/api/users", (req, res) => {
  res.send(getAllUsers());
});

//get logs about user
app.get("/api/users/:_id/logs/:from?/:to?/:limit?", (req, res) => {
  const idUser = req.params._id;
  const user = getUser(idUser);
  let userExos = getUserExos(idUser);
  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;

  if (from) {
    userExos = userExos.filter((exo) => exo.date >= from);
  }
  if (to) {
    userExos = userExos.filter((exo) => exo.date <= to);
  }
  if (limit && userExos.length > limit) {
    userExos.length = limit;
  }

  const logUser = { ...user };
  logUser.count = userExos.length;
  const logExos = [];

  for (const exo of userExos) {
    const userExos = {
      description: exo.description,
      duration: exo.duration,
      date: exo.date,
    };

    logExos.push(userExos);
  }

  logUser.log = logExos;
  res.send(logUser);
});

// post a new user
app.post("/api/users", (req, res) => {
  let newUser = { _id: Date.now(), ...req.body };
  addUser(newUser);
  res.send(newUser);
});

// post user exercise
app.post("/api/users/:_id/exercises", (req, res) => {
  const duration = Number(req.body.duration);
  if (!duration) {
    res.send({ message: "error, duration must be number" });
    return;
  }

  if (!req.body.description || !req.body.duration) {
    res.send({ message: "error" });
  }

  const allUsers = getAllUsers();
  const user = allUsers.find((user) => user._id == req.params._id);

  const newExo = {
    username: user.username,
    description: req.body.description,
    duration: duration,
    _id: req.params._id,
  };

  if (req.body.date) {
    newExo.date = req.body.date;
  } else {
    newExo.date = new Date().toString();
  }

  addExo(newExo);
  res.send(newExo);
});

// get user exercises in the json file
const getUserExos = (idUser) => {
  const allExos = getAllExos();
  return allExos.filter((exo) => exo._id == idUser);
};

// get a single user from an id
const getUser = (id) => {
  return getAllUsers().find((user) => user._id == id);
};

// get all exos from the file
const getAllExos = () => {
  const data = fs.readFileSync("./exos.json", "utf-8");
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};

// write a new exo in the json file
const addExo = (newExo) => {
  const allExos = getAllExos();
  allExos.push(newExo);
  fs.writeFileSync("./exos.json", JSON.stringify(allExos));
};

// get all users from file
const getAllUsers = () => {
  const data = fs.readFileSync("./data.json", "utf-8");
  return JSON.parse(data);
};

// write a new user in the json file
const addUser = (newUser) => {
  const allUsers = getAllUsers();
  allUsers.push(newUser);
  fs.writeFileSync("./data.json", JSON.stringify(allUsers));
};

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
