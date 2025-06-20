const express = require("express");
const app = express();
require('dotenv').config()

const port = 6000 // process.env.PORT

app.listen(port, () => {
  console.log("Application started and Listening on port " + port);
});

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});