import path from "path";
import { fileURLToPath } from "url";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities/**/*.js")],
});

export default db;
