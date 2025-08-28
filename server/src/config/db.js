const path = require("path");
const { DataSource } = require("typeorm");

const db = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "2025",
  database: "week4",
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities/**/*.js")],
});

module.exports = db;
