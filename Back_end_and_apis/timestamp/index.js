var express = require("express");
var app = express();

const port = 3000;

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const paramDate = req.params.date;
  let date;

  if (!req.params.date) {
    date = new Date(Date.now());
  } else {
    if (/^\d*$/.test(req.params.date)) {
      date = new Date(parseInt(req.params.date));
    } else {
      date = new Date(paramDate);
    }
  }

  let response = { unix: Math.floor(date), utc: date.toUTCString() };

  if (date == "Invalid Date") {
    response = { error: "Invalid Date" };
  }

  res.json(response);
});

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function isTimestamp(data) {
  const dateSplit = data.split("");

  for (const el of dateSplit) {
    if (el == "-") {
      return false;
    }
  }

  return true;
}
