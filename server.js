const express = require("express");
const app = express();
const path = require("path");

// to read env variables in .env
require("dotenv").config();

// to control gift queries
const gifts = require("./gift.js");
const Gift = gifts.Gift;

// use ejs template engine
app.set("view engine", "ejs");

// Home page
app.get("/", async (req, res) => {
  res.render("index");
});

// Workshop page
app.get("/workshop", async (req, res) => {
  res.render("workshop");
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
