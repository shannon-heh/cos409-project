import pg from "pg";
import "dotenv/config";

const Pool = pg.Pool;

// configure DB connection
const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create new gift object
// Handles gift-related functions
export class Gift {
  constructor(gift, name) {
    this.gift = gift;
    this.name = name;
  }

  // insert gift into DB, returns 1 if successful and 0 if not
  // doesn't check for duplicates
  async addGift() {
    const query = {
      text: "INSERT INTO  gifts (gift, name) VALUES($1, $2)",
      values: [this.gift, this.name],
    };
    return pool.connect().then((client) =>
      client
        .query(query)
        .then((data) => {
          client.release();
          return 1;
        })
        .catch((error) => {
          client.release();
          console.log("ERROR:", error);
          return 0;
        })
    );
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
