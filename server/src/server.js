const express = require("express");
const cors = require("cors");
const router = require("./Routes/appRoutes");
const db = require("./config/db");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
db.initialize()
  .then(() => {
    console.log("DataBase Connected");
    app.listen(3000, () => {
      console.log("Backend running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });