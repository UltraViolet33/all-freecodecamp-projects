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
  const url = req.body.url;

  if (!isValidUrl(url)) {
    return res.send({ error: "Invalide URL" });
  }

  let urlsAlreadyExists = isUrlInFile(url);

  if (urlsAlreadyExists) {
    return res.send(urlsAlreadyExists);
  }
  const shorterUrl = Math.floor(Math.random() * 100);

  saveUrl({ original_url: url, short_url: shorterUrl });

  res.send({ original_url: url, short_url: shorterUrl });
});

app.get("/api/shorturl/:redirect", function (req, res) {
  const url = req.params.redirect;

  const shortUrl = findShortUrl(url);
  if (shortUrl) {
    return res.redirect(shortUrl.original_url);
  }

  return res.send({ error: "wrong format" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const isValidUrl = urlString => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

const isUrlInFile = new_url => {
  const urls = getUrls();

  for (const url of urls) {
    if (url.original_url == new_url) {
      return url;
    }
  }

  return false;
};

const findShortUrl = shortUrl => {
  const urls = getUrls();

  for (const url of urls) {
    if (url.short_url == shortUrl) {
      return url;
    }
  }

  return false;
};

const saveUrl = data => {
  const urls = getUrls();
  urls.push(data);

  const stringData = JSON.stringify(urls);
  fs.writeFileSync("urls.json", stringData);
};

const getUrls = () => {
  const jsonData = fs.readFileSync("urls.json");
  return JSON.parse(jsonData);
};
