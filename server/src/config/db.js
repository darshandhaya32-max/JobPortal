const path = require("path");
const { DataSource } = require("typeorm");
require("dotenv").config();

const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities/**/*.js")], // __dirname works in CJS
});

module.exports = db;
