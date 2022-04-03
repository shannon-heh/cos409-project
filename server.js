const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// to read env variables in .env
require("dotenv").config();

// to control gift queries
const gifts = require("./gift.js");
const Gift = gifts.Gift;

// use ejs template engine
app.set("view engine", "ejs");
app.use(express.static("static"));

// Home page
app.get("/", async (req, res) => {
  res.render("index");
});

// Workshop page
app.get("/workshop", async (req, res) => {
  // all items are stored in JSON file
  const allItems = JSON.parse(fs.readFileSync("all-items.json", "utf8"));
  res.render("workshop", { allItems: allItems });
});

// Garden page
app.get("/garden", async (req, res) => {
  const gifts = await Gift.getGifts();
  res.render("garden", { gifts: gifts });
});

// Final page
app.get("/final", async (req, res) => {
  res.render("final");
});

// About page
app.get("/about", async (req, res) => {
  res.render("about");
});

// Listens for client requests
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
