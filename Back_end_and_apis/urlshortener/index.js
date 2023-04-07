require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(express.urlencoded());
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  console.log(req.body.url);
  const url = req.body.url;

  if (!stringIsAValidUrl(url)) {
    res.send({ error: "Invalide URL" });
  }

  // const shorterUrl = shortId.generate();
  // generate random id and check if exist already

  saveUrl({ original_url: url, short_url: shorterUrl });

  res.send({  original_url: url, short_url: shorterUrl });

  // check if it is already in the json file
  // return short url
  // write in json file
  // return the short url
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const stringIsAValidUrl = s => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

const saveUrl = data => {
  const stringData = JSON.stringify(data);
  fs.writeFileSync("urls.json", stringData);
};

const getUrls = () => {
  const jsonData = fs.readFileSync("urls.json");
  return JSON.parse(jsonData);
};
