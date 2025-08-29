const path = require("path");
const { DataSource } = require("typeorm");
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production"; 

const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false, 
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities/**/*.js")],
});
module.exports = db
