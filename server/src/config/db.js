


import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, 
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false, 
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities/**/*.js")],
});

export default db;
