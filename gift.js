const pg = require("pg");
require("dotenv").config();

// configure DB connection
const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Handles gift-related functions
class Gift {
  constructor(name, gift) {
    this.name = name;
    this.gift = gift;
  }

  addGift() {
    // INSERT COMMAND
  }

  // return all gifts from DB
  static async getGifts() {
    return pool.connect().then((client) =>
      client
        .query("SELECT * FROM gifts;")
        .then((data) => {
          client.release();
          return data.rows;
        })
        .catch((error) => {
          client.release();
          console.log("ERROR:", error);
        })
    );
  }
}

module.exports = { Gift: Gift };
