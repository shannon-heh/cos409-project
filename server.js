import express from "express";
const app = express();
import * as fs from "fs";

// to read env variables in .env
import "dotenv/config";

// to control gift queries
import { Gift } from "./gift.js";

// use ejs template engine
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.json());

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
  // random gifts
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

// Adds gift to DB
app.post("/add-gift", async (req, res) => {
  const { name, gift } = req.body;
  const giftObj = new Gift(gift, name);
  const isSuccess = await giftObj.addGift();
  if (isSuccess) {
    res.status(200);
  } else {
    res.status(500);
  }
  return res.end();
});

// Listens for client requests
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
