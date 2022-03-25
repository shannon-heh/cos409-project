const express = require("express");
const app = express();

// to read env variables in .env
require("dotenv").config();

// to control gift queries
const gifts = require("./gift.js");
const Gift = gifts.Gift;

// respond with "hello" and print gift entries from DB to console
app.get("/", async (req, res) => {
  const gifts = await Gift.getGifts();
  console.log("Gifts in DB: ", gifts);
  res.send("hello");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
