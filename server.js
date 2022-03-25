const express = require("express");
const app = express();
const path = require("path");

// to read env variables in .env
require("dotenv").config();

// to control gift queries
const gifts = require("./gift.js");
const Gift = gifts.Gift;

// this path points to the views folder
const views = path.join(__dirname + "/views");

// Home page
app.get("/", async (req, res) => {
  res.sendFile(`${views}/index.html`);
});

// Workshop page
app.get("/workshop", async (req, res) => {
  res.sendFile(`${views}/workshop.html`);
});

// Garden page
app.get("/garden", async (req, res) => {
  // const gifts = await Gift.getGifts();
  // console.log("Gifts in DB: ", gifts);
  res.sendFile(`${views}/garden.html`);
});

// Final page
app.get("/final", async (req, res) => {
  res.sendFile(`${views}/final.html`);
});

// About page
app.get("/about", async (req, res) => {
  res.sendFile(`${views}/about.html`);
});

// Listens for client requests
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
